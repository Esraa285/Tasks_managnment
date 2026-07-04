"use client";
import React from 'react';
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation';

export default function NavProject({ projectName }: { projectName?: string }) {
  const pathname = usePathname();
  const params = useParams();
  const projectId = params?.projectId as string;


  const isAddProjectPage = pathname === "/projects/addproject";
  const isProjectDashboard = pathname === `/project/${projectId}`;
  const isEditPage = pathname === `/project/${projectId}/edit`;
  const isEpicsPage = pathname === `/project/${projectId}/epics`;
   const isNewEpicsPage = pathname === `/project/${projectId}/epics/new`;
  const isTasksPage = pathname === `/project/${projectId}/tasks`;
  const isMembersPage = pathname === `/project/${projectId}/members`;

  return (
    <nav className="flex items-center space-x-2 text-xs font-bold tracking-wider my-4 p-3 bg-gray-50/40 rounded-xl select-none">
      
      <Link
        href="/projects"
        className={`uppercase transition-colors duration-250 ${
          pathname === "/projects" ? "text-[#0f52ba]" : "text-gray-450 hover:text-gray-650"
        }`}
      >
        Projects
      </Link>

      {isAddProjectPage && (
        <>
          <span className="text-gray-400 font-normal">›</span>
          <span className="text-[#0f52ba] uppercase">Add New Project</span>
        </>
      )}

      {projectId && (
        <>
          <span className="text-gray-400 font-normal">›</span>
          
          <Link
            href={`/project/${projectId}`}
            className={`uppercase transition-colors duration-250 ${
              isProjectDashboard ? "text-[#0f52ba]" : "text-gray-450 hover:text-gray-650"
            }`}
          >
            {projectName || "Project Title"}
          </Link>
        </>
      )}

      {isEditPage && (
        <>
          <span className="text-gray-400 font-normal">›</span>
          <span className="text-[#0f52ba] uppercase">Edit</span>
        </>
      )}

      {isEpicsPage && (
        <>
          <span className="text-gray-400 font-normal">›</span>
          <span className="text-[#0f52ba] uppercase">Epics</span>
        </>
      )}
     
       {isNewEpicsPage && (
        <>
         <span className="text-gray-400 font-normal">›</span>
          <span className="text-gray-400 uppercase">Epics</span>
          <span className="text-gray-400 font-normal">›</span>
          <span className="text-[#0f52ba] uppercase">NewEpic</span>
        </>
      )}

      {isTasksPage && (
        <>
          <span className="text-gray-400 font-normal">›</span>
          <span className="text-[#0f52ba] uppercase">Tasks</span>
        </>
      )}

      {isMembersPage && (
        <>
          <span className="text-gray-400 font-normal">›</span>
          <span className="text-[#0f52ba] uppercase">Members</span>
        </>
      )}

    </nav>
  );
}
