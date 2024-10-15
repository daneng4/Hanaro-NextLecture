import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;
  if (!didLogin) {
    // req.nextUrl.pathname -> 로그인 이후에 갈 페이지
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    console.log('!!!!!!!!', callbackUrl);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/about/:path*', …],
// };

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|login|regist|$).*)',
  ],
};
