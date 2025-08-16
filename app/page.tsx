"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleMakeWish = () => {
    setIsAnimating(true)
    // Navigate to wish input after animation
    setTimeout(() => {
      window.location.href = "/wish"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Full moon */}
      <div className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full shadow-2xl shadow-yellow-200/30">
        <div className="absolute inset-2 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-full opacity-80" />
        <div className="absolute inset-4 bg-gradient-to-br from-white to-yellow-50 rounded-full opacity-60" />
      </div>

      {/* Moon glow effect */}
      <div className="absolute top-8 right-8 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Puang character placeholder */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 mx-auto mb-6 relative">
            <img
              src="/placeholder.svg?height=192&width=192"
              alt="푸앙이 캐릭터"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            {/* Character glow effect */}
            <div className="absolute inset-0 bg-blue-200/20 rounded-full blur-2xl scale-110" />
          </div>

          {/* Floating sparkles around character */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-bounce"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random()}s`,
              }}
            />
          ))}
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">소원을 이루어주는 푸앙이</h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-blue-100 mb-2 font-medium">보름달에게 당신의 소원을 빌어보세요</p>

        {/* Description */}
        <p className="text-lg text-blue-200 mb-12 max-w-md leading-relaxed">
          푸앙이가 당신의 소원이 이루어지도록 달님에게 전달해 줄 거예요
        </p>

        {/* Main CTA button */}
        <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
          <Button
            onClick={handleMakeWish}
            size="lg"
            className={`
              px-12 py-6 text-xl font-semibold
              bg-gradient-to-r from-orange-400 to-orange-500 
              hover:from-orange-500 hover:to-orange-600
              text-white shadow-2xl shadow-orange-500/30
              transform transition-all duration-300
              hover:scale-105 hover:shadow-orange-500/50
              ${isAnimating ? "animate-pulse scale-95" : ""}
            `}
            disabled={isAnimating}
          >
            {isAnimating ? "소원을 전달하는 중..." : "소원 빌기 ✨"}
          </Button>

          {/* Button glow effect */}
          <div className="absolute inset-0 bg-orange-400/20 rounded-lg blur-xl scale-110 -z-10" />
        </Card>

        {/* Footer text */}
        <p className="text-sm text-blue-300 mt-8 opacity-80">QR코드를 통해 접속하신 것을 환영합니다</p>
      </div>

      {/* Shooting star animation */}
      <div className="absolute top-1/4 left-0 w-full h-1 overflow-hidden">
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-70" />
      </div>
    </div>
  )
}
