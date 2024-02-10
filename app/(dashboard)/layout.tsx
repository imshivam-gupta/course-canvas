import { auth } from "@/auth";
import { Navbar } from "./_components/navbar";
import { redirect } from "next/navigation";

const DashboardLayout = async({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  if(!session) {
    return redirect("/auth/signin");
  }
  return ( 
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <main className="pt-[80px] h-full">
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;