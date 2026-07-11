import NavProject from '@/components/nav/nav'
import AddTask from '@/components/ProjectForm/AddTask';
import AddTaskForm from '@/components/ProjectForm/AddTaskForm'
import React from 'react'

export default async function NewTask({ params}: {params: { projectId: string };}) {

 const resolvedParams = await params;
  const { projectId } = resolvedParams;



  return (

 <div className="p-3">
      <div className="  p-3">
        <NavProject />
      </div>
      <div className=" m-3">
        <h1 className="text-3xl font-bold text-slate-900 mt-4 ms-4">
          Create New Task
        </h1>
        <p className="text-sm text-gray-500 mt-1 ms-4 ">
         Initialize a new work item within the Architectural Workspace ecosystem.
        </p>
      </div>

      <div className=" flex justify-around ">
        <main className="flex-1 ">
         <AddTask projectId={projectId}/>
        </main>
      </div>
    </div>
    
  )
}
