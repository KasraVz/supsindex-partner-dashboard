-- Add report content field to affiliation_usage table
ALTER TABLE public.affiliation_usage 
ADD COLUMN report_content TEXT,
ADD COLUMN report_url TEXT;

-- Update sample data with some report content for demonstration
UPDATE public.affiliation_usage 
SET 
  report_content = 'Sample report content for ' || user_name || '. Assessment completed successfully with detailed insights and recommendations.',
  report_url = 'https://example.com/reports/' || id
WHERE report_status = 'sent' OR report_status = 'generated';