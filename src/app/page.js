"use client"
import Image from "next/image";
import { motion } from "framer-motion"


export default function HomePage(){
  return(
    <>
    <motion.div 
    initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 5 }}
    >
      <h1 className="text-center font-bold text-5xl mr-12 mt-20 ">Hetal's Home Kitchen</h1>
    <Image
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBTeHtGkoY3_a-PM2Jh85tB8HKsmNiUMJXVk1YAv8dkJ7Q7FFPBDSoTD-vQ98eh6pup4&usqp=CAU"
    alt="Hetal Home's Kitchen "
    width={500}
    height={500}
    className="translate-x-16 ml-96  min-w-28 hover:cursor-pointer"
    />
   
    </motion.div>
    <p className="text-3xl mt-8 text-center mx-12 ">All foods are freshly prepared form high-quality vegetables and grocery products. Please place your order</p>
    </>
  );
}