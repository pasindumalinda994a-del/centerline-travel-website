import type { Metadata } from "next";
import { HostAuthShell } from "@/app/become-host/_components/HostAuthShell";
import { HostSignupForm } from "@/app/become-host/_components/HostSignupForm";
import { hostSignup } from "@/app/lib/content/become-host";

export const metadata: Metadata = {
  title: "Become a Host | Centreline Tours",
  description:
    "Create a host account and share stays or experiences with travellers exploring Sri Lanka beyond the usual route.",
};

export default function BecomeHostSignupPage() {
  return (
    <HostAuthShell
      eyebrow={hostSignup.eyebrow}
      panelTitle={hostSignup.panelTitle}
      panelDescription={hostSignup.panelDescription}
      benefits={hostSignup.benefits}
      image={hostSignup.image}
      watermark={hostSignup.watermark}
      formEyebrow={hostSignup.formEyebrow}
      formTitle={hostSignup.formTitle}
      formDescription={hostSignup.formDescription}
    >
      <HostSignupForm />
    </HostAuthShell>
  );
}
