"use client"

import { useState } from "react"
import Link from "next/link"
import Logo from "@/components/layout/logo"
import NavigationLinks from "@/components/layout/navigation-links"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import ServiceSelectionModal from "@/components/layout/service-selection-modal"
export default function Header() {
  
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "À propos" },
    { href: "/mes-services", label: "Mes services" },
    { href: "/formation-alibaba", label: "Formation Alibaba" },
    { href: "/contact", label: "Contact" },
  ]
  return (
    <>
      <header className="sticky top-0 z-50 w-full text-white bg-bleu-nuit/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Logo />
          <NavigationLinks />
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setIsServiceModalOpen(true)}
              className="hidden md:inline-flex bg-dore text-bleu-nuit hover:bg-dore/90"
            >
              Demander un Devis
            </Button>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="border-dore text-dore hover:bg-dore/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-bleu-nuit text-white border-l-dore">
                <SheetHeader>
                  <SheetTitle className="text-dore">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="grid gap-6 text-white text-lg font-medium mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="hover:text-dore transition-colors">
                      {item.label}
                    </Link>
                  ))}
                  <Button 
                    onClick={() => setIsServiceModalOpen(true)}
                    className="mt-4 bg-dore text-bleu-nuit hover:bg-dore/90"
                  >
                    Demander un Devis
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <ServiceSelectionModal 
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />
    </>
  )
}