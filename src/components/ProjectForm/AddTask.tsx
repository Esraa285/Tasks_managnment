"use client";

import React, { useEffect, useState } from 'react'
import AddTaskForm from './AddTaskForm'
import { useRouter, useSearchParams } from 'next/navigation';
import { AddTask, fetchEpicsProject, getProjectMembers } from '@/actions/actions';
import toast from 'react-hot-toast';
import { ProjectEpic } from '@/Interfaces/AuthInterfaces';


export default function AddTaskpage({projectId }:{projectId:string}) {

  const searchParams = useSearchParams();
  const initialEpicId = searchParams.get("epicId") || undefined;
const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [epics, setEpics] = useState([]);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const membersData = await getProjectMembers(projectId);
        const members = Array.isArray(membersData) 
            ? membersData 
            : (membersData?.data || membersData || []);
        const epicsData = await fetchEpicsProject(projectId,1,10);
        setMembers(members || []);
        setEpics(epicsData || []);
      } catch (error) {
        console.error("Failed to load form filters:", error);
      }
    };

    loadFormData();
  }, [projectId]);

 const onSubmit = async (validatedData: any) => {
  setIsLoading(true);


  try {
    const result = await AddTask(validatedData, projectId);
 
   console.log(result);

    if (result && result.success) {
      console.log(result);
      
      
      toast.success("Task created successfully!");
      
      router.push(`/project/${projectId}/tasks`);

    } else {
      toast.error(result?.error || "Failed to create task");
         console.log(result);
    }
  } catch (error: any) {
    console.log(error);
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    setIsLoading(false);
  }
};

  return (

    
    <div className=" w-[928] mx-auto mt-3 bg-white rounded-lg p-8 shadow-sm border border-slate-100">
      <AddTaskForm
        projectId={projectId}
        onSubmit={onSubmit}
        isLoading={isLoading}
        onCancel={() => router.back()}
        projectMembers={members}
        epics={epics}
        initialEpicId={initialEpicId}
      />
    </div>
  );
}
