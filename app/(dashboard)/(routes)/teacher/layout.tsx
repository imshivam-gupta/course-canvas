
import { isTeacher } from "@/lib/teacher";
import { auth } from '@/auth'
import { redirect } from "next/navigation";


const TeacherLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!isTeacher(session?.user)) {
    return redirect("/");
  }




  return <>{children}</>
}

export default TeacherLayout;