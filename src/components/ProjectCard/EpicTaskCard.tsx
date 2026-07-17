'use client'

import { ProjectTask } from '@/Interfaces/AuthInterfaces'
import React, { useState } from 'react'
import TaskDetailsCard from './TaskDetailsCard';

export default function EpicTaskCard({tasks}:{tasks: ProjectTask[]}) {

  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(false);

  const handleOpenTaskDetails = (task: ProjectTask) => {
    setSelectedTask(task); //
    setIsModalOpen(true);
  };

const formatDate = (dateString: string | null) => { 
    if (!dateString) return "No due date";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return ""; 
      
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return "";
    }
  };

  return (
   <div>
      <div className="flex justify-center w-full px-4">
        <div className="w-full max-w-4xl rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden mt-6">
          
          <div className="divide-y divide-gray-100">
            {Array.isArray(tasks) && tasks.map((task: ProjectTask) => (
              <div onClick={() => handleOpenTaskDetails(task)}
                key={task.id || task.task_id} 
                className="flex flex-col gap-4 p-6 md:grid md:grid-cols-3  cursor-pointer md:items-center md:px-6 md:py-4 hover:bg-gray-50/50 transition-colors"
              >
               
                <div className="md:col-span-2 flex flex-col gap-2">
                 
                  <h4 className="text-[#0F2942] font-semibold text-[15px] sm:text-base tracking-tight">
                    {task.title}
                  </h4>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 text-[10px] uppercase">
                      {task.assignee?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "U"}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {task.assignee?.name || "Unassigned"}
                    </span>
                  </div>
                </div>

                <div className="md:text-right shrink-0">
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider block uppercase mb-0.5">
                    DUE DATE
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    {formatDate(task.due_date)}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>


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
  