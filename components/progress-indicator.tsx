"use client"

import { useAssessment } from "@/contexts/assessment-context"

const stepLabels = [
  "Welcome",
  "Personal Strengths",
  "Qualities & Characteristics",
  "Talents & Skills",
  "Coping",
  "Social Support",
  "Strengths in Your Environment",
  "Resilience & Growth",
  "Interests & Aspirations",
  "Feedback",
]

interface ProgressIndicatorProps {
  onStepClick?: (step: number) => void
}

export function ProgressIndicator({ onStepClick }: ProgressIndicatorProps) {
  const { state } = useAssessment()
  const totalSteps = 10
  const progress = ((state.currentStep + 1) / totalSteps) * 100

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on completed steps or current step
    if (stepIndex <= state.currentStep && onStepClick) {
      onStepClick(stepIndex)
    }
  }

  return (
    <div className="w-full mb-6">
      <div className="flex justify-center mb-4">
        <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex flex-col items-center min-w-0 flex-shrink-0">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-colors mb-2 ${
                  i <= state.currentStep
                    ? "bg-[var(--color-button)] text-white cursor-pointer hover:bg-[var(--color-primary)]"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => handleStepClick(i)}
              >
                {i + 1}
              </div>
              <div className="text-xs md:text-sm text-center max-w-20 md:max-w-24 leading-tight">{stepLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
