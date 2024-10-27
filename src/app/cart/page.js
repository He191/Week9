"use client"
import { CartContext } from "@/context/cartContext";
import { useContext } from "react";
import { handleOrder } from "./order";
import { SignedOut, SignedIn} from "@clerk/nextjs"

export default function CartPage() {

    const { cart, clearCart } = useContext(CartContext);

    let orderTotal = 0;
    cart.forEach(function(item, index){
        orderTotal = orderTotal + (item.quantity*item.unit_price)
    });

    function handleOrderSubmit(){
        
        handleOrder(cart);
    };

    return (
        <div className="text-center m-5">
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                cart.map((item, index) => (
                    <div key={index} className="flex justify-center">
                        <h3 className="m-1">{item.prod_name}</h3>
                        <h3 className="m-1">Price: £{item.unit_price}</h3>
                        <h3 className="m-1">Quantity: £{item.quantity}</h3>
                        <h3 className="m-1">Total: £{item.quantity*item.unit_price}</h3>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <br/>
            <h1>Your cart Total is: £{orderTotal}</h1>
            <br/>
            <SignedOut>
                <h1>Please Sign in or Sign up to place the order!</h1>
            </SignedOut>
            {cart.length > 0 && (
                <SignedIn>
                <div className="mt-4">
                    <button className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm"
                                onClick={handleOrderSubmit}>Place Order
                    </button>
                    <button className="ml-2 px-2 py-1 text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm"
                        onClick={clearCart}>
                    Clear Cart
                    </button>
                </div>
                </SignedIn>
            )}
        </div>
    );
}
