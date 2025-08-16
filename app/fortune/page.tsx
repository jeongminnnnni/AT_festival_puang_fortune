"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, RotateCcw } from "lucide-react"
import { getRandomFortune, type Fortune } from "@/lib/fortune-data"
import { generateFortuneImage, downloadImage, type FortuneImageData } from "@/lib/image-generator"
import { FortunePreview } from "@/components/fortune-preview"

export default function FortunePage() {
  const [fortune, setFortune] = useState<Fortune | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      const newFortune = getRandomFortune()
      setFortune(newFortune)
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleNewFortune = () => {
    window.location.href = "/wish"
  }

  const handleSaveFortune = async () => {
    if (!fortune) return

    setIsGeneratingImage(true)

    try {
      const userWish = localStorage.getItem("userWish") || "행복한 하루"

      const imageData: FortuneImageData = {
        userWish,
        fortune,
        timestamp: new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      const dataURL = await generateFortuneImage(imageData)
      const filename = `푸앙이_운세_${new Date().getTime()}.png`
      downloadImage(dataURL, filename)
    } catch (error) {
      console.error("이미지 생성 중 오류가 발생했습니다:", error)
      alert("이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const handleBack = () => {
    window.location.href = "/"
  }

  if (isLoading || !fortune) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="운세를 읽는 푸앙이"
              className="w-full h-full object-contain drop-shadow-xl animate-pulse"
            />
          </div>
          <p className="text-white text-xl">푸앙이가 운세를 읽고 있어요...</p>
          <div className="flex justify-center mt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-300 rounded-full mx-1 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
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

      <div className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full shadow-2xl shadow-yellow-200/30">
        <div className="absolute inset-2 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-full opacity-80" />
      </div>

      <Button onClick={handleBack} variant="ghost" className="absolute top-6 left-6 text-white hover:bg-white/10 z-20">
        <ArrowLeft className="w-4 h-4 mr-2" />
        처음으로
      </Button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="행복한 푸앙이"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">푸앙이의 운세 쪽지</h1>
            <p className="text-blue-200">달님이 전해주신 당신만의 특별한 운세예요</p>
          </div>

          <FortunePreview userWish="" fortune={fortune} />

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button
              onClick={handleSaveFortune}
              disabled={isGeneratingImage}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGeneratingImage ? "이미지 생성 중..." : "운세 저장하기"}
            </Button>

            <Button
              onClick={handleNewFortune}
              variant="outline"
              className="px-6 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              소원 다시 빌기
            </Button>
          </div>

          <p className="text-center text-blue-300 text-sm mt-6 opacity-80">운세를 이미지로 저장해보세요!</p>
        </div>
      </div>
    </div>
  )
}
