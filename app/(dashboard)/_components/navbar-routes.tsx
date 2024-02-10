import { navRoutes } from "@/lib/utils";
import { NavLink } from "./navlink";
import { Logo } from "./logo";
import { isTeacher } from "@/lib/teacher";
import { auth } from '@/auth'
import { redirect } from "next/navigation";
import { UserModal } from "@/components/modals/user-modal";
// import { SearchInput } from "./search-input";

interface NavLinkProps {
  name: string;
  path: string;
}

export const NavbarRoutes = async () => {

  const session = await auth();

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

        {isTeacher(session?.user) && (
          <NavLink href="/teacher/courses" routename="Teacher mode" />
        )}

        {navRoutes.map((route: NavLinkProps) => (
          <NavLink key={route.name} href={route.path} routename={route.name} />
        ))}

        <UserModal />
      </div>
    </>
  )
}