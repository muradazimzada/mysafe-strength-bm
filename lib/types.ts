export interface AssessmentStep {
  id: number
  title: string
  description?: string
  questions: Question[]
  image?: string
}

export interface Question {
  id: string
  type: "text" | "textarea" | "checkbox" | "radio" | "ranking" | "multiple-text"
  question: string
  description?: string
  options?: string[]
  maxSelections?: number
  required?: boolean
}

export interface AssessmentData {
  currentStep: number
  responses: Record<string, any>
  userId: string
  isCompleted: boolean
}
