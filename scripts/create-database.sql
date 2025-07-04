-- Create the assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  responses JSONB NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);

-- Create index on completed_at for analytics
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON assessments(completed_at);
