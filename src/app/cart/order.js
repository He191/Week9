"use server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


export async function handleOrder(cart) {
    let orderTotal = 0;
    cart.forEach(function(item, index){
        orderTotal = orderTotal + (item.quantity*item.unit_price)
    });

    try{

    const { userId } = await auth();

    const customerDetails = await db.query(`SELECT * FROM customer WHERE clerk_user_id=$1`, [userId]);
    const customerDetail = customerDetails.rows;
    let customerID = customerDetail[0].customer_id;
    
    const customerorderInsert = await db.query(`INSERT INTO customer_order (customer_id, order_total) VALUES ($1, $2) RETURNING *`,
        [customerID, orderTotal]);

    cart.forEach(function (item, index) {
        db.query(`INSERT INTO order_items (item_name, item_price, quantity, total_price, order_id) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [item.prod_name, 
                item.unit_price,
                item.quantity,
                item.quantity*item.unit_price,
            customerorderInsert.rows[0].order_id]);
      });
    }
    catch{
        console.log("Order place inserts failed");
    }

    // revalidatePath('/cart');
    redirect('/success');
};
