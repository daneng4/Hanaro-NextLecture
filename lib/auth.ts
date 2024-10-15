import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "your-email@example.com",
        },
        passwd: {
          label: "Password",
          type: "password",
          placeholder: "비밀번호를 입력하세요",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;
        console.log("🚀  credentials:", credentials);
        const { email } = credentials;
        const user = { id: "1", email, name: "GUEST" } as User;
        return user;
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const didLogin = !!auth?.user;
    //   console.log(
    //     "🚀 auth.ts > callbacks > authorized - didLogin:",
    //     didLogin,
    //     nextUrl.pathname
    //   );
    //   // if (didLogin) return Response.redirect(new URL('/about', nextUrl));
    //   return true;
    // },
    session({ session }) {
      // console.log("cb - session:", session);
      return session;
    },
  },
});
