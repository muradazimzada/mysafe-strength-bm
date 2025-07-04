"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { AssessmentData } from "@/lib/types"

interface AssessmentContextType {
  state: AssessmentData
  dispatch: React.Dispatch<AssessmentAction>
  saveProgress: () => Promise<void>
}

type AssessmentAction =
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "UPDATE_RESPONSE"; payload: { questionId: string; value: any } }
  | { type: "SET_USER_ID"; payload: string }
  | { type: "SET_COMPLETED"; payload: boolean }
  | { type: "LOAD_DATA"; payload: Partial<AssessmentData> }

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

const initialState: AssessmentData = {
  currentStep: 0,
  responses: {},
  userId: "",
  isCompleted: false,
}

function assessmentReducer(state: AssessmentData, action: AssessmentAction): AssessmentData {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload }
    case "UPDATE_RESPONSE":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.payload.questionId]: action.payload.value,
        },
      }
    case "SET_USER_ID":
      return { ...state, userId: action.payload }
    case "SET_COMPLETED":
      return { ...state, isCompleted: action.payload }
    case "LOAD_DATA":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState)

  // Generate user ID on mount
  useEffect(() => {
    if (!state.userId) {
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      dispatch({ type: "SET_USER_ID", payload: userId })
    }
  }, [state.userId])

  const saveProgress = async () => {
    if (!state.userId) return

    try {
      // For now, save to localStorage as fallback when database is not available
      const progressData = {
        userId: state.userId,
        responses: state.responses,
        currentStep: state.currentStep,
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem("assessment_progress", JSON.stringify(progressData))

      // Try to save to database if available
      try {
        const response = await fetch("/api/assessment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: state.userId,
            responses: state.responses,
          }),
        })

        if (!response.ok) {
          console.warn("Database save failed, using localStorage backup")
        }
      } catch (dbError) {
        console.warn("Database not available, using localStorage:", dbError)
      }
    } catch (error) {
      console.error("Error saving progress:", error)
    }
  }

  return <AssessmentContext.Provider value={{ state, dispatch, saveProgress }}>{children}</AssessmentContext.Provider>
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider")
  }
  return context
}
