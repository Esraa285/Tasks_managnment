'use client'
import React from 'react'

export default function MemberError({onRetry}: { onRetry: () => void }) {
  return (
    <button
        onClick={onRetry}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
      >
        Retry Connection
      </button>
  )
}
