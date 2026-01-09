import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { AuthUser, AuthSession, UserProfile } from "@/lib/auth";
import {
  getSession,
  getUser,
  getUserProfile,
  signOut as authSignOut,
  sendOtpCode as authSendOtpCode,
  verifyOtpCode as authVerifyOtpCode,
  onAuthStateChange,
} from "@/lib/auth";

interface AuthContextValue {
  // State
  user: AuthUser | null;
  session: AuthSession | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  sendOtpCode: (email: string) => Promise<{ error: Error | null }>;
  verifyOtpCode: (email: string, code: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  
  /** @deprecated Use sendOtpCode instead */
  sendMagicLink: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile when user changes
  const loadProfile = useCallback(async (authId: string) => {
    const { profile: userProfile } = await getUserProfile(authId);
    setProfile(userProfile);
  }, []);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const { session: currentSession } = await getSession();
        
        if (!mounted) return;

        if (currentSession) {
          setSession(currentSession);
          const { user: currentUser } = await getUser();
          
          if (!mounted) return;
          
          if (currentUser) {
            setUser(currentUser);
            await loadProfile(currentUser.id);
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;

      setSession(newSession);

      if (event === "SIGNED_IN" && newSession?.user) {
        setUser(newSession.user);
        await loadProfile(newSession.user.id);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      } else if (event === "TOKEN_REFRESHED" && newSession?.user) {
        setUser(newSession.user);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  // Send OTP code to email
  const sendOtpCode = useCallback(async (email: string) => {
    return authSendOtpCode(email);
  }, []);

  // Verify OTP code
  const verifyOtpCode = useCallback(async (email: string, code: string) => {
    const { session: newSession, error } = await authVerifyOtpCode(email, code);
    
    if (error) {
      return { error };
    }

    // Session will be updated via onAuthStateChange listener
    if (newSession?.user) {
      setSession(newSession);
      setUser(newSession.user);
      await loadProfile(newSession.user.id);
    }

    return { error: null };
  }, [loadProfile]);

  // Deprecated: Use sendOtpCode instead
  const sendMagicLink = useCallback(async (email: string) => {
    return sendOtpCode(email);
  }, [sendOtpCode]);

  // Sign out
  const signOut = useCallback(async () => {
    await authSignOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  // Refresh profile
  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await loadProfile(user.id);
    }
  }, [user?.id, loadProfile]);

  const value: AuthContextValue = {
    user,
    session,
    profile,
    isLoading,
    isAuthenticated: !!user,
    sendOtpCode,
    verifyOtpCode,
    sendMagicLink,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
