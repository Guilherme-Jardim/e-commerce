import type { Metadata } from "next";
import "../globals.css";
import NavBar from "../components/NavBar";
import clsx from 'clsx';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "e-commerce",
  description: "e-commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-Br">
      <body className={clsx(inter.className, 'bg-slate-700')}>
        <NavBar />
        <main className="h-screen p-16">
          {children}
        </main>
      </body>
    </html >
  );
}