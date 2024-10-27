import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/Component/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "../context/cartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "About Yummy Food",
  description: "It is amazing app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
