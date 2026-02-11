import { useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import CharacterCustomizationScreen from './screens/CharacterCustomizationScreen';
import GameScreen from './screens/GameScreen';
import { AudioProvider } from './audio/AudioProvider';
import { Toaster } from '@/components/ui/sonner';

type AppScreen = 'landing' | 'customization' | 'game';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');

  return (
    <AudioProvider>
      <div className="w-full h-screen overflow-hidden">
        {currentScreen === 'landing' && (
          <LandingScreen onStartGame={() => setCurrentScreen('customization')} />
        )}
        {currentScreen === 'customization' && (
          <CharacterCustomizationScreen
            onContinue={() => setCurrentScreen('game')}
            onBack={() => setCurrentScreen('landing')}
          />
        )}
        {currentScreen === 'game' && (
          <GameScreen onOpenCustomization={() => setCurrentScreen('customization')} />
        )}
        <Toaster />
      </div>
    </AudioProvider>
  );
}

