import Nav from '@/components/nav/nav'
import AddProjecrForm from '@/components/ProjectForm/AddProject'
import ProjectTitle from '@/components/ProjectTitle/Project-Title'
import React from 'react'

export default function AddProject() {



  
  return (
    <div className=''>
          <div className= " ">
             <Nav/>
             <ProjectTitle/>
            </div>
         <div className=' flex justify-around '> 
       
            <main className="flex-1 p-8 bg-slate-50">
         
           <AddProjecrForm/>
         </main>
         </div>
      </div>
  )
}
