import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCharacterProfile } from '../state/useCharacterProfile';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface CharacterCustomizationScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

const ARCHETYPES = [
  { value: 'mage', label: 'Mage', description: 'Master of elemental magic' },
  { value: 'warlock', label: 'Warlock', description: 'Wielder of dark arts' },
  { value: 'cleric', label: 'Cleric', description: 'Divine spellcaster' },
  { value: 'druid', label: 'Druid', description: 'Nature\'s guardian' },
];

const HAIR_STYLES = ['Short', 'Long', 'Braided', 'Bald', 'Wild'];
const HAIR_COLORS = ['Black', 'Brown', 'Blonde', 'Red', 'Silver', 'White'];
const SKIN_TONES = ['Fair', 'Tan', 'Olive', 'Dark', 'Pale'];

export default function CharacterCustomizationScreen({ onContinue, onBack }: CharacterCustomizationScreenProps) {
  const { profile, updateProfile, isLoading } = useCharacterProfile();
  
  const [name, setName] = useState('');
  const [archetype, setArchetype] = useState('mage');
  const [hairStyle, setHairStyle] = useState('Short');
  const [hairColor, setHairColor] = useState('Black');
  const [skinTone, setSkinTone] = useState('Fair');

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setArchetype(profile.archetype);
      const cosmetics = profile.cosmeticOptions;
      if (cosmetics.length >= 3) {
        setHairStyle(cosmetics[0]);
        setHairColor(cosmetics[1]);
        setSkinTone(cosmetics[2]);
      }
    }
  }, [profile]);

  const handleContinue = () => {
    if (!name.trim()) {
      toast.error('Please enter a character name');
      return;
    }

    updateProfile({
      name: name.trim(),
      archetype,
      cosmeticOptions: [hairStyle, hairColor, skinTone],
    });

    toast.success('Character profile saved!');
    onContinue();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-8 overflow-auto">
      <div className="fantasy-panel p-8 max-w-2xl w-full relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute top-4 left-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="fantasy-heading text-3xl text-center mb-8 mt-8">Create Your Character</h1>

        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">Character Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={30}
              className="text-base"
            />
          </div>

          {/* Archetype */}
          <div className="space-y-2">
            <Label htmlFor="archetype" className="text-base">Archetype</Label>
            <Select value={archetype} onValueChange={setArchetype}>
              <SelectTrigger id="archetype" className="text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ARCHETYPES.map((arch) => (
                  <SelectItem key={arch.value} value={arch.value}>
                    <div>
                      <div className="font-semibold">{arch.label}</div>
                      <div className="text-xs text-muted-foreground">{arch.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cosmetics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hairStyle" className="text-sm">Hair Style</Label>
              <Select value={hairStyle} onValueChange={setHairStyle}>
                <SelectTrigger id="hairStyle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HAIR_STYLES.map((style) => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hairColor" className="text-sm">Hair Color</Label>
              <Select value={hairColor} onValueChange={setHairColor}>
                <SelectTrigger id="hairColor">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HAIR_COLORS.map((color) => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skinTone" className="text-sm">Skin Tone</Label>
              <Select value={skinTone} onValueChange={setSkinTone}>
                <SelectTrigger id="skinTone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SKIN_TONES.map((tone) => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={isLoading}
            className="fantasy-button w-full mt-8"
            size="lg"
          >
            {isLoading ? 'Saving...' : 'Enter Spellheim'}
          </Button>
        </div>
      </div>
    </div>
  );
}

