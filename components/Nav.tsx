import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Nav() {
  const session = await auth();
  //   console.log("NAVsession >>>", session);
  return (
    <nav className="flex justify-between shadow bg-green-400 px-5 py-2">
      <h1 className="text-xl p-3">
        {session?.user?.name ? (
          <>{session.user.name}님의 레시피</>
        ) : (
          "아직 로그인하지 않았습니다."
        )}
      </h1>
      <div className="flex flex-row mr-5">
        <Link
          href="/addRecipe"
          className="bg-yellow-500 w-fit text-white px-5 py-4 mr-5 rounded-lg"
        >
          레시피 추가
        </Link>
        <div
          className={` text-white px-5 py-4 rounded-lg ${
            session?.user ? "bg-red-500 w-fit" : "bg-blue-500"
          }`}
        >
          {session?.user ? (
            <Link href="/api/auth/signout" className="text-white">
              로그아웃
            </Link>
          ) : (
            <Link href="/api/auth/signin" className="text-white">
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
