/**
 * Audio Player Manager for Cinematic Wedding Invitation
 * Handles HTML5 Audio + Web Audio API procedural synthesis fallback + WeChat JSBridge
 */
export class AudioPlayer {
  constructor(options = {}) {
    this.audioUrl = options.audioUrl || 'https://assets.mixkit.co/music/preview/mixkit-wedding-piano-and-strings-1002.mp3';
    this.isPlaying = false;
    this.audioEl = null;
    this.synthContext = null;
    this.synthInterval = null;
    this.isSynthMode = false;
    this.toggleButton = options.toggleButton || document.getElementById('musicController');

    this.initAudioElement();
    this.bindEvents();
    this.setupWeChatAutoPlay();
  }

  initAudioElement() {
    this.audioEl = new Audio();
    this.audioEl.src = this.audioUrl;
    this.audioEl.loop = true;
    this.audioEl.preload = 'auto';
    this.audioEl.crossOrigin = 'anonymous';

    this.audioEl.addEventListener('error', () => {
      console.warn('Network audio load failed, enabling Web Audio procedural synth fallback.');
      this.isSynthMode = true;
    });
  }

  bindEvents() {
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    // Pause on page blur, resume on focus if it was playing
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.isPlaying) {
          this.pause(false);
          this.wasPlayingBeforeHidden = true;
        }
      } else {
        if (this.wasPlayingBeforeHidden) {
          this.play();
          this.wasPlayingBeforeHidden = false;
        }
      }
    });
  }

  setupWeChatAutoPlay() {
    // WeChat auto-play bridge trigger
    if (typeof window.WeixinJSBridge === 'object' && typeof window.WeixinJSBridge.invoke === 'function') {
      window.WeixinJSBridge.invoke('getNetworkType', {}, () => {
        // Will be triggered upon user start
      });
    } else {
      document.addEventListener('WeixinJSBridgeReady', () => {
        if (typeof window.WeixinJSBridge === 'object' && typeof window.WeixinJSBridge.invoke === 'function') {
          window.WeixinJSBridge.invoke('getNetworkType', {}, () => {});
        }
      }, false);
    }
  }

  async play() {
    if (this.isSynthMode) {
      this.startSynthesizer();
      this.isPlaying = true;
      this.updateUI(true);
      return;
    }

    try {
      await this.audioEl.play();
      this.isPlaying = true;
      this.updateUI(true);
    } catch (err) {
      console.log('HTML5 audio play blocked, falling back to Web Audio API synthesized piano...');
      this.isSynthMode = true;
      this.startSynthesizer();
      this.isPlaying = true;
      this.updateUI(true);
    }
  }

  pause(updateState = true) {
    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.stopSynthesizer();
    if (updateState) {
      this.isPlaying = false;
    }
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause(true);
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (!this.toggleButton) return;
    if (playing) {
      this.toggleButton.classList.add('playing');
      this.toggleButton.setAttribute('aria-label', 'Pause Music');
    } else {
      this.toggleButton.classList.remove('playing');
      this.toggleButton.setAttribute('aria-label', 'Play Music');
    }
  }

  /* Procedural Cinematic Romantic Piano Synth Engine */
  startSynthesizer() {
    if (this.synthInterval) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!this.synthContext) {
      this.synthContext = new AudioContext();
    }
    if (this.synthContext.state === 'suspended') {
      this.synthContext.resume();
    }

    // Romantic G major / E minor chord progression
    const chords = [
      [196.00, 246.94, 293.66, 392.00], // G major
      [164.81, 196.00, 246.94, 329.63], // E minor
      [130.81, 196.00, 261.63, 329.63], // C major 7
      [146.83, 220.00, 293.66, 369.99]  // D major / sus
    ];

    let chordIndex = 0;
    const playNextChord = () => {
      if (!this.isPlaying || !this.synthContext) return;
      const chord = chords[chordIndex % chords.length];
      chordIndex++;

      const now = this.synthContext.currentTime;

      // Soft string pad
      chord.forEach((freq, i) => {
        const osc = this.synthContext.createOscillator();
        const gain = this.synthContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.15);

        gain.gain.setValueAtTime(0.001, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.04, now + i * 0.15 + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

        osc.connect(gain);
        gain.connect(this.synthContext.destination);

        osc.start(now + i * 0.15);
        osc.stop(now + 4.5);
      });
    };

    playNextChord();
    this.synthInterval = setInterval(playNextChord, 4000);
  }

  stopSynthesizer() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}
