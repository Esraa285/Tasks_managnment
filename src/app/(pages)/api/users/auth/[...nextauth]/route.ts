import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Tasks",
      credentials: {
        email: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${BASE_URL}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        });

        const payload = await res.json();

        if (res.ok && payload) {
          return {
            id: payload.id || payload.user?.id, 
            user: payload.user,
            accessToken: payload.token,          
          }as any;
        } else {
    
          throw new Error(payload.message || "Invalid email or password");
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.SECRET_KEY,


  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.accessToken = (user as any).accessToken; 
      token.id = user.id;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      (session.user as any).id = token.id;
      (session.user as any).accessToken = token.accessToken;
    }
    return session;
  }
}
});

export { handler as GET, handler as POST }