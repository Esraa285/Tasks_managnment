"use client";

import { ProjectTask } from "@/Interfaces/AuthInterfaces";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import TaskDetailsCard from "./TaskDetailsCard";
import PaginTaskListViewButton from "../PaginationButton/PaginListTaskView";

export default function ListViewTaskCard({ tasks,totalCount, currentPage, limit,onPageChange }: { tasks: ProjectTask[],totalCount: number,
  limit: number,currentPage: number,onPageChange: (page: number) => void,loading: boolean; }) {

  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(false);

  const handleOpenTaskDetails = (task: ProjectTask) => {
    setSelectedTask(task); //
    setIsModalOpen(true);
  };

  const getStatusStyles = (status: string) => {
    switch (status.toUpperCase()) {
      case "IN_PROGRESS":
        return "bg-[#E3EBF9] text-[#4A72B7]";
      case "TO_DO":
        return "bg-[#EAECEF] text-[#6C757D]";
      case "DONE":
        return "bg-[#C6FAD6] text-[#008744]";
      case "BLOCKED":
        return "bg-[#FCE2E2] text-[#E53E3E]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No due date";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="w-ful mt-4  overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className=" text-black px-6 py-4 text-[11px] font-bold uppercase ">
              <th className=" ps-4">Task ID</th>
              <th className="px-6 py-4  tracking-wider w-[30%]">Title</th>
              <th className="px-6 py-4  tracking-wider w-[18%]">Status</th>
              <th className="px-6 py-4  tracking-wider w-[18%]">Due Date</th>
              <th className="px-6 py-4 tracking-wider w-[15%]">Assignee</th>
              <th className="px-6 py-4 w-[5%]"></th>
            </tr>
          </thead>
          <tbody className=" bg-white rounded-lg border cursor-pointer border-slate-100 shadow-sm">
            {tasks.map((task) => (
              <tr
                onClick={() => handleOpenTaskDetails(task)}
                key={task.id}
                className="hover:bg-slate-50/50 transition-colors border-b border-gray-100"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/tasks/${task.task_id}`}
                    className="text-sm font-semibold text-[#3B82F6] hover:underline"
                  >
                    {task.task_id}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-[#1E293B] block truncate max-w-100">
                    {task.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${getStatusStyles(task.status)}`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500 font-medium">
                    {formatDate(task.due_date)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-[11px] shrink-0">
                      {task.assignee?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || "Un"}
                    </div>
                    <span className="text-sm text-slate-700 font-medium truncate">
                      {task.assignee?.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
             <tr>
  
    <td colSpan={6} className="p-0">
      <PaginTaskListViewButton totalCount={totalCount} 
                  limit={limit} 
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  loading={isLoadingTask}/>
    </td>
  </tr>
          </tfoot>
          
        </table>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 text-sm text-slate-500"></div>

      {selectedTask && (
        <TaskDetailsCard
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
            setIsLoadingTask(false);
          }}
        />
      )}
    </div>
  );
}
