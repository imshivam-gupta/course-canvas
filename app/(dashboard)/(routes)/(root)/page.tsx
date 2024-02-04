import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";
import Markdown from "./_components/markdown";
import { getServerSession } from "next-auth";
const markdown = "## In Progress\n\nYou have not started any courses yet. Get started by enrolling in a course today! \
  $$ a^2 +b^2=c^2 $$ \
  $\\epsilon $\
  $y = f(g(x_1, x_2, x_3, ..., x_n))$ = 1 if $g(x_1, x_2, x_3, ..., x_n)$ $\\geq$ $\\theta$ else 0\
  \
"; 
export default async function Dashboard() {
    const session = await getServerSession();
  if (!session?.user) {
    redirect("/auth/signin");
  }

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


        <div className="bg-white p-4 rounded-lg shadow-md text-black">
          <h2 className="text-lg font-semibold text-black">In Progress</h2>
          <Markdown>
          {markdown}
          </Markdown>
          <p>0 courses</p>
        </div>


       {/* <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
       /> */}
      </div>
      {/* <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      /> */}
    </div>
  )
}