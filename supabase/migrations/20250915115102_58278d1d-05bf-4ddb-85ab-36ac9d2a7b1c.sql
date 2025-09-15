-- Insert sample affiliation codes for different partner types
INSERT INTO public.affiliation_codes (
  partner_id, 
  code, 
  name, 
  tests, 
  discount_percent, 
  is_active, 
  usage_count, 
  max_usage, 
  expires_at, 
  created_at, 
  updated_at
) VALUES 
-- Individual Partner Codes
(
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'UNIV2024',
  'University Partnership',
  ARRAY['Investment Readiness', 'Leadership Potential', 'Technical Skills'],
  20,
  true,
  15,
  100,
  '2024-12-31 23:59:59+00'::timestamptz,
  '2024-01-15 10:00:00+00'::timestamptz,
  '2024-01-15 10:00:00+00'::timestamptz
),
(
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'NETWORK2024',
  'Professional Network Referral',
  ARRAY['Market Validation', 'Strategic Thinking'],
  15,
  true,
  8,
  50,
  NULL,
  '2024-02-01 09:30:00+00'::timestamptz,
  '2024-02-01 09:30:00+00'::timestamptz
),
(
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'MENTOR2024',
  'Mentorship Program',
  ARRAY['Leadership Potential', 'Financial Modeling'],
  25,
  true,
  3,
  25,
  '2024-06-30 23:59:59+00'::timestamptz,
  '2024-03-10 14:20:00+00'::timestamptz,
  '2024-03-10 14:20:00+00'::timestamptz
),
-- Organizational Partner Codes
(
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'CORP2024',
  'Corporate Assessment Package',
  ARRAY['Investment Readiness', 'Leadership Potential', 'Technical Skills', 'Market Validation'],
  30,
  true,
  45,
  200,
  NULL,
  '2024-01-20 11:15:00+00'::timestamptz,
  '2024-01-20 11:15:00+00'::timestamptz
),
(
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'TEAM2024',
  'Team Leadership Evaluation',
  ARRAY['Leadership Potential', 'Strategic Thinking'],
  20,
  true,
  22,
  100,
  '2024-09-30 23:59:59+00'::timestamptz,
  '2024-02-05 16:45:00+00'::timestamptz,
  '2024-02-05 16:45:00+00'::timestamptz
),
(
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'STARTUP2024',
  'Startup Accelerator Program',
  ARRAY['Investment Readiness', 'Market Validation', 'Financial Modeling'],
  35,
  true,
  12,
  50,
  '2024-08-31 23:59:59+00'::timestamptz,
  '2024-03-01 08:00:00+00'::timestamptz,
  '2024-03-01 08:00:00+00'::timestamptz
),
(
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'ENTERPRISE2024',
  'Enterprise Skills Assessment',
  ARRAY['Technical Skills', 'Strategic Thinking', 'Leadership Potential'],
  25,
  false,
  0,
  500,
  NULL,
  '2024-03-15 12:30:00+00'::timestamptz,
  '2024-03-15 12:30:00+00'::timestamptz
);

-- Insert sample usage data for the affiliation codes
INSERT INTO public.affiliation_usage (
  code_id,
  user_name,
  user_email,
  assessment_status,
  report_status,
  discount_amount,
  used_at,
  completed_at,
  report_generated_at,
  report_sent_at
) VALUES 
-- Usage for UNIV2024 code
(
  (SELECT id FROM affiliation_codes WHERE code = 'UNIV2024'),
  'Sarah Johnson',
  'sarah.johnson@university.edu',
  'completed',
  'sent',
  45.00,
  '2024-01-20 14:30:00+00'::timestamptz,
  '2024-01-20 16:45:00+00'::timestamptz,
  '2024-01-21 09:15:00+00'::timestamptz,
  '2024-01-21 09:30:00+00'::timestamptz
),
(
  (SELECT id FROM affiliation_codes WHERE code = 'UNIV2024'),
  'Michael Chen',
  'm.chen@university.edu',
  'in_progress',
  'not_generated',
  45.00,
  '2024-01-25 10:15:00+00'::timestamptz,
  NULL,
  NULL,
  NULL
),
(
  (SELECT id FROM affiliation_codes WHERE code = 'UNIV2024'),
  'Emily Rodriguez',
  'emily.r@university.edu',
  'completed',
  'generated',
  45.00,
  '2024-02-01 13:20:00+00'::timestamptz,
  '2024-02-01 15:30:00+00'::timestamptz,
  '2024-02-02 08:45:00+00'::timestamptz,
  NULL
),
-- Usage for NETWORK2024 code
(
  (SELECT id FROM affiliation_codes WHERE code = 'NETWORK2024'),
  'David Thompson',
  'david.thompson@techcorp.com',
  'completed',
  'sent',
  37.50,
  '2024-02-10 11:00:00+00'::timestamptz,
  '2024-02-10 14:15:00+00'::timestamptz,
  '2024-02-11 10:30:00+00'::timestamptz,
  '2024-02-11 11:00:00+00'::timestamptz
),
(
  (SELECT id FROM affiliation_codes WHERE code = 'NETWORK2024'),
  'Lisa Wang',
  'lisa.wang@consultant.com',
  'not_started',
  'not_generated',
  37.50,
  '2024-02-15 09:45:00+00'::timestamptz,
  NULL,
  NULL,
  NULL
),
-- Usage for CORP2024 code
(
  (SELECT id FROM affiliation_codes WHERE code = 'CORP2024'),
  'Alex Morgan',
  'alex.morgan@bigcorp.com',
  'completed',
  'sent',
  75.00,
  '2024-01-30 08:30:00+00'::timestamptz,
  '2024-01-30 12:45:00+00'::timestamptz,
  '2024-01-31 09:00:00+00'::timestamptz,
  '2024-01-31 09:15:00+00'::timestamptz
),
(
  (SELECT id FROM affiliation_codes WHERE code = 'CORP2024'),
  'Jennifer Kim',
  'j.kim@bigcorp.com',
  'in_progress',
  'not_generated',
  75.00,
  '2024-02-05 15:20:00+00'::timestamptz,
  NULL,
  NULL,
  NULL
),
(
  (SELECT id FROM affiliation_codes WHERE code = 'CORP2024'),
  'Robert Martinez',
  'r.martinez@bigcorp.com',
  'completed',
  'generated',
  75.00,
  '2024-02-12 10:10:00+00'::timestamptz,
  '2024-02-12 13:25:00+00'::timestamptz,
  '2024-02-13 08:30:00+00'::timestamptz,
  NULL
),
-- Usage for TEAM2024 code
(
  (SELECT id FROM affiliation_codes WHERE code = 'TEAM2024'),
  'Amanda Foster',
  'amanda.foster@teamleaders.com',
  'completed',
  'sent',
  50.00,
  '2024-02-20 12:00:00+00'::timestamptz,
  '2024-02-20 16:30:00+00'::timestamptz,
  '2024-02-21 09:45:00+00'::timestamptz,
  '2024-02-21 10:00:00+00'::timestamptz
),
-- Usage for STARTUP2024 code
(
  (SELECT id FROM affiliation_codes WHERE code = 'STARTUP2024'),
  'Carlos Mendez',
  'carlos@mystartup.io',
  'in_progress',
  'not_generated',
  87.50,
  '2024-03-05 14:15:00+00'::timestamptz,
  NULL,
  NULL,
  NULL
),
(
  (SELECT id FROM affiliation_codes WHERE code = 'STARTUP2024'),
  'Nina Patel',
  'nina@techstartup.com',
  'completed',
  'generated',
  87.50,
  '2024-03-08 11:30:00+00'::timestamptz,
  '2024-03-08 15:45:00+00'::timestamptz,
  '2024-03-09 09:20:00+00'::timestamptz,
  NULL
);