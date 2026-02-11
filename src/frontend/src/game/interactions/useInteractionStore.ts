import { create } from 'zustand';

interface InteractionStore {
  canInteract: boolean;
  showDialogue: boolean;
  dialogue: string[];
  currentDialogueIndex: number;
  setCanInteract: (can: boolean) => void;
  setShowDialogue: (show: boolean) => void;
  setDialogue: (dialogue: string[]) => void;
  nextDialogue: () => void;
  resetDialogue: () => void;
}

export const useInteractionStore = create<InteractionStore>((set) => ({
  canInteract: false,
  showDialogue: false,
  dialogue: [],
  currentDialogueIndex: 0,
  setCanInteract: (can) => set({ canInteract: can }),
  setShowDialogue: (show) => set({ showDialogue: show }),
  setDialogue: (dialogue) => set({ dialogue, currentDialogueIndex: 0 }),
  nextDialogue: () =>
    set((state) => ({
      currentDialogueIndex: Math.min(state.currentDialogueIndex + 1, state.dialogue.length - 1),
    })),
  resetDialogue: () => set({ currentDialogueIndex: 0, showDialogue: false }),
}));

