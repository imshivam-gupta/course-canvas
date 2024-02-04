
import { isTeacher } from "@/lib/teacher";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const TeacherLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  else {
    const staticData = await fetch(`${process.env.NEXT_API_URL}/user`, {
      cache: 'no-cache',
      method: 'POST',
      body: JSON.stringify({ email: session.user.email }),
    });
    const res = await staticData.json();
    const userId = res.user.id;
    if (!isTeacher(userId)) {
      return redirect("/");
    }
  }



  return <>{children}</>
}

export default TeacherLayout;