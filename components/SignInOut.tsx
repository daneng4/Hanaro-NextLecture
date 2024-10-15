"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SignInOut() {
  const { data: session } = useSession();
  if (session?.user)
    return (
      <Link
        href="/api/auth/signout"
        className="text-white bg-red-500 px-5 py-4 rounded-lg"
      >
        로그아웃
      </Link>
    );

  return (
    <Link
      href="/api/auth/signin"
      className="text-white bg-blue-500 px-5 py-4 rounded-lg"
    >
      로그인
    </Link>
  );
}
