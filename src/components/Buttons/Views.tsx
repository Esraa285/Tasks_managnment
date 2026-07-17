'use client'
import React, { useState } from 'react'
import AddIconV, { AddIconbehind } from '../icons/icon'
import SearchTask from './SearchTask'

export default function Views ({onViewChange}:{onViewChange?: (view: 'board' | 'list') => void}) {
    const [localView, setLocalView] = useState<'board' | 'list'>('board');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'board' | 'list';
    setLocalView(value);
    onViewChange?.(value);
  };
  return (
    <div className=''>
      <div className='flex gap-3'>

        <SearchTask/>
        
        <div className='flex justify-around items-center py-2 px-6 border gap-2 border-[#C3C6D633] bg-white'>
             <AddIconV/>
           <div>
             <select name="task_view" id="task_view" value={localView}
              onChange={handleChange}>
                <option value="board" className='text-[14px] px-6 '>
                    Board View
                </option>
                 <option value="list"  className='text-[14px]'>
                    List View
                </option>
            </select>
           </div>
        </div>

        <AddIconbehind/>
      </div>

    </div>
  )
}
