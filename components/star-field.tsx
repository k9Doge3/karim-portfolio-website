"use client"
import { useEffect, useRef } from "react"

interface StarFieldProps {
  blurAmount?: number
  mousePosition?: { x: number; y: number }
  speed?: number
  hyperspaceMode?: boolean
  starCount?: number
}

export function StarField({ 
  blurAmount = 0, 
  mousePosition = { x: 0, y: 0 }, 
  speed = 2,
  hyperspaceMode = false,
  starCount = 1000
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const starsRef = useRef<
    Array<{
      x: number
      y: number
      z: number
      prevZ: number
      size: number
      opacity: number
      color: string
      trail?: Array<{ x: number; y: number; opacity: number }>
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      const stars = []
      const colors = ['#ffffff', '#e6f3ff', '#fff2e6', '#f0e6ff', '#e6ffe6']
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          prevZ: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          trail: hyperspaceMode ? [] : undefined,
        })
      }
      starsRef.current = stars
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.translate(canvas.width / 2, canvas.height / 2)

      const currentSpeed = hyperspaceMode ? speed * 3 : speed * 0.5 + blurAmount * 0.5

      starsRef.current.forEach((star) => {
        star.prevZ = star.z
        star.z -= currentSpeed

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
          star.z = 1000
          star.prevZ = 1000
          if (star.trail) star.trail = []
        }

        const x = (star.x / star.z) * 1000
        const y = (star.y / star.z) * 1000
        const prevX = (star.x / star.prevZ) * 1000
        const prevY = (star.y / star.prevZ) * 1000

        const size = (1 - star.z / 1000) * star.size * (hyperspaceMode ? 3 : 2)
        const opacity = (1 - star.z / 1000) * star.opacity

        // Add mouse interaction (faster and smoother)
        const mouseInfluence = 0.00015
        const dx = mousePosition.x - canvas.width / 2
        const dy = mousePosition.y - canvas.height / 2
        // Add smooth easing for more natural movement
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        const easedInfluence = mouseInfluence * (1 + normalizedDistance * 0.5)
        const adjustedX = x + dx * easedInfluence * (1000 - star.z)
        const adjustedY = y + dy * easedInfluence * (1000 - star.z)

        if (hyperspaceMode && star.trail) {
          // Add current position to trail
          star.trail.push({ x: adjustedX, y: adjustedY, opacity })
          if (star.trail.length > 10) star.trail.shift()

          // Draw trail
          star.trail.forEach((point, index) => {
            const trailOpacity = point.opacity * (index / star.trail!.length) * 0.5
            ctx.fillStyle = `${star.color.replace('rgb', 'rgba').replace(')', `, ${trailOpacity})`)}`
            ctx.beginPath()
            ctx.arc(point.x, point.y, size * (index / star.trail!.length), 0, Math.PI * 2)
            ctx.fill()
          })
        }

        // Draw star trail/line with glow
        ctx.strokeStyle = `${star.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)}`
        ctx.lineWidth = size
        ctx.shadowColor = star.color
        ctx.shadowBlur = size * 2
        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(adjustedX, adjustedY)
        ctx.stroke()

        // Draw star point with enhanced glow
        ctx.fillStyle = `${star.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)}`
        ctx.shadowColor = star.color
        ctx.shadowBlur = size * 3
        ctx.beginPath()
        ctx.arc(adjustedX, adjustedY, size / 2, 0, Math.PI * 2)
        ctx.fill()
        
        // Reset shadow for performance
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
      })

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createStars()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createStars()
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [blurAmount, speed, hyperspaceMode, starCount, mousePosition])

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${blurAmount > 0 ? 'blur-sm' : ''}`}
    />
  )
}
