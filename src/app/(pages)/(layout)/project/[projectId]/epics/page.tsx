import { fetchEpicsProject } from '@/actions/actions';
import NavProject from '@/components/nav/nav';
import React from 'react'


export default async function ProjectEpicsPage({ params }: { params: { projectId: string } }) {

    const resolvedParams = await params;
     const { projectId } = resolvedParams;

 let epics: any[] = [];
  let totalCount = 0;
  let errorMessage = null;

  try {
    const response = await fetchEpicsProject(projectId, 1, 5);
    
  
    if (response) {
      epics = Array.isArray(response) ? response : (response.data || []);
      totalCount = epics.length;
    }
  } catch (error: any) {
    console.error("Error in Epics Page:", error);
    errorMessage = error.message || "Failed to load epics. Please try again.";
  }

  return (
   <div>
     <NavProject/>
     <div className="p-6 max-w-5xl mx-auto">
       
      <div className="mb-6 flex justify-between items-center">
        
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Project Epics</h1>
          {/* <p className="text-gray-500 text-sm mt-1">
            Showing epics for project ID: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs text-blue-600 font-semibold">{projectId}</span>
          </p> */}
        </div>
        
        <div className="text-sm text-gray-550 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
          Total Epics: <span className="font-semibold text-blue-900">{totalCount}</span>
        </div>
      </div>

      {epics && epics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {epics.map((epic: any) => (
            <div key={epic.id} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-blue-900 text-lg mb-2">{epic.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {epic.description || "No description provided for this epic."}
              </p>
              {epic.created_at && (
                <div className="text-[10px] text-gray-400 mt-4 tracking-wider uppercase">
                  Created: {new Date(epic.created_at).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <p className="text-gray-400 text-sm">No epics found for this project yet.</p>
        </div>
      )}

    </div>
   </div>
  );
}