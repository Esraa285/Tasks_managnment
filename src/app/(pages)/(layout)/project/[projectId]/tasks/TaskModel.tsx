"use client";

import React, { useEffect, useState } from "react";
import { displayTasksInsideEpic } from "@/actions/actions"; 
import { ProjectEpic, ProjectTask } from "@/Interfaces/AuthInterfaces";
import EpicTaskCard from "@/components/ProjectCard/EpicTaskCard";


export default function EpicTasksModel({ id }: { id: string } ) {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadEpicTasks = async () => {
      setIsLoading(true);
      try {
        const data = await displayTasksInsideEpic(id);
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEpicTasks();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-8 text-center text-sm text-gray-400 animate-pulse">
        Loading Epic Tasks...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50/50 my-4">
        No tasks assigned to this epic yet.
      </div>
    );
  }

 
  return (
     <EpicTaskCard tasks={tasks} />
  )
}