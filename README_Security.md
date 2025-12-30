# 🔐 Passwordless Authentication with Supabase Auth

## 1. Overview
This document describes the implementation of **passwordless authentication** using **Supabase Auth**.  
Users authenticate using only their **email address** and a **one-time code (OTP)** or **Magic Link**, without passwords.

The solution is designed to be:
- Simple for users
- Secure by default
- Fast to implement
- Scalable

---

## 2. Scope
### Included
- Unified login and sign-up (passwordless)
- Email-based authentication
- Session management using JWT
- Protected backend endpoints

### Not Included
- Social login providers
- Multi-factor authentication (future phase)

---

## 3. Tech Stack
- **Auth Provider**: Supabase Auth
- **Frontend**: Web App (Next.js / React)
- **Backend**: API protected with JWT (Supabase or external)
- **Email Provider**: Supabase Email (configurable with Resend / SendGrid)

---

## 4. User Flow – Email OTP Authentication

### 4.1 Email Input
1. User navigates to `/login`
2. User enters their **email address**
3. User clicks **“Send code”**

---

### 4.2 OTP Generation and Delivery
- Supabase generates a **one-time password (OTP)**
- OTP properties:
  - Expires in **10 minutes**
  - Single-use only
- Supabase sends the email automatically

---

### 4.3 Code Verification
1. User enters the received **OTP**
2. Frontend submits the OTP to Supabase
3. Supabase:
   - Verifies the OTP
   - Creates or retrieves the user
   - Returns an **active session**

---

### 4.4 Active Session
- Client receives:
  - `access_token` (JWT)
  - `refresh_token`
- User is redirected to the dashboard

---

## 5. Alternative Flow – Magic Link (Optional)

1. User enters their email
2. Receives a **single-use magic link**
3. Clicking the link:
   - Validates the token
   - Automatically logs the user in

> 📌 Magic Links reduce friction and can be enabled as an optional UX improvement.

---

## 6. High-Level Technical Flow

```text
User
  ↓
Frontend (Login UI)
  ↓
Supabase Auth (OTP / Magic Link)
  ↓
JWT + Refresh Token
  ↓
Frontend / Protected Backend APIs
```

## 7. User Data Management
- Supabase automatically creates users in the `auth.users` table after successful authentication.
- Application-specific user data is stored in a custom table:
  - `public.profiles`

### Example fields
- `id` (UUID – references `auth.users.id`)
- `email`
- `created_at`
- `role`

This separation keeps authentication concerns isolated from application domain data.

---

## 8. Security Considerations

### Mandatory Controls
- **One-Time Password (OTP)**
  - Expiration time: **≤ 10 minutes**
  - Single-use only
- **Rate limiting**
  - Maximum **5 verification attempts per email**
- **Session tokens**
  - Short-lived access tokens (JWT)
  - Rotating refresh tokens
- **Cookies**
  - `httpOnly`
  - `secure`
  - `sameSite=lax`

These controls reduce the risk of brute-force attacks, session hijacking, and token leakage.

---

## 9. Authorization & Row Level Security (RLS)

Authorization is enforced using Supabase Row Level Security (RLS).

### Conceptual Policy
- A user can only access:
  - Their own profile data
  - Resources associated with their `user_id`

```text
Policy: user_can_read_own_data
Condition: auth.uid() = user_id
```

## 10. User Experience (UX)

### UI States
- Loading state while sending the authentication code
- Error state for invalid or expired codes
- Option to resend the authentication code
- Successful login confirmation

The interface should clearly guide the user through each step and provide immediate feedback.

### Suggested Copy
- “We sent a code to your email”
- “The code expires in 10 minutes”
- “Didn’t receive it? Resend the code”

---

## 11. Metrics & Monitoring
To ensure reliability and continuously improve the authentication flow, the following metrics should be tracked:
- Successful login rate
- Average authentication time
- OTP retry rate
- Email delivery failure rate

These metrics help identify user friction and operational issues early.

---

## 12. Future Enhancements
The authentication system is designed to support incremental improvements, including:
- Multi-factor authentication (MFA)
- Passkeys / WebAuthn support
- Phone-based authentication (SMS OTP)
- Advanced role and permission management

---

## 13. Key Benefits
- No passwords to manage or reset
- Reduced friction during login
- Smaller attack surface compared to password-based systems
- Faster and smoother user onboarding

---

## 14. Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Email delivery delays | Resend option and Magic Link fallback |
| OTP brute-force attempts | Rate limiting and short OTP expiration |
| Session hijacking | Short-lived tokens and secure cookies |

---

## 15. Executive Summary
Passwordless authentication with Supabase Auth provides a modern, secure, and user-friendly login experience. By eliminating passwords, the system reduces common security risks while improving usability and onboarding speed.
