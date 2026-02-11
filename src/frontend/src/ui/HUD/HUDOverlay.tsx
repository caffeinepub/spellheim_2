import { useState } from 'react';
import StatusBars from './StatusBars';
import SpellBar from './SpellBar';
import BiomeSwitcher from './BiomeSwitcher';
import AudioControls from './AudioControls';
import InteractionPrompt from './InteractionPrompt';
import DialoguePanel from '../dialogue/DialoguePanel';
import { useCharacterProfile } from '../../state/useCharacterProfile';
import { useSpellSystem } from '../../game/spells/useSpellSystem';
import { useCombatState } from '../../game/combat/useCombatState';
import { Button } from '@/components/ui/button';
import { Settings, User } from 'lucide-react';
import LoginButton from '../Auth/LoginButton';

interface HUDOverlayProps {
  onOpenCustomization: () => void;
  isPointerLocked: boolean;
}

export default function HUDOverlay({ onOpenCustomization, isPointerLocked }: HUDOverlayProps) {
  const { profile } = useCharacterProfile();
  const { mana, cooldowns, spells } = useSpellSystem();
  const { playerHealth, maxHealth } = useCombatState();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
        <div className="fantasy-panel p-3 pointer-events-auto">
          {profile ? (
            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              <div>
                <div className="font-semibold">{profile.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{profile.archetype}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No character</div>
          )}
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <LoginButton />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="fantasy-panel"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute top-20 right-4 fantasy-panel p-4 space-y-4 pointer-events-auto">
          <h3 className="fantasy-heading text-lg">Settings</h3>
          <AudioControls />
          <BiomeSwitcher />
          <Button
            variant="outline"
            onClick={onOpenCustomization}
            className="w-full"
          >
            <User className="w-4 h-4 mr-2" />
            Customize Character
          </Button>
        </div>
      )}

      {/* Bottom HUD */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center gap-3 pointer-events-none">
        <StatusBars health={playerHealth} maxHealth={maxHealth} mana={mana} maxMana={100} />
        <SpellBar spells={spells} cooldowns={cooldowns} />
      </div>

      {/* Center prompts */}
      <InteractionPrompt />
      <DialoguePanel />

      {/* Pointer lock instruction */}
      {!isPointerLocked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fantasy-panel p-4 pointer-events-none">
          <p className="text-sm text-muted-foreground">Click to lock pointer and start playing</p>
        </div>
      )}
    </>
  );
}

