import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export interface AssessmentResponse {
  id?: number
  user_id: string
  responses: Record<string, any>
  completed_at?: Date
  created_at?: Date
  updated_at?: Date
}

export async function saveAssessmentResponse(
  userId: string,
  responses: Record<string, any>,
): Promise<AssessmentResponse> {
  const client = await pool.connect()
  try {
    const result = await client.query("INSERT INTO assessments (user_id, responses) VALUES ($1, $2) RETURNING *", [
      userId,
      JSON.stringify(responses),
    ])
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function updateAssessmentResponse(
  userId: string,
  responses: Record<string, any>,
): Promise<AssessmentResponse> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      "UPDATE assessments SET responses = $2, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *",
      [userId, JSON.stringify(responses)],
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function getAssessmentResponse(userId: string): Promise<AssessmentResponse | null> {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM assessments WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1", [
      userId,
    ])
    return result.rows[0] || null
  } finally {
    client.release()
  }
}
