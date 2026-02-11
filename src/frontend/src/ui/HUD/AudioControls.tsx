import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useAudio } from '../../audio/AudioProvider';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function AudioControls() {
  const { isPlaying, volume, isMuted, play, pause, setVolume, toggleMute } = useAudio();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Music</Label>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={isPlaying ? pause : play}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="volume" className="text-xs">Volume</Label>
        <Slider
          id="volume"
          value={[volume * 100]}
          onValueChange={(values) => setVolume(values[0] / 100)}
          max={100}
          step={1}
          disabled={isMuted}
        />
      </div>
    </div>
  );
}

