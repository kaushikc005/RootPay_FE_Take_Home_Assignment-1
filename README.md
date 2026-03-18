# RootPay --- Frontend Take-Home

A multi-step onboarding flow built with React, TypeScript, and Tailwind.

---

## Getting started

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`.

---

## What this does

This is a simple 5-step signup flow:

1.  Pick account type (Personal / Business)\
2.  Enter phone number\
3.  Enter OTP\
4.  Add name\
5.  Set password

At the end, there's a summary modal showing what the user entered.

---

## Stack

- React + TypeScript\
- Vite\
- Tailwind CSS\
- Framer Motion (for transitions + progress bar)\
- React Router (single route)\
- Lucide (icons)

---

## Structure

    pages/login/        - main flow (state + step logic)
    components/login/   - step components + layout
    components/core/    - reusable UI (Button, Input, etc.)
    styles/             - Tailwind + theme setup

The main page controls everything --- current step + form data.\
Each step handles its own validation and only moves forward if valid.

No global state or context --- didn't feel necessary for this size.

---

## Layout

- Background is placed behind using proper layering (no z-index hacks)
- Right panel stays \~708px on larger screens, flexible on smaller
  ones
- Progress bar uses Framer Motion for smooth width animation
- Card uses `overflow-hidden` + outer shadow so it doesn't look
  clipped

---

## Styling

Colors are defined in Tailwind config and mirrored as CSS variables.

- Primary: `#0054fd`\
- Input border highlight: `#729CF0` (slightly softer than primary)

Buttons: - Min height: 49px\

- Max width: 250px (prevents stretching)

---

## What's not implemented

- OTP is just UI (no backend)
- Phone validation is basic
- No auth/session handling
- No API error states

Kept it focused on UI and flow.

---

## Key files

- `pages/login/index.tsx` - step control + form state\
- `OnboardingLayout.tsx` - main layout\
- Step components - one per step\
- `StepNavigation.tsx` - back/continue actions\
- `core` - reusable components

---

## Final note

Kept things simple and local on purpose.\
In a real app, this would plug into APIs, proper validation, and auth
handling.
