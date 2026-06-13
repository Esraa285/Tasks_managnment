import React from 'react'

export default function Projects() {

  return <>
      <div className='mx-10 mt-10'>
         <div className=' flex  justify-around '> 
            <main className="flex-1 p-8 bg-slate-50">
         
     
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                Projects &gt; <span className="text-gray-500">Add New Project</span>
              </p>
              <h1 className="text-3xl font-bold text-slate-900 mt-1">Add New Project</h1>
            </div>
           
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

          <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-4xl shadow-sm">
             <p className="text-gray-400 text-sm">Initialize New Project Form...</p>
          </div>
         </main>
         </div>
      </div>

  </>
}
