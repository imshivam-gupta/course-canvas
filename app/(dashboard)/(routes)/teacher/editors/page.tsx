import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getServerSession } from "next-auth";

const CoursesPage = async () => {
    const session = await getServerSession();
    if (!session?.user) {
        redirect("/auth/signin");
    }

    const staticData = await fetch(`${process.env.NEXT_API_URL}/user`, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({ email: session.user.email }),
    });
    const res = await staticData.json();
    const userId = res.user.id;
    
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
