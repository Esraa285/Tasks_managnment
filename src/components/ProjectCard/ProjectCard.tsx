'use client'
import { ProjectCardInerface } from '@/Interfaces/AuthInterfaces';
import Link from 'next/link';
import React from 'react'
import { FiEdit3 } from 'react-icons/fi';

export default function ProjectCard({id, name, description, created_at }: ProjectCardInerface) {

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
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
  <Link href={`/project/${id}/epics`}>
   <div className=" mt-5 max-w-md w-90 bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[220px]">
      <div className="relative">
        <div>
          <h3 className="text-[#0f2d59] text-xl font-bold tracking-wide mb-3">
         {name}
        </h3>
        <p className="text-[#5c6f84] text-[15px] leading-relaxed font-normal">
        {description || "No description provided."}
        </p>
        </div>

        <Link 
            href={`/project/${id}/edit`}
            title="Edit Project"
            className=" absolute top-0 right-0 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 shrink-0"
          >
            <FiEdit3 className="w-4 h-4" />
          </Link>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-xs font-semibold tracking-wider">
        <span className="text-[#8a99ad] uppercase">
          Created At
        </span>
        <span className="text-[#4a5568] text-sm font-medium">
          {formatDate(created_at)}
        </span>
      </div>

    </div>
  </Link>
  );
}
