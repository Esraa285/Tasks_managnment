import NavProject from '@/components/nav/nav'
import ProjectTitle from '@/components/ProjectTitle/Project-Title'
import React from 'react'

export default function ProjectEdit() {




  return (
  <div className=''>
          <div className= " ">
             <NavProject/>
           <div className='flex justify-between'>
              <h1 className="text-3xl font-bold text-slate-900 mt-4">Edit Project</h1>
              <ProjectTitle/>
           </div>
            </div>
         <div className=' flex justify-around '> 
       
            <main className="flex-1 p-8 bg-slate-50">
         
           <AddProjecrForm/>
         </main>
         </div>
      </div>
  )
}
