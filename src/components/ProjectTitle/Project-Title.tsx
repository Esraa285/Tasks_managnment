'use client'
import React from 'react'

export default function ProjectTitle() {
  return (
    <div className=" flex justify-between">
                   
                   <h1 className="text-3xl font-bold text-slate-900 mt-4">Add New Project</h1>
                    <div className="">
              
               <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/10 transition-all">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                   <circle cx="8" cy="7" r="4" />
                   <line x1="20" y1="8" x2="20" y2="14" />
                   <line x1="23" y1="11" x2="17" y2="11" />
                 </svg>
                 Invite Member
               </button>
             </div>
                 </div>
  )
}
