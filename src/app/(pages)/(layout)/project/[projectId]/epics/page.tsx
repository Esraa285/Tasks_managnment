'use client'
import { fetchEpicsProject } from "@/actions/actions";
import AddNewEpictButton from "@/components/Buttons/NewEpic";
import SearchEpic from "@/components/Buttons/SearchEpic";
import EpicCard from "@/components/EpicCard/EpicCard";
import NavProject from "@/components/nav/nav";
import PaginEpicButton from "@/components/PaginationButton/PaginEpicButton";
import { ProjectEpic } from "@/Interfaces/AuthInterfaces";
import { Loader2, Search } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function ProjectEpicsPage({ params }: { params: Promise<{ projectId: string }> }) {

   const resolvedParams = use(params) ;
     const { projectId } = resolvedParams;

const [epics, setEpics] = useState<ProjectEpic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;
  const [searchInput, setSearchInput] = useState(""); 
  const [debouncedSearch, setDebouncedSearch] = useState(""); 

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1); // 💡
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    if (!projectId) return;

    const loadEpics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching epics for projectId:", projectId);
        const response = await fetchEpicsProject(projectId, currentPage, limit, debouncedSearch);
        if (response) {
          setEpics(response.data || []);
          setTotalCount(response.totalCount);
        }
      } catch (err) {
        setError("Failed to search epics"); 
      } finally {
        setIsLoading(false);
      }
    };

    loadEpics();
  }, [projectId, currentPage, debouncedSearch]);

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(targetPage);
  };

  return (
  <div>
      <NavProject />

      <div className="px-8 mb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Project Epics</h1>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto flex-1 md:flex-none justify-end">
          <div className="relative w-full max-w-xs">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search epics..."
              className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 bg-white shadow-sm"
            /> */}
            <SearchEpic searchInput={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
          </div>

          <div className="flex justify-around shrink-0">
            <AddNewEpictButton projectId={projectId} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8">
        
        <div className='rounded-xl border border-slate-100 p-2 min-h-62.5 flex flex-col justify-between'>
          
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center py-12 text-slate-500 text-sm gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> Loading epics...
            </div>
          ) : error ? (
            <div className="flex flex-1 items-center justify-center text-red-500 py-12 text-sm font-medium">
              {error}
            </div>
          ) : epics.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-slate-400 py-12 text-sm font-medium">
              {debouncedSearch.trim() !== ""
                ? "No epics found matching your search"
                : "No epics found for this project"}
            </div>
          ) : (
            <div className="flex-1">
              <EpicCard epics={epics} projectId={projectId} />
            </div>
          )}

         
        </div>
         {!isLoading && !error && epics.length > 0 && (
            <PaginEpicButton
              totalCount={totalCount}
              limit={limit}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              loading={isLoading}
            />
          )}

      </div>
      
    </div>
  );
}