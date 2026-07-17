import { fetchProjectTask } from '@/actions/actions';
import BoardViewPage from '@/components/BoardView.tsx/boardViewPage';
import Views from '@/components/Buttons/Views';
import NavProject from '@/components/nav/nav';
import { ProjectTask } from '@/Interfaces/AuthInterfaces';
import React from 'react'

export default async function Tasks({ params }: { params: { projectId: string } }) {

 const resolvedParams = await params;
     const { projectId } = resolvedParams;

       let tasks: ProjectTask[] = [];
      let totalCount = 0;


 try {
    const response = await fetchProjectTask(projectId);
    console.log(response, "tasks");
 
    if (response) {
          tasks = Array.isArray(response) ? response : (response.data || []);
      totalCount = tasks.length;
      
    }
  } catch (error: any) {
    console.error("Error in Epics Page:", error);
  }

  return (
   <div>
     <NavProject/>

    
        <div className=" ">
     
     <BoardViewPage projectId={projectId} tasks={tasks} />
    </div>
    </div>
  );
}
