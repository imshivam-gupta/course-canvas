import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";
import Markdown from "./_components/markdown";
import { auth } from '@/auth'
const markdown = "## In Progress\n\nYou have not started any courses yet. Get started by enrolling in a course today! \
  $$ a^2 +b^2=c^2 $$ \
  $\\epsilon $\
  $y = f(g(x_1, x_2, x_3, ..., x_n))$ = 1 if $g(x_1, x_2, x_3, ..., x_n)$ $\\geq$ $\\theta$ else 0\
  \
"; 
export default async function Dashboard() {
    const session = await auth();
  // if (!session?.user) {
  //   redirect("/auth/signin");
  // }

  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const {
  //   completedCourses,
  //   coursesInProgress
  // } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


       

      </div>
    </div>
  )
}