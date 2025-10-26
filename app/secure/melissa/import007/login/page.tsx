"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User, LogIn } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        // Connexion réussie, rediriger vers le dashboard admin
        router.push("/secure/melissa/import007/admin")
        router.refresh()
      } else {
        setError(data.error || "Identifiants incorrects")
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bleu-nuit via-blue-900 to-bleu-nuit p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-dore/20">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-dore/10 rounded-full">
                <Lock className="h-12 w-12 text-dore" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-bleu-nuit">
              Administration
            </CardTitle>
            <CardDescription>
              Connectez-vous pour accéder au panneau d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-bleu-nuit font-medium">
                  Nom d'utilisateur
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-dore focus:ring-dore"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-bleu-nuit font-medium">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-dore focus:ring-dore"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-dore hover:bg-dore/90 text-bleu-nuit font-bold py-6 text-lg transition-all duration-300 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-bleu-nuit mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    Se connecter
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Accès réservé aux administrateurs
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-sm text-white/70">
            Chineexpress © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
