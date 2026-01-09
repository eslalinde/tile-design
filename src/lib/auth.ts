import { supabase } from "./supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { Tables } from "@/types/database";

export type AuthUser = User;
export type AuthSession = Session;
export type UserProfile = Tables<"users">;

// Get the redirect URL for magic link
function getRedirectUrl(): string {
  // In development, use localhost
  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/callback`;
  }
  return "http://localhost:5173/auth/callback";
}

/**
 * Send a magic link to the user's email
 * This creates an account if one doesn't exist (soft signup)
 */
export async function sendMagicLink(email: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getRedirectUrl(),
    },
  });

  if (error) {
    return { error: new Error(error.message) };
  }

  return { error: null };
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ error: Error | null }> {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    return { error: new Error(error.message) };
  }

  return { error: null };
}

/**
 * Get the current session
 */
export async function getSession(): Promise<{ session: AuthSession | null; error: Error | null }> {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    return { session: null, error: new Error(error.message) };
  }

  return { session: data.session, error: null };
}

/**
 * Get the current user
 */
export async function getUser(): Promise<{ user: AuthUser | null; error: Error | null }> {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    return { user: null, error: new Error(error.message) };
  }

  return { user: data.user, error: null };
}

/**
 * Get or create a user profile by email (for soft signup flow)
 * This is used when creating quotations before the user verifies their email
 */
export async function getOrCreateUserByEmail(
  email: string,
  firstName?: string,
  lastName?: string,
  phone?: string
): Promise<{ userId: string | null; error: Error | null }> {
  const { data, error } = await supabase.rpc("get_or_create_user_by_email", {
    p_email: email,
    p_first_name: firstName,
    p_last_name: lastName,
    p_phone: phone,
  });

  if (error) {
    return { userId: null, error: new Error(error.message) };
  }

  return { userId: data, error: null };
}

/**
 * Get user profile from the users table
 */
export async function getUserProfile(authId: string): Promise<{ profile: UserProfile | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", authId)
    .single();

  if (error) {
    return { profile: null, error: new Error(error.message) };
  }

  return { profile: data, error: null };
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    company?: string;
    accepted_habeas_data?: boolean;
  }
): Promise<{ profile: UserProfile | null; error: Error | null }> {
  const updateData: Record<string, unknown> = { ...updates };
  
  // Set habeas_data_accepted_at if accepting
  if (updates.accepted_habeas_data) {
    updateData.habeas_data_accepted_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    return { profile: null, error: new Error(error.message) };
  }

  return { profile: data, error: null };
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(
  callback: (event: string, session: AuthSession | null) => void
) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

/**
 * Exchange code for session (used in auth callback)
 */
export async function exchangeCodeForSession(code: string): Promise<{ session: AuthSession | null; error: Error | null }> {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  
  if (error) {
    return { session: null, error: new Error(error.message) };
  }

  return { session: data.session, error: null };
}
