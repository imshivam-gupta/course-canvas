import { auth } from "@/auth";
import { Navbar } from "./_components/navbar";
import { redirect } from "next/navigation";

const DashboardLayout = async({
  children
}: {
  children: React.ReactNode;
}) => {

  return (
      <div className="h-full bg-dot-white/[0.2]">
          <div className="h-[80px] inset-y-0 w-full z-50">
              <Navbar/>
          </div>
          <div
              className="w-full bg-black bg-dot-white/[0.2] relative pt-[0px]">

              <main className="h-full">
                  {children}
              </main>
          </div>


      </div>
  );
}

export default DashboardLayout;