import type { Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { auth } from '@/auth'
import { Space_Grotesk, Inter} from 'next/font/google';
import { ToastProvider } from '@/components/providers/toaster-provider'
import "./globals.css";
import { SessionProvider } from "next-auth/react";
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Course Canvas",
  description: "All the courses you need to succeed in your career.",
};

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap', 
  adjustFontFallback: false
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session} basePath="http://localhost:3000/api/auth">
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
        {children}
      </body>

    </html>
    </SessionProvider>
  );
}
