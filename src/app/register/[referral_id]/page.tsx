"use client";

import * as React from "react";

import { RegisterForm } from "@/components/pages/register/register-form";

export default function LoginPage({ params }: any) {
  const { referral_id } = React.use<{ referral_id?: string }>(params);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm referralId={referral_id} />
      </div>
    </div>
  );
}
