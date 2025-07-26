"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { TypingAnimation } from "./typing-animation"
import { CommandOutput } from "./command-output"
import { downloadResumeFile } from "@/utils/resume-generator"

interface Command {
  input: string
  output: string
  timestamp: Date
}

const COMMANDS = {
  help: `Available commands:
  about      - Learn about me
  projects   - View my projects
  skills     - See my technical skills
  experience - View my work experience
  education  - See my educational background
  contact    - Get my contact information
  email      - Open email client or copy email address
  resume     - Download my resume
  clear      - Clear the terminal
  whoami     - Display current user
  ls         - List available sections
  cat        - Display file contents (e.g., cat about.txt)`,

  email: `📧 Email Contact:

Primary: shivakalyankar13@gmail.com

Click the email above to open your email client, or:
• Copy the email address manually
• Use your preferred email app
• Send me a message on LinkedIn or other social platforms

If the email link doesn't work on your device:
1. Copy: shivakalyankar13@gmail.com
2. Open your email app manually
3. Paste the email address in the "To" field

💡 Tip: Try the 'contact' command for all contact options!`,

  about: `Hi! I'm Shiva Shankar Prasad K 👋

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
Medium: https://medium.com/@shivakalyankar13`,

  projects: `🚀 Featured Projects:

1. Gesture Based PPT Controller
   • Developed using OpenCV and Python
   • Controls PowerPoint presentations through hand gestures
   • 95% accuracy in gesture recognition
   • Used in tech fests and demos
   • Tech: Python, OpenCV, Computer Vision

2. Quiz Application
   • Dynamic and responsive quiz app
   • Built with ReactJS and NodeJS
   • Integrated with Supabase for real-time data
   • Features: Admin controls, real-time scoring, user auth
   • Tech: React, Node.js, Supabase

3. MERN Stack Web Applications
   • Built scalable web apps during internship
   • Improved performance by 30%
   • Tech: MongoDB, Express.js, React.js, Node.js`,

  skills: `💻 Technical Skills:

Frontend:
  • React.js, Angular, HTML5, CSS3, JavaScript (ES6+)
  • Responsive Design, UI/UX

Backend:
  • Node.js, Express.js
  • RESTful API Development
  • Database: PostgreSQL, MongoDB

Data Science & ML:
  • Python, OpenCV
  • Machine Learning algorithms
  • Data Analysis and Visualization

Tools & Technologies:
  • Git/GitHub, Firebase, Supabase
  • MERN Stack Development

🤝 Soft Skills:
  • Leadership and Team Coordination
  • Problem-Solving
  • Technical Writing
  • Cross-functional Collaboration`,

  experience: `💼 Work Experience:

MERN Stack Developer (Internship)
Ceeras | Remote | Feb 2025 - Jun 2025

• Built and maintained scalable web applications using Firebase, 
  Express.js, React.js, and Node.js
• Improved application performance and UI responsiveness by 30% 
  through code optimization
• Collaborated with cross-functional teams to deliver features 
  ahead of deadlines
• Led team during internship project, managing end-to-end execution

🏆 Leadership:
• Team Lead – Internship Project
  Successfully managed project execution, coordinated development 
  efforts, and ensured on-time delivery with high code quality`,

  education: `🎓 Education:

Bachelor of Computer Science (Data Science)
Ballari Institute of Technology and Management
2022 - 2026

📚 Extra-Curricular Activities:

• Technical Writer on Medium
  Regularly publish articles on emerging technologies and industry 
  trends, simplifying complex concepts for wider audience

• Active Member – Research Innovation Club, C.O.D.E
  Engage in collaborative tech initiatives, brainstorming sessions, 
  and innovation-driven projects`,

  contact: `📧 Contact Information:

Email: shivakalyankar13@gmail.com
Phone: +91 8139952301
Location: Ballari, Karnataka, India

🔗 Connect with me:
LinkedIn: https://www.linkedin.com/in/shiva-shankar-prasad-k-99925a246/
GitHub: https://github.com/kshivashankarprasad024
Medium: https://medium.com/@shivakalyankar13

💬 Feel free to reach out for:
• Collaboration opportunities
• Technical discussions
• Tech blogging collaborations
• Internship/Job opportunities`,

  whoami: "shiva@portfolio:~$",

  ls: `about.txt    projects.txt    skills.txt    experience.txt
education.txt    contact.txt    resume.pdf`,

  clear: "CLEAR_COMMAND",
  resume: `DOWNLOAD_RESUME`,
}

export function Terminal() {
  const [commands, setCommands] = useState<Command[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const welcomeMessage = `
╔══════════════════════════════════════════════════════════════╗
║                    SHIVA'S TERMINAL PORTFOLIO                ║
║                                                              ║
║  Welcome to my interactive developer portfolio!             ║
║  Type 'help' to see available commands.                     ║
║                                                             ║
║  > Aspiring Software Developer                              ║
║  > MERN Stack Enthusiast                                    ║
║  > Tech Blogger                                             ║
╚══════════════════════════════════════════════════════════════╝

Type 'help' to get started...
`

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  const handleCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase()
    let output = ""

    if (trimmedInput === "clear") {
      setCommands([])
      setShowWelcome(false)
      return
    }

    if (trimmedInput === "resume") {
      // Trigger resume download
      downloadResumeFile()
      output = `📄 Resume Download:

✅ Downloading Shiva_Shankar_Prasad_K_Resume.txt...
📁 File saved to your Downloads folder!

The resume includes:
• Complete professional summary
• Technical skills and experience
• Project details and achievements
• Contact information and social links

You can also view sections individually:
• cat about.txt     - Personal introduction
• cat experience.txt - Work experience  
• cat education.txt  - Educational background
• cat skills.txt     - Technical & soft skills
• cat projects.txt   - Featured projects
• cat contact.txt    - Contact & social links`
    } else if (trimmedInput.startsWith("cat ")) {
      const file = trimmedInput.substring(4)
      const commandName = file.replace(".txt", "").replace(".pdf", "")
      output = COMMANDS[commandName as keyof typeof COMMANDS] || `cat: ${file}: No such file or directory`
    } else {
      output =
        COMMANDS[trimmedInput as keyof typeof COMMANDS] ||
        `Command not found: ${trimmedInput}. Type 'help' for available commands.`
    }

    const newCommand: Command = {
      input: trimmedInput,
      output,
      timestamp: new Date(),
    }

    setCommands((prev) => [...prev, newCommand])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      handleCommand(currentInput)
      setCurrentInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const availableCommands = Object.keys(COMMANDS)
      const matches = availableCommands.filter((cmd) => cmd.startsWith(currentInput.toLowerCase()))
      if (matches.length === 1) {
        setCurrentInput(matches[0])
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-4">
      <div
        ref={terminalRef}
        className="max-w-4xl mx-auto bg-black rounded-lg shadow-2xl border border-green-500/30 overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-green-500/30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-300 text-sm ml-4">shiva@portfolio:~</div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 h-[80vh] overflow-y-auto">
          {showWelcome && (
            <TypingAnimation text={welcomeMessage} speed={20} className="text-cyan-400 whitespace-pre-line mb-4" />
          )}

          {commands.map((command, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-cyan-400">shiva@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ </span>
                <span className="text-green-400">{command.input}</span>
              </div>
              <CommandOutput output={command.output} />
            </div>
          ))}

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-cyan-400">shiva@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-green-400 flex-1 ml-1 caret-green-400"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="animate-pulse text-green-400">█</span>
          </form>
        </div>
      </div>

      {/* Mobile Instructions */}
      <div className="mt-4 text-center text-gray-500 text-sm md:hidden">Tap the terminal to start typing commands</div>
    </div>
  )
}
