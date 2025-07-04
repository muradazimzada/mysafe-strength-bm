"use client"

import type { AssessmentStep } from "@/lib/types"
import { QuestionRenderer } from "./question-renderer"
import { Button } from "@/components/ui/button"
import { useAssessment } from "@/contexts/assessment-context"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

interface AssessmentStepProps {
  step: AssessmentStep
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export function AssessmentStepComponent({ step, onNext, onPrevious, isFirst, isLast }: AssessmentStepProps) {
  const { state, saveProgress } = useAssessment()

  const handleNext = async () => {
    await saveProgress()
    onNext()
  }

  const handlePrevious = () => {
    onPrevious()
  }

  const isStepComplete = () => {
    return step.questions.every((question) => {
      if (!question.required) return true
      const response = state.responses[question.id]
      if (question.type === "checkbox") {
        return Array.isArray(response) && response.length === (question.maxSelections || 1)
      }
      if (question.type === "multiple-text") {
        return Array.isArray(response) && response.some((item) => item && item.trim())
      }
      return response && response.toString().trim()
    })
  }

  return (
    <div className="container-content min-h-screen py-2">
      <div className="card-container-compact">
        {/* Step title */}
        <h2 className="text-heading-lg text-center mb-4 text-primary">{step.title}</h2>

        {/* Step image - 30% bigger */}
        {step.image && (
          <div className="flex justify-center mb-4">
            <div className="w-40 h-40 md:w-52 md:h-52 relative">
              <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-contain" />
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-4">
          {step.questions.map((question, index) => (
            <div key={question.id}>
              <QuestionRenderer question={question} />
            </div>
          ))}
        </div>

        {/* Navigation buttons - Mobile first design */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          {/* Mobile: Stacked buttons */}
          <div className="flex flex-col space-y-3 md:hidden">
            <Button variant="backButton" onClick={handlePrevious} disabled={false} className="w-full py-3 px-6">
              <span>← Back</span>
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="w-full py-3 px-6 bg-[#f28132] hover:bg-[#e06b1f] text-white rounded-full font-semibold"
            >
              <span>Continue ⟶</span>
            </Button>
          </div>

          {/* Desktop: Side by side buttons */}
          <div className="hidden md:flex justify-between items-center">
            <Button
              variant="backButton"
              onClick={handlePrevious}
              disabled={false}
              className="flex items-center space-x-2 py-3 px-6"
            >
              <span>← Back</span>
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="flex items-center space-x-2 py-3 px-6 bg-[#f28132] hover:bg-[#e06b1f] text-white rounded-full font-semibold"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
