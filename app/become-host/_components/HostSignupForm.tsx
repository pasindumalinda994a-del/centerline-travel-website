"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CtaButton } from "@/app/components/ui/CtaButton";
import {
  HostCheckbox,
  HostField,
} from "@/app/become-host/_components/HostAuthFields";
import { hostSignup } from "@/app/lib/content/become-host";

type FieldErrors = Partial<
  Record<"name" | "email" | "password" | "confirm" | "hostConfirm" | "form", string>
>;

export function HostSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [hostConfirm, setHostConfirm] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Enter your full name.";
    if (!email.trim()) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (!password) next.password = "Create a password.";
    else if (password.length < 8) next.password = "Use at least 8 characters.";
    if (!confirm) next.confirm = "Confirm your password.";
    else if (confirm !== password) next.confirm = "Passwords do not match.";
    if (!hostConfirm) next.hostConfirm = "Confirm that you host in Sri Lanka.";
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
        id="host-name"
        label={hostSignup.fields.name.label}
        placeholder={hostSignup.fields.name.placeholder}
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <HostField
        id="host-email"
        label={hostSignup.fields.email.label}
        placeholder={hostSignup.fields.email.placeholder}
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <HostField
        id="host-phone"
        label={hostSignup.fields.phone.label}
        placeholder={hostSignup.fields.phone.placeholder}
        hint={hostSignup.fields.phone.hint}
        type="tel"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <HostField
        id="host-password"
        label={hostSignup.fields.password.label}
        placeholder={hostSignup.fields.password.placeholder}
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <HostField
        id="host-confirm"
        label={hostSignup.fields.confirm.label}
        placeholder={hostSignup.fields.confirm.placeholder}
        type="password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm}
      />

      <HostCheckbox
        id="host-confirm-hosting"
        checked={hostConfirm}
        onChange={setHostConfirm}
        error={errors.hostConfirm}
      >
        {hostSignup.fields.hostConfirm}
      </HostCheckbox>

      {submitted ? (
        <p className="text-body rounded-xl border border-line bg-surface px-4 py-3 text-foreground/80">
          Account details look good. Host sign-up will connect to authentication
          next — nothing was sent yet.
        </p>
      ) : null}

      <div className="pt-1">
        <CtaButton as="button" type="submit" variant="primary">
          {hostSignup.submit}
        </CtaButton>
      </div>

      <p className="text-body text-muted">
        {hostSignup.switchPrompt}{" "}
        <Link
          href={hostSignup.switchHref}
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          {hostSignup.switchLabel}
        </Link>
      </p>
    </form>
  );
}
