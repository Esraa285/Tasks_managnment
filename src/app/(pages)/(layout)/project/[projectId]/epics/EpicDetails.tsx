"use client";
import { useState, useEffect } from "react";
import { X, Calendar, ChevronDown, Plus } from "lucide-react";
import { getEpicDetails } from "@/actions/actions";
import Link from "next/link";
import { ProjectEpic, ProjectTask } from "@/Interfaces/AuthInterfaces";
import EpicTaskCard from "@/components/ProjectCard/EpicTaskCard";
import EpicTasksModel from "../tasks/TaskModel";

export default function EpicDetailsModal({
  projectId,
  epic,id,
  onClose,
  onAddTask,
  tasks,
  isLoading,
  isOpen
}: {
  projectId: string;
  epic: ProjectEpic;
  id: string;
   tasks:ProjectTask[];
   isLoading?: boolean; 
  isOpen?: boolean;
  onClose: () => void;
  onAddTask?: (projectId: string, epicId: string) => void;
}) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "No Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!epic) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
          <p className="text-red-500 font-semibold mb-3">
            Failed to load epic details.
          </p>
          <button
            onClick={onClose}
            className="bg-slate-200 px-4 py-1.5 rounded-xl font-medium text-xs"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    // <div className="fixed inset-0 bg-[#041B3C]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    //   <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto tracking-tight animate-in fade-in zoom-in-95 duration-200">
    //     <div className="flex justify-between items-center mb-5">
    //       <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
    //         <svg
    //           width="20"
    //           height="14"
    //           viewBox="0 0 20 14"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M0 10V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2C2.55 2 3.02083 2.19583 3.4125 2.5875C3.80417 2.97917 4 3.45 4 4V10C4 10.55 3.80417 11.0208 3.4125 11.4125C3.02083 11.8042 2.55 12 2 12C1.45 12 0.979167 11.8042 0.5875 11.4125C0.195833 11.0208 0 10.55 0 10ZM7 14C6.45 14 5.97917 13.8042 5.5875 13.4125C5.19583 13.0208 5 12.55 5 12V2C5 1.45 5.19583 0.979167 5.5875 0.5875C5.97917 0.195833 6.45 0 7 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V12C15 12.55 14.8042 13.0208 14.4125 13.4125C14.0208 13.8042 13.55 14 13 14H7ZM16 10V4C16 3.45 16.1958 2.97917 16.5875 2.5875C16.9792 2.19583 17.45 2 18 2C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V10C20 10.55 19.8042 11.0208 19.4125 11.4125C19.0208 11.8042 18.55 12 18 12C17.45 12 16.9792 11.8042 16.5875 11.4125C16.1958 11.0208 16 10.55 16 10Z"
    //             fill="#003D9B"
    //           />
    //         </svg>

    //         <span className="font-bold text-slate-400 tracking-wider">
    //           {epic.epic_id || "EPIC-N/A"}
    //         </span>
    //       </div>
    //       <button
    //         onClick={onClose}
    //         className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
    //       >
    //         <X className="w-5 h-5" />
    //       </button>
    //     </div>

    //     <div className="mb-5">
    //       <div className="w-full p-3.5 border border-[#E3EDF9] rounded-xl text-xl font-bold text-[#041B3C] bg-white shadow-sm/5">
    //         {epic.title || "Untitled Epic"}
    //       </div>
    //     </div>

    //     <div className="mb-6">
    //       <div className="w-full p-4 border border-[#E3EDF9] rounded-xl text-slate-600 text-sm leading-relaxed bg-white min-h-35">
    //         {epic.description ? (
    //           epic.description
    //         ) : (
    //           <span className="text-slate-400 italic">
    //             No description provided
    //           </span>
    //         )}
    //       </div>
    //     </div>

    //     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
    //       <div>
    //         <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
    //           Created By
    //         </span>
    //         <div className="flex items-center gap-2 py-1.5">
    //           <div className="w-7 h-7 bg-[#0A52C5] text-white rounded-full flex items-center justify-center text-xs font-bold uppercase shadow-sm">
    //             {epic.created_by?.name
    //               ?.split(" ")
    //               .map((n: string) => n[0])
    //               .join("")
    //               .slice(0, 2)
    //               .toUpperCase() || "UN"}
    //           </div>
    //           <span className="text-sm font-semibold text-[#041B3C]">
    //             {epic.created_by?.name || "Unknown"}
    //           </span>
    //         </div>
    //       </div>

    //       <div>
    //         <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
    //           Assignee
    //         </span>
    //         <div className="flex items-center justify-between border border-[#E3EDF9] rounded-xl px-3 py-1.5 bg-white shadow-sm/5 cursor-pointer hover:border-slate-300 transition-colors">
    //           <div className="flex items-center gap-2">
    //             <div className="w-6 h-6 bg-[#DCE7FC] text-[#0A52C5] rounded-full flex items-center justify-center text-[10px] font-bold uppercase">
    //               {epic.assignee?.name
    //                 ?.split(" ")
    //                 .map((n: string) => n[0])
    //                 .join("")
    //                 .slice(0, 2)
    //                 .toUpperCase() || "UN"}
    //             </div>
    //             <span className="text-sm font-semibold text-[#041B3C]">
    //               {epic.assignee?.name || "Unassigned"}
    //             </span>
    //           </div>
    //           <ChevronDown className="w-4 h-4 text-slate-400" />
    //         </div>
    //       </div>

    //       <div>
    //         <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
    //           Deadline
    //         </span>
    //         <div className="flex items-center justify-between border border-[#E3EDF9] rounded-xl px-3 py-1.5 bg-white shadow-sm/5 cursor-pointer hover:border-slate-300 transition-colors">
    //           <div className="flex items-center gap-2 text-slate-600">
    //             <Calendar className="w-4 h-4 text-slate-400" />
    //             <span className="text-sm font-semibold text-[#041B3C]">
    //               {formatDate(epic.deadline)}
    //             </span>
    //           </div>
    //           <ChevronDown className="w-4 h-4 text-slate-400" />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="mb-6">
    //       <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
    //         Created At
    //       </span>
    //       <div className="flex items-center gap-2 text-sm font-semibold text-[#041B3C] py-1">
    //         <Calendar className="w-4 h-4 text-slate-400" />
    //         <span>{formatDate(epic.created_at)}</span>
    //       </div>
    //     </div>

    //     <div className="border-t border-slate-100 pt-5">
    //       <div className="flex justify-between items-center mb-4">
    //         <h4 className="font-bold text-[#041B3C] text-base">Tasks</h4>
    //         <Link href={`/project/${projectId}/tasks/new`}>
    //           <button
    //             onClick={() => onAddTask?.(projectId, epic.id)}
    //             className="text-sm font-semibold text-[#0A52C5] flex items-center gap-1 hover:text-blue-800 transition-colors"
    //           >
    //             <Plus className="w-4 h-4" /> Add Task
    //           </button>
    //         </Link>
    //       </div>

    //       <div className="border border-dashed border-[#CCDDF7] bg-[#F2F6FC] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
    //         <div className="w-10 h-10 bg-[#E3EDF9] text-[#0A52C5] rounded-xl flex items-center justify-center mb-3 shadow-inner/5">
    //           <svg
    //             width="20"
    //             height="20"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="currentColor"
    //             strokeWidth="2"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           >
    //             <line x1="8" y1="6" x2="21" y2="6"></line>
    //             <line x1="8" y1="12" x2="21" y2="12"></line>
    //             <line x1="8" y1="18" x2="21" y2="18"></line>
    //             <line x1="3" y1="6" x2="3.01" y2="6"></line>
    //             <line x1="3" y1="12" x2="3.01" y2="12"></line>
    //             <line x1="3" y1="18" x2="3.01" y2="18"></line>
    //           </svg>
    //         </div>

    //         <p className="text-sm text-[#041B3C] font-semibold mb-4">
    //           No tasks have been added to this epic yet
    //         </p>

    //         <Link href={`/project/${projectId}/tasks/new`}>
    //           <button
    //             onClick={() => onAddTask?.(projectId, epic.id)}
    //             className="bg-[#0A52C5] hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
    //           >
    //             <Plus className="w-3.5 h-3.5" /> Add Task
    //           </button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="fixed inset-0 bg-[#041B3C]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto tracking-tight animate-in fade-in zoom-in-95 duration-200">
    

    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2C2.55 2 3.02083 2.19583 3.4125 2.5875C3.80417 2.97917 4 3.45 4 4V10C4 10.55 3.80417 11.0208 3.4125 11.4125C3.02083 11.8042 2.55 12 2 12C1.45 12 0.979167 11.8042 0.5875 11.4125C0.195833 11.0208 0 10.55 0 10ZM7 14C6.45 14 5.97917 13.8042 5.5875 13.4125C5.19583 13.0208 5 12.55 5 12V2C5 1.45 5.19583 0.979167 5.5875 0.5875C5.97917 0.195833 6.45 0 7 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V12C15 12.55 14.8042 13.0208 14.4125 13.4125C14.0208 13.8042 13.55 14 13 14H7ZM16 10V4C16 3.45 16.1958 2.97917 16.5875 2.5875C16.9792 2.19583 17.45 2 18 2C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V10C20 10.55 19.8042 11.0208 19.4125 11.4125C19.0208 11.8042 18.55 12 18 12C17.45 12 16.9792 11.8042 16.5875 11.4125C16.1958 11.0208 16 10.55 16 10Z" fill="#003D9B" />
        </svg>
        <span className="font-bold text-slate-400 tracking-wider">
          {epic.epic_id || "EPIC-N/A"}
        </span>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50">
        <X className="w-5 h-5" />
      </button>
    </div>


    <div className="mb-5">
      <div className="w-full p-3.5 border border-[#E3EDF9] rounded-xl text-xl font-bold text-[#041B3C] bg-white shadow-sm/5">
        {epic.title || "Untitled Epic"}
      </div>
    </div>

    <div className="mb-6">
      <div className="w-full p-4 border border-[#E3EDF9] rounded-xl text-slate-600 text-sm leading-relaxed bg-white min-h-35">
        {epic.description ? epic.description : <span className="text-slate-400 italic">No description provided</span>}
      </div>
    </div>

  
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      <div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">Created By</span>
        <div className="flex items-center gap-2 py-1.5">
          <div className="w-7 h-7 bg-[#0A52C5] text-white rounded-full flex items-center justify-center text-xs font-bold uppercase shadow-sm">
            {epic.created_by?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "UN"}
          </div>
          <span className="text-sm font-semibold text-[#041B3C]">{epic.created_by?.name || "Unknown"}</span>
        </div>
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">Assignee</span>
        <div className="flex items-center justify-between border border-[#E3EDF9] rounded-xl px-3 py-1.5 bg-white shadow-sm/5 cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#DCE7FC] text-[#0A52C5] rounded-full flex items-center justify-center text-[10px] font-bold uppercase">
              {epic.assignee?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "UN"}
            </div>
            <span className="text-sm font-semibold text-[#041B3C]">{epic.assignee?.name || "Unassigned"}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">Deadline</span>
        <div className="flex items-center justify-between border border-[#E3EDF9] rounded-xl px-3 py-1.5 bg-white shadow-sm/5 cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-[#041B3C]">{formatDate(epic.deadline)}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>

 
    <div className="mb-6">
      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">Created At</span>
      <div className="flex items-center gap-2 text-sm font-semibold text-[#041B3C] py-1">
        <Calendar className="w-4 h-4 text-slate-400" />
        <span>{formatDate(epic.created_at)}</span>
      </div>
    </div>

    <div className="border-t border-slate-100 pt-5">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-[#041B3C] text-base">Tasks</h4>
        <Link href={`/project/${projectId}/tasks/new?epicId=${epic.id}`}>
          <button onClick={() => onAddTask?.(projectId, epic.id)} className="text-sm font-semibold text-[#0A52C5] flex items-center gap-1 hover:text-blue-800 transition-colors">
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </Link>
      </div>

      {isLoading ? (
  
        <div className="py-8 text-center text-xs text-gray-400 animate-pulse">
          Loading tasks...
        </div>
      ) : Array.isArray(tasks) && tasks.length > 0 ? (
       
        <EpicTasksModel id={id} />
      ) : (
   
        <div className="border border-dashed border-[#CCDDF7] bg-[#F2F6FC] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 bg-[#E3EDF9] text-[#0A52C5] rounded-xl flex items-center justify-center mb-3 shadow-inner/5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </div>

          <p className="text-sm text-[#041B3C] font-semibold mb-4">
            No tasks have been added to this epic yet
          </p>

          <Link href={`/project/${projectId}/tasks/new?epicId=${epic.id}`}>
            <button onClick={() => onAddTask?.(projectId, epic.id)} className="bg-[#0A52C5] hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Add Task
            </button>
          </Link>
        </div>
      )}

    </div>
  </div>
</div>
  );
}
