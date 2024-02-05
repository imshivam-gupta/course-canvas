import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        height={180}
        width={180}
        alt="logo"
        src="/logo1.svg"
      />
    </Link>
  )
}
