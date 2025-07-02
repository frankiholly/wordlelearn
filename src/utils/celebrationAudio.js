// Soothing audio system for extreme win celebration
export class CelebrationAudio {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.masterVolume = 0.3; // Evening-appropriate volume
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

  // Play the soothing melody (inspired by Moonlight Sonata but upbeat)
  async playExtremeCelebrationMelody() {
    if (this.isPlaying) return;
    
    await this.initAudio();
    if (!this.audioContext) return;

    this.isPlaying = true;
    const startTime = this.audioContext.currentTime + 0.1;
    const beatDuration = 0.4; // 120 BPM feel

    // Melody inspired by classical piano but more upbeat and shorter
    const melody = [
      { note: 'E', octave: 4, duration: beatDuration * 0.8, volume: 0.6 },
      { note: 'G', octave: 4, duration: beatDuration * 0.6, volume: 0.5 },
      { note: 'B', octave: 4, duration: beatDuration * 0.8, volume: 0.7 },
      { note: 'C', octave: 5, duration: beatDuration * 1.2, volume: 0.8 },
      { note: 'B', octave: 4, duration: beatDuration * 0.6, volume: 0.6 },
      { note: 'A', octave: 4, duration: beatDuration * 0.8, volume: 0.7 },
      { note: 'G', octave: 4, duration: beatDuration * 1.0, volume: 0.8 },
      { note: 'E', octave: 4, duration: beatDuration * 1.5, volume: 0.9 }
    ];

    // Bass accompaniment for richness
    const bass = [
      { note: 'C', octave: 3, duration: beatDuration * 2, volume: 0.3 },
      { note: 'G', octave: 2, duration: beatDuration * 2, volume: 0.3 },
      { note: 'A', octave: 2, duration: beatDuration * 2, volume: 0.3 },
      { note: 'C', octave: 3, duration: beatDuration * 2, volume: 0.3 }
    ];

    let currentTime = startTime;

    // Play melody
    melody.forEach((note, index) => {
      const frequency = this.getNoteFrequency(note.note, note.octave);
      this.createPianoTone(frequency, note.duration, currentTime, note.volume);
      currentTime += note.duration * 0.9; // Slight overlap for legato feel
    });

    // Play bass (starting slightly delayed for depth)
    let bassTime = startTime + beatDuration * 0.5;
    bass.forEach((note) => {
      const frequency = this.getNoteFrequency(note.note, note.octave);
      this.createPianoTone(frequency, note.duration, bassTime, note.volume);
      bassTime += note.duration;
    });

    // Reset playing state after melody completes
    const totalDuration = currentTime - startTime + beatDuration;
    setTimeout(() => {
      this.isPlaying = false;
    }, totalDuration * 1000);
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
