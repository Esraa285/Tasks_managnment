"use client";

import { fetchProjectTaskByStatus } from '@/actions/actions';
import { ProjectTask } from '@/Interfaces/AuthInterfaces';
import React, { useState, useEffect } from 'react';
import BoardCard from './BoardCard';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TasksDetailsModel from '@/app/(pages)/(layout)/project/[projectId]/tasks/TasksDetailsModel';

export default function BoardView({ projectId, status, onAddTaskClick }: {projectId:string ,status:string,  onAddTaskClick?: (status: string) => void}) {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const currentTaskId = searchParams.get('task_id');
  const currentProjectId = searchParams.get('projectId');

 
  const handleOpenTaskDetails = (taskId: string, projectId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('projectId', projectId);
    params.set('task_id', taskId);

    router.push(`${pathname}?${params.toString()}`);
  };

  
  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('task_id');
    router.push(`${pathname}?${params.toString()}`);
  };


  const selectedTask = tasks.find(t => t.task_id === currentTaskId);

  useEffect(() => {
    if (!projectId || !status) return;

    const loadStatusTasks = async () => {
      setIsLoading(true);
      try {
       const apiStatus = status.replace(/\s+/g, '_');
        const data = await fetchProjectTaskByStatus(projectId, apiStatus);
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(`Failed to load tasks for ${status}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStatusTasks();
  }, [projectId, status]);

  return (
    <div className="flex flex-col w-72 bg-slate-50/70 p-4 rounded-2xl min-h-125 shrink-0 ">
  
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span className="font-semibold text-xs text-slate-600 uppercase tracking-wider">
            {status.replace(/_/g, ' ')}
          </span>
          <span className="bg-slate-200/60 text-slate-700 text-xs px-2 py-0.5 rounded-full font-bold">
            {tasks.length}
          </span>
        </div>

        <Link href={`/project/${projectId}/tasks/new?status=${encodeURIComponent(status)}`}>
        <button 
          onClick={() => onAddTaskClick?.(status)}
          className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
        >
          +
        </button>
        </Link>
    
      </div>


     <Link href={`/project/${projectId}/tasks/new?status=${encodeURIComponent(status)}`}>
      <button 
        onClick={() => onAddTaskClick?.(status)}
        className="border-2 border-dashed w-full border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-500 rounded-xl py-3 flex items-center 
        justify-center gap-2 text-xs font-semibold mb-4 transition-colors cursor-pointer">
        <span>➕</span> ADD NEW TASK
      </button>
     </Link>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-150 pr-1">
        {isLoading && (
          <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
            Loading tasks...
          </div>
        )}

        {!isLoading && tasks.length === 0 && (
          <div className="py-10 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            No tasks in this status.
          </div>
        )}

        {!isLoading &&
          tasks.map((task) => <BoardCard key={task.id} projectId={task.project_id} task={task} onCardClick={handleOpenTaskDetails}/>)}
      </div>

 {currentTaskId && selectedTask && (
        <TasksDetailsModel        
          task={selectedTask} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}