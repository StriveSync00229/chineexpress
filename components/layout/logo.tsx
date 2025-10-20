import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center text-2xl font-serif font-bold text-dore hover:text-dore/90 transition-colors"
      aria-label="Accueil ChineExpresse"
    >
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sans%20arri%C3%A8re%20plan%202-AFhVvZYBJQaURAU4aOHbQXZ1MYqzqm.png"
        alt="Logo ChineExpresse - Avion et colis"
        width={32}
        height={32}
        className="mr-2"
      />
      ChineExpresse
    </Link>
  )
}