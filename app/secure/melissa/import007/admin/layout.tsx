"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GraduationCap,
  Mail,
  FileText,
  Users,
  LogOut,
  Menu,
  X
} from "lucide-react"

const navigation = [
  { name: "Formations", href: "/secure/melissa/import007/admin/formations", icon: GraduationCap },
  { name: "Email Marketing", href: "/secure/melissa/import007/admin/emails", icon: Mail },
  { name: "Demandes Devis", href: "/secure/melissa/import007/admin/devis", icon: FileText },
  { name: "Demandes Contact", href: "/secure/melissa/import007/admin/contacts", icon: Users },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Vérifier si on est sur la page de login
  const isLoginPage = pathname === '/secure/melissa/import007/admin/login'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar mobile - seulement si pas sur la page de login */}
      {!isLoginPage && (
        <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Bouton de déconnexion mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              <button
                onClick={() => {
                  document.cookie = 'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                  window.location.href = '/secure/melissa/import007/admin/login'
                }}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar desktop - seulement si pas sur la page de login */}
      {!isLoginPage && (
        <div className="hidden lg:fixed lg:top-20 lg:left-0 lg:w-64 lg:block lg:z-[60]">
          <div className="bg-white shadow-lg min-h-screen">
            <nav className="mt-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={isLoginPage ? '' : 'lg:pl-64'}>
        {/* Header admin - seulement si pas sur la page de login */}
        {!isLoginPage && (
          <div className="sticky top-0 z-30 bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-4 py-4 lg:px-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Connecté en tant que Mélissa</span>
                <button
                  onClick={() => {
                    document.cookie = 'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                    window.location.href = '/secure/melissa/import007/admin/login'
                  }}
                  className="p-2 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                  title="Se déconnecter"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        <main className={isLoginPage ? 'flex items-center justify-center min-h-screen' : 'p-4 lg:p-8'}>
          {children}
        </main>
      </div>
    </div>
  )
}