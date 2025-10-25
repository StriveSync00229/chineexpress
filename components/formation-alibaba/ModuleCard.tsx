/**
 * Carte de module de formation
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, CheckCircle } from "lucide-react"
import type { FormationModule } from "./types"

interface ModuleCardProps {
  module: FormationModule
  index: number
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-dore/10 rounded-full">
              {module.icon}
            </div>
            <div>
              <CardTitle className="text-lg font-serif font-semibold text-bleu-nuit">
                {module.title}
              </CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {module.duration}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {module.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          <span className="text-2xl font-bold text-dore">
            {index + 1}
          </span>
        </div>
        <CardDescription className="text-noir-profond/80">
          {module.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-bleu-nuit mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-dore" />
              Étapes détaillées :
            </h4>
            <ul className="space-y-1">
              {module.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start gap-2 text-sm text-gray-600">
                  <ChevronRight className="w-3 h-3 text-dore mt-0.5 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-medium">Outils fournis :</span>
              <span>{module.tools.join(", ")}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
