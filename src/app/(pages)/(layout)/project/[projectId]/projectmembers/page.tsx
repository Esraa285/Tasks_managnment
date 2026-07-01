import { getProjectMembers } from "@/actions/actions";
import NavProject from "@/components/nav/nav";
import ProjectTitle from "@/components/ProjectTitle/Project-Title";
import React from "react";

export default async function projectmember({
  params,
}: {
  params: { projectId: string };
}) {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;

  const response = await getProjectMembers(projectId);
 
  const members = Array.isArray(response) 
    ? response 
    : (response?.data || response || []);

  return (
   <div className="p-4">
      <div>
        <NavProject />
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-slate-900 mt-4">Project Members</h1>
          <ProjectTitle />
        </div>
      </div>

      <div className="flex justify-center w-full px-4">
        <div className=" w-full max-w-4xl rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden mt-6">
       
        <div className="hidden md:grid grid-cols-3 bg-[#E0E8FF4D] px-8 py-5 border-b border-gray-100 text-xs font-semibold tracking-wider text-gray-500 uppercase">
          <div>Member</div>
          <div className="text-center">Role</div>
          <div className="text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-100">
          {Array.isArray(members) && members.map((member:any) => (
            <div key={member.member_id} className="flex flex-col gap-4 p-6 md:grid md:grid-cols-3 md:items-center md:px-6 md:py-4 hover:bg-gray-50/50 transition-colors">
              
             
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700 text-sm uppercase">
                  {member.metadata?.name.substring(0, 2) }
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{member.metadata?.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
              </div>

       
              <div className="text-center">
                <span className="text-xs text-gray-400 block md:hidden mb-1 ">Role:</span>
                <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider">
                  {member.role}
                </span>
              </div>

              <div className="text-left md:text-right text-gray-400">
                <span className="text-xs text-gray-400 block md:hidden mb-1">Actions:</span>
                <button className="p-1 rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
