import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2>Not Found</h2>
      <p>Could not find requested post</p>
      <Link href="/" className="text-fuchsia-800 underline">Return to the homepage</Link>
    </div>
  );
}