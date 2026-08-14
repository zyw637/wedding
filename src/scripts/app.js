/**
 * Application Entry Point
 * Orchestrates I18n, AudioPlayer, SlideController, and user interactions
 */
import { I18n } from './i18n.js';
import { AudioPlayer } from './audio-player.js';
import { SlideController } from './slide-controller.js';

class WeddingApp {
  constructor() {
    this.i18n = new I18n();
    this.audioPlayer = null;
    this.slideController = null;
  }

  async init() {
    // 1. Initialize Localization
    await this.i18n.init();

    // 2. Initialize Audio Manager
    this.audioPlayer = new AudioPlayer();

    // 3. Initialize Slide Controller
    this.slideController = new SlideController({
      onSlideChange: (index) => {
        // Additional hooks if needed
      }
    });

    // 4. Bind UI Interactive Elements
    this.bindInteractions();
  }

  bindInteractions() {
    // 00. Start Film Button
    const btnOpenFilm = document.getElementById('btnOpenFilm');
    if (btnOpenFilm) {
      btnOpenFilm.addEventListener('click', () => {
        this.audioPlayer.play();
        this.slideController.goTo(1); // Go to prologue
      });
    }

    // 05. Map Navigation Button
    const btnNavigate = document.getElementById('btnNavigate');
    if (btnNavigate) {
      btnNavigate.addEventListener('click', () => {
        const lat = this.i18n.t('meta.latitude', 39.9199);
        const lng = this.i18n.t('meta.longitude', 116.4475);
        const title = encodeURIComponent(this.i18n.t('meta.venueName', '婚礼场地'));
        const address = encodeURIComponent(this.i18n.t('meta.address', ''));

        // Check if iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
          // Open Apple Maps
          window.location.href = `http://maps.apple.com/?daddr=${lat},${lng}&q=${title}`;
        } else {
          // Open Amap Web / URI
          window.location.href = `https://uri.amap.com/marker?position=${lng},${lat}&name=${title}&src=wedding`;
        }
      });
    }

    // 05. Copy Address Button
    const btnCopyAddress = document.getElementById('btnCopyAddress');
    if (btnCopyAddress) {
      btnCopyAddress.addEventListener('click', () => {
        const address = this.i18n.t('meta.addressDetail') || this.i18n.t('meta.address');
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(address).then(() => {
            this.showToast(this.i18n.t('details.copySuccess', '地址已复制'));
          }).catch(() => {
            this.fallbackCopy(address);
          });
        } else {
          this.fallbackCopy(address);
        }
      });
    }

    // 06. Replay Button
    const btnReplay = document.getElementById('btnReplay');
    if (btnReplay) {
      btnReplay.addEventListener('click', () => {
        this.slideController.goTo(1);
      });
    }
  }

  fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(this.i18n.t('details.copySuccess', '地址已复制'));
    } catch (err) {
      this.showToast(text);
    }
    document.body.removeChild(textArea);
  }

  showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new WeddingApp();
  app.init();
});
