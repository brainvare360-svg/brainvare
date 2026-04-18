-- Enquiries table for contact form submissions
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK(status IN ('new', 'read', 'replied')),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
