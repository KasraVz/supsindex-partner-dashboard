import { CertificateSearchWidget } from "@/components/certificates/CertificateSearchWidget";

export default function IndividualCertificateVerification() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Certificate Verification</h1>
        <p className="text-muted-foreground">
          Verify the authenticity of certificates issued to test takers and candidates.
        </p>
      </div>

      <CertificateSearchWidget />
    </div>
  );
}