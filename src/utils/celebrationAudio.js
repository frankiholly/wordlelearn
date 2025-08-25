// Enhanced audio system for extreme win celebration
// Supports both custom audio files and synthesized fallback music
export class CelebrationAudio {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.masterVolume = 0.3; // Evening-appropriate volume
    this.audioBuffer = null; // For storing loaded audio file
    this.audioSource = null; // Current audio source
    this.useSynthesizedFallback = false; // Flag for fallback mode
  }

  // Load custom audio file (your celebrate.mp3)
  async loadAudioFile(audioPath) {
    try {
      await this.initAudio();
      if (!this.audioContext) {
        this.useSynthesizedFallback = true;
        return false;
      }
      
      console.log('[Audio] Loading custom celebration music:', audioPath);
      const response = await fetch(audioPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      console.log('[Audio] Custom celebration music loaded successfully');
      this.useSynthesizedFallback = false;
      return true;
    } catch (error) {
      console.warn('[Audio] Failed to load custom audio file, using synthesized fallback:', error);
      this.useSynthesizedFallback = true;
      this.audioBuffer = null;
      return false;
    }
  }

  // Enhanced play method that tries custom audio first, then falls back to synthesized
  async playCelebrationMusic() {
    if (this.isPlaying) return;
    
    await this.initAudio();
    if (!this.audioContext) return;

    this.isPlaying = true;

    // Try to play custom audio file first
    if (this.audioBuffer && !this.useSynthesizedFallback) {
      try {
        console.log('[Audio] Playing custom celebration music');
        return await this.playCustomAudio();
      } catch (error) {
        console.warn('[Audio] Custom audio playback failed, falling back to synthesized:', error);
        this.useSynthesizedFallback = true;
      }
    }
    
    // Fallback to synthesized music
    console.log('[Audio] Playing synthesized celebration music');
    return await this.playExtremeCelebrationMelody();
  }

  // Play the custom audio file
  async playCustomAudio() {
    if (!this.audioBuffer) throw new Error('No audio buffer loaded');

    this.audioSource = this.audioContext.createBufferSource();
    this.audioSource.buffer = this.audioBuffer;
    
    // Create gain node for volume control
    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(this.masterVolume, this.audioContext.currentTime);
    
    // Connect audio graph
    this.audioSource.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Start playback
    this.audioSource.start();
    
    // Handle playback completion
    this.audioSource.onended = () => {
      this.isPlaying = false;
      this.audioSource = null;
      console.log('[Audio] Custom celebration music finished');
    };
    
    return this.audioBuffer.duration;
  }

  // Initialize Web Audio API
  async initAudio() {
    if (this.audioContext) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Handle audio context suspension (required by browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Create a piano-like synthesized tone
  createPianoTone(frequency, duration, startTime, volume = 0.5) {
    if (!this.audioContext) return;

    // Create oscillators for a richer piano-like sound
    const fundamental = this.audioContext.createOscillator();
    const harmonics = [
      this.audioContext.createOscillator(),
      this.audioContext.createOscillator(),
      this.audioContext.createOscillator()
    ];

    // Set frequencies (fundamental + harmonics)
    fundamental.frequency.setValueAtTime(frequency, startTime);
    harmonics[0].frequency.setValueAtTime(frequency * 2, startTime); // Octave
    harmonics[1].frequency.setValueAtTime(frequency * 3, startTime); // Fifth
    harmonics[2].frequency.setValueAtTime(frequency * 4, startTime); // Octave

    // Use different waveforms for richness
    fundamental.type = 'sine';
    harmonics[0].type = 'triangle';
    harmonics[1].type = 'triangle';
    harmonics[2].type = 'sine';

    // Create gain nodes for volume control
    const fundamentalGain = this.audioContext.createGain();
    const harmonicGains = harmonics.map(() => this.audioContext.createGain());
    const masterGain = this.audioContext.createGain();

    // Set volume levels
    fundamentalGain.gain.setValueAtTime(volume * this.masterVolume, startTime);
    harmonicGains[0].gain.setValueAtTime(volume * this.masterVolume * 0.3, startTime);
    harmonicGains[1].gain.setValueAtTime(volume * this.masterVolume * 0.15, startTime);
    harmonicGains[2].gain.setValueAtTime(volume * this.masterVolume * 0.1, startTime);

    // Piano-like envelope (quick attack, gradual decay)
    masterGain.gain.setValueAtTime(0, startTime);
    masterGain.gain.linearRampToValueAtTime(1, startTime + 0.01); // Quick attack
    masterGain.gain.exponentialRampToValueAtTime(0.3, startTime + duration * 0.3); // Sustain
    masterGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration); // Decay

    // Connect the audio graph
    fundamental.connect(fundamentalGain);
    harmonics.forEach((osc, index) => {
      osc.connect(harmonicGains[index]);
    });

    fundamentalGain.connect(masterGain);
    harmonicGains.forEach(gain => gain.connect(masterGain));
    masterGain.connect(this.audioContext.destination);

    // Schedule start and stop
    fundamental.start(startTime);
    harmonics.forEach(osc => osc.start(startTime));
    
    fundamental.stop(startTime + duration);
    harmonics.forEach(osc => osc.stop(startTime + duration));
  }

  // Musical note frequencies (in Hz)
  getNoteFrequency(note, octave = 4) {
    const noteFrequencies = {
      'C': 261.63,
      'D': 293.66,
      'E': 329.63,
      'F': 349.23,
      'G': 392.00,
      'A': 440.00,
      'B': 493.88
    };

    const baseFreq = noteFrequencies[note];
    if (!baseFreq) return 440; // Default to A4

    // Adjust for octave
    const octaveMultiplier = Math.pow(2, octave - 4);
    return baseFreq * octaveMultiplier;
  }

  // Play the extended soothing melody (inspired by Moonlight Sonata but upbeat)
  async playExtremeCelebrationMelody() {
    if (this.isPlaying) return;
    
    await this.initAudio();
    if (!this.audioContext) return;

    this.isPlaying = true;
    const startTime = this.audioContext.currentTime + 0.1;
    const beatDuration = 0.45; // Slightly slower for expressiveness

    // Extended melody with multiple phrases - A-B-A form with bridge
    // Phrase A: Opening melody (gentle and welcoming)
    const phraseA = [
      { note: 'E', octave: 4, duration: beatDuration * 0.8, volume: 0.5 },
      { note: 'G', octave: 4, duration: beatDuration * 0.6, volume: 0.6 },
      { note: 'B', octave: 4, duration: beatDuration * 0.8, volume: 0.7 },
      { note: 'C', octave: 5, duration: beatDuration * 1.2, volume: 0.8 },
      { note: 'B', octave: 4, duration: beatDuration * 0.6, volume: 0.7 },
      { note: 'A', octave: 4, duration: beatDuration * 0.8, volume: 0.8 },
      { note: 'G', octave: 4, duration: beatDuration * 1.5, volume: 0.9 }
    ];

    // Phrase B: Development with harmony (richer and more complex)
    const phraseB = [
      { note: 'C', octave: 5, duration: beatDuration * 0.7, volume: 0.8 },
      { note: 'D', octave: 5, duration: beatDuration * 0.5, volume: 0.9 },
      { note: 'E', octave: 5, duration: beatDuration * 0.8, volume: 1.0 },
      { note: 'D', octave: 5, duration: beatDuration * 0.6, volume: 0.8 },
      { note: 'C', octave: 5, duration: beatDuration * 0.8, volume: 0.9 },
      { note: 'B', octave: 4, duration: beatDuration * 0.7, volume: 0.8 },
      { note: 'A', octave: 4, duration: beatDuration * 1.0, volume: 0.9 },
      { note: 'G', octave: 4, duration: beatDuration * 1.2, volume: 0.8 }
    ];

    // Bridge: Modulation and resolution
    const bridge = [
      { note: 'F', octave: 4, duration: beatDuration * 0.9, volume: 0.7 },
      { note: 'A', octave: 4, duration: beatDuration * 0.7, volume: 0.8 },
      { note: 'C', octave: 5, duration: beatDuration * 1.0, volume: 0.9 },
      { note: 'B', octave: 4, duration: beatDuration * 0.8, volume: 0.8 },
      { note: 'G', octave: 4, duration: beatDuration * 1.5, volume: 0.9 }
    ];

    // Final phrase A (return with resolution)
    const phraseAFinal = [
      { note: 'E', octave: 4, duration: beatDuration * 1.0, volume: 0.8 },
      { note: 'G', octave: 4, duration: beatDuration * 0.8, volume: 0.9 },
      { note: 'C', octave: 5, duration: beatDuration * 1.5, volume: 1.0 },
      { note: 'G', octave: 4, duration: beatDuration * 2.0, volume: 0.7 } // Final resolution
    ];

    // Enhanced bass with more movement
    const bassProgression = [
      // Supporting phrase A
      { note: 'C', octave: 3, duration: beatDuration * 3, volume: 0.3 },
      { note: 'G', octave: 2, duration: beatDuration * 2, volume: 0.3 },
      { note: 'A', octave: 2, duration: beatDuration * 2, volume: 0.3 },
      
      // Supporting phrase B  
      { note: 'F', octave: 2, duration: beatDuration * 2.5, volume: 0.35 },
      { note: 'C', octave: 3, duration: beatDuration * 2.5, volume: 0.35 },
      { note: 'G', octave: 2, duration: beatDuration * 2, volume: 0.3 },
      
      // Supporting bridge
      { note: 'F', octave: 2, duration: beatDuration * 2, volume: 0.3 },
      { note: 'G', octave: 2, duration: beatDuration * 2.5, volume: 0.32 },
      
      // Final resolution
      { note: 'C', octave: 3, duration: beatDuration * 4, volume: 0.25 }
    ];

    let currentTime = startTime;

    // Play the complete extended composition
    const fullMelody = [...phraseA, ...phraseB, ...bridge, ...phraseAFinal];
    
    fullMelody.forEach((note, index) => {
      const frequency = this.getNoteFrequency(note.note, note.octave);
      // Add subtle volume crescendo and diminuendo
      let adjustedVolume = note.volume;
      const totalNotes = fullMelody.length;
      if (index < totalNotes * 0.3) {
        adjustedVolume *= (0.7 + (index / (totalNotes * 0.3)) * 0.3); // Gentle crescendo
      } else if (index > totalNotes * 0.7) {
        const fadePosition = (index - totalNotes * 0.7) / (totalNotes * 0.3);
        adjustedVolume *= (1.0 - fadePosition * 0.4); // Gentle diminuendo
      }
      
      this.createPianoTone(frequency, note.duration, currentTime, adjustedVolume);
      currentTime += note.duration * 0.85; // Legato connection
    });

    // Play bass (starting slightly delayed for depth)
    let bassTime = startTime + beatDuration * 0.3;
    bassProgression.forEach((note) => {
      const frequency = this.getNoteFrequency(note.note, note.octave);
      this.createPianoTone(frequency, note.duration, bassTime, note.volume);
      bassTime += note.duration * 0.9;
    });

    // Store total duration for external access
    this.totalDuration = currentTime - startTime + beatDuration;
    
    // Reset playing state after melody completes
    setTimeout(() => {
      this.isPlaying = false;
    }, this.totalDuration * 1000);
    
    return this.totalDuration;
  }

  // Enhanced stop method for both custom and synthesized audio
  stop() {
    // Stop custom audio if playing
    if (this.audioSource) {
      try {
        this.audioSource.stop();
        this.audioSource.disconnect();
      } catch (error) {
        console.warn('[Audio] Error stopping custom audio:', error);
      }
      this.audioSource = null;
    }
    
    // Stop synthesized audio if playing
    if (this.audioContext && this.isPlaying) {
      // Create a quick fade-out effect by lowering the context gain
      try {
        const fadeGain = this.audioContext.createGain();
        fadeGain.connect(this.audioContext.destination);
        fadeGain.gain.setValueAtTime(1, this.audioContext.currentTime);
        fadeGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.3);
      } catch (error) {
        console.warn('[Audio] Error creating fade-out:', error);
      }
    }
    
    this.isPlaying = false;
  }

  // Set volume (0-1)
  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  // Get current volume
  getVolume() {
    return this.masterVolume;
  }
}

// Create singleton instance
export const celebrationAudio = new CelebrationAudio();
