import { useState, useEffect, useCallback, useMemo } from "react";
import { useSavedDesigns, type SavedDesign, type SaveDesignInput } from "./useSavedDesigns";
import { useSavedDesignsCloud, type CloudDesign, type SaveCloudDesignInput } from "./useSavedDesignsCloud";
import { useAuth } from "@/contexts/AuthContext";

export type DesignSource = "local" | "cloud";

// Unified design that can be either local or cloud
export interface UnifiedDesign {
  id: string;
  source: DesignSource;
  cloudId?: string; // ID in database if it's a cloud design
  
  // Common fields
  mosaicId: string;
  mosaicName: string;
  category: string;
  shape: string;
  width: number;
  height: number;
  parts: { partId: string; colorHex: string }[];
  svg: string;
  pattern?: string;
  border?: unknown;
  customName?: string;
  createdAt: string;
  updatedAt: string;
  
  // Status
  isSyncing?: boolean;
}

// Convert local SavedDesign to UnifiedDesign
function localToUnified(design: SavedDesign): UnifiedDesign {
  return {
    id: design.id,
    source: "local",
    mosaicId: design.mosaicId,
    mosaicName: design.mosaicName,
    category: design.category,
    shape: design.shape,
    width: design.width,
    height: design.height,
    parts: design.parts,
    svg: design.svg,
    pattern: design.pattern,
    border: design.border,
    customName: design.customName,
    createdAt: design.createdAt,
    updatedAt: design.updatedAt,
  };
}

// Convert CloudDesign to UnifiedDesign
function cloudToUnified(design: CloudDesign): UnifiedDesign {
  return {
    id: `cloud-${design.id}`,
    source: "cloud",
    cloudId: design.id,
    mosaicId: design.mosaicId,
    mosaicName: design.mosaicName,
    category: design.category,
    shape: design.shape,
    width: design.width,
    height: design.height,
    parts: design.parts,
    svg: design.svg,
    pattern: design.pattern,
    border: design.border,
    customName: design.customName,
    createdAt: design.createdAt,
    updatedAt: design.updatedAt,
  };
}

// Convert UnifiedDesign to SaveDesignInput (local)
function unifiedToLocalInput(design: UnifiedDesign): SaveDesignInput {
  return {
    mosaicId: design.mosaicId,
    mosaicName: design.mosaicName,
    category: design.category as SaveDesignInput["category"],
    shape: design.shape as SaveDesignInput["shape"],
    width: design.width,
    height: design.height,
    parts: design.parts,
    svg: design.svg,
    pattern: design.pattern as SaveDesignInput["pattern"],
    border: design.border as SaveDesignInput["border"],
    customName: design.customName,
  };
}

// Convert UnifiedDesign to SaveCloudDesignInput
function unifiedToCloudInput(design: UnifiedDesign): SaveCloudDesignInput {
  return {
    mosaicId: design.mosaicId,
    mosaicName: design.mosaicName,
    category: design.category as SaveCloudDesignInput["category"],
    shape: design.shape as SaveCloudDesignInput["shape"],
    width: design.width,
    height: design.height,
    parts: design.parts,
    svg: design.svg,
    pattern: design.pattern as SaveCloudDesignInput["pattern"],
    border: design.border as SaveCloudDesignInput["border"],
    customName: design.customName,
  };
}

export interface UseSavedDesignsUnifiedResult {
  // All designs combined
  allDesigns: UnifiedDesign[];
  localDesigns: UnifiedDesign[];
  cloudDesigns: UnifiedDesign[];
  
  // Status
  isLoading: boolean;
  isSyncing: boolean;
  hasLocalDesigns: boolean;
  pendingSyncCount: number;
  
  // Actions
  saveDesign: (input: SaveDesignInput) => Promise<UnifiedDesign | null>;
  updateDesign: (id: string, updates: Partial<SaveDesignInput>) => Promise<UnifiedDesign | null>;
  deleteDesign: (id: string) => Promise<boolean>;
  
  // Sync actions
  uploadToCloud: (localId: string) => Promise<UnifiedDesign | null>;
  uploadAllToCloud: () => Promise<{ success: number; failed: number }>;
  
  // Utility
  getDesignById: (id: string) => UnifiedDesign | undefined;
  refresh: () => Promise<void>;
}

export function useSavedDesignsUnified(): UseSavedDesignsUnifiedResult {
  const { profile, isAuthenticated } = useAuth();
  const userId = profile?.id || null;
  
  // Local storage hook
  const localHook = useSavedDesigns();
  
  // Cloud storage hook
  const cloudHook = useSavedDesignsCloud(userId);
  
  // Syncing state
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());
  
  // Convert to unified designs
  const localDesigns = useMemo(
    () => localHook.designs.map(localToUnified),
    [localHook.designs]
  );
  
  const cloudDesigns = useMemo(
    () => cloudHook.designs.map(cloudToUnified),
    [cloudHook.designs]
  );
  
  // Combine all designs, sorted by updatedAt
  const allDesigns = useMemo(() => {
    const all = [...cloudDesigns, ...localDesigns];
    
    // Mark syncing designs
    all.forEach((design) => {
      if (syncingIds.has(design.id)) {
        design.isSyncing = true;
      }
    });
    
    // Sort by updatedAt descending
    all.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    return all;
  }, [cloudDesigns, localDesigns, syncingIds]);
  
  // Status
  const isLoading = localHook.isLoading || cloudHook.isLoading;
  const isSyncing = syncingIds.size > 0;
  const hasLocalDesigns = localDesigns.length > 0;
  const pendingSyncCount = localDesigns.length;
  
  // Save a new design - to cloud if authenticated, otherwise to local
  const saveDesign = useCallback(
    async (input: SaveDesignInput): Promise<UnifiedDesign | null> => {
      if (isAuthenticated && userId) {
        // Save to cloud
        const cloudDesign = await cloudHook.saveDesign({
          ...input,
          customName: input.customName,
        } as SaveCloudDesignInput);
        
        if (cloudDesign) {
          return cloudToUnified(cloudDesign);
        }
        return null;
      } else {
        // Save to local storage
        const localDesign = localHook.saveDesign(input);
        return localToUnified(localDesign);
      }
    },
    [isAuthenticated, userId, cloudHook, localHook]
  );
  
  // Update an existing design
  const updateDesign = useCallback(
    async (id: string, updates: Partial<SaveDesignInput>): Promise<UnifiedDesign | null> => {
      // Check if it's a cloud design
      if (id.startsWith("cloud-")) {
        const cloudId = id.replace("cloud-", "");
        const updated = await cloudHook.updateDesign(cloudId, updates as Partial<SaveCloudDesignInput>);
        if (updated) {
          return cloudToUnified(updated);
        }
        return null;
      } else {
        // Local design
        const updated = localHook.updateDesign(id, updates);
        if (updated) {
          return localToUnified(updated);
        }
        return null;
      }
    },
    [cloudHook, localHook]
  );
  
  // Delete a design
  const deleteDesign = useCallback(
    async (id: string): Promise<boolean> => {
      // Check if it's a cloud design
      if (id.startsWith("cloud-")) {
        const cloudId = id.replace("cloud-", "");
        return await cloudHook.deleteDesign(cloudId);
      } else {
        // Local design
        return localHook.deleteDesign(id);
      }
    },
    [cloudHook, localHook]
  );
  
  // Upload a local design to cloud
  const uploadToCloud = useCallback(
    async (localId: string): Promise<UnifiedDesign | null> => {
      if (!isAuthenticated || !userId) {
        console.error("Cannot upload to cloud: not authenticated");
        return null;
      }
      
      const localDesign = localHook.getDesignById(localId);
      if (!localDesign) {
        console.error("Local design not found:", localId);
        return null;
      }
      
      // Mark as syncing
      setSyncingIds((prev) => new Set(prev).add(localId));
      
      try {
        // Save to cloud
        const cloudInput = unifiedToCloudInput(localToUnified(localDesign));
        const cloudDesign = await cloudHook.saveDesign(cloudInput);
        
        if (cloudDesign) {
          // Delete from local storage
          localHook.deleteDesign(localId);
          
          return cloudToUnified(cloudDesign);
        }
        return null;
      } finally {
        // Remove from syncing
        setSyncingIds((prev) => {
          const next = new Set(prev);
          next.delete(localId);
          return next;
        });
      }
    },
    [isAuthenticated, userId, localHook, cloudHook]
  );
  
  // Upload all local designs to cloud
  const uploadAllToCloud = useCallback(
    async (): Promise<{ success: number; failed: number }> => {
      if (!isAuthenticated || !userId) {
        console.error("Cannot upload to cloud: not authenticated");
        return { success: 0, failed: localDesigns.length };
      }
      
      let success = 0;
      let failed = 0;
      
      // Process each local design
      for (const design of localDesigns) {
        const result = await uploadToCloud(design.id);
        if (result) {
          success++;
        } else {
          failed++;
        }
      }
      
      return { success, failed };
    },
    [isAuthenticated, userId, localDesigns, uploadToCloud]
  );
  
  // Get design by ID
  const getDesignById = useCallback(
    (id: string): UnifiedDesign | undefined => {
      return allDesigns.find((d) => d.id === id);
    },
    [allDesigns]
  );
  
  // Refresh both sources
  const refresh = useCallback(async () => {
    await cloudHook.refresh();
    // Local storage doesn't need refresh as it's synchronous
  }, [cloudHook]);
  
  return {
    allDesigns,
    localDesigns,
    cloudDesigns,
    isLoading,
    isSyncing,
    hasLocalDesigns,
    pendingSyncCount,
    saveDesign,
    updateDesign,
    deleteDesign,
    uploadToCloud,
    uploadAllToCloud,
    getDesignById,
    refresh,
  };
}
