import { fetchEpicsProject } from "@/actions/actions";
import AddNewEpictButton from "@/components/Buttons/NewEpic";
import EpicCard from "@/components/EpicCard/EpicCard";
import NavProject from "@/components/nav/nav";

export default async function ProjectEpicsPage({ params }: { params: { projectId: string } }) {

   const resolvedParams = await params;
     const { projectId } = resolvedParams;

        let epics: any[] = [];
      let totalCount = 0;


 try {
    const response = await fetchEpicsProject(projectId, 1, 5);
    console.log(response, "epics");
 
    if (response) {
      epics = Array.isArray(response) ? response : (response.data || []);
      totalCount = epics.length;
    }
  } catch (error: any) {
    console.error("Error in Epics Page:", error);
  }

  return (
   <div>
     <NavProject/>

     <div className=" px-8 mb-3 flex justify-between ">
       
         <div>
           <h1 className="text-2xl font-bold text-blue-900">Project Epics</h1>

         </div>
           <div className='flex justify-around'>
            <AddNewEpictButton projectId={projectId}/>
           </div>
      </div>
        <div className=" max-w-5xl mx-auto">
    
      <div className="text-sm text-gray-550 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 text-end my-4">
          Total Epics: <span className="font-semibold text-blue-900">{totalCount}</span>
        </div>
      <EpicCard epics={epics} projectId={projectId} />
    </div>
    </div>
  );
}