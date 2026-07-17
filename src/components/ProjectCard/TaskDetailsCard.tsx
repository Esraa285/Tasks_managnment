import { ProjectTask } from '@/Interfaces/AuthInterfaces';
import { Calendar, ChevronDown, Clock, Link2, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { AddIconEpic } from '../icons/icon';

export default function TaskDetailsCard({task,isOpen, onClose} :{task: ProjectTask ,isOpen?: boolean,onClose: ()=>void }) {

const getStatusBadgeStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
      case "DONE":
        return "bg-[#C1FAD4] text-[#008744]";
      case "IN_PROGRESS":
        return "bg-[#E3EBF9] text-[#4A72B7]";
      case "TO_DO":
        return "bg-[#EAECEF] text-[#6C757D]";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };
  const formatDate = (dateString: string) => {
    if (!dateString) return "No Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

   if (!task) {
    return (
      <div className=" fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
          <p className="text-red-500 font-semibold mb-3">
            Failed to load task details.
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
   <div 
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in"
      onClick={onClose} >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#F4F7FE] md:bg-white rounded-lg shadow-2xl border border-slate-100/80 overflow-hidden h-[95vh] md:h-auto max-h-[95vh] grid grid-cols-1 md:grid-cols-[1fr_350px]">
      <div className="p-6 md:p-8 grid grid-rows-[auto_1fr_auto] overflow-y-auto">
 
        <div className="grid gap-5 mb-6">
  
          <div className="w-12 h-1 bg-slate-300 rounded-full justify-self-center md:hidden" />

          <div className="grid grid-cols-[1fr_auto] items-center">
           <div className='flex  gap-1'>
             <span className="text-xs px-2 py-1 text-center font-bold bg-blue-200 text-blue-950 tracking-wider">
              {task.task_id}
            </span>
            <div className=' flex items-center'>
              <AddIconEpic/>
             <span className="text-xs p-0.5 font-bold  text-blue-950 tracking-wider">
              {task.epic?.epic_id}
            </span>
             </div>
           </div>
          </div>
        </div>
        <div className="grid content-start gap-5">
       
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] leading-tight">
            {task.title}
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-3 md:hidden">
          
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl grid gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assignee</span>
              <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 grid items-center justify-center font-extrabold text-[9px]">
                  {task.assignee?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "Un"}
                </div>
                <span className="text-xs font-bold text-[#1E293B] truncate">{task.assignee?.name}</span>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl grid gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Due Date</span>
              <div className="grid grid-cols-[auto_1fr] items-center gap-2 text-[#1E293B]">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold">{formatDate(task.due_date || "No date")}</span>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl grid gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created By</span>
              <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 grid items-center justify-center font-extrabold text-[9px]">
                {task.reporter?.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "Unassigned"}
                </div>
                <span className="text-xs font-bold text-[#1E293B] truncate">{task.reporter?.name}</span>
              </div>
            </div>

              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl grid gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created At</span>
              <div className="grid grid-cols-[auto_1fr] items-center gap-2 text-[#1E293B]">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold">{formatDate(task.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Description
            </h4>
            <div className="bg-white md:bg-transparent p-5 md:p-0 rounded-2xl text-[14px] text-slate-600 leading-relaxed font-normal whitespace-pre-wrap shadow-sm md:shadow-none">
              {task.description || "No description provided for this task."}
            </div>
          </div>
        </div>

        <div className="hidden md:grid  items-center pt-6 mt-8 border-t border-slate-100">
         <div className='flex justify-between'>
          <button 
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="grid grid-cols-[auto_auto] items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Link2 className="w-4 h-4" />
            <span>Copy link</span>
          </button>

           <button 
              onClick={onClose} 
              className="text-blue-950 bg-blue-200 hover:text-slate-800 px-2  hover:bg-blue-700/55 justify-self-end transition-colors">
             close
            </button>
         </div>
        </div>

      </div>

      <div className="hidden md:grid bg-[#F4F7FE] border-l border-slate-100 p-8 content-start gap-8 overflow-y-auto">
        
        <div className="grid gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
          <div className={`grid grid-cols-[1fr_auto] items-center px-4 py-3 rounded-xl font-bold text-xs tracking-wide cursor-pointer ${getStatusBadgeStyle(task.status)}`}>
            <span>{task.status?.replace(/_/g, " ")}</span>
            <ChevronDown className="w-4 h-4 opacity-70 justify-self-end" />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assignee</label>
          {task.assignee ? (
            <div className="grid grid-cols-[auto_1fr] items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 grid items-center justify-center font-extrabold text-xs">
                {task.assignee?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "Un"}
              </div>
              <div className="grid content-center min-w-0">
                <div className="text-xs font-bold text-[#0F172A] truncate">{task.assignee.name}</div>
                <div className="text-[10px] text-slate-400 font-medium truncate">{task.assignee?.role || "Team Member"}</div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-medium p-3">Un</div>
          )}
        </div>


        <div className="grid gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reporter</label>
          {task.reporter ? (
            <div className="grid grid-cols-[auto_1fr] items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 grid items-center justify-center font-bold text-[11px]">
                {task.reporter?.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "Unassigned"}
              </div>
              <span className="text-xs font-bold text-[#1E293B]">{task.reporter.name}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">None</span>
          )}
        </div>

        <hr className="border-slate-200/60 my-1" />
        <div className="grid gap-4">
          <div className="grid grid-cols-[1fr_auto] items-center text-xs">
            <span className="font-semibold text-slate-400">Due Date</span>
            <span className="font-bold text-[#1E293B] justify-self-end">{formatDate(task.due_date || "No date")}</span>
          </div>
          
          <div className="grid grid-cols-[1fr_auto] items-center text-xs">
            <span className="font-semibold text-slate-400">Created At</span>
            <span className="font-bold text-[#1E293B] justify-self-end">{formatDate(task.created_at)}</span>
          </div>
        </div>

      </div>

    </div>
    </div>
  );
}
