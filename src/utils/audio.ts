// Web Audio API Synthesizer for Mystical Sound Effects

class SoundEffects {
  private ctx: AudioContext | null = null;
  private shuffleOsc: OscillatorNode | null = null;
  private shuffleGain: GainNode | null = null;
  private isShuffling = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Rapid paper flutter / card shuffling noise
  startShuffleSound() {
    try {
      this.init();
      if (!this.ctx || this.isShuffling) return;

      this.isShuffling = true;
      const bufferSize = this.ctx.sampleRate * 1;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // White noise with rhythmic flutter
      for (let i = 0; i < bufferSize; i++) {
        const flutter = Math.sin((i / this.ctx.sampleRate) * 45 * Math.PI);
        data[i] = (Math.random() * 2 - 1) * (0.3 + 0.7 * Math.abs(flutter));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.2, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      this.shuffleOsc = noise as unknown as OscillatorNode;
      this.shuffleGain = gain;
    } catch {
      // Audio autoplay policy catch
    }
  }

  stopShuffleSound() {
    try {
      this.isShuffling = false;
      if (this.shuffleGain && this.ctx) {
        this.shuffleGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);
        setTimeout(() => {
          if (this.shuffleOsc) {
            try {
              (this.shuffleOsc as unknown as AudioBufferSourceNode).stop();
            } catch {}
            this.shuffleOsc = null;
          }
        }, 120);
      }
    } catch {}
  }

  // Card click / select tap
  playCardSelectSound() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {}
  }

  // Divine Bell / Mystic Chime for reading reveal
  playMysticChime() {
    try {
      this.init();
      if (!this.ctx) return;

      const freqs = [528, 792, 1056]; // Solfeggio 528Hz love/miracle frequency
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const startTime = this.ctx.currentTime + idx * 0.04;
        const duration = 2.2;

        gain.gain.setValueAtTime(0.06 / (idx + 1), startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {}
  }
}

export const audioFx = new SoundEffects();
