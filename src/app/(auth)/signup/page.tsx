import { SignupForm } from "@/components/auth/signup-form";
import { AuthCard } from "@/components/layout/auth-card";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <AuthCard
        title="Create your account"
        description="Start building safe, AI-assisted creator outreach campaigns in minutes."
      >
        <SignupForm />
      </AuthCard>
    </main>
  );
}
