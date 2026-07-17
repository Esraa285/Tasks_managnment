import React from 'react'
import { AddIconsearch } from '../icons/icon'

export default function SearchTask() {
  return (
    <div className=' bg-[#D7E2FF] '>
       <div className='flex justify-around gap-1 p-1 items-center'>
         <AddIconsearch/>
       <div>
         <input  type="search" placeholder='Search tasks...' className='flex items-center  '/>
      
       </div>
       </div>
    </div>
  )
}
