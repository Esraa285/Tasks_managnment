"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Nav() {
    const pathname = usePathname();

   return(
     <nav  className="flex items-center space-x-2 text-sm font-semibold tracking-wide my-4 p-3">
      
      <Link
       href="/projects"
                className={`text-sm font-bold uppercase transition-colors duration-200 ${
                    pathname === "/projects" 
                        ? "text-[#0f52ba]" 
                        : "text-gray-400 hover:text-gray-600"
                }`}
            >
        Projects
      </Link>

      <span className="text-gray-400 font-normal select-none">›</span>

      <Link 
        href="/projects/addproject" 
                className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
                    pathname === "/projects/addproject"
                        ? "text-[#0f52ba]"
                        : "text-gray-400 hover:text-gray-600"
                }`}
            >
        Add New Project
      </Link>

    </nav>
  
   )
}
