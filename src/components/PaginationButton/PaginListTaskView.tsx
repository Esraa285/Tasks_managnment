"use client";

import { fetchProjectTaskListViewpagination } from "@/actions/actions";
import { ProjectTask } from "@/Interfaces/AuthInterfaces";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";

export default function PaginTaskListViewButton({
  totalCount,
  limit,
  currentPage,
  onPageChange,
  loading,
}: {
  totalCount: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}) {
  const totalPages = Math.ceil(totalCount / limit);

  const currentShowing =
    Math.min(currentPage * limit, totalCount) - (currentPage - 1) * limit;
  const showingCount = currentShowing > 0 ? currentShowing : 0;

  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-white w-full text-slate-500 font-medium text-sm select-none">
      <div>
        Showing{" "}
        <span className="text-slate-700 font-semibold">{showingCount}</span> of{" "}
        <span className="text-slate-700 font-semibold">{totalCount}</span> tasks
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1 }
          className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-slate-700">
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || loading}
          className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
