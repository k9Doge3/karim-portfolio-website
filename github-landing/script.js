// Enhanced Landing Page JavaScript with Starfield Animation

// Starfield Animation
class Starfield {
  constructor() {
    this.canvas = document.getElementById("starfield")
    this.ctx = this.canvas.getContext("2d")
    this.stars = []
    this.numStars = 200
    this.speed = 0.5

    this.resize()
    this.init()
    this.animate()

    window.addEventListener("resize", () => this.resize())
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.centerX = this.canvas.width / 2
    this.centerY = this.canvas.height / 2
  }

  init() {
    this.stars = []
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width - this.centerX,
        y: Math.random() * this.canvas.height - this.centerY,
        z: Math.random() * this.canvas.width,
        size: Math.random() * 2,
      })
    }
  }

  animate() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.stars.forEach((star) => {
      star.z -= this.speed

      if (star.z <= 0) {
        star.z = this.canvas.width
        star.x = Math.random() * this.canvas.width - this.centerX
        star.y = Math.random() * this.canvas.height - this.centerY
      }

      const k = 128 / star.z
      const px = star.x * k + this.centerX
      const py = star.y * k + this.centerY

      if (px >= 0 && px <= this.canvas.width && py >= 0 && py <= this.canvas.height) {
        const size = (1 - star.z / this.canvas.width) * star.size * 2
        const opacity = 1 - star.z / this.canvas.width

        // Create gradient for star glow
        const gradient = this.ctx.createRadialGradient(px, py, 0, px, py, size * 2)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
        gradient.addColorStop(0.5, `rgba(0, 212, 255, ${opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(0, 212, 255, 0)")

        this.ctx.fillStyle = gradient
        this.ctx.beginPath()
        this.ctx.arc(px, py, size, 0, Math.PI * 2)
        this.ctx.fill()
      }
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Initialize starfield when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Starfield()

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Navbar scroll effect
  const nav = document.querySelector(".main-nav")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      nav.style.background = "rgba(0, 0, 0, 0.95)"
      nav.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)"
    } else {
      nav.style.background = "rgba(0, 0, 0, 0.8)"
      nav.style.boxShadow = "none"
    }

    lastScroll = currentScroll
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe sections for animations
  document.querySelectorAll(".about-section, .business-section, .work-section, .contact-section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "all 0.8s ease"
    observer.observe(section)
  })

  // Add ripple effect to buttons
  document.querySelectorAll(".cta-primary, .cta-secondary, .form-submit").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)
    })
  })

  // Add CSS for ripple animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)
})

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Form submission handler
function handleSubmit(event) {
  event.preventDefault()

  const button = event.target.querySelector(".form-submit")
  const originalText = button.innerHTML

  button.innerHTML = '<span class="btn-text">Sending...</span>'
  button.disabled = true

  // Simulate form submission
  setTimeout(() => {
    button.innerHTML = '<span class="btn-text">Message Sent! ✓</span>'

    setTimeout(() => {
      button.innerHTML = originalText
      button.disabled = false
      event.target.reset()
    }, 2000)
  }, 1500)

  return false
}

// Mouse parallax effect for hero section
document.addEventListener("mousemove", (e) => {
  const heroCard = document.querySelector(".hero-card")
  if (heroCard && window.innerWidth > 968) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20
    heroCard.style.transform = `translateX(${x}px) translateY(${y}px)`
  }
})
