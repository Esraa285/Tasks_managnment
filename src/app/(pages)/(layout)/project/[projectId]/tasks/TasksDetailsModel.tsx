"use client"

import { displayTaskDetails } from '@/actions/actions';
import TaskDetailsCard from '@/components/ProjectCard/TaskDetailsCard';
import { ProjectTask } from '@/Interfaces/AuthInterfaces';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function TaksDetailsModel({task,onClose} :{task :ProjectTask ,onClose :() => void}) {

 const [isLoading, setIsLoading] = useState(true);


  if (isLoading) {
    return (
      <div className="py-8 text-center text-sm text-gray-400 animate-pulse">
        Loading Epic Tasks...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="py-10 text-center text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50/50 my-4">
        Task not found
      </div>
    );
  }

 
  return (
     <TaskDetailsCard task={task} onClose={onClose}/>
  )
}