import type { Fortune } from "./fortune-data"

export interface FortuneImageData {
  userWish: string
  fortune: Fortune
  timestamp: string
}

export function generateFortuneImage(data: FortuneImageData): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    // Set canvas size for social media sharing (1080x1350 - Instagram post ratio)
    canvas.width = 1080
    canvas.height = 1350

    // Background gradient (night sky theme)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#0f172a") // slate-900
    gradient.addColorStop(0.5, "#1e3a8a") // blue-800
    gradient.addColorStop(1, "#1e293b") // slate-800
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add stars
    ctx.fillStyle = "#ffffff"
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height * 0.6 // Upper portion only
      const size = Math.random() * 3 + 1
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Moon
    const moonX = canvas.width - 150
    const moonY = 120
    const moonRadius = 60
    const moonGradient = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonRadius)
    moonGradient.addColorStop(0, "#fef3c7") // yellow-100
    moonGradient.addColorStop(1, "#fde68a") // yellow-200
    ctx.fillStyle = moonGradient
    ctx.beginPath()
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
    ctx.fill()

    // Fortune card background
    const cardX = 80
    const cardY = 280
    const cardWidth = canvas.width - 160
    const cardHeight = 900

    // Card shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
    ctx.fillRect(cardX + 10, cardY + 10, cardWidth, cardHeight)

    // Card background
    const cardGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight)
    cardGradient.addColorStop(0, "#fef7cd") // amber-50
    cardGradient.addColorStop(1, "#fed7aa") // orange-200
    ctx.fillStyle = cardGradient
    ctx.fillRect(cardX, cardY, cardWidth, cardHeight)

    // Card border
    ctx.strokeStyle = "#f97316" // orange-500
    ctx.lineWidth = 4
    ctx.strokeRect(cardX, cardY, cardWidth, cardHeight)

    // Decorative corners
    const cornerSize = 20
    ctx.strokeStyle = "#ea580c" // orange-600
    ctx.lineWidth = 3
    // Top-left
    ctx.beginPath()
    ctx.moveTo(cardX + 15, cardY + 15 + cornerSize)
    ctx.lineTo(cardX + 15, cardY + 15)
    ctx.lineTo(cardX + 15 + cornerSize, cardY + 15)
    ctx.stroke()
    // Top-right
    ctx.beginPath()
    ctx.moveTo(cardX + cardWidth - 15 - cornerSize, cardY + 15)
    ctx.lineTo(cardX + cardWidth - 15, cardY + 15)
    ctx.lineTo(cardX + cardWidth - 15, cardY + 15 + cornerSize)
    ctx.stroke()
    // Bottom-left
    ctx.beginPath()
    ctx.moveTo(cardX + 15, cardY + cardHeight - 15 - cornerSize)
    ctx.lineTo(cardX + 15, cardY + cardHeight - 15)
    ctx.lineTo(cardX + 15 + cornerSize, cardY + cardHeight - 15)
    ctx.stroke()
    // Bottom-right
    ctx.beginPath()
    ctx.moveTo(cardX + cardWidth - 15 - cornerSize, cardY + cardHeight - 15)
    ctx.lineTo(cardX + cardWidth - 15, cardY + cardHeight - 15)
    ctx.lineTo(cardX + cardWidth - 15, cardY + cardHeight - 15 - cornerSize)
    ctx.stroke()

    // Text styling
    ctx.textAlign = "center"
    ctx.fillStyle = "#9a3412" // orange-800

    // Title
    ctx.font = "bold 48px Arial, sans-serif"
    ctx.fillText("푸앙이의 운세 쪽지", canvas.width / 2, 200)

    // Subtitle
    ctx.font = "28px Arial, sans-serif"
    ctx.fillStyle = "#c2410c" // orange-700
    ctx.fillText("달님이 전해주신 특별한 운세", canvas.width / 2, 240)

    // Fortune sections - starting higher up and with more space
    let currentY = 350

    // General luck - larger section
    ctx.font = "bold 36px Arial, sans-serif"
    ctx.fillStyle = "#9a3412"
    ctx.fillText("🌟 오늘의 총운", canvas.width / 2, currentY)
    currentY += 50
    ctx.font = "30px Arial, sans-serif"
    ctx.fillStyle = "#c2410c"
    const generalLines = wrapText(ctx, data.fortune.generalLuck, cardWidth - 120)
    generalLines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, currentY)
      currentY += 38
    })
    currentY += 60

    // Academic luck - larger section
    ctx.font = "bold 36px Arial, sans-serif"
    ctx.fillStyle = "#9a3412"
    ctx.fillText("📚 학업운", canvas.width / 2, currentY)
    currentY += 50
    ctx.font = "30px Arial, sans-serif"
    ctx.fillStyle = "#c2410c"
    const academicLines = wrapText(ctx, data.fortune.academicLuck, cardWidth - 120)
    academicLines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, currentY)
      currentY += 38
    })
    currentY += 60

    // Love luck - larger section
    ctx.font = "bold 36px Arial, sans-serif"
    ctx.fillStyle = "#9a3412"
    ctx.fillText("💕 애정운", canvas.width / 2, currentY)
    currentY += 50
    ctx.font = "30px Arial, sans-serif"
    ctx.fillStyle = "#c2410c"
    const loveLines = wrapText(ctx, data.fortune.loveLuck, cardWidth - 120)
    loveLines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, currentY)
      currentY += 38
    })

    // Footer
    ctx.textAlign = "center"
    ctx.font = "italic 26px Arial, sans-serif"
    ctx.fillStyle = "#a16207" // yellow-700
    ctx.fillText("푸앙이가 달님에게서 받아온 특별한 메시지예요 ✨", canvas.width / 2, cardY + cardHeight - 60)

    // Timestamp
    ctx.font = "22px Arial, sans-serif"
    ctx.fillStyle = "#92400e" // yellow-800
    ctx.fillText(data.timestamp, canvas.width / 2, cardY + cardHeight - 25)

    // Convert to data URL
    const dataURL = canvas.toDataURL("image/png", 0.9)
    resolve(dataURL)
  })
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = ctx.measureText(currentLine + " " + word).width
    if (width < maxWidth) {
      currentLine += " " + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)
  return lines
}

export function downloadImage(dataURL: string, filename: string) {
  const link = document.createElement("a")
  link.download = filename
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
