export const hostSignup = {
  eyebrow: "Become a Host",
  panelTitle: "Share *your Sri Lanka*",
  panelDescription:
    "List a stay or experience with travellers who want the island beyond the usual route.",
  benefits: [
    "Earn from a home or place you already know well",
    "Welcome guests who value local hosts",
    "Host at your own pace — no rigid calendar required",
  ],
  formEyebrow: "Create account",
  formTitle: "Start hosting\n*with Centreline*",
  formDescription:
    "A few details to open your host profile. You can add listings after you sign in.",
  fields: {
    name: { label: "Full name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@example.com" },
    phone: {
      label: "Phone",
      placeholder: "+94 …",
      hint: "Optional",
    },
    password: { label: "Password", placeholder: "At least 8 characters" },
    confirm: { label: "Confirm password", placeholder: "Repeat password" },
    hostConfirm:
      "I host stays or experiences in Sri Lanka",
  },
  submit: "Create host account",
  switchPrompt: "Already hosting?",
  switchLabel: "Log in",
  switchHref: "/become-host/login",
  image: "/images/home/figma/stays-hero.jpg",
  watermark: "Host",
} as const;

export const hostLogin = {
  eyebrow: "Host login",
  panelTitle: "Welcome *back*",
  panelDescription:
    "Sign in to manage your stays, guests, and host profile.",
  benefits: [
    "Update availability when it suits you",
    "Message travellers directly",
    "Keep your place or experience listing current",
  ],
  formEyebrow: "Sign in",
  formTitle: "Continue as\n*a host*",
  formDescription: "Use the email you registered with Centreline.",
  fields: {
    email: { label: "Email", placeholder: "you@example.com" },
    password: { label: "Password", placeholder: "Your password" },
  },
  submit: "Sign in",
  forgotLabel: "Forgot password?",
  switchPrompt: "New host?",
  switchLabel: "Create account",
  switchHref: "/become-host",
  image: "/images/home/figma/about.jpg",
  watermark: "Host",
} as const;
