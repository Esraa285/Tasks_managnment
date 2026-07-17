"use client"
import React, { useState } from 'react'
import BoardView from './BoardView';
import { ProjectTask } from '@/Interfaces/AuthInterfaces';
import Views from '../Buttons/Views';
import ListView from '../ProjectCard/ListView';

export default function BoardViewPage({projectId, tasks}:{projectId:string , tasks:ProjectTask[]}) {

const STATUSES = [
  'TO_DO',
  'IN_PROGRESS',
  'BLOCKED',
  'IN_REVIEW',
  'READY_FOR_QA',
  'REOPENED',
  'READY_FOR_PRODUCTION',
  'DONE',
];

const [activeView, setActiveView] = useState<'board' | 'list'>('board');

  const handleAddTask = (status: string) => {
    console.log(status);
  };


  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-6">
      
      <div className="px-8 mb-3 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Active Workboard</h1>
          <p className="text-[14px] text-gray-600 pt-2">
            Curating Project Alpha's production pipeline and milestones.
          </p>
        </div>
        <div className="flex justify-end">
          <Views onViewChange={(view) => setActiveView(view)} />
        </div>
      </div>
      <div className="w-full px-8">
        {activeView === 'board' ? (
          <div className="w-full overflow-x-auto py-6">
            <div className="flex gap-6 items-start pb-4">
              {STATUSES.map((status) => (
                <BoardView
                  key={status}
                  status={status}
                  projectId={projectId}
                  onAddTaskClick={handleAddTask}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className=" ">
            <ListView projectId={projectId} />
          </div>
        )}
      </div>

    </div> 
  );
}
