import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID !,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET !,
      async profile(profile) {
        // Verifica se o ID do perfil está presente
        if (!profile.id) {
          throw new Error("Profile id is missing in Google OAuth profile response");
        }

        return {
          id: profile.id.toString(), // Converte o ID para uma string
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },
});

// Exporta o handler para lidar com solicitações GET e POST
export { handler as GET, handler as POST };
