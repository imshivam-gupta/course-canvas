import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {Navbar} from "@/app/(dashboard)/_components/navbar";

const AuthLayout = async({
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
                className="w-full bg-black bg-dot-white/[0.2] relative pt-0 flex flex-col justify-center items-center min-h-[90vh]">

                <main className="">
                    {children}
                </main>
            </div>


        </div>
    );
}

export default AuthLayout;