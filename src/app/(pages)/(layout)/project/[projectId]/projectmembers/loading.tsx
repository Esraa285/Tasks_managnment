import React from 'react';

export default function Loading() {
  const skeletonRows = Array(5).fill(0);

  return (
    <div className="w-full rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden p-6 animate-pulse">
      
      <div className="grid grid-cols-3 pb-4 border-b border-gray-100 mb-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16 justify-self-end"></div>
      </div>

     
      <div className="space-y-6">
        {skeletonRows.map((_, index) => (
          <div key={index} className="grid grid-cols-3 items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
            
          
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-xl bg-gray-200 shrink-0"></div>
        
              
              <div className="space-y-2 w-full">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>

          
            <div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>

      
            <div className="justify-self-end">
              <div className="h-6 bg-gray-200 rounded w-4"></div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}