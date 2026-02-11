import { useState, useEffect } from 'react';
import SpellheimCanvas from '../game/SpellheimCanvas';
import HUDOverlay from '../ui/HUD/HUDOverlay';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CharacterCustomizationScreen from './CharacterCustomizationScreen';

interface GameScreenProps {
  onOpenCustomization: () => void;
}

export default function GameScreen({ onOpenCustomization }: GameScreenProps) {
  const [showCustomization, setShowCustomization] = useState(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement !== null);
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <SpellheimCanvas />
      <HUDOverlay
        onOpenCustomization={() => setShowCustomization(true)}
        isPointerLocked={isPointerLocked}
      />

      <Dialog open={showCustomization} onOpenChange={setShowCustomization}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Character Customization</DialogTitle>
          </DialogHeader>
          <CharacterCustomizationScreen
            onContinue={() => setShowCustomization(false)}
            onBack={() => setShowCustomization(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

