'use client'

import React, { useState } from 'react'

export default function UserFeedBack() {
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("User Feedback:", feedback)

    setFeedback("")
  }

  return (
    <div className="max-w-md mx-auto p-5 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Give Your Feedback
      </h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          className="w-full border rounded-md p-3 min-h-[120px] outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  )
}