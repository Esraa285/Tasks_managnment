"use client";

import { fetchProjectTaskListViewpagination } from '@/actions/actions';
import { ProjectTask } from '@/Interfaces/AuthInterfaces';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ListChevronsUpDownIcon } from 'lucide-react';
import ListViewTaskCard from './ListViewCard';

export default function ListView({ projectId}: {projectId:string }) {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 10;
  

  useEffect(() => {
  if (!projectId) return;

  if (currentPage < 1) {
    setCurrentPage(1);
    return; 
  }

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProjectTaskListViewpagination(projectId, currentPage, limit);
      
      if (response) {
        setTasks(Array.isArray(response.data) ? response.data : []);
        setTotalCount(response.totalCount);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  loadTasks();
}, [projectId, currentPage]);

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(targetPage);};

  return (
   <div>
    <ListViewTaskCard tasks={tasks} totalCount={totalCount}
        limit={limit}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        loading={isLoading}/>
   </div>
  );
}