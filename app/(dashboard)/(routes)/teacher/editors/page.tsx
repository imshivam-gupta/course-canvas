import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from '@/auth'

const CoursesPage = async () => {
    // const session = await auth();
    // if (!session?.user) {
    //     redirect("/auth/signin");
    // }

    const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  const userId = session?.user.id;
    
  const editors = await db.editor.findMany(
    {orderBy: {
        name: "asc",
    },
  });

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={editors} />
    </div>
   );
}
 
export default CoursesPage;
