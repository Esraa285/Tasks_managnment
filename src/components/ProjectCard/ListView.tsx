"use client";

import { fetchProjectTaskListView } from '@/actions/actions';
import { ProjectTask } from '@/Interfaces/AuthInterfaces';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ListChevronsUpDownIcon } from 'lucide-react';
import ListViewTaskCard from './ListViewCard';

export default function ListView({ projectId}: {projectId:string }) {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    if (!projectId) return;

    const loadStatusTasks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProjectTaskListView(projectId);
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error( error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStatusTasks();
  }, [projectId]);

  return (
   <div>
    <ListViewTaskCard tasks={tasks}/>
   </div>
  );
}