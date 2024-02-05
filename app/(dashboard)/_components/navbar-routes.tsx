import { navRoutes } from "@/lib/utils";
import { NavLink } from "./navlink";
import { Logo } from "./logo";
import { UserButton } from "@/app/(dashboard)/_components/UserButton";
import { isTeacher } from "@/lib/teacher";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
// import { SearchInput } from "./search-input";

interface NavLinkProps {
  name: string;
  path: string;
}

export const NavbarRoutes = async() => {

  const session = await getServerSession();
    if (!session?.user) {
        redirect("/auth/signin");
    }
    const staticData = await fetch(`${process.env.NEXT_API_URL}/user`, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({ email: session.user.email }),
      });
      const res = await staticData.json();
      const userId = res.user.id;

  return (
    <>
      {/* {isSearchPage && (
        <div className="hidden md:block">
           <SearchInput /> 
        </div>
      )} */}
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex gap-x-2 ml-auto">
        {/* {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher() ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null} */}

      {isTeacher(userId) && (
          <NavLink href="/teacher/courses" routename="Teacher mode" />
        )}

        {navRoutes.map((route:NavLinkProps) => (
          <NavLink key={route.name} href={route.path} routename={route.name} />
        ))}

       <UserButton />
      </div>
    </>
  )
}