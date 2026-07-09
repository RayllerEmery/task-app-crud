import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="">
      <body className="">
        <header className="fixed top-0 right-0 left-0 border-b text-center shadow-xl py-4">
          <Link className="font-bold" href="/">Task App</Link>
        </header>
        <main className="mt-24 flex justify-center">{children}</main>
        <footer className="text-center mt-4">
          <p className="text-sm">Projeto desenvolvido durante o curso de Fundamentos Front-End em React</p>
        </footer>
      </body>
    </html>
  );
}
