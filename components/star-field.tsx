"use client"
import { useEffect, useRef } from "react"

interface StarFieldProps {
  blurAmount?: number
  mousePosition?: { x: number; y: number }
  speed?: number
  hyperspaceMode?: boolean
  starCount?: number
  opacity?: number
}

export function StarField({
  blurAmount = 0,
  mousePosition = { x: 0, y: 0 },
  speed = 2,
  hyperspaceMode = false,
  starCount = 1000,
  opacity = 1,
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 })
  const starsRef = useRef<
    Array<{
      x: number
      y: number
      z: number
      prevZ: number
      size: number
      opacity: number
      color: string
      twinkleSpeed: number
      twinkleOffset: number
      trail?: Array<{ x: number; y: number; opacity: number }>
    }>
  >([])
  const shootingStarsRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
    }>
  >([])
  const nebulaCloudsRef = useRef<
    Array<{
      x: number
      y: number
      radius: number
      color: string
      opacity: number
      drift: { x: number; y: number }
    }>
  >([])

  useEffect(() => {
    mouseRef.current = mousePosition
  }, [mousePosition])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createNebulaClouds = () => {
      const clouds = []
      const nebulaColors = [
        "rgba(30, 60, 114, 0.15)",
        "rgba(72, 52, 117, 0.12)",
        "rgba(58, 12, 163, 0.1)",
        "rgba(17, 24, 82, 0.18)",
        "rgba(45, 55, 95, 0.14)",
      ]

      for (let i = 0; i < 8; i++) {
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 300 + 200,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          opacity: Math.random() * 0.3 + 0.1,
          drift: {
            x: (Math.random() - 0.5) * 0.05,
            y: (Math.random() - 0.5) * 0.05,
          },
        })
      }
      nebulaCloudsRef.current = clouds
    }

    const createStars = () => {
      const stars = []
      const colors = ["#ffffff", "#f0f4ff", "#e8f0ff", "#fff9f0", "#f0f0ff", "#fffaf0", "#f5f8ff", "#fff5f8"]

      for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * Math.sqrt(Math.random())
        const maxDist = Math.max(canvas.width, canvas.height)

        stars.push({
          x: Math.cos(angle) * distance * maxDist - canvas.width / 2,
          y: Math.sin(angle) * distance * maxDist - canvas.height / 2,
          z: Math.random() * 1500 + 100,
          prevZ: Math.random() * 1500 + 100,
          size: Math.random() * 2.5 + 0.3,
          opacity: Math.random() * 0.9 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: Math.random() * 0.01 + 0.003,
          twinkleOffset: Math.random() * Math.PI * 2,
          trail: hyperspaceMode ? [] : undefined,
        })
      }
      starsRef.current = stars
    }

    const createShootingStar = () => {
      if (Math.random() > 0.985 && shootingStarsRef.current.length < 2) {
        const side = Math.floor(Math.random() * 4)
        let x, y, vx, vy

        switch (side) {
          case 0:
            x = Math.random() * canvas.width
            y = 0
            vx = (Math.random() - 0.5) * 2.5
            vy = Math.random() * 2 + 1.2
            break
          case 1:
            x = canvas.width
            y = Math.random() * canvas.height
            vx = -(Math.random() * 2 + 1.2)
            vy = (Math.random() - 0.5) * 2.5
            break
          case 2:
            x = Math.random() * canvas.width
            y = canvas.height
            vx = (Math.random() - 0.5) * 2.5
            vy = -(Math.random() * 2 + 1.2)
            break
          default:
            x = 0
            y = Math.random() * canvas.height
            vx = Math.random() * 2 + 1.2
            vy = (Math.random() - 0.5) * 2.5
        }

        shootingStarsRef.current.push({
          x,
          y,
          vx,
          vy,
          life: 0,
          maxLife: Math.random() * 60 + 50,
        })
      }
    }

    const animate = () => {
      const lerpFactor = 0.15
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerpFactor
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerpFactor

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5,
      )
      bgGradient.addColorStop(0, "rgba(10, 15, 35, 0.03)")
      bgGradient.addColorStop(0.5, "rgba(5, 10, 25, 0.05)")
      bgGradient.addColorStop(1, "rgba(0, 5, 15, 0.08)")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nebulaCloudsRef.current.forEach((cloud) => {
        cloud.x += cloud.drift.x
        cloud.y += cloud.drift.y

        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius
        if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius
        if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius

        const nebulaGradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius)
        nebulaGradient.addColorStop(0, cloud.color.replace(/[\d.]+\)$/g, `${cloud.opacity * opacity})`))
        nebulaGradient.addColorStop(0.4, cloud.color.replace(/[\d.]+\)$/g, `${cloud.opacity * 0.5 * opacity})`))
        nebulaGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = nebulaGradient
        ctx.fillRect(cloud.x - cloud.radius, cloud.y - cloud.radius, cloud.radius * 2, cloud.radius * 2)
      })

      ctx.translate(canvas.width / 2, canvas.height / 2)

      const currentSpeed = hyperspaceMode ? speed * 3 : speed * 0.35 + blurAmount * 0.25
      const time = Date.now() * 0.001

      starsRef.current.forEach((star) => {
        star.prevZ = star.z
        star.z -= currentSpeed

        if (star.z <= 10) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * Math.sqrt(Math.random())
          const maxDist = Math.max(canvas.width, canvas.height)
          star.x = Math.cos(angle) * distance * maxDist - canvas.width / 2
          star.y = Math.sin(angle) * distance * maxDist - canvas.height / 2
          star.z = 1500
          star.prevZ = 1500
          if (star.trail) star.trail = []
        }

        const x = (star.x / star.z) * 1200
        const y = (star.y / star.z) * 1200
        const prevX = (star.x / star.prevZ) * 1200
        const prevY = (star.y / star.prevZ) * 1200

        const depthFactor = Math.max(0, Math.min(1, 1 - star.z / 1500))
        const size = depthFactor * star.size * (hyperspaceMode ? 3 : 2.2)

        if (size <= 0.01) return

        const twinkle = (Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7) * 0.5 + 0.5
        const starOpacity = depthFactor * star.opacity * twinkle * opacity

        const mouseInfluence = 0.00006
        const dx = smoothMouseRef.current.x - canvas.width / 2
        const dy = smoothMouseRef.current.y - canvas.height / 2
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        const easedInfluence = mouseInfluence * (1 - normalizedDistance * 0.5)
        const adjustedX = x + dx * easedInfluence * (1500 - star.z)
        const adjustedY = y + dy * easedInfluence * (1500 - star.z)

        if (hyperspaceMode && star.trail) {
          star.trail.push({ x: adjustedX, y: adjustedY, opacity: starOpacity })
          if (star.trail.length > 12) star.trail.shift()

          star.trail.forEach((point, index) => {
            const trailOpacity = point.opacity * (index / star.trail!.length) * 0.6
            const trailSize = size * (index / star.trail!.length) * 0.8
            if (trailSize > 0.01) {
              ctx.fillStyle = `${star.color.replace("rgb", "rgba").replace(")", `, ${trailOpacity})`)}`
              ctx.shadowColor = star.color
              ctx.shadowBlur = size * 1.5
              ctx.beginPath()
              ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2)
              ctx.fill()
            }
          })
        }

        if (!hyperspaceMode) {
          const trailLength = Math.abs(adjustedX - prevX) + Math.abs(adjustedY - prevY)
          if (trailLength > 0.5) {
            ctx.strokeStyle = `${star.color.replace("rgb", "rgba").replace(")", `, ${starOpacity * 0.4})`)}`
            ctx.lineWidth = size * 0.5
            ctx.shadowColor = star.color
            ctx.shadowBlur = size * 2
            ctx.beginPath()
            ctx.moveTo(prevX, prevY)
            ctx.lineTo(adjustedX, adjustedY)
            ctx.stroke()
          }
        }

        ctx.fillStyle = `${star.color.replace("rgb", "rgba").replace(")", `, ${starOpacity})`)}`
        ctx.shadowColor = star.color
        ctx.shadowBlur = size * 5
        ctx.beginPath()
        ctx.arc(adjustedX, adjustedY, size * 0.7, 0, Math.PI * 2)
        ctx.fill()

        if (size > 1.2) {
          ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity * 0.9})`
          ctx.shadowBlur = size * 3
          ctx.beginPath()
          ctx.arc(adjustedX, adjustedY, size * 0.35, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
      })

      ctx.setTransform(1, 0, 0, 1, 0, 0)

      createShootingStar()
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.x += star.vx
        star.y += star.vy
        star.life++

        const lifeRatio = star.life / star.maxLife
        const easedLifeRatio = 1 - Math.pow(lifeRatio, 1.8)
        const shootingStarOpacity = easedLifeRatio * opacity

        if (star.life >= star.maxLife) return false

        const gradient = ctx.createLinearGradient(star.x, star.y, star.x - star.vx * 25, star.y - star.vy * 25)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStarOpacity * 0.95})`)
        gradient.addColorStop(0.2, `rgba(230, 240, 255, ${shootingStarOpacity * 0.7})`)
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${shootingStarOpacity * 0.4})`)
        gradient.addColorStop(1, "rgba(180, 200, 255, 0)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2.5
        ctx.shadowColor = "#ffffff"
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - star.vx * 25, star.y - star.vy * 25)
        ctx.stroke()

        ctx.fillStyle = `rgba(255, 255, 255, ${shootingStarOpacity})`
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.arc(star.x, star.y, 2.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0

        return true
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createNebulaClouds()
    createStars()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createNebulaClouds()
      createStars()
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [blurAmount, speed, hyperspaceMode, starCount, opacity])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${blurAmount > 0 ? "blur-sm" : ""}`} />
}
