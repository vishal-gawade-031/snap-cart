import React from 'react'
import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-12">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center">
        <div className="mx-auto w-28 h-28 flex items-center justify-center rounded-full bg-white/60 ring-1 ring-white/30 mb-6 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4s-3 1.567-3 3.5S10.343 11 12 11z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.5 20a6.5 6.5 0 0113 0" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-700 mb-6">You don’t have permission to view this page. If you think this is a mistake, sign in with an account that has access or return home.</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
          <Link href="/" className="inline-block px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">Go to Home</Link>
          <Link href="/login" className="inline-block px-5 py-2 rounded-lg border border-indigo-600 text-indigo-700 bg-white hover:bg-indigo-50 transition">Sign in</Link>
        </div>

        <p className="text-sm text-gray-600 mt-6">Need help? Contact an administrator or try again later.</p>
      </div>
    </div>
  )
}