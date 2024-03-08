import type { Metadata } from "next";
import "../globals.css";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "e-commerce",
  description: "e-commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-Br">
      <body>
        <NavBar />
        <main className="bg-slate-700 h-screen p-16">
          {children}
        </main>
      </body>
    </html>
  );
}