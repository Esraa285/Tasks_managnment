import NavProject from "@/components/nav/nav";
import UpdateProjectForm from "@/components/ProjectForm/UpdateProject";
import ProjectTitle from "@/components/ProjectTitle/Project-Title";


export default async function ProjectEdit({ params }: { params: { projectId: string } }) {
   
     const resolvedParams = await params;
     const { projectId } = resolvedParams;

   
  return (
 <div className=''>
          <div className= "  p-3">
             <NavProject/>
             <div className='flex justify-between'>
                   <h1 className="text-3xl font-bold text-slate-900 mt-4 ms-4">Edit Project</h1>
                    <ProjectTitle/>
             </div>
             
         <div className=' flex justify-around '> 
       
            <main className="flex-1 p-8 ">
         
           <UpdateProjectForm projectId={projectId} />
           
         </main>
         </div>
         </div>
      </div>
  );
}
