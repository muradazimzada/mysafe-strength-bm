"use client"

import { Button } from "@/components/ui/button"
import { useAssessment } from "@/contexts/assessment-context"
import { Download, Printer } from "lucide-react"
import Image from "next/image"

interface FeedbackPageProps {
  onPrevious: () => void
  onNext: () => void
}

export function FeedbackPage({ onPrevious, onNext }: FeedbackPageProps) {
  const { state } = useAssessment()

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Create a simple text version of the feedback
    const content = generateFeedbackContent()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-safestrengths-feedback.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateFeedbackContent = () => {
    return `
My SafeStrengths - Personal Feedback Report

CELEBRATE WHAT MAKES YOU STRONG

Personal Strengths:
${state.responses.personal_admire || "You haven't shared this yet."}

Personal Qualities:
${state.responses.personal_qualities || "You haven't shared this yet."}

Talents and Skills:
${Array.isArray(state.responses.talents_skills) ? state.responses.talents_skills.filter(Boolean).join(", ") : "You haven't shared this yet."}

Coping Strategies:
${state.responses.coping_activities || "You haven't shared this yet."}

Social Support:
${state.responses.rely_on_support || "You haven't shared this yet."}

Growth and Resilience:
${state.responses.personal_growth || "You haven't shared this yet."}

Remember: Every small action you take is a step toward healing and growth. 
You are capable, resilient, and deserving of care.

© 2025 BSHAPE Research Study
    `.trim()
  }

  const getFeedbackItem = (key: string, defaultText: string, nextStep: string) => ({
    shared: state.responses[key] || defaultText,
    nextStep,
  })

  const feedbackItems = [
    {
      title: "Celebrate What Makes You Strong",
      image: "/images/celebration.jpg",
      ...getFeedbackItem(
        "personal_admire",
        "You haven't shared this yet.",
        "Write down 3 things you admire or like about yourself. Keep this list visible to remind yourself of your strength.",
      ),
    },
    {
      title: "Use Your Strengths Every Day",
      image: "/images/superhero-shadow.jpg",
      ...getFeedbackItem(
        "personal_qualities",
        "You haven't shared this yet.",
        "Think about how these qualities have helped you before and use them again.",
      ),
    },
    {
      title: "Do What Brings You Joy",
      image: "/images/self-care.jpg",
      ...getFeedbackItem("enjoy_doing", "You haven't shared this yet.", "Spend 15 minutes daily doing what you love."),
    },
    {
      title: 'Create a "Calm Routine"',
      image: "/images/meditation.jpg",
      ...getFeedbackItem(
        "coping_activities",
        "You haven't shared this yet.",
        "Try relaxation methods like deep breathing, stretching, or quiet time.",
      ),
    },
    {
      title: "Lean on Trusted People",
      image: "/images/community-heart.jpg",
      ...getFeedbackItem("rely_on_support", "You haven't shared this yet.", "Reach out to someone you trust"),
    },
    {
      title: "Reflect on Your Growth",
      image: "/images/growth-resilience.jpg",
      ...getFeedbackItem(
        "personal_growth",
        "You haven't shared this yet.",
        "Write down one way you've grown and celebrate it.",
      ),
    },
  ]

  return (
    <div className="container-content min-h-screen py-8">
      <div className="card-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-heading-lg text-primary mb-4 font-bryndan">Celebrate What Makes You Strong</h1>

          <div className="flex justify-center space-x-4 mb-8">
            <Button onClick={handlePrint} variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </Button>
            <Button onClick={handleDownload} variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>

        {/* Feedback content */}
        <div className="space-y-8 mb-12">
          <div className="text-center text-body-lg">
            <p className="mb-4">
              You've already shown incredible strength by reflecting on your experiences and exploring ways to move
              forward. This personalized guide highlights what you've shared and offers simple steps to support your
              health, safety, and well-being.
            </p>
          </div>

          {feedbackItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-heading-md text-primary mb-3">{item.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-700">What you shared:</p>
                      <p className="text-gray-600 italic">{item.shared}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Next step:</p>
                      <p className="text-gray-800">{item.nextStep}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Remember section - replacing the empowerment image */}
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center border-2 border-gray-200">
            <h3 className="text-heading-md mb-4 text-primary">Remember:</h3>
            <p className="text-body-lg text-gray-800">
              Every small action you take is a step toward healing and growth. You are capable, resilient, and deserving
              of care.
            </p>
          </div>
        </div>

        {/* Navigation - Mobile first design */}
        <div>
          {/* Mobile: Stacked buttons */}
          <div className="flex flex-col space-y-3 md:hidden">
            <Button onClick={onPrevious} className="btn-back-mobile w-full">
              <span>← Back</span>
            </Button>
            <Button onClick={onNext} className="btn-primary w-full">
              <span>Continue ⟶</span>
            </Button>
          </div>

          {/* Desktop: Side by side buttons */}
          <div className="hidden md:flex justify-between">
            <Button onClick={onPrevious} className="btn-back flex items-center space-x-2">
              <span>← Back</span>
            </Button>
            <Button onClick={onNext} className="btn-primary flex items-center space-x-2">
              <span>Continue ⟶</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
