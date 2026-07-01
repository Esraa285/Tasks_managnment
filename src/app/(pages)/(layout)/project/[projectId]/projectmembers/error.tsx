'use client';
import MemberError from '@/components/Buttons/memberError';
import React, { useEffect } from 'react';


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-100">
      
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 mb-5">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.582 10.582a4.5 4.5 0 006.364 6.364m-1.386-4.52a4.5 4.5 0 00-4.978-3.053m3.362-3.362A9 9 0 004.24 16.5M12 3v1.5m0 15V21M3 12h1.5m15 0H21" />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-sm text-slate-500 max-w-sm leading-relaxed mb-6">
        Failed to load project members. Please try again.
      </p>
   
     <MemberError onRetry={reset}/>

    </div>
  );
}