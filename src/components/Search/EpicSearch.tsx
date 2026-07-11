"use client"
import React, { useState } from 'react'
import { Search } from "lucide-react";

export default function EpicSearch({epics}:{epics: any[]}) {

  const [search, setSearch] = useState("");

const filteredEpics = epics?.filter((epic: any) =>
  epic.title?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
  
 <div className="relative w-64 mb-6 me-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search epics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#E2EAFF] text-gray-700 placeholder-gray-400 rounded-xl outline-none border border-transparent focus:border-blue-300 transition-all text-sm"
        />
      </div>

      {/* الـ Grid بعد فك الكومنت وتنظيف الدبلرة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEpics?.map((epic: any) => (
          <div 
            key={epic.id} 
            className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow border-s-4 border-s-[#004E32]"
          >
            {/* Epic ID Badge */}
            <span className="bg-[#82F9BE] text-[#004E32] px-3 py-1 rounded-md text-xs font-semibold">
              {epic.epic_id}
            </span>
            
            {/* Epic Title */}
            <h3 className="font-semibold text-[#041B3C] text-xl my-4">
              {epic.title}
            </h3>
            
            {/* Assignee Section */}
            <div className="flex mt-4 items-center">
              <div className="bg-[#65DCA4] text-black p-2 rounded-xl font-semibold w-10 h-10 flex items-center justify-center text-sm uppercase">
                {epic.assignee?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="ms-2">
                <p className="text-[#434654] text-[12px]">Assignee</p>
                <span className="font-semibold text-[14px]">{epic.assignee?.name || "Unassigned"}</span>
              </div>
            </div>

            {/* Bottom Actions Row: Created By & Date */}
            <div className="flex justify-between items-center pt-4 mt-6 border-t border-t-[#F1F3FF]">
              {epic.created_by && (
                <div className="flex text-[11px] text-gray-400 tracking-wider items-center">
                  <div className="me-1">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 9.33333V7.7C0 7.36944 0.0850694 7.06563 0.255208 6.78854C0.425347 6.51146 0.651389 6.3 0.933333 6.15417C1.53611 5.85278 2.14861 5.62674 2.77083 5.47604C3.39306 5.32535 4.025 5.25 4.66667 5.25C5.02639 5.25 5.38125 5.27188 5.73125 5.31563C6.08125 5.35938 6.43125 5.42986 6.78125 5.52708L5.80417 6.51875C5.60972 6.48958 5.42014 6.46528 5.23542 6.44583C5.05069 6.42639 4.86111 6.41667 4.66667 6.41667C4.12222 6.41667 3.58264 6.48229 3.04792 6.61354C2.51319 6.74479 1.98333 6.94167 1.45833 7.20417C1.37083 7.25278 1.30035 7.32083 1.24688 7.40833C1.1934 7.49583 1.16667 7.59306 1.16667 7.7V8.16667H4.66667V9.33333H0ZM5.83333 9.91667V8.12292L9.05625 4.91458C9.14375 4.82708 9.24097 4.76389 9.34792 4.725C9.45486 4.68611 9.56181 4.66667 9.66875 4.66667C9.78542 4.66667 9.89722 4.68854 10.0042 4.73229C10.1111 4.77604 10.2083 4.84167 10.2958 4.92917L10.8354 5.46875C10.9132 5.55625 10.974 5.65347 11.0177 5.76042C11.0615 5.86736 11.0833 5.97431 11.0833 6.08125C11.0833 6.18819 11.0639 6.29757 11.025 6.40938C10.9861 6.52118 10.9229 6.62083 10.8354 6.70833L7.62708 9.91667H5.83333ZM10.2083 6.08125L9.66875 5.54167L10.2083 6.08125ZM6.70833 9.04167H7.2625L9.02708 7.2625L8.76458 6.98542L8.4875 6.72292L6.70833 8.4875V9.04167ZM8.76458 6.98542L8.4875 6.72292L9.02708 7.2625L8.76458 6.98542ZM4.66667 4.66667C4.025 4.66667 3.47569 4.43819 3.01875 3.98125C2.56181 3.52431 2.33333 2.975 2.33333 2.33333C2.33333 1.69167 2.56181 1.14236 3.01875 0.685417C3.47569 0.228472 4.025 0 4.66667 0C5.30833 0 5.85764 0.228472 6.31458 0.685417C6.77153 1.14236 7 1.69167 7 2.33333C7 2.975 6.77153 3.52431 6.31458 3.98125C5.85764 4.43819 5.30833 4.66667 4.66667 4.66667ZM4.66667 3.5C4.9875 3.5 5.26215 3.38576 5.49062 3.15729C5.7191 2.92882 5.83333 2.65417 5.83333 2.33333C5.83333 2.0125 5.7191 1.73785 5.49062 1.50937C5.26215 1.2809 4.9875 1.16667 4.66667 1.16667C4.34583 1.16667 4.07118 1.2809 3.84271 1.50937C3.61424 1.73785 3.5 2.0125 3.5 2.33333C3.5 2.65417 3.61424 2.92882 3.84271 3.15729C4.07118 3.38576 4.34583 3.5 4.66667 3.5Z" fill="#434654" fill-opacity="0.8"/>
                    </svg>
                  </div>
                  Created By: <span className="ms-1 text-black font-semibold">{epic.created_by?.name || "Unknown"}</span>
                </div>
              )}
              {epic.created_at && (
                <div className="text-[10px] text-gray-400 tracking-wider uppercase">
                  {new Date(epic.created_at).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* رسالة تظهر في حال عدم تطابق نتائج البحث */}
      {filteredEpics?.length === 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm">
          No epics found matching "{search}"
        </p>
      )}
    </>
  );
}
