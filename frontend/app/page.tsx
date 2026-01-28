import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/invoices");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-md w-full px-6 py-12 bg-white dark:bg-zinc-800 shadow-xl rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Invoice App</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Please sign in to manage your invoices.
        </p>
        <Link
          href="/sign-in"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
