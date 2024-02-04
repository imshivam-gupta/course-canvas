"use client";
import { SessionProvider } from "next-auth/react";

export const NextProvider = ({ session, children }: Readonly<{
    session: any;
    children: React.ReactNode;
    }>) => {
    return (
        <SessionProvider session={session}>
        {children}
        </SessionProvider>
    );
}
