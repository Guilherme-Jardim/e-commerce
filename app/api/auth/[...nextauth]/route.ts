import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

let userAccount;

const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          userAccount = user;
          console.log(userAccount);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  pages: {
    signIn: "/perfil",
    signOut: "/",
    error: "/auth/error",
  },

  callbacks: {
    async session(params: {
      session: any; // Ou ajuste para o tipo correto se possível
      token: any; // Ou ajuste para o tipo correto se possível
      user: any; // Ou ajuste para o tipo correto se possível
      newSession: any; // Ou ajuste para o tipo correto se possível
      trigger: "update";
    }): Promise<any> {
      const { session, user, token, newSession, trigger } = params;
    
      // Sua lógica de sessão aqui
    
      return session;
    },
    

    async jwt({ token, user }) {
      const isSignedIn = user ? true : false;

      if (isSignedIn) {
        token.accessToken =
          user.id.toString() + "-" + user.email + "-" + user.name;
      }

      return await token;
    },
  },
};

export default authOptions;
