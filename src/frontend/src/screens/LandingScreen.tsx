import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface LandingScreenProps {
  onStartGame: () => void;
}

export default function LandingScreen({ onStartGame }: LandingScreenProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <main className="relative z-10 flex flex-col items-center gap-8 max-w-4xl px-8">
        {/* Logo */}
        <div className="mb-4">
          <img
            src="/assets/generated/spellheim-logo.dim_1024x256.png"
            alt="Spellheim"
            className="w-full max-w-2xl h-auto drop-shadow-2xl"
          />
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-2xl fantasy-heading">
          Enter the mystical world of Niron. Master ancient spells, battle fierce creatures, and explore enchanted biomes.
        </p>

        {/* Start Button */}
        <Button
          onClick={onStartGame}
          size="lg"
          className="fantasy-button text-lg px-12 py-6 mt-4"
        >
          Begin Your Journey
        </Button>

        {/* Instructions */}
        <div className="fantasy-panel p-6 mt-8 max-w-2xl">
          <h3 className="fantasy-heading text-lg mb-3">Controls</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><strong>WASD</strong> - Move</li>
            <li><strong>Mouse</strong> - Look around (click to lock pointer)</li>
            <li><strong>1, 2, 3</strong> - Cast spells</li>
            <li><strong>E</strong> - Interact with NPCs</li>
            <li><strong>ESC</strong> - Open menu</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        © 2026. Built with <Heart className="inline w-4 h-4 text-destructive fill-destructive" /> using{' '}
        <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}

