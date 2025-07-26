export const generateResumePDF = () => {
  // For a more professional approach, we'll create a formatted text version
  // In a real implementation, you could use libraries like jsPDF or react-pdf
  const resumeContent = `SHIVA SHANKAR PRASAD K
+91 8139952301 ⋄ Ballari, Karnataka, India
shivakalyankar13@gmail.com
LinkedIn: https://www.linkedin.com/in/shiva-shankar-prasad-k-99925a246/
GitHub: https://github.com/kshivashankarprasad024
Medium: https://medium.com/@shivakalyankar13

═══════════════════════════════════════════════════════════════════

OBJECTIVE
═══════════════════════════════════════════════════════════════════
Aspiring software developer with a passion for coding, tech blogging, 
and building real-world projects. Looking to join a forward-thinking team where I 
can apply my technical skills, learn from experienced professionals, and contribute 
meaningfully to software development initiatives.

EDUCATION
═══════════════════════════════════════════════════════════════════
Bachelor of Computer Science (Data Science)
Ballari Institute of Technology and Management
2022 - 2026

SKILLS
═══════════════════════════════════════════════════════════════════
Technical Skills:
• MERN Stack (MongoDB, Express.js, React.js, Node.js)
• Angular Framework
• PostgreSQL Database Management
• RESTful API Development
• Data Science and Machine Learning
• Python, OpenCV
• Firebase, Supabase

Soft Skills:
• Leadership and Team Coordination
• Problem-Solving
• Technical Writing
• Cross-functional Collaboration

EXPERIENCE
═══════════════════════════════════════════════════════════════════
MERN Stack Developer (Internship)
Ceeras | Remote | Feb 2025 - Jun 2025

• Built and maintained scalable web applications using Firebase, Express.js, 
  React.js, and Node.js
• Improved application performance and UI responsiveness by 30% through 
  code optimization
• Collaborated with cross-functional teams to deliver features ahead of deadlines
• Led team during internship project, managing end-to-end execution

PROJECTS
═══════════════════════════════════════════════════════════════════
1. Gesture Based PPT Controller
   • Developed a system using OpenCV and Python to control PowerPoint 
     presentations through hand gestures without physical input devices
   • Achieved over 95% accuracy in gesture recognition
   • Used in tech fests and demos, improving presentation interactivity 
     and accessibility
   • Technologies: Python, OpenCV, Computer Vision

2. Quiz Application
   • Built a dynamic and responsive quiz application using ReactJS and NodeJS
   • Integrated with Supabase for backend and real-time data handling
   • Features: Admin-controlled question management, real-time scoring, 
     user authentication
   • Successfully deployed and tested by multiple users with positive 
     feedback for UI/UX and performance
   • Technologies: React.js, Node.js, Supabase

EXTRA-CURRICULAR ACTIVITIES
═══════════════════════════════════════════════════════════════════
• Technical Writer on Medium
  Regularly publish articles focused on emerging technologies and industry 
  trends, aiming to simplify complex concepts for a wider audience

• Active Member – Research Innovation Club, C.O.D.E
  Engage in collaborative tech initiatives, brainstorming sessions, and 
  innovation-driven projects that encourage critical thinking and problem-solving

LEADERSHIP
═══════════════════════════════════════════════════════════════════
• Team Lead – Internship Project
  Successfully led a team during an internship, managing end-to-end project 
  execution, coordinating development efforts, and ensuring on-time delivery 
  with high code quality and collaboration

═══════════════════════════════════════════════════════════════════
Generated from Terminal Portfolio - ${new Date().toLocaleDateString()}
Contact: shivakalyankar13@gmail.com | +91 8139952301`

  return resumeContent
}

export const downloadResumeFile = () => {
  const content = generateResumePDF()
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
  const url = window.URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = "Shiva_Shankar_Prasad_K_Resume.txt"
  link.style.display = "none"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Clean up the URL object
  setTimeout(() => {
    window.URL.revokeObjectURL(url)
  }, 100)
}
