# 🔐 Passwordless Authentication with Supabase Auth

## 1. Overview

This document describes the implementation of **passwordless authentication** using **Supabase Auth** with **OTP (One-Time Password)** verification.

Users authenticate using only their **email address** and a **6-digit code** sent to their inbox. The user **never leaves the application**, preserving their design work during the authentication process.

### Key Design Decisions
- **OTP Code over Magic Link**: Users stay in the app and enter a code instead of clicking an external link
- **Soft Signup**: New users are created automatically when they first authenticate
- **Design Preservation**: Authentication flow happens in a modal, keeping the mosaic design intact

---

## 2. Scope

### Included
- Unified login and sign-up (passwordless)
- Email-based OTP authentication
- Session management using JWT
- Protected quotations and user data
- Habeas Data compliance (Colombian law)

### Not Included
- Social login providers (Google, etc.)
- Password-based authentication
- Multi-factor authentication (future phase)

---

## 3. Tech Stack

| Component | Technology |
|-----------|------------|
| Auth Provider | Supabase Auth |
| Frontend | React 19 + Vite + TypeScript |
| State Management | React Context (AuthContext) |
| Email Provider | Supabase Email (SMTP configurable) |
| Database | PostgreSQL (Supabase) |

---

## 4. User Flow – Email OTP Authentication

### 4.1 Authentication Trigger

The authentication flow is triggered when:
1. User clicks **"Iniciar sesión"** (Login) in the header
2. User clicks **"Cotizar"** (Quote) on a mosaic design

### 4.2 Email Input

```
┌─────────────────────────────────────┐
│  Ingresa tu correo                  │
│  ─────────────────                  │
│  Correo electrónico                 │
│  ┌─────────────────────────────┐    │
│  │ 📧 tu@email.com             │    │
│  └─────────────────────────────┘    │
│                                     │
│  [ Enviar código → ]                │
└─────────────────────────────────────┘
```

1. User enters their **email address**
2. User clicks **"Enviar código"** (Send code)
3. System calls `supabase.auth.signInWithOtp({ email })`

### 4.3 OTP Generation and Delivery

Supabase automatically:
- Generates a **6-digit numeric code**
- Creates user in `auth.users` if new (soft signup)
- Sends email with the code

**OTP Properties:**
| Property | Value |
|----------|-------|
| Format | 6 numeric digits |
| Expiration | 10 minutes |
| Usage | Single-use only |
| Delivery | Email |

### 4.4 Code Verification

```
┌─────────────────────────────────────┐
│  Ingresa el código                  │
│  ─────────────────                  │
│  Enviamos un código de 6 dígitos a  │
│  usuario@email.com                  │
│                                     │
│    [1] [2] [3] [4] [5] [6]         │
│                                     │
│  [ Verificar código ]               │
│                                     │
│  [ 🔄 Reenviar código ]            │
│  [ ← Usar otro correo ]             │
└─────────────────────────────────────┘
```

1. User enters the **6-digit code** received via email
2. Frontend calls `supabase.auth.verifyOtp({ email, token, type: 'email' })`
3. Supabase validates the code and returns a session

**Code Input Features:**
- Auto-focus on first digit
- Auto-advance to next digit
- Paste support (full code)
- Auto-submit when complete
- Keyboard navigation (arrows, backspace)

### 4.5 Session Established

Upon successful verification:
- Client receives `access_token` (JWT) and `refresh_token`
- Tokens are stored in `localStorage`
- User profile is loaded from `public.users` table
- AuthContext state is updated

---

## 5. Session Management

### Token Lifecycle

| Token | Duration | Purpose |
|-------|----------|---------|
| Access Token | 1 hour | Authenticate API requests |
| Refresh Token | 7 days | Renew access token |

### Auto-Refresh Mechanism

```
┌──────────────────────────────────────────────────┐
│  User authenticates                              │
│         ↓                                        │
│  Access Token (valid 1 hour)                     │
│         ↓                                        │
│  [Token expires]                                 │
│         ↓                                        │
│  Supabase client automatically uses              │
│  Refresh Token to get new Access Token           │
│         ↓                                        │
│  User remains logged in (seamless)               │
└──────────────────────────────────────────────────┘
```

**Session ends when:**
- User clicks "Cerrar sesión" (Sign out)
- Refresh token expires (7 days of inactivity)
- User clears browser data

---

## 6. Database Schema

### User Tables Relationship

```
┌─────────────────┐         ┌─────────────────┐
│   auth.users    │         │  public.users   │
│   (Supabase)    │         │  (Application)  │
├─────────────────┤         ├─────────────────┤
│ id (UUID) PK    │◄───────►│ auth_id (UUID)  │
│ email           │         │ id (UUID) PK    │
│ created_at      │         │ email           │
│ ...             │         │ first_name      │
└─────────────────┘         │ last_name       │
                            │ phone           │
                            │ company         │
                            │ accepted_habeas │
                            │ created_at      │
                            └─────────────────┘
```

### Auto User Creation Trigger

When a user authenticates for the first time, a database trigger automatically creates their profile:

```sql
-- Trigger: on_auth_user_created
-- Creates public.users record when auth.users is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 7. Row Level Security (RLS)

All tables use RLS to ensure users can only access their own data.

### Policy Pattern

```sql
-- Users can only view their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = auth_id);

-- Users can only view their own quotations
CREATE POLICY "Users can view own quotations" ON quotations
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );
```

### Protected Tables

| Table | Policy |
|-------|--------|
| `users` | Own profile only |
| `quotations` | Own quotations only |
| `user_mosaics` | Own saved designs only |
| `mosaics` | Public read access |

---

## 8. Security Controls

### Mandatory Controls

| Control | Implementation |
|---------|----------------|
| OTP Expiration | 10 minutes |
| OTP Single-Use | Invalidated after verification |
| Rate Limiting | Supabase default (5 attempts/email) |
| Token Rotation | Refresh tokens rotate on use |
| Secure Storage | `localStorage` with JWT |

### Cookie Configuration (if using SSR)

```javascript
{
  httpOnly: true,
  secure: true,  // HTTPS only
  sameSite: 'lax'
}
```

---

## 9. Frontend Implementation

### Components

| Component | Purpose |
|-----------|---------|
| `AuthContext` | Global auth state management |
| `useAuth` | Hook to access auth state |
| `AuthModal` | Login modal with OTP flow |
| `OtpInput` | 6-digit code input |
| `OtpVerification` | Code entry screen |
| `EmailForm` | Email input form |
| `UserMenu` | Header dropdown with user info |

### Auth Functions

```typescript
// Send OTP code to email
sendOtpCode(email: string): Promise<{ error: Error | null }>

// Verify the OTP code
verifyOtpCode(email: string, code: string): Promise<{ error: Error | null }>

// Sign out
signOut(): Promise<void>

// Get current session
getSession(): Promise<{ session: Session | null }>
```

---

## 10. Quotation Flow with Authentication

```
┌─────────────────────────────────────────────────────────────┐
│  User designs mosaic                                        │
│         ↓                                                   │
│  Clicks "Cotizar" (Quote)                                   │
│         ↓                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Is user authenticated?                              │   │
│  │         │                                            │   │
│  │    NO ──┼──► Show OTP flow (email → code → verify)  │   │
│  │         │                                            │   │
│  │   YES ──┼──► Show quote form directly               │   │
│  └─────────────────────────────────────────────────────┘   │
│         ↓                                                   │
│  User completes quote form                                  │
│  (name, phone, quantity, Habeas Data consent)               │
│         ↓                                                   │
│  Quotation saved to database                                │
│         ↓                                                   │
│  Success message shown                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. Habeas Data Compliance (Colombia)

Before saving any quotation, users must explicitly accept data treatment:

```
┌─────────────────────────────────────────────────────────────┐
│  [ ✓ ] Acepto el tratamiento de datos personales           │
│        de acuerdo con la Ley de Habeas Data de Colombia.   │
└─────────────────────────────────────────────────────────────┘
```

**Database fields:**
- `accepted_habeas_data`: Boolean
- `habeas_data_accepted_at`: Timestamp

---

## 12. Error Handling

### User-Facing Messages

| Error | Message |
|-------|---------|
| Invalid code | "Código inválido. Intenta de nuevo." |
| Expired code | "El código ha expirado. Solicita uno nuevo." |
| Too many attempts | "Demasiados intentos. Espera unos minutos." |
| Network error | "Error de conexión. Verifica tu internet." |

### Code Input Validation

- Only numeric characters allowed
- Automatic cleanup of non-numeric input
- Clear error state on new input

---

## 13. Metrics & Monitoring

Recommended metrics to track:

| Metric | Purpose |
|--------|---------|
| OTP send success rate | Email delivery health |
| OTP verification success rate | User completion rate |
| Average verification time | UX friction indicator |
| Session duration | User engagement |
| Quotation conversion rate | Business metric |

---

## 14. Future Enhancements

| Enhancement | Priority |
|-------------|----------|
| SMS OTP option | Medium |
| Passkeys / WebAuthn | Low |
| Remember device | Medium |
| Admin impersonation | Low |

---

## 15. Key Benefits

- ✅ **No passwords** – Eliminates password-related security risks
- ✅ **Seamless UX** – User never leaves the app
- ✅ **Design preservation** – Mosaic work is never lost during auth
- ✅ **Auto user creation** – Frictionless onboarding
- ✅ **Secure by default** – Short-lived tokens, RLS policies
- ✅ **Compliance ready** – Habeas Data consent built-in

---

## 16. Configuration Checklist

### Supabase Dashboard Settings

- [ ] Email templates customized (Spanish)
- [ ] Site URL configured for redirects
- [ ] SMTP configured (optional, for custom domain)
- [ ] Rate limiting enabled
- [ ] RLS enabled on all tables

### Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 17. Executive Summary

The authentication system uses **email-based OTP verification** with Supabase Auth. Users authenticate by entering a 6-digit code sent to their email, without ever leaving the application. This preserves their design work and provides a seamless experience.

**Session duration:** ~7 days with auto-refresh  
**OTP validity:** 10 minutes  
**Security:** JWT tokens + Row Level Security + Rate limiting
