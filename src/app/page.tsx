import Link from 'next/link'
import React from 'react'

export default function Home() {


  return <div className=' p-15'>
   <div className='flex justify-center items-center'>
   <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-20 px-4">

  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest mb-4">
    Welcome to Taskly
  </span>
  
  <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-6 leading-tight">
    Organize Projects. Assign Tasks. <br />
    <span className="text-blue-600">Simplify Your Workflow.</span>
  </h1>

  <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl">
    Taskly makes it effortless to manage tasks, add new projects, and distribute workloads among your team members. Experience a clean, intuitive workspace designed to track your team's progress with ultimate ease.
  </p>


  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
    <Link href="/login" className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200">
      Log In
    </Link>
    <Link href="/signup" className="w-full sm:w-auto text-center bg-black border border-black hover:bg-blue-400 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200">
      Create New Account
    </Link>
  </div>
</div>
  </div>
 </div>
}
