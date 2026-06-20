import Link from 'next/link'
import React from 'react'

export default function Login() {
  return (
     <Link href="/login" className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200">
          Log In
        </Link>
  )
}
