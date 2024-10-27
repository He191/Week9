"use client";
import '../app/globals.css'; 
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import Image from "next/image";

export default function ProductDetailsClient({ product, reviews, onSubmit }) {
    
    const { addToCart } = useContext(CartContext);

    function addToCartLocal(formData){
        const quantity = formData.get("quantity");
        product.quantity = quantity;
        addToCart(product);
    }

    return (
        <div className="bg-green-100 translate-y-9 flex flex-row">
            <Image
                src={product.img_src}
                alt={product.prod_name}
                width={400}
                height={400}
                className="object-contain ml-6"
            />
            <div className="flex flex-col justify-evenly m-11 w-2/5">
                <h1>{product.prod_name}</h1>
                <p>{product.description}</p>
                {/* <div className="flex justify-evenly"> */}
                <form action={addToCartLocal} className="flex justify-evenly">
                    <h1>£{product.unit_price}</h1>
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                defaultValue={1}
                                required
                                className="border-x-cyan-600 border-4 shadow-sm bg-teal-100 text-gray-900 text-sm text-center rounded-lg block w-1/5 p-2.5"
                            />
                    <button className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm"
                        type="submit">Add to Cart</button>
                </form>
            </div>
            <div className="bg-slate-300 rounded-lg w-2/5">
                {/* Review form */}
                <form action={onSubmit} className=" flex max-w-sm mx-auto">
                    <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white m-2">
                        Please enter your review!
                    </label>
                    <input
                        type="text"
                        name="comment"
                        id="comment"
                        required
                        className="border-x-cyan-600 border-4 shadow-sm bg-teal-100 text-gray-900 text-sm rounded-lg block w-auto p-2.5 m-2"
                    />
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1 m-2">
                        Review
                    </button>
                </form>

                {/* Display reviews */}
                <div className="flex flex-wrap">
                {reviews.map((review) => (
                    <div key={review.review_id} className="text-center mt-8 bg-teal-100 m-2">
                        <h3>{review.first_name} {review.last_name}</h3>
                        <p className="italic">{review.comment}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}
