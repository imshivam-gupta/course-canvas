"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Logo = () => {
  const pathname = usePathname();

  // const isTeacherPage = pathname?.startsWith("/teacher");
  const isSectionPage = pathname?.includes("/sections");
  // const isSearchPage = pathname === "/search";

  return (
    !isSectionPage ? (
    <Link href="/">
      <Image
        height={180}
        width={180}
        alt="logo"
        src="/logo1.svg"
      />
    </Link>) : (
      <> </>)
  )
}
