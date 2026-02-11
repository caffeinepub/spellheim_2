import { Progress } from '@/components/ui/progress';
import { Heart, Sparkles } from 'lucide-react';

interface StatusBarsProps {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
}

export default function StatusBars({ health, maxHealth, mana, maxMana }: StatusBarsProps) {
  const healthPercent = (health / maxHealth) * 100;
  const manaPercent = (mana / maxMana) * 100;

  return (
    <div className="fantasy-panel p-3 flex gap-6 pointer-events-auto">
      <div className="flex items-center gap-2 min-w-[200px]">
        <Heart className="w-5 h-5 text-destructive" />
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span>Health</span>
            <span>{health}/{maxHealth}</span>
          </div>
          <Progress value={healthPercent} className="h-2" />
        </div>
      </div>

      <div className="flex items-center gap-2 min-w-[200px]">
        <Sparkles className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span>Mana</span>
            <span>{mana}/{maxMana}</span>
          </div>
          <Progress value={manaPercent} className="h-2" />
        </div>
      </div>
    </div>
  );
}

