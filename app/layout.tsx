import type React from "react"
import type { Metadata } from "next"
import { poppins, inter } from "@/lib/fonts"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster" // Updated to sonner based on typical shadcn setup
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "ChineExpresse - Votre partenaire d'import depuis la Chine",
  description: "Importez de Chine sans stress avec ChineExpresse, votre partenaire expert en importation et logistique.",
  openGraph: {
    title: "ChineExpresse - Votre partenaire d'import depuis la Chine",
    description: "Importez de Chine sans stress avec ChineExpresse, votre partenaire expert en importation et logistique.",
    images: [{ url: "https://source.unsplash.com/1200x630/?shipping,china,business,trade" }],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={cn("min-h-screen bg-blanc font-paragraphes antialiased", inter.variable, poppins.variable)}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
      </body>
    </html>
  )
}
