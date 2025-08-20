import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "Ov23liPZRRHOa6iZxDKW",
      clientSecret: process.env.GITHUB_SECRET || "45f6c7b4adce243c8fd710687fe8d50999c5cf7c",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  pages: {
   signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
  },
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };