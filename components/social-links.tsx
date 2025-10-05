"use client"

import { Github, Linkedin, Twitter, Mail, ExternalLink, Instagram, Facebook, Youtube } from "lucide-react"

interface SocialLink {
  platform: string
  url: string
  icon?: string
}

interface SocialLinksProps {
  socialLinks: SocialLink[]
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4" />
      case "linkedin":
        return <Linkedin className="w-4 h-4" />
      case "twitter":
        return <Twitter className="w-4 h-4" />
      case "instagram":
        return <Instagram className="w-4 h-4" />
      case "facebook":
        return <Facebook className="w-4 h-4" />
      case "youtube":
        return <Youtube className="w-4 h-4" />
      case "email":
        return <Mail className="w-4 h-4" />
      default:
        return <ExternalLink className="w-4 h-4" />
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-cyan-400"
        >
          {getIcon(link.platform)}
        </a>
      ))}
    </div>
  )
}
