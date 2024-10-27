import Link from "next/link";
import { UserButton, SignInButton,SignUpButton ,SignIn,SignedOut, SignedIn} from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server";

export default async function Navbar() {

  const { userId } = await auth();
  const profile ="/profile/"+userId;

  return (
    <div id="navbar" className="flex justify-between">
      <Link href="/" className="text-3xl font-bold m-10 tracking-widest text-blue-600">Home</Link>
      <Link href="/product" className="text-3xl font-bold m-10 tracking-widest text-blue-600">Menu</Link>
      <Link href="/about" className="text-3xl font-bold m-10 tracking-widest text-blue-600">About</Link>
      <Link href="/cart" className="text-3xl font-bold m-10 tracking-widest text-blue-600">Cart</Link>
        <SignedIn>
            <Link href={profile} className="text-3xl font-bold m-10 tracking-widest text-blue-600">My Profile</Link>
            <UserButton className="m-10"/>
        </SignedIn>
        <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl={profile}
              className="text-3xl font-bold m-10 tracking-widest text-blue-600">
                Sign In</SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl={profile}
              className="text-3xl font-bold m-10 tracking-widest text-blue-600">
                Sign Up</SignUpButton>
        </SignedOut>
    </div>
  );
}
