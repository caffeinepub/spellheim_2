import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}

const AUDIO_STORAGE_KEY = 'spellheim_audio_settings';

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem(AUDIO_STORAGE_KEY);
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        setVolumeState(settings.volume ?? 0.5);
        setIsMuted(settings.isMuted ?? false);
      } catch (error) {
        console.error('Failed to load audio settings:', error);
      }
    }

    // Create audio element
    const audio = new Audio('/assets/audio/spellheim-theme.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem(
      AUDIO_STORAGE_KEY,
      JSON.stringify({ volume, isMuted })
    );
  }, [volume, isMuted]);

  const play = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        isMuted,
        play,
        pause,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

