"use client"

import type { Question } from "@/lib/types"
import { useAssessment } from "@/contexts/assessment-context"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface QuestionRendererProps {
  question: Question
}

export function QuestionRenderer({ question }: QuestionRendererProps) {
  const { state, dispatch } = useAssessment()
  const currentValue = state.responses[question.id] || ""

  const handleChange = (value: any) => {
    dispatch({
      type: "UPDATE_RESPONSE",
      payload: { questionId: question.id, value },
    })
  }

  const getExamples = (questionId: string) => {
    if (questionId === "talents_skills") {
      return [
        "I am a good cook",
        "I am good at budgeting",
        "I am good at computers",
        "I have a good memory",
        "I know a lot about music",
        "I am good at writing poetry",
      ]
    }
    if (questionId === "environment_strengths") {
      return [
        "I have a safe and comfortable home I really like",
        "I have a good relationship with the local shopkeeper",
        "I have someone who goes with me to appointments",
        "I am part of a local church, mosque, temple or other place of my religion",
        "I have a pet I am very fond of",
        "I use local library service",
        "I have a neighbor I get on well with",
        "I have links to local healthcare facility",
      ]
    }
    if (questionId === "interests_aspirations") {
      return [
        "I would like to have a paid job",
        "I would like to be happy and settled",
        "I would like to have my own car one day",
        "I would like to learn how to cook",
        "I would like to buy a new house",
      ]
    }
    return []
  }

  const renderQuestion = () => {
    switch (question.type) {
      case "textarea":
        return (
          <div className="answer-box">
            <Textarea
              value={currentValue}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Write your response here..."
              className="min-h-[100px] text-sm md:text-base bg-white border-gray-200 focus:border-primary resize-none flex-1"
              required={question.required}
            />
          </div>
        )

      case "checkbox":
        return (
          <div className="answer-box">
            {question.description && (
              <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-3 mb-4">
                <p className="text-purple-800 font-medium">{question.description}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${question.id}-${index}`}
                    checked={Array.isArray(currentValue) && currentValue.includes(option)}
                    onCheckedChange={(checked) => {
                      const currentArray = Array.isArray(currentValue) ? currentValue : []
                      if (checked) {
                        if (question.maxSelections && currentArray.length >= question.maxSelections) {
                          return // Don't allow more selections
                        }
                        handleChange([...currentArray, option])
                      } else {
                        handleChange(currentArray.filter((item: string) => item !== option))
                      }
                    }}
                  />
                  <Label htmlFor={`${question.id}-${index}`} className="text-base cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {question.maxSelections && (
              <p className="text-sm text-gray-600 mt-4 text-center">
                Select exactly {question.maxSelections} options
                {Array.isArray(currentValue) && ` (${currentValue.length}/${question.maxSelections} selected)`}
              </p>
            )}
          </div>
        )

      case "multiple-text":
        const multipleValues = Array.isArray(currentValue) ? currentValue : ["", "", ""]
        const examples = getExamples(question.id)

        return (
          <div className="md:flex md:gap-6">
            {/* Examples box - left side on desktop */}
            {examples.length > 0 && (
              <div className="examples-box mb-4 md:mb-0 md:w-1/2">
                <h4 className="font-semibold text-gray-700 mb-3">Examples:</h4>
                <div className="space-y-2">
                  {examples.map((example, index) => (
                    <div key={index} className="text-gray-600 text-sm md:text-base">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input fields - right side on desktop */}
            <div className={`answer-box ${examples.length > 0 ? "md:w-1/2" : ""} space-y-4`}>
              {[1, 2, 3].map((num) => (
                <div key={num} className="space-y-2">
                  <Label className="text-base font-semibold text-primary">#{num}</Label>
                  <Input
                    value={multipleValues[num - 1] || ""}
                    onChange={(e) => {
                      const newValues = [...multipleValues]
                      newValues[num - 1] = e.target.value
                      handleChange(newValues)
                    }}
                    placeholder={`Write here your #${num} ${question.question.includes("aspirations") ? "top interest or aspiration" : "top talent or skill"}...`}
                    className="text-base bg-white border-gray-200 focus:border-primary"
                  />
                  {question.question.includes("aspirations") && (
                    <div className="ml-4 space-y-1">
                      <Label className="text-sm text-gray-600">Step:</Label>
                      <Input
                        value={multipleValues[num + 2] || ""}
                        onChange={(e) => {
                          const newValues = [...multipleValues]
                          newValues[num + 2] = e.target.value
                          handleChange(newValues)
                        }}
                        placeholder="Write here the first step you will need to accomplish it..."
                        className="text-sm bg-white border-gray-200 focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="answer-box">
            <Input
              value={currentValue}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Your answer..."
              className="text-sm md:text-base bg-white border-gray-200 focus:border-primary"
              required={question.required}
            />
          </div>
        )
    }
  }

  return (
    <div className="question-card">
      <div className="question-box">
        <h3 className="question-title-frame">{question.question}</h3>
        {question.description && question.type !== "checkbox" && question.type !== "multiple-text" && (
          <p className="text-gray-600 mt-2 text-body-md">{question.description}</p>
        )}
      </div>
      {renderQuestion()}
    </div>
  )
}
