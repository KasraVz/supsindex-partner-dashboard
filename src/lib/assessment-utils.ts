/**
 * Utility functions for assessment business logic
 */

export interface PaymentStatus {
  status: 'unpaid' | 'paid';
}

export interface AssessmentStatus {
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface ReportStatus {
  status: 'not_generated' | 'generated' | 'sent';
}

/**
 * Determines if a report can be accessed based on payment and assessment status
 */
export function canAccessReport(
  paymentStatus: 'unpaid' | 'paid',
  assessmentStatus: 'not_started' | 'in_progress' | 'completed',
  reportStatus: 'not_generated' | 'generated' | 'sent'
): boolean {
  return paymentStatus === 'paid' && 
         assessmentStatus === 'completed' && 
         (reportStatus === 'generated' || reportStatus === 'sent');
}

/**
 * Determines if a report can be generated based on payment and assessment status
 */
export function canGenerateReport(
  paymentStatus: 'unpaid' | 'paid',
  assessmentStatus: 'not_started' | 'in_progress' | 'completed'
): boolean {
  return paymentStatus === 'paid' && assessmentStatus === 'completed';
}

/**
 * Gets the appropriate message for why a report is not accessible
 */
export function getReportInaccessibleReason(
  paymentStatus: 'unpaid' | 'paid',
  assessmentStatus: 'not_started' | 'in_progress' | 'completed'
): string {
  if (paymentStatus === 'unpaid') {
    return 'Payment required to access reports';
  }
  if (assessmentStatus !== 'completed') {
    return 'Assessment must be completed first';
  }
  return 'Report not available';
}