export function getPersonalInfo() {
  return {
    name: "Karim Youssef",
    title: "Full-Stack Developer & Business Owner",
    location: "Edmonton, AB, Canada",
    avatar: "/professional-headshot.png",
    email: "karim@example.com",
    phone: "+1 (780) 123-4567",
    workingHours: "Mon-Fri, 9AM-6PM MST",
    availableForWork: true,
    badges: ["Full-Stack Developer", "Business Owner", "CPA Track", "QuickBooks Expert"],
    social: [
      { platform: "github", url: "https://github.com/karimyoussef" },
      { platform: "linkedin", url: "https://linkedin.com/in/karimyoussef" },
      { platform: "email", url: "mailto:karim@example.com" },
    ],
  }
}

export function getAboutInfo() {
  return {
    focus: [
      "Full-stack web development with modern frameworks",
      "Business operations and financial management",
      "Data analytics and business intelligence",
      "Client relationship management and project delivery",
    ],
    languages: [
      { name: "English", proficiency: "Native", level: 100 },
      { name: "Arabic", proficiency: "Native", level: 100 },
      { name: "French", proficiency: "Conversational", level: 70 },
    ],
  }
}
