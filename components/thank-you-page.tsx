"use client"

import { Button } from "@/components/ui/button"

interface ThankYouPageProps {
  onPrevious: () => void
}

export function ThankYouPage({ onPrevious }: ThankYouPageProps) {
  const handleContinue = () => {
    window.location.href = "https://bshape-risk-assesment.vercel.app/questionnaire"
  }

  return (
    <div className="container-content min-h-screen py-8">
      <div className="card-container text-center">
        <div className="border-2 border-purple-400 rounded-2xl p-8 md:p-12 mb-8">
          <h1 className="text-heading-lg text-black mb-6 font-merriweather">
            Thank you for sharing your strengths and what's been going well.
          </h1>

          <div className="space-y-6 text-body-lg text-gray-800">
            <p>
              In this next section, we'll ask a few questions about your safety, well-being, and any challenges that may
              be affecting you.
            </p>

            <p>
              These questions are important for understanding the full picture and ensuring you have the right support,
              if needed.
            </p>

            <p>
              Some of the topics may be sensitive — please take your time, and know that your responses are confidential
              and important.
            </p>
          </div>
        </div>

        {/* Navigation - Mobile first design */}
        <div>
          {/* Mobile: Stacked buttons */}
          <div className="flex flex-col space-y-3 md:hidden">
            <Button variant="backButton" onClick={onPrevious} className="w-full py-3 px-6">
              <span>← Back</span>
            </Button>
            <Button
              onClick={handleContinue}
              className="w-full py-3 px-6 bg-[#f28132] hover:bg-[#e06b1f] text-white rounded-full font-semibold"
            >
              <span>Continue ⟶</span>
            </Button>
          </div>

          {/* Desktop: Side by side buttons */}
          <div className="hidden md:flex justify-between items-center">
            <Button variant="backButton" onClick={onPrevious} className="flex items-center space-x-2 py-3 px-6">
              <span>← Back</span>
            </Button>
            <Button
              onClick={handleContinue}
              className="flex items-center space-x-2 py-3 px-6 bg-[#f28132] hover:bg-[#e06b1f] text-white rounded-full font-semibold"
            >
              <span>Continue ⟶</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
