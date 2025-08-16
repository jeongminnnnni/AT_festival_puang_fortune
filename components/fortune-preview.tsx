"use client"

import { Card } from "@/components/ui/card"
import type { Fortune } from "@/lib/fortune-data"

interface FortunePreviewProps {
  userWish: string
  fortune: Fortune
  className?: string
}

export function FortunePreview({ userWish, fortune, className = "" }: FortunePreviewProps) {
  return (
    <Card
      className={`relative p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 shadow-2xl transform rotate-1 ${className}`}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-100/30 to-orange-200/20 rounded-lg" />

      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-orange-300" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-orange-300" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-orange-300" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-orange-300" />

      <div className="relative z-10 space-y-8">
        {/* Fortune sections - larger and more prominent */}
        <div className="grid gap-8">
          <div className="bg-white/70 p-8 rounded-xl border-2 border-orange-300 shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center justify-center">🌟 오늘의 총운</h3>
            <p className="text-lg text-orange-700 leading-relaxed text-center">{fortune.generalLuck}</p>
          </div>

          <div className="bg-white/70 p-8 rounded-xl border-2 border-orange-300 shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center justify-center">📚 학업운</h3>
            <p className="text-lg text-orange-700 leading-relaxed text-center">{fortune.academicLuck}</p>
          </div>

          <div className="bg-white/70 p-8 rounded-xl border-2 border-orange-300 shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center justify-center">💕 애정운</h3>
            <p className="text-lg text-orange-700 leading-relaxed text-center">{fortune.loveLuck}</p>
          </div>
        </div>

        {/* Footer message */}
        <div className="text-center pt-6 border-t border-orange-200">
          <p className="text-base text-orange-600 italic">푸앙이가 달님에게서 받아온 특별한 메시지예요 ✨</p>
        </div>
      </div>
    </Card>
  )
}
