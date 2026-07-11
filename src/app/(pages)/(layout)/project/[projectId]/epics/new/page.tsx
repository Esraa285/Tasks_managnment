import AddNewEpic from "@/components/EpicForm/AddNewEpic";
import NavProject from "@/components/nav/nav";

import React from "react";

export default async function AddEpic({ params}: {params: { projectId: string };}) {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;

  return (
    <div className="p-3">
      <div className="  p-3">
        <NavProject />
      </div>
      <div className=" ">
        <h1 className="text-3xl font-bold text-slate-900 mt-4 ms-4">
          Create New Epic
        </h1>
        <p className="text-sm text-gray-500 mt-1 ms-4 ">
          Define a major project phase or high-level milestone to group <br/>related
          tasks and track architectural progress.
        </p>
      </div>

      <div className=" flex justify-around ">
        <main className="flex-1 ">
          <AddNewEpic projectId={projectId} />
        </main>
      </div>
    </div>
  );
}
