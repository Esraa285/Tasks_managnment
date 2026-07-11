'use client'

import { ProjectTask } from "@/Interfaces/AuthInterfaces";
import { MoreHorizontal } from "lucide-react";


export default function TaskCard({ id,task_id,title,status,due_date,assignee }: ProjectTask) {
 
  const getStatusStyles = (status: string) => {
    switch (status.toUpperCase()) {
      case 'IN PROGRESS': return 'bg-[#E3EBF9] text-[#4A72B7]';
      case 'TO DO': return 'bg-[#EAECEF] text-[#6C757D]';
      case 'COMPLETED': return 'bg-[#C6FAD6] text-[#008744]';
      case 'URGENT': return 'bg-[#FCE2E2] text-[#E53E3E]';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50/60 transition-colors border-b border-gray-50 bg-white">
      
      <div className="col-span-2 md:col-span-2">
        <span className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">
          {task_id}
        </span>
      </div>

      <div className="col-span-4 md:col-span-4 pr-4">
        <p className="text-sm font-semibold text-[#041B3C] leading-snug line-clamp-2">
          {title}
        </p>
      </div>

      <div className="col-span-2 md:col-span-2">
        <span className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wide uppercase ${getStatusStyles(status)}`}>
          {status}
        </span>
      </div>

      <div className="col-span-2 md:col-span-2 text-sm text-slate-500">
        {due_date}
      </div>

      <div className="col-span-2 md:col-span-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] tracking-tighter ${assignee?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "U" }`}>
            {assignee?.id}
          </div>
          <span className="text-sm font-medium text-slate-700 hidden sm:inline">
            {assignee?.name}
          </span>
        </div>

       
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

