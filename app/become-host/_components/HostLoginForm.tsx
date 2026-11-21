"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { HostField } from "@/app/become-host/_components/HostAuthFields";
import { hostLogin } from "@/app/lib/content/become-host";

type FieldErrors = Partial<Record<"email" | "password" | "form", string>>;

export function HostLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!email.trim()) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (!password) next.password = "Enter your password.";
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <HostField
        id="login-email"
        label={hostLogin.fields.email.label}
        placeholder={hostLogin.fields.email.placeholder}
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <HostField
        id="login-password"
        label={hostLogin.fields.password.label}
        placeholder={hostLogin.fields.password.placeholder}
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <div className="flex justify-end px-1">
        <button
          type="button"
          className="text-caption font-medium text-muted transition-colors hover:text-foreground"
        >
          {hostLogin.forgotLabel}
        </button>
      </div>

      {submitted ? (
        <p className="text-body rounded-xl border border-line bg-surface px-4 py-3 text-foreground/80">
          Sign-in details look good. Authentication will connect next — nothing
          was sent yet.
        </p>
      ) : null}

      <div className="pt-1">
        <CtaButton as="button" type="submit" variant="dark">
          {hostLogin.submit}
        </CtaButton>
      </div>

      <p className="text-body text-muted">
        {hostLogin.switchPrompt}{" "}
        <Link
          href={hostLogin.switchHref}
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          {hostLogin.switchLabel}
        </Link>
      </p>
    </form>
  );
}
