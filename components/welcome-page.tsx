"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface WelcomePageProps {
  onNext: () => void
}

export function WelcomePage({ onNext }: WelcomePageProps) {
  return (
    <div className="container-content min-h-screen py-8">
      <div className="card-container text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-64 h-32 md:w-80 md:h-40 relative">
            <Image src="/images/bshape-logo.jpg" alt="BSHAPE Research Study" fill className="object-contain" />
          </div>
        </div>

        {/* Welcome content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-heading-xl font-bryndan">
            Welcome to
            <br />
            <span className="text-primary">My SafeStrengths</span>
          </h1>

          <div className="text-body-lg space-y-4 max-w-3xl mx-auto">
            <h2 className="text-heading-md text-primary">Strengths Assessment and Feedback</h2>

            <p>
              Let's take a moment to focus on what makes you unique and resilient. Everyone has strengths—qualities that
              help them overcome challenges and thrive. This conversation is about recognizing those strengths and how
              they contribute to your overall health, safety and well-being.
            </p>
          </div>
        </div>

        {/* Begin button */}
        <Button onClick={onNext} className="btn-primary btn-heartbeat text-lg px-8 py-4">
          Begin Assessment
          <span className="ml-2">⟶</span>
        </Button>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
          <p>© 2025 BSHAPE. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}
