"use client"

import { TypingAnimation } from "./typing-animation"
import Image from "next/image"

interface CommandOutputProps {
  output: string
}

export function CommandOutput({ output }: CommandOutputProps) {
  if (output === "CLEAR_COMMAND") {
    return null
  }

  // Function to render text with clickable links and emails
  const renderWithLinks = (text: string) => {
    // Split text by URLs and emails
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0.0-]+\.[a-zA-Z]{2,})/g

    // Create a combined regex to split by both URLs and emails
    const combinedRegex = /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

    const parts = text.split(combinedRegex).filter(Boolean)

    return parts.map((part, index) => {
      if (part && part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300 transition-colors cursor-pointer"
            onClick={(e) => {
              console.log("URL clicked:", part)
            }}
          >
            {part}
          </a>
        )
      } else if (part && part.match(emailRegex)) {
        return (
          <a
            key={index}
            href={`mailto:${part}?subject=Portfolio Contact&body=Hi Shiva,%0D%0A%0D%0AI found your portfolio and would like to connect.%0D%0A%0D%0ABest regards`}
            className="text-cyan-400 underline hover:text-cyan-300 transition-colors cursor-pointer"
            onClick={(e) => {
              console.log("Email clicked:", part)
              // Fallback for mobile or if mailto doesn't work
              if (navigator.share) {
                e.preventDefault()
                navigator
                  .share({
                    title: "Contact Shiva",
                    text: `Email: ${part}`,
                    url: `mailto:${part}`,
                  })
                  .catch(() => {
                    // If sharing fails, try to copy to clipboard
                    navigator.clipboard
                      .writeText(part)
                      .then(() => {
                        alert(`Email ${part} copied to clipboard!`)
                      })
                      .catch(() => {
                        alert(`Please email me at: ${part}`)
                      })
                  })
              }
            }}
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  // Special handling for about command to include profile image and links
  if (output.includes("Hi! I'm Shiva Shankar Prasad K")) {
    const aboutText = `Hi! I'm Shiva Shankar Prasad K 👋

I'm an aspiring software developer with a passion for coding, tech blogging, 
and building real-world projects. Currently pursuing my Bachelor's in 
Computer Science (Data Science) at Ballari Institute of Technology and 
Management.

I love creating innovative solutions and have experience in full-stack 
development, machine learning, and gesture-based applications. When I'm 
not coding, you can find me writing technical articles on Medium or 
participating in tech communities.

🎯 Objective: Looking to join a forward-thinking team where I can apply 
my technical skills, learn from experienced professionals, and contribute 
meaningfully to software development initiatives.

📧 Email: shivakalyankar13@gmail.com

🔗 Connect with me:
LinkedIn: https://www.linkedin.com/in/shiva-shankar-prasad-k-99925a246/
GitHub: https://github.com/kshivashankarprasad024
Medium: https://medium.com/@shivakalyankar13`

    return (
      <div className="text-green-300 whitespace-pre-line">
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          <div className="flex-shrink-0">
            <Image
              src="/profile.jpg"
              alt="Shiva Shankar Prasad K"
              width={150}
              height={150}
              className="rounded-lg border-2 border-green-500/50 shadow-lg"
            />
          </div>
          <div className="flex-1">
            <div className="text-green-300 whitespace-pre-line">{renderWithLinks(aboutText)}</div>
          </div>
        </div>
      </div>
    )
  }

  // Special handling for contact command to make links and emails clickable
  if (output.includes("Connect with me:") || output.includes("shivakalyankar13@gmail.com")) {
    return <div className="text-green-300 whitespace-pre-line">{renderWithLinks(output)}</div>
  }

  // Check if output contains URLs or emails and make them clickable
  if (output.match(/(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)) {
    return <div className="text-green-300 whitespace-pre-line">{renderWithLinks(output)}</div>
  }

  return <TypingAnimation text={output} speed={30} className="text-green-300 whitespace-pre-line" />
}
