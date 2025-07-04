import { type NextRequest, NextResponse } from "next/server"
import { saveAssessmentResponse, updateAssessmentResponse, getAssessmentResponse } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { userId, responses } = await request.json()

    if (!userId || !responses) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if assessment already exists
    const existing = await getAssessmentResponse(userId)

    let result
    if (existing) {
      result = await updateAssessmentResponse(userId, responses)
    } else {
      result = await saveAssessmentResponse(userId, responses)
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Error saving assessment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 })
    }

    const result = await getAssessmentResponse(userId)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Error fetching assessment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
