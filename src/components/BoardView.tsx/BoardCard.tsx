'use client';
import { displayTaskDetails } from '@/actions/actions';
import TasksDetailsModel from '@/app/(pages)/(layout)/project/[projectId]/tasks/TasksDetailsModel';
import { ProjectTask } from '@/Interfaces/AuthInterfaces';
import React, { useState } from 'react'
import TaskDetailsCard from '../ProjectCard/TaskDetailsCard';

export default function BoardCard({task , projectId,onCardClick}:{task:ProjectTask, projectId:string,onCardClick: (taskId: string, projectId: string) => void}) {

   const [selectedTask , setSelectedTask] = useState<ProjectTask | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingTask, setIsLoadingTask] = useState(false);
  
  
    const handleOpenTaskDetails = async (task: ProjectTask) => {
      setSelectedTask(task);
      setIsModalOpen(true); 
      setIsLoadingTask(true);
  
      try {
       
        const data = await displayTaskDetails(task.task_id , projectId);
       setSelectedTask(data);
       setIsLoadingTask(false);
      } catch (error) {
        console.error("Failed to load task ", error);
      } finally {
        setIsLoadingTask(false);
      }
    };
  


const getDateStatus = (dateString?: string) => {
    if (!dateString) return { type: 'none', label: '' };

    const dueDate = new Date(dateString);
    const today = new Date();

    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (dueDate.getTime() === today.getTime()) {
      return { type: 'today', label: 'TODAY' };
    } else if (dueDate.getTime() < today.getTime() && task.status !== 'DONE') {
      
      return { type: 'delayed', label: 'DELAYED' };
    } else {
     
      const formattedDate = dueDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }).toUpperCase();
      return { type: 'future', label: formattedDate };
    }
  };

  const dateStatus = getDateStatus(task.due_date || undefined);

  
  let cardBorderClass = "border border-slate-100 bg-white"; 
 
if (dateStatus.type === 'today') {
  cardBorderClass = "border-l  border-l-4 border-l-[#0052cc] bg-white"; 
} else if (dateStatus.type === 'delayed') {
  cardBorderClass = "border border-[#FFDAD633] bg-[#FFDAD633]"; 
}


  return (
    <div onClick={() => handleOpenTaskDetails(task)}
    className={` p-4 gap-3 rounded-xl shadow-sm  flex flex-col cursor-pointer  hover:shadow-md transition-shadow overflow-hidden ${cardBorderClass} `}>
      <h3 className="text-gray-800 font-semibold mb-1 ">
        {task.title}
      </h3>
      <div className="flex justify-between items-center text-xs">
        
        {dateStatus.type !== 'none' && (
          <div className="flex items-center gap-2 font-bold tracking-wide">
            {dateStatus.type === 'today' && (
              <div className='flex gap-1'>
               <div>
                 <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
               </div>
                <span className="text-blue-600">{dateStatus.label}</span>
              </div>
            )}

            {dateStatus.type === 'delayed' && (
              <div className='flex justify-between gap-1 '>
               <div>
                 <svg className="w-4 h-4 text-red-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
               </div>
                <span className="text-red-600">{dateStatus.label}</span>
              </div>
            )}

            {dateStatus.type === 'future' && (
              <div className='flex gap-1'>
                <div>
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                </div>
                <span className="text-slate-400 font-semibold">{dateStatus.label}</span>
              </div>
            )}
          </div>
        )}
       <div className="flex items-center">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold
            ${dateStatus.type === 'today' ? 'bg-blue-600 text-white' : 'bg-slate-300 text-black'}`}>
           {task.assignee?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "Un"}
          </span>
        </div>

      </div>
        {selectedTask && (
              <TaskDetailsCard
                task={task}
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