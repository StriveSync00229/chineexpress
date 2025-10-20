"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/mes-services", label: "Nos Services",
  { href: "/formation-alibaba", label: "Formation Alibaba" },
  { href: "/contact", label: "Contact" },
]

export default function NavigationLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex gap-6 items-center">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-dore",
            pathname === item.href ? "text-dore" : "text-blanc",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
