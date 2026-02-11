import { useState, useEffect, useRef } from 'react';
import { SPELLS } from './spellTypes';

export function useSpellSystem() {
  const [mana, setMana] = useState(100);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const cooldownTimers = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setMana((prev) => Math.min(100, prev + 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      Object.values(cooldownTimers.current).forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const spell = SPELLS.find(s => s.keybind === e.key);
      if (spell && document.pointerLockElement) {
        castSpell(spell.id);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mana, cooldowns]);

  const castSpell = (spellId: string): boolean => {
    const spell = SPELLS.find(s => s.id === spellId);
    if (!spell) return false;

    if (cooldowns[spellId] && cooldowns[spellId] > Date.now()) {
      return false;
    }

    if (mana < spell.manaCost) {
      return false;
    }

    setMana(prev => prev - spell.manaCost);
    
    const cooldownEnd = Date.now() + spell.cooldown * 1000;
    setCooldowns(prev => ({ ...prev, [spellId]: cooldownEnd }));

    if (cooldownTimers.current[spellId]) {
      clearTimeout(cooldownTimers.current[spellId]);
    }

    cooldownTimers.current[spellId] = setTimeout(() => {
      setCooldowns(prev => {
        const newCooldowns = { ...prev };
        delete newCooldowns[spellId];
        return newCooldowns;
      });
    }, spell.cooldown * 1000);

    return true;
  };

  return {
    spells: SPELLS,
    mana,
    cooldowns,
    castSpell,
    updateMana: setMana,
  };
}

