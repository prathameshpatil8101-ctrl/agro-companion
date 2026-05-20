CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "anyone can read feedback" ON public.feedback FOR SELECT USING (true);