import type { Metadata } from "next";
import "../globals.css";
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import NextAuthSessionProvider from "../providers/nextauth/sessionProvider";
import MainLayout from "../components/mainlayout/MainLayout";

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "e-commerce",
  description: "e-commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={clsx(inter.className, 'bg-slate-700')}>
        <NextAuthSessionProvider>
          <MainLayout>{children}</MainLayout>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}