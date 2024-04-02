import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID !,
      clientSecret: process.env.GITHUB_SECRET !
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID !,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET !
    })
  ],
  callbacks: {
    session({ session, token, user }) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    signIn: '/',
    signOut: '/perfil',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
})

export { handler as GET, handler as POST }