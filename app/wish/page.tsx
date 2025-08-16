"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

export default function WishPage() {
  const [wish, setWish] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleSubmitWish = async () => {
    if (!wish.trim()) return

    setIsSubmitting(true)
    setShowAnimation(true)

    // Store wish in localStorage for fortune generation
    localStorage.setItem("userWish", wish)

    // Show paper flying animation then navigate
    setTimeout(() => {
      window.location.href = "/fortune"
    }, 2500)
  }

  const handleBack = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Full moon */}
      <div className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full shadow-2xl shadow-yellow-200/30">
        <div className="absolute inset-2 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-full opacity-80" />
      </div>

      {/* Paper flying animation */}
      {showAnimation && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-16 h-12 bg-white rounded shadow-lg animate-bounce transform rotate-12 transition-all duration-2000 ease-out"
              style={{
                animation: "flyToMoon 2.5s ease-out forwards",
              }}
            >
              <div className="p-2 text-xs text-gray-600 truncate">{wish.substring(0, 20)}...</div>
            </div>
          </div>
        </div>
      )}

      {/* Back button */}
      <Button
        onClick={handleBack}
        variant="ghost"
        className="absolute top-6 left-6 text-white hover:bg-white/10 z-20"
        disabled={isSubmitting}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        돌아가기
      </Button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full">
          {/* Puang character */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4">
              <img
                src="/placeholder.svg?height=128&width=128"
                alt="기도하는 푸앙이"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">소원을 들려주세요</h1>
            <p className="text-blue-200">푸앙이가 달님에게 전해드릴게요</p>
          </div>

          {/* Wish input form */}
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
            <div className="space-y-4">
              <Textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="당신의 소원을 적어주세요..."
                className="min-h-32 bg-white/20 border-white/30 text-white placeholder:text-blue-200 resize-none"
                disabled={isSubmitting}
                maxLength={200}
              />

              <div className="text-right text-sm text-blue-300">{wish.length}/200</div>

              <Button
                onClick={handleSubmitWish}
                disabled={!wish.trim() || isSubmitting}
                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-xl"
              >
                {isSubmitting ? "달님에게 전달 중..." : "소원 빌기 🌙"}
              </Button>
            </div>
          </Card>

          {/* Instruction text */}
          <p className="text-center text-blue-300 text-sm mt-6 opacity-80">진심을 담아 소원을 빌어주세요</p>
        </div>
      </div>

      {/* Custom CSS for paper flying animation */}
      <style jsx>{`
        @keyframes flyToMoon {
          0% {
            transform: translate(-50%, -50%) rotate(12deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(200px, -300px) rotate(45deg) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate(400px, -600px) rotate(90deg) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
