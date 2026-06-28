# Microsoft Sign-In Flow (React)

A small React app that recreates the Microsoft sign-in flow, end to end:

- `/` — Animated Microsoft splash/landing screen (auto-advances)
- `/signin` — Sign-in page (email + password)
- `/sending` — "Sending code" transition screen (auto-advances)
- `/verify` — Verification code page (6-digit code input)

## Project structure

```
src/
  components/
    AuthLayout.jsx      shared card/background/footer shell
    MicrosoftLogo.jsx   logo icon
    KeyIcon.jsx         key icon used on the sign-in options bar
  context/
    AuthFlowContext.jsx shares the entered email/password between pages
  pages/
    SplashPage.jsx       route: "/"        animated Microsoft logo intro
    SignInPage.jsx        route: "/signin"  email + password
    SendingCodePage.jsx   route: "/sending" spinner + "Sending code" message
    CodePage.jsx           route: "/verify"  6-digit code entry
  App.jsx                 route definitions
  main.jsx                 app entry point (sets up BrowserRouter)
  index.css
index.html
package.json
vite.config.js
```

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## How the flow works

1. **Landing animation** (`/`) — the four Microsoft logo squares pulse in
   and the "Microsoft" wordmark fades in, then everything fades out. After
   ~2.4s it automatically routes to `/signin`.
2. **Sign-in page** (`/signin`) — enter any email and password and click
   **Next**. Both fields must be non-empty to proceed.
3. **Sending code** (`/sending`) — a spinner and "Sending code" message are
   shown while the (simulated) verification code is sent to the entered
   email. After ~1.8s it automatically routes to `/verify`. If you land
   here directly without an email, it bounces you back to `/signin`.
4. **Verification code page** (`/verify`) — six individual digit boxes.
   - Typing auto-advances to the next box.
   - Backspace on an empty box moves back to the previous one.
   - You can paste a full 6-digit code at once.
   - Click **Next** to "verify" (replace the `alert(...)` in
     `CodePage.jsx` with your real verification API call).
   - **Back** returns to the sign-in page.
   - If you land here directly without an email, it bounces you back to
     `/signin`.

## Wiring up real logic

- Replace the `setTimeout` in `SendingCodePage.jsx` with your actual
  "send code" API call, and only navigate to `/verify` once it succeeds.
- Replace the `alert(...)` in `CodePage.jsx`'s `handleVerify` with your
  actual code-verification API call.
