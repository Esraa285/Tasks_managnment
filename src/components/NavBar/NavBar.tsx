"use client";
import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <div className="flex  bg-slate-50 font-sans antialiased overflow-hidden">
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-8 z-10">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">Mahmoud Taha</p>
              <p className="text-xs text-gray-400 font-medium">PROJECT MANAGER</p>
            </div>
           
            <div className="h-10 w-10 bg-blue-800 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">
              MT
            </div>
          </div>
        </header>
       
      </div>

    </div>
  );
}
