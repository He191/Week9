import Image from "next/image";
// import pavBhaji from "@/../public/pavbhaji.jpg";
import Link from "next/link";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { db } from "@/utils/dbConnection";
export const metadata = {
    title: "About my food items",
    description: "please place your order",
  };



export default async function product({ searchParams }) {

    let sortValue = "d";

    const food_items = await db.query(`SELECT * FROM food_items order by unit_price desc`);
    const wrangledFood_items = food_items.rows;

    if (searchParams.sort === "asc") {
        wrangledFood_items.reverse();
        sortValue = "a";
    }
    else if(searchParams.sort === "desc") {
        sortValue = "d";
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col">
                <div className="flex justify-evenly">
                    <h1 className="text-2xl font-bold mb-4" >Explore Products</h1>
                    {sortValue==="a" ? <Link href='/product?sort=desc'>
                        {/* <p className="text-right">Sort by Price : Desc</p> */}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sort by Price : Desc</button>
                    </Link> : null}
                    {sortValue==="d" ? <Link href='/product?sort=asc'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sort by Price : Asc</button>
                    </Link> : null}
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {wrangledFood_items.map((items) => (

                        <div key={items.fooditems_id}
                            className="flex flex-col items-center">

                            <Link href={`/product/${items.route_name}`}>
                                <Image
                                    className="ml-4 hover:scale-105 transition-transform duration-300"
                                    src={items.img_src}
                                    alt={items.prod_name}
                                    width={300}
                                    height={300} />


                                <h1 className="text-lg ml-24 mt-2">{items.prod_name}</h1>
                                <h1 className="text-md ml-28 text-gray-600">£{items.unit_price}</h1>
                            </Link>
                        </div>

                    ))

                    }
                </div>
                </div>
              
                     </div>
    );
}