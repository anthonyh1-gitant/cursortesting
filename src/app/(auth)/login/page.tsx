import { AuthCard } from "@/components/layout/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <AuthCard
        title="Welcome back"
        description="Sign in to manage creator campaigns, outreach drafts, and pipeline activity."
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
