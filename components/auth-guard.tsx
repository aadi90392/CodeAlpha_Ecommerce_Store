"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import LoadingSpinner from "@/components/loading-spinner"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return <>{children}</>
}
