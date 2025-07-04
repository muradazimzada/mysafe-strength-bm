"use client"

import { useState } from "react"
import { AssessmentProvider, useAssessment } from "@/contexts/assessment-context"
import { ProgressIndicator } from "@/components/progress-indicator"
import { WelcomePage } from "@/components/welcome-page"
import { AssessmentStepComponent } from "@/components/assessment-step"
import { FeedbackPage } from "@/components/feedback-page"
import { ThankYouPage } from "@/components/thank-you-page"
import { assessmentSteps } from "@/lib/assessment-data"

function AssessmentFlow() {
  const { dispatch } = useAssessment()
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = assessmentSteps.length + 3 // Welcome + steps + feedback + thank you

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      dispatch({ type: "SET_CURRENT_STEP", payload: nextPage })
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1
      setCurrentPage(prevPage)
      dispatch({ type: "SET_CURRENT_STEP", payload: prevPage })
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentPage(stepIndex)
    dispatch({ type: "SET_CURRENT_STEP", payload: stepIndex })
  }

  const renderCurrentPage = () => {
    if (currentPage === 0) {
      return <WelcomePage onNext={handleNext} />
    }

    if (currentPage === totalPages - 2) {
      return <FeedbackPage onPrevious={handlePrevious} onNext={handleNext} />
    }

    if (currentPage === totalPages - 1) {
      return <ThankYouPage onPrevious={handlePrevious} />
    }

    const stepIndex = currentPage - 1
    const step = assessmentSteps[stepIndex]

    return (
      <div>
        <div className="container-main pt-4">
          <ProgressIndicator onStepClick={handleStepClick} />
        </div>
        <AssessmentStepComponent
          step={step}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentPage === 1}
          isLast={currentPage === totalPages - 3}
        />
      </div>
    )
  }

  return <div className="min-h-screen bg-cream">{renderCurrentPage()}</div>
}

export default function Home() {
  return (
    <AssessmentProvider>
      <AssessmentFlow />
    </AssessmentProvider>
  )
}
