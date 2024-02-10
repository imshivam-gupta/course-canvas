import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CoursesPage = async () => {
  const editors = await db.editor.findMany(
    {
      orderBy: {
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
