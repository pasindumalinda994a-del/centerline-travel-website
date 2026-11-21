import type { Metadata } from "next";
import { HostAuthShell } from "@/app/become-host/_components/HostAuthShell";
import { HostLoginForm } from "@/app/become-host/_components/HostLoginForm";
import { hostLogin } from "@/app/lib/content/become-host";

export const metadata: Metadata = {
  title: "Host Login | Centreline Tours",
  description:
    "Sign in to manage your Centreline host profile, stays, and guest messages.",
};

export default function BecomeHostLoginPage() {
  return (
    <HostAuthShell
      eyebrow={hostLogin.eyebrow}
      panelTitle={hostLogin.panelTitle}
      panelDescription={hostLogin.panelDescription}
      benefits={hostLogin.benefits}
      image={hostLogin.image}
      watermark={hostLogin.watermark}
      formEyebrow={hostLogin.formEyebrow}
      formTitle={hostLogin.formTitle}
      formDescription={hostLogin.formDescription}
    >
      <HostLoginForm />
    </HostAuthShell>
  );
}
