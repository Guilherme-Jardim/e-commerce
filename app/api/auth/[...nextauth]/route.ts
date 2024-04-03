import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID !,
      clientSecret: process.env.GITHUB_SECRET !
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID !,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET !
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
  
        if (user) {        
          return user
        } else {
          return null
        }
      }
    }),
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








// import NextAuth, { NextAuthOptions } from 'next-auth'
// import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
// import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
// import CredentialsProvider, { CredentialsProfile } from "next-auth/providers/credentials";
// import { PrismaAdapter } from '../../../lib/auth/prisma-adapter'
// import { NextApiRequest, NextApiResponse } from 'next'

// export function buildNextAuthOptions(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ): NextAuthOptions {
//   return {
//     providers: [
//       GitHubProvider({
//         clientId: process.env.GITHUB_ID!,
//         clientSecret: process.env.GITHUB_SECRET!,
//         authorization: {
//           params: {
//             scope:
//               'read:user user:email',
//           },
//         },
//         profile(profile: GithubProfile) {
//           return {
//             id: profile.id.toString(),
//             name: profile.name ?? '',
//             username: profile.login ?? '',
//             email: profile.email ?? '',
//             avatar_url: profile.avatar_url ?? '',
//           }
//         },
//       }),
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         authorization: {
//           params: {
//             scope:
//               'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
//           },
//         },
//         profile(profile: GoogleProfile) {
//           return {
//             id: profile.sub,
//             name: profile.name ?? '',
//             username: '',
//             email: profile.email ?? '',
//             avatar_url: profile.picture ?? '',
//           }
//         },
//       }),
//       CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//           username: { label: "Username", type: "text", placeholder: "jsmith" },
//           password: { label: "Password", type: "password" }
//         },
//         async authorize(credentials, req) {
//           const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
    
//           if (user) {        
//             return user
//           } else {
//             return null
//           }
//         },
//         authorization: {
//           params: {            
//           },
//         },
//         profile(profile: CredentialsProfile) {
//           return {
//             id: profile.sub,
//             name: profile.name ?? '',
//             username: '',
//             email: profile.email ?? '',
//             avatar_url: profile.picture ?? '',
//           }
//         },
//       }),
//     ],
//     callbacks: {
//       async signIn({ account }) {
//         if (
//           !account?.scope?.includes('https://www.googleapis.com/auth/userinfo.profile')
//         ) {
//           return '/register/connect-calendar/?error=permissions'
//         }
//         return true
//       },
//     },
//     pages: {
//       signIn: '/', // Página de login
//       signOut: '/perfil', // Página de logout
//       error: '/auth/error', // Página de erro (código de erro passado na string de consulta como ?error=)
//       verifyRequest: '/auth/verify-request', // Usado para verificar o email
//       newUser: '/auth/new-user' // Novos usuários serão redirecionados aqui na primeira entrada (deixe a propriedade de fora se não for do interesse)
//     },
//     adapter: PrismaAdapter(req, res),
//   }
// }

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   return await NextAuth(req, res, buildNextAuthOptions(req, res))
// }
