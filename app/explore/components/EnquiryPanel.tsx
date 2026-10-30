"use client";

import { useState } from "react";
import { CtaButton } from "@/app/components/ui/CtaButton";

type EnquiryPanelProps = {
  priceLabel: string;
  priceNote?: string;
  meta?: string;
  ctaLabel?: string;
};

export function EnquiryPanel({
  priceLabel,
  priceNote = "Indicative rate — confirmed on enquiry",
  meta,
  ctaLabel = "Request booking",
}: EnquiryPanelProps) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const fieldClass =
    "text-body mt-1 w-full rounded-full border border-line bg-background px-4 py-2.5 text-foreground outline-none focus:border-brand/40";

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6">
        <p className="text-h3 font-medium tracking-tight text-foreground">
          Enquiry received
        </p>
        <p className="text-body mt-2 leading-relaxed text-muted">
          Thanks — our team will follow up shortly to confirm availability and next steps.
        </p>
        <button
          type="button"
          className="text-caption mt-4 font-medium text-brand hover:opacity-70"
          onClick={() => setSent(false)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-line bg-surface p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <p className="text-caption text-muted">From</p>
      <p className="text-h3 font-medium tracking-tight text-foreground">{priceLabel}</p>
      {meta ? <p className="text-caption mt-1 text-muted">{meta}</p> : null}
      <p className="text-caption mt-2 text-stone">{priceNote}</p>

      <div className="mt-5 space-y-3">
        <label className="text-caption block text-muted">
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            placeholder="Your name"
          />
        </label>
        <label className="text-caption block text-muted">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            placeholder="you@email.com"
          />
        </label>
        <label className="text-caption block text-muted">
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="text-body mt-1 w-full resize-none rounded-2xl border border-line bg-background px-4 py-3 text-foreground outline-none focus:border-brand/40"
            placeholder="Dates, group size, or questions…"
          />
        </label>
      </div>

      <div className="mt-5">
        <CtaButton as="button" type="submit" className="w-full" buttonClassName="min-w-0 flex-1">
          {ctaLabel}
        </CtaButton>
      </div>
    </form>
  );
}
