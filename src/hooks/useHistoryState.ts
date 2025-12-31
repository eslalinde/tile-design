import { useImmer } from "use-immer";
import { current } from "immer";
import { useCallback } from "react";

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

/**
 * A generic hook that provides undo/redo functionality using immer for immutable updates.
 * 
 * @param initialState - The initial state value or a function that returns it
 * @param maxHistory - Maximum number of history entries to keep (default: 50)
 */
export function useHistoryState<T>(
  initialState: T | (() => T),
  maxHistory = 50
) {
  const resolvedInitial = typeof initialState === "function" 
    ? (initialState as () => T)() 
    : initialState;

  const [state, setState] = useImmer<HistoryState<T>>({
    past: [],
    present: resolvedInitial,
    future: [],
  });

  /**
   * Update the current state. Pushes current state to past and clears future.
   */
  const set = useCallback(
    (updater: T | ((draft: T) => void)) => {
      setState((draft) => {
        // Save a snapshot of current state to past (use current() to get plain object)
        const snapshot = current(draft.present);
        draft.past.push(snapshot as T);
        
        // Limit history size
        if (draft.past.length > maxHistory) {
          draft.past.shift();
        }
        
        // Clear future on new change
        draft.future = [];
        
        // Apply update to present
        if (typeof updater === "function") {
          (updater as (draft: T) => void)(draft.present as T);
        } else {
          draft.present = updater as T;
        }
      });
    },
    [setState, maxHistory]
  );

  /**
   * Undo the last change. Moves current state to future and pops from past.
   */
  const undo = useCallback(() => {
    setState((draft) => {
      if (draft.past.length === 0) return;

      const previous = draft.past.pop()!;
      const currentSnapshot = current(draft.present);
      draft.future.unshift(currentSnapshot as T);
      draft.present = previous as T;
    });
  }, [setState]);

  /**
   * Redo the last undone change. Moves current state to past and pops from future.
   */
  const redo = useCallback(() => {
    setState((draft) => {
      if (draft.future.length === 0) return;

      const next = draft.future.shift()!;
      const currentSnapshot = current(draft.present);
      draft.past.push(currentSnapshot as T);
      draft.present = next as T;
    });
  }, [setState]);

  /**
   * Reset to a new state, clearing all history.
   */
  const reset = useCallback(
    (newState: T) => {
      setState((draft) => {
        draft.past = [];
        draft.present = newState as T;
        draft.future = [];
      });
    },
    [setState]
  );

  return {
    /** Current state value */
    state: state.present,
    /** Update state (supports immer-style updater function or direct value) */
    set,
    /** Undo the last change */
    undo,
    /** Redo the last undone change */
    redo,
    /** Reset to a new state, clearing history */
    reset,
    /** Whether undo is available */
    canUndo: state.past.length > 0,
    /** Whether redo is available */
    canRedo: state.future.length > 0,
    /** Number of undo steps available */
    undoCount: state.past.length,
    /** Number of redo steps available */
    redoCount: state.future.length,
  };
}
