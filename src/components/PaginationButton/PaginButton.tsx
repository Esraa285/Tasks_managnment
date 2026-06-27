'use client'

import { fetchProjects } from '@/actions/actions';
import React from 'react'
import { useState, useEffect } from "react";

export default function PaginButton() {
    
  const [projects, setProjects] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 10; 
  const totalPages = Math.ceil(totalCount / limit); 

  useEffect(() => {
  let isMounted = true;

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProjects(currentPage, limit); 

      if (isMounted && response) {
        // التأكد من قراءة البيانات سواء جاءت مصفوفة مباشرة أو كائن
        const fetchedData = Array.isArray(response) ? response : response.data;
        const count = response.totalCount || fetchedData?.length || 0;

        setProjects(fetchedData || []);
        setTotalCount(count);
      }
    } catch (err: any) {
      if (isMounted) {
        setError(err.message || "Failed to load projects");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  loadData();

  return () => {
    isMounted = false;
  };
}, [currentPage]);

  return(
   <div className="flex items-center justify-between mt-8 border-t border-gray-300 pt-4 w-full mb-20 px-3">
  
  <div className="text-sm text-gray-500">
    Showing <span className="font-medium text-gray-800">{projects.length}</span> of{" "}
    <span className="font-medium text-gray-800">{totalCount}</span> active projects
  </div>


  <div className="flex items-center gap-1.5">
    

    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1 || loading}
      className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <div className="flex gap-1.5">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={loading}
          className={`w-9 h-9 flex items-center justify-center text-sm rounded transition-all ${
            currentPage === page
              ? "bg-[#003D9B] text-white font-semibold border border-[#003D9B]" // نفس درجة الكحلي/الأزرق في الـ SVG الأصلي عندك
              : "border border-gray-400 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}
    </div>

    {/* زر التالي > */}
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages || loading}
      className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

  </div>
</div>
  );
}
