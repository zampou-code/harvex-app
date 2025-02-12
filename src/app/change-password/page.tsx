import { ChangePasswordForm } from "@/components/pages/change-password/change-password-form";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Suspense>
          <ChangePasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
