import { Spell } from '../../game/spells/spellTypes';

interface SpellBarProps {
  spells: Spell[];
  cooldowns: Record<string, number>;
}

export default function SpellBar({ spells, cooldowns }: SpellBarProps) {
  const getIconPosition = (index: number): string => {
    const positions = [
      'object-position: 0% 0%',
      'object-position: 50% 0%',
      'object-position: 100% 0%',
    ];
    return positions[index] || positions[0];
  };

  return (
    <div className="fantasy-panel p-3 flex gap-3 pointer-events-auto">
      {spells.map((spell, index) => {
        const cooldownEnd = cooldowns[spell.id];
        const isOnCooldown = cooldownEnd && cooldownEnd > Date.now();
        const cooldownPercent = isOnCooldown
          ? ((cooldownEnd - Date.now()) / (spell.cooldown * 1000)) * 100
          : 0;

        return (
          <div key={spell.id} className="relative">
            <div className="w-16 h-16 rounded border-2 border-border bg-muted/50 overflow-hidden relative">
              <img
                src="/assets/generated/spell-icons-set.dim_512x512.png"
                alt={spell.name}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: index === 0 ? '0% 50%' : index === 1 ? '50% 50%' : '100% 50%',
                }}
              />
              
              {isOnCooldown && (
                <div
                  className="absolute bottom-0 left-0 right-0 bg-black/70"
                  style={{ height: `${cooldownPercent}%` }}
                />
              )}
            </div>
            
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">
              {spell.keybind}
            </div>
            
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-center whitespace-nowrap">
              <div className="font-semibold">{spell.name}</div>
              <div className="text-muted-foreground">{spell.manaCost} mana</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

