export interface AssessmentDetail {
  id: string;
  testName: string;
  testType: string;
  assessmentStatus: 'not_started' | 'in_progress' | 'completed';
  paymentStatus: 'unpaid' | 'paid';
  paidBy?: 'candidate' | 'partner';
  reportStatus: 'not_generated' | 'generated' | 'sent';
  discountAmount?: number;
  usedAt: Date;
  completedAt?: Date;
  reportGeneratedAt?: Date;
  reportSentAt?: Date;
  reportUrl?: string;
  reportContent?: string;
}

export interface CandidateWithAssessments {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  joinDate: string;
  lastActivity: string;
  assessments: number;
  reports: number;
  assessmentDetails: AssessmentDetail[];
}