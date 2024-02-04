import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import { ToastProvider } from '@/components/providers/toaster-provider'
import "./globals.css";
import { redirect } from "next/navigation";
import { NextProvider } from "./nextprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Course Canvas",
  description: "All the courses you need to succeed in your career.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <link
              href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
              rel="stylesheet"
          />
          <meta charSet="utf-8" />
          <title>{"Course Canvas"}</title>
          <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ToastProvider />
        <NextProvider session={session}>{children}</NextProvider>
      </body>

    </html>
  );
}
