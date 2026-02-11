import { Button } from '@/components/ui/button';
import { useInteractionStore } from '../../game/interactions/useInteractionStore';
import { X, ArrowRight } from 'lucide-react';

export default function DialoguePanel() {
  const { showDialogue, dialogue, currentDialogueIndex, nextDialogue, resetDialogue } = useInteractionStore();

  if (!showDialogue || dialogue.length === 0) return null;

  const currentText = dialogue[currentDialogueIndex];
  const isLastDialogue = currentDialogueIndex >= dialogue.length - 1;

  return (
    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 pointer-events-auto">
      <div className="fantasy-panel p-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={resetDialogue}
          className="absolute top-2 right-2"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="pr-8">
          <p className="text-base leading-relaxed mb-4">{currentText}</p>
          
          <div className="flex justify-end gap-2">
            {!isLastDialogue && (
              <Button onClick={nextDialogue} className="fantasy-button">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            <Button onClick={resetDialogue} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

