import { useState, useCallback, useEffect } from "react";
import { useSavedDesigns } from "./useSavedDesigns";
import { useAuth } from "@/contexts/AuthContext";

const MIGRATION_DISMISSED_KEY = "mosaic-migration-dismissed";

interface UseDesignMigrationResult {
  showMigrationModal: boolean;
  localDesignsCount: number;
  dismissMigration: () => void;
  resetDismissal: () => void;
}

/**
 * Hook to manage the design migration modal state.
 * Shows the modal when:
 * - User just logged in
 * - User has local designs
 * - User hasn't dismissed the modal in this session
 */
export function useDesignMigration(): UseDesignMigrationResult {
  const { isAuthenticated, profile } = useAuth();
  const { designs: localDesigns } = useSavedDesigns();
  
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [wasAuthenticated, setWasAuthenticated] = useState(false);
  
  // Track authentication state changes
  useEffect(() => {
    // User just logged in (was not authenticated, now is)
    if (isAuthenticated && !wasAuthenticated && profile) {
      // Check if user has local designs and hasn't dismissed
      const dismissed = sessionStorage.getItem(MIGRATION_DISMISSED_KEY);
      
      if (localDesigns.length > 0 && !dismissed) {
        // Small delay to let the UI settle after login
        const timer = setTimeout(() => {
          setShowMigrationModal(true);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
    
    // Update tracking state
    setWasAuthenticated(isAuthenticated);
  }, [isAuthenticated, profile, localDesigns.length, wasAuthenticated]);
  
  // Dismiss the modal and remember for this session
  const dismissMigration = useCallback(() => {
    setShowMigrationModal(false);
    sessionStorage.setItem(MIGRATION_DISMISSED_KEY, "true");
  }, []);
  
  // Reset dismissal (useful for testing or manual trigger)
  const resetDismissal = useCallback(() => {
    sessionStorage.removeItem(MIGRATION_DISMISSED_KEY);
  }, []);
  
  return {
    showMigrationModal,
    localDesignsCount: localDesigns.length,
    dismissMigration,
    resetDismissal,
  };
}
