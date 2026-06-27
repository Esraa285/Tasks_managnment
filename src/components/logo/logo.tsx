import React from 'react'

export default function Logo() {
  return (
      <div className="flex items-center gap-2 px-2 py-1 mt-5">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span className="text-xl font-bold text-blue-900 tracking-wider">TASKLY</span>
          </div>
  )
}
