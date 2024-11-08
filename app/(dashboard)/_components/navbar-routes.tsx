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
            {/*<Logo/>*/}
            <a className="flex items-center justify-center space-x-2 text-2xl font-bold py-6 text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10"
               href="/">
                <div
                    className="relative h-10 w-10 bg-black border border-slate-800  text-white   flex items-center justify-center rounded-md text-sm antialiased">
                    <div className="absolute w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>

                        <img alt="Logo"
                                                                                  className="block"
                                                                                  style={{"color": "transparent"}}
                             src="/logo1.svg"></img>
                </div>
                <div className="flex flex-col"><h1 className="text-white font-sans"> Course Canvas</h1>
                </div>
            </a>
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
                <NavLink href="/teacher/courses" routename="Teacher mode"/>
            )}

            {navRoutes.map((route: NavLinkProps) => (
                <NavLink key={route.name} href={route.path} routename={route.name}/>
            ))}

            <NavLink href={"/auth/signin"} routename={"Login"} />

            <UserModal/>
        </div>
    </>
  )
}