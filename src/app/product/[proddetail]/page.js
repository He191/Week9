
import Image from "next/image";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function detailPage({ params }) {
    // console.log("searchParams", searchParams);
    // const sort=searchParams?.sort || 'asc';

const food_items = await db.query(`SELECT * FROM food_items WHERE route_name=$1`,
    [params.proddetail]
);

   
    const wrangledFood_items = food_items.rows;
    console.log(wrangledFood_items);
    console.log(params);
    async function handlesumit(formValues) {
        "use server";

        const formData = {
            name: formValues.get("name"),
            comment: formValues.get("comment")

        };
        await db.query(
            `INSERT INTO review_table(name,comment,fooditem_id)
            VALUES($1,$2,$3)`, [formData.name, formData.comment, wrangledFood_items[0].fooditem_id]
        );
        revalidatePath(`/product/${params.proddetail}`);

        redirect(`/product/${params.proddetail}`);
    }
    const reviews = await db.query(`SELECT * FROM review_table WHERE fooditem_id =$1 `,
        [wrangledFood_items[0].fooditem_id]

    );
    console.log(reviews);
    const wrangledReviews = reviews.rows
   
    async function handleDelete(formValues) {
        "use server";
    const review_id = formValues.get("review_id");
    await db.query( `DELETE FROM review_table WHERE review_id = $1`,
        [review_id]
    );
    console.log(review_id);
    revalidatePath(`/product/${params.proddetail}`);

    redirect(`/product/${params.proddetail}`);
}

    return (
        <>
            <div
                className="bg-green-100 translate-y-9 flex flex-row ">



                <Image
                    src={wrangledFood_items[0].img_src}
                    alt={wrangledFood_items[0].prod_name}
                    width={400}
                    height={400} 
                    className="object-contain w-auto h-auto ml-6"
                    />


                <div className="flex flex-col m-11">
                    <h1>{wrangledFood_items[0].prod_name}</h1>
                    <h1>£{wrangledFood_items[0].unit_price}</h1>
                    <p className="">{wrangledFood_items[0].description}</p>
                
                    <form action={handlesumit}
                        className="max-w-sm mx-auto">
                        <div className="mb-5" >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className=" border-x-cyan-600 border-4 shadow-sm bg-teal-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            />
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="comment">Comment</label>
                                <input
                                    type="text"
                                    name="comment"
                                    id="comment"
                                    required
                                    className=" border-x-cyan-600 border-4 shadow-sm bg-teal-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"

                                />
                            </div>
                        </div>
                        <div>
                            <button type="sumbit"
                                className=" text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                            >Review</button>
                        </div>
                    </form>

                   <div className="flex flex-row space-x-5">
                    <Link className ="text-right"   href="/">Home</Link>
                    <Link href="/product">Products</Link>
                    </div>
                </div>
 </div>
        
 {
                        wrangledReviews.map((reviews) => (
                            <div key={reviews.review_id}
                                className="flex flex-col items-center mt-8"
                            >
                                <h2>{reviews.name}</h2>
                                <p>{reviews.comment}</p>
                                <form action={handleDelete}
                            className="mt-2"
                            >

                            <input type="hidden" 
                            name="review_id" 
                            id="review_id"
                            value={reviews.review_id}
                             />
                              <button
                                type="submit"
                                className="text-white  bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1 text-center"
                            >
                                Delete
                            </button>
                        </form>

                            </div>
                        ))}

        
        </>

    );

}
