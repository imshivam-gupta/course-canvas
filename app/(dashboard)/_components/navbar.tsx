import { NavbarRoutes } from "./navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
  return (
    <div className="p-4 h-full flex items-center bg-dot-white/[0.13] shadow-sm z-[50] sticky top-0 w-full border-b bg-black border-white/[0.1] ">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}