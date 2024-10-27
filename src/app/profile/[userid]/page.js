import UserForm from "@/Component/UserForm";
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Profile({ searchParams }){
    
    let editValue;
    
    if (searchParams.edit === "true") {
        editValue = "true";
    }
    else {
        editValue = null;
    }

    const { userId } = await auth();

    const editRoute = '/profile/'+userId+'?edit=true';

    // Fetch existing customer details from db
    const customerDetails = await db.query(`SELECT * FROM customer WHERE clerk_user_id=$1`, [userId]);
    const customerDetail = customerDetails.rows;

    const firstName = customerDetail[0] ? customerDetail[0].first_name : "";
    const lastName = customerDetail[0] ? customerDetail[0].last_name : "";
    const email = customerDetail[0] ? customerDetail[0].email : "";

    // Get past order details of the user
    const orderDetails = await db.query(`SELECT distinct
                                                customer_order.order_id,
                                                customer_order.customer_id,
                                                customer_order.order_total
                                            FROM customer
                                            JOIN customer_order ON customer.customer_id=customer_order.customer_id
                                            WHERE customer.clerk_user_id =$1`,[userId]);
    const orderDetail = orderDetails.rows;

    // brings users reviews
    const reviews = await db.query(`select review_table.review_id, food_items.prod_name, review_table.comment
                                    from review_table
                                    join customer on customer.customer_id = review_table.customer_id
                                    join food_items on food_items.fooditem_id = review_table.fooditem_id
                                    where customer.clerk_user_id = $1`, [userId]);
    const wrangledReviews = reviews.rows;

    async function handleUpdateDetails(formData){
        "use server";
        
        const firstNameU = formData.get("firstName");
        const lastNameU = formData.get("lastName");
        const emailU = formData.get("email");

        if(customerDetail[0]){
            await db.query(`UPDATE customer SET first_name = $1, last_name = $2, email = $3 where clerk_user_id = $4`,
                [firstNameU, lastNameU, emailU, userId]);
        }else{
            await db.query(`INSERT INTO customer (first_name, last_name, email, clerk_user_id) VALUES ($1, $2, $3, $4)`,
                    [firstNameU, lastNameU, emailU, userId]);
        }
        
        revalidatePath('/profile/'+userId+'?edit=false');
        redirect('/profile/'+userId+'?edit=false');
    }

    // Server action for deleting a review
    async function handleDelete(formData) {
        "use server";
        const review_id = formData.get("review_id");
        await db.query(`DELETE FROM review_table WHERE review_id = $1`, [review_id]);

        revalidatePath('/profile/'+userId);
        redirect('/profile/'+userId);
    }


    return (<>
        { customerDetail[0] ? <h1 className="m-11">Your profile details</h1>
                            : <h1 className="m-11 text-red-600">You must provide details below to order</h1>
        }
        { ( customerDetail[0] && !editValue) && <div className="flex justify-evenly">
            <h3>First Name: </h3>
            <h3 className="border-x-cyan-600 border-4 shadow-sm bg-slate-300 text-gray-900 text-sm rounded-lg block w-auto p-2.5">{firstName}</h3>
            <h3>Last Name: </h3>
            <h3 className="border-x-cyan-600 border-4 shadow-sm bg-slate-300 text-gray-900 text-sm rounded-lg block w-auto p-2.5">{lastName}</h3>
            <h3>Email: </h3>
            <h3 className="border-x-cyan-600 border-4 shadow-sm bg-slate-300 text-gray-900 text-sm rounded-lg block w-auto p-2.5">{email}</h3>
            <Link href={editRoute}>
                <button className="ml-2 px-2 py-1 text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm"
                    >Edit Details
                </button>
            </Link>
        </div>
        }
        { (!customerDetail[0] || editValue ) && <form action={handleUpdateDetails} className="flex justify-evenly">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required defaultValue={firstName}
                className="border-x-cyan-600 border-4 shadow-sm bg-teal-100 text-gray-900 text-sm rounded-lg block w-auto p-2.5"/>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required defaultValue={lastName}
                className="border-x-cyan-600 border-4 shadow-sm bg-teal-100 text-gray-900 text-sm rounded-lg block w-auto p-2.5"/>
            <label htmlFor="email">E mail</label>
            <input type="email" id="email" name="email" required defaultValue={email}
                className="border-x-cyan-600 border-4 shadow-sm bg-teal-100 text-gray-900 text-sm rounded-lg block w-auto p-2.5"/>
            <UserForm
                buttonName = "Update Details"
            />
        </form>
        }
        <h1 className="m-11">Your previous orders</h1>
        <ul>
            {orderDetail && orderDetail.map((item) => (
              <li key={item.order_id} className="m-5"
                >Order Id : {item.order_id} Grand Total = £{item.order_total}</li>
            ))}
        </ul>
        {/* Display reviews */}
        <h1 className="m-11">Your reviews</h1>
        {wrangledReviews.map((review) => (
                    <div key={review.prod_name} className="flex flex-col items-center mt-8">
                        <h3>{review.prod_name}</h3>
                        <p className="italic">{review.comment}</p>
                        <form action={handleDelete} className="mt-2">
                            <input type="hidden" name="review_id" value={review.review_id} />
                            <button type="submit" className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1">
                                Delete
                            </button>
                        </form>
                    </div>
        ))}
    </>);
}