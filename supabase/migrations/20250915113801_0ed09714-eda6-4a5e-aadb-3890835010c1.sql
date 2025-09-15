-- Create affiliation_codes table for managing partner affiliation codes
CREATE TABLE public.affiliation_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID NOT NULL,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tests TEXT[] NOT NULL,
  discount_percent INTEGER NOT NULL DEFAULT 15,
  is_active BOOLEAN NOT NULL DEFAULT true,
  usage_count INTEGER NOT NULL DEFAULT 0,
  max_usage INTEGER,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create affiliation_usage table for tracking code usage
CREATE TABLE public.affiliation_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code_id UUID NOT NULL REFERENCES public.affiliation_codes(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  assessment_status TEXT NOT NULL DEFAULT 'not_started' CHECK (assessment_status IN ('not_started', 'in_progress', 'completed')),
  report_status TEXT NOT NULL DEFAULT 'not_generated' CHECK (report_status IN ('not_generated', 'generated', 'sent')),
  discount_amount DECIMAL(10,2),
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  report_generated_at TIMESTAMP WITH TIME ZONE,
  report_sent_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.affiliation_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliation_usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for affiliation_codes
CREATE POLICY "Partners can view their own affiliation codes" 
ON public.affiliation_codes 
FOR SELECT 
USING (auth.uid() = partner_id);

CREATE POLICY "Partners can create their own affiliation codes" 
ON public.affiliation_codes 
FOR INSERT 
WITH CHECK (auth.uid() = partner_id);

CREATE POLICY "Partners can update their own affiliation codes" 
ON public.affiliation_codes 
FOR UPDATE 
USING (auth.uid() = partner_id);

CREATE POLICY "Partners can delete their own affiliation codes" 
ON public.affiliation_codes 
FOR DELETE 
USING (auth.uid() = partner_id);

-- Create RLS policies for affiliation_usage
CREATE POLICY "Partners can view usage of their codes" 
ON public.affiliation_usage 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.affiliation_codes 
  WHERE id = code_id AND partner_id = auth.uid()
));

CREATE POLICY "System can insert usage records" 
ON public.affiliation_usage 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update usage records" 
ON public.affiliation_usage 
FOR UPDATE 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_affiliation_codes_partner_id ON public.affiliation_codes(partner_id);
CREATE INDEX idx_affiliation_codes_code ON public.affiliation_codes(code);
CREATE INDEX idx_affiliation_usage_code_id ON public.affiliation_usage(code_id);
CREATE INDEX idx_affiliation_usage_user_email ON public.affiliation_usage(user_email);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_affiliation_codes_updated_at
BEFORE UPDATE ON public.affiliation_codes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();