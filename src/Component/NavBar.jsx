import Link from "next/link";

export default function Navbar() {
  return (
    <div id="navbar">
      <Link href="/" className="linkComp">Home</Link>
      <Link href="/product" className="linkComp">Product</Link>
      <Link href="/about" className="linkComp">About</Link>
    </div>
  );
}
