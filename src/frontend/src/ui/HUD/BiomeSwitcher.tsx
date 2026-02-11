import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useBiomeStore } from '../../game/biomes/useBiomeStore';
import { BIOMES, BiomeType } from '../../game/biomes/biomes';

export default function BiomeSwitcher() {
  const { currentBiome, setBiome } = useBiomeStore();

  return (
    <div className="space-y-2">
      <Label htmlFor="biome">Biome</Label>
      <Select value={currentBiome} onValueChange={(value) => setBiome(value as BiomeType)}>
        <SelectTrigger id="biome">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(BIOMES).map(([key, config]) => (
            <SelectItem key={key} value={key}>
              {config.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

