import React from 'react'
import { AddIconsearch } from '../icons/icon'

export default function SearchEpic({searchInput,onChange}:{searchInput:string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <div className=' bg-[#D7E2FF] '>
       <div className='flex justify-around gap-1 p-1 items-center'>
         <AddIconsearch/>
       <div>
         <input value={searchInput}
         onChange={onChange}
          type="search"  placeholder='Search epic...' className='flex items-center focus:outline-none '/>
      
       </div>
       </div>
    </div>
  )
}