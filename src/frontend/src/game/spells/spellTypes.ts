export interface Spell {
  id: string;
  name: string;
  keybind: string;
  manaCost: number;
  cooldown: number;
  description: string;
}

export const SPELLS: Spell[] = [
  {
    id: 'projectile',
    name: 'Arcane Bolt',
    keybind: '1',
    manaCost: 15,
    cooldown: 1.5,
    description: 'Fire a bolt of arcane energy',
  },
  {
    id: 'area',
    name: 'Flame Burst',
    keybind: '2',
    manaCost: 30,
    cooldown: 3,
    description: 'Create an explosion of flames',
  },
  {
    id: 'shield',
    name: 'Mystic Shield',
    keybind: '3',
    manaCost: 20,
    cooldown: 5,
    description: 'Summon a protective barrier',
  },
];

