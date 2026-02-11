import { useInteractionStore } from '../../game/interactions/useInteractionStore';

export default function InteractionPrompt() {
  const { canInteract, showDialogue } = useInteractionStore();

  if (!canInteract || showDialogue) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fantasy-panel p-3 pointer-events-none">
      <p className="text-sm">
        Press <kbd className="px-2 py-1 bg-muted rounded font-mono">E</kbd> to interact
      </p>
    </div>
  );
}

