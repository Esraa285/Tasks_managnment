import { fetchProjectTask } from '@/actions/actions';
import NavProject from '@/components/nav/nav';
import React from 'react'

export default async function Tasks({ params }: { params: { projectId: string } }) {

 const resolvedParams = await params;
     const { projectId } = resolvedParams;

       let tasks: any[] = [];
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

     <div className=" px-8 mb-3 flex justify-between ">
       
         <div>
           <h1 className="text-2xl font-bold text-blue-900">Project tasks</h1>

         </div>
           <div className='flex justify-around'>
             {/* <EpicSearch epics={epics}/> */}
          ?
           </div>
      </div>
        <div className=" max-w-5xl mx-auto">
    
      <div className="text-sm text-gray-550 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 text-end my-4">
          Total Epics: <span className="font-semibold text-blue-900">{totalCount}</span>
        </div>
     
     
    </div>
    </div>
  );
}
