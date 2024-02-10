import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { Actions } from "./_components/actions";
import { auth } from '@/auth'
import { SectionsForm } from "./_components/sections-form";
import { DifficultyForm } from "./_components/difficulty-form";

const EditorIdPage = async ({
  params
}: {
  params: { editorId: string }
}) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const editor = await db.editor.findUnique({
    where: {
      id: params.editorId,
    },
    include: {
      company: true,
      example: true,
      hiddencases: true,
      supportedLanguages: true,
      submissions: true,
      similarProblems: true,
      submittedBy: true,
    },
  });


  if (!editor) {
    return redirect("/");
  }

  const difficulties = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
    { id: "godlevel", name: "God Level" }
  ];

  const requiredFields = [
    editor.name,
    editor.description,
    editor.difficulty,
    editor.starterCode,
    editor.orginalCode,
    editor.constraints.length > 0,
    editor.example.length > 0,
    editor.hiddencases.length > 0,
    editor.supportedLanguages.length > 0,
    editor.editorial
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!editor.isPublished && (
        <Banner
          label="This editor is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Editor setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            editorId={params.editorId}
            isPublished={editor.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your editor
              </h2>
            </div>
            <TitleForm
              initialData={editor}
              editorId={editor.id}
            />
            <DescriptionForm
              initialData={editor}
              editorId={editor.id}
            />
            <DifficultyForm
              initialData={editor}
              editorId={editor.id}
              options={difficulties.map((difficulty) => ({
                label: difficulty.name,
                value: difficulty.id,
              }))}
            />

            {/* <CategoryForm
              initialData={editor}
              editorId={editor.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            /> */}
           
            <div className="mt-6">


              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Add Testcase
                </h2>
              </div>
              <TitleForm
                initialData={editor}
                editorId={editor.id}
              />
              <DescriptionForm
                initialData={editor}
                editorId={editor.id}
              />
              <DifficultyForm
                initialData={editor}
                editorId={editor.id}
                options={difficulties.map((difficulty) => ({
                  label: difficulty.name,
                  value: difficulty.id,
                }))}
              />

            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Course Sections
                </h2>
              </div>
              {/* <SectionsForm
                initialData={editor}
                editorId={editor.id}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorIdPage;