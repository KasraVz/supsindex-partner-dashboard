-- Add temporary policies to view sample data for demonstration
-- This allows viewing sample affiliation codes and usage data without authentication

-- Add policy to view sample affiliation codes
CREATE POLICY "Allow viewing sample affiliation codes for demo" 
ON public.affiliation_codes 
FOR SELECT 
USING (
  partner_id IN (
    '550e8400-e29b-41d4-a716-446655440000',  -- Individual Partner Sample
    '550e8400-e29b-41d4-a716-446655440001'   -- Organizational Partner Sample
  )
);

-- Add policy to view sample affiliation usage
CREATE POLICY "Allow viewing sample usage data for demo" 
ON public.affiliation_usage 
FOR SELECT 
USING (
  code_id IN (
    SELECT id FROM affiliation_codes 
    WHERE partner_id IN (
      '550e8400-e29b-41d4-a716-446655440000',  -- Individual Partner Sample
      '550e8400-e29b-41d4-a716-446655440001'   -- Organizational Partner Sample
    )
  )
);