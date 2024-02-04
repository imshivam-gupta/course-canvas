import Link from "next/link";
import { Button } from "../../../components/ui/button";

interface NavLinkProps {
    href: string;
    routename: string;
}

export const NavLink = ({ href , routename, ...props }:NavLinkProps) => {
    return (
        <Link href={href} className="text-black my-auto">
            <Button size="sm" variant="ghost">
                {routename}
            </Button>
        </Link>
    );
}

