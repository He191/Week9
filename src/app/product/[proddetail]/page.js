import { db } from "@/utils/dbConnection";
import ProductDetailsClient from "@/Component/ProductDetailsClient";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function DetailPage({ params }) {
    // Fetch product details and reviews from the database
    const foodItems = await db.query(`SELECT * FROM food_items WHERE route_name=$1`, [params.proddetail]);
    const wrangledFoodItems = foodItems.rows;

    if(wrangledFoodItems.length===0){
        notFound();
    }

    const reviews = await db.query(`select review_table.review_id, review_table.comment, customer.first_name, customer.last_name
                                    from review_table
                                    join customer on customer.customer_id = review_table.customer_id
                                    where review_table.fooditem_id = $1`, [wrangledFoodItems[0].fooditem_id]);
    const wrangledReviews = reviews.rows;

    // Server action for submitting a review
    async function handleSubmit(formData) {
        "use server";
        const comment = formData.get("comment");

        // get current customer id
        const { userId } = await auth();
        const customerDetails = await db.query(`SELECT * FROM customer WHERE clerk_user_id=$1`, [userId]);
        const customerDetail = customerDetails.rows;
        let customerID = customerDetail[0].customer_id;

        await db.query(
            `INSERT INTO review_table( comment, fooditem_id, customer_id) VALUES($1, $2, $3)`,
            [comment, wrangledFoodItems[0].fooditem_id, customerID]
        );

        revalidatePath(`/product/${params.proddetail}`);
        redirect(`/product/${params.proddetail}`);
    }

    return (
        <ProductDetailsClient
            product={wrangledFoodItems[0]}
            reviews={wrangledReviews}
            onSubmit={handleSubmit}
        />
    );
}
