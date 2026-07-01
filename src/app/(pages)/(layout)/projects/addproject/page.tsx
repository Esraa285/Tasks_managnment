import NavProject from '@/components/nav/nav'
import Nav from '@/components/nav/nav'
import AddProjectForm from '@/components/ProjectForm/AddProject'
import AddProjecrForm from '@/components/ProjectForm/AddProject'
import ProjectTitle from '@/components/ProjectTitle/Project-Title'
import React from 'react'

export default function AddProject() {



  
  return (
    <div className=''>
          <div className= " ">
             <NavProject/>
             <div className='flex justify-between'>
                   <h1 className="text-3xl font-bold text-slate-900 mt-4">Add New Project</h1>
                    <ProjectTitle/>
             </div>
             
            </div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'> 
       
            <main className="flex-1 p-8 bg-slate-50">
         
           <AddProjectForm/>
         </main>
         </div>
      </div>
  )
}
