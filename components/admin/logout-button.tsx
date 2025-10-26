"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useState } from "react"

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST"
      })

      if (response.ok) {
        router.push("/secure/melissa/import007/login")
        router.refresh()
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      disabled={loading}
      className="border-red-200 text-red-600 hover:bg-red-50"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {loading ? "Déconnexion..." : "Déconnexion"}
    </Button>
  )
}
