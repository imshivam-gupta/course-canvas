import Link from "next/link";
import { Button } from "../../../components/ui/button";

interface NavLinkProps {
    href: string;
    routename: string;
}

export const NavLink = ({ href , routename, ...props }:NavLinkProps) => {
    return (
        <Link href={href}
              className="transition-colors hover:text-white/80 text-white/60 mr-3 text-sm font-medium">
            <span className="hidden sm:block">{routename}</span>
        </Link>
    );
}

