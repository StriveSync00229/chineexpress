"use client"

import { Users, PackageCheck, Smile } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const figures = [
  {
    icon: <Users size={48} className="text-dore" />,
    value: "+100",
    numericValue: 100,
    suffix: "+",
    label: "Clients satisfaits",
  },
  {
    icon: <PackageCheck size={48} className="text-dore" />,
    value: "+50",
    numericValue: 50,
    suffix: "+",
    label: "Tonnes importées en 2024",
  },
  {
    icon: <Smile size={48} className="text-dore" />,
    value: "98%",
    numericValue: 98,
    suffix: "%",
    label: "Taux de satisfaction",
  },
]

function Counter({ targetValue, suffix, duration = 2000 }: { targetValue: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * targetValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, targetValue, duration])

  return (
    <div ref={counterRef} className="text-4xl font-bold text-dore mb-2 group-hover:text-dore/90 transition-colors">
      {suffix === "+" ? "+" : ""}{count}{suffix === "%" ? "%" : ""}
    </div>
  )
}

export default function KeyFiguresSection() {
  return (
    <section className="py-16 md:py-24 bg-bleu-nuit text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-dore text-3xl md:text-4xl font-serif font-bold text-center mb-12 animate-fade-in">
          Nos Résultats en Chiffres
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {figures.map((figure, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center p-6 border border-dore/30 rounded-lg bg-blanc/5 
                         hover:bg-blanc/10 hover:border-dore hover:shadow-lg hover:shadow-dore/20 
                         transform hover:scale-105 transition-all duration-300 ease-out cursor-pointer
                         animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {figure.icon}
              </div>
              
              <Counter 
                targetValue={figure.numericValue} 
                suffix={figure.suffix}
                duration={2000}
              />
              
              <p className="text-lg text-white/80 group-hover:text-white transition-colors">
                {figure.label}
              </p>
              
              {/* Effet de pulse sur les valeurs numériques */}
              <div className="absolute inset-0 rounded-lg bg-dore/5 opacity-0 group-hover:opacity-100 
                              group-hover:animate-pulse transition-opacity duration-300 pointer-events-none" />
              
              {/* Particules de célébration après animation */}
              <div className="absolute inset-0 pointer-events-none">
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              w-2 h-2 bg-dore rounded-full opacity-0 transition-opacity duration-500
                              animate-ping`} 
                   style={{ animationDelay: `${2000 + 500}ms` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}