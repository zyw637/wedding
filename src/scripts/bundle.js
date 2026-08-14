/**
 * Self-contained Bundle Script for Wedding Invitation
 * Supports both direct file:// opening and HTTP/HTTPS deployment (WeChat, Safari, Chrome)
 */

(function () {
  'use strict';

  /* --- 1. LOCALES & I18N MODULE --- */
  const ZH_CN_BUNDLE = {
    meta: {
      title: "婚礼邀请函 · Wedding Invitation",
      description: "电影胶片风格电子婚礼请帖",
      groom: "万卓洋",
      bride: "张佳敏",
      groomEn: "Zhuoyang Wan",
      brideEn: "Jiamin Zhang",
      date: "2026.10.18",
      dateFormatted: "2026年10月18日",
      dateEn: "OCTOBER 18, 2026",
      lunarDate: "岁在丙午 农历九月初九 宜嫁娶",
      time: "11:58",
      timeFormatted: "上午 11:58 启幕",
      venueName: "云境庄园 · 见山艺术厅",
      venueEn: "The Grand Cloud Estate",
      address: "北京市朝阳区芳草地艺术中心8号",
      addressDetail: "北京市朝阳区东大桥路9号 芳草地艺术中心",
      latitude: 39.9199,
      longitude: 116.4475
    },
    curtain: {
      filmPresents: "A LOVE STORY PRODUCTION",
      titlePrefix: "特此敬邀",
      titleNames: "万卓洋 & 张佳敏",
      subtitle: "沉浸式三幕胶片婚礼电影",
      enterButton: "点击启幕",
      musicHint: "开启声音体验更佳"
    },
    prologue: {
      sceneLabel: "PROLOGUE / 序幕",
      title: "放映定档",
      quote: "有些故事，在初见那一刻便已写下序章。",
      coupleNames: "万卓洋 ＆ 张佳敏",
      invitation: "诚邀您出席我们的婚礼放映礼",
      swipeHint: "向上滑动 开启放映"
    },
    act1: {
      actNumber: "ACT I",
      actTitle: "心动 · 油画时光",
      quote: "有些相遇，像光落进了寻常岁月。",
      photo1Caption: "初见心动，眼底藏不住的温柔",
      photo2Caption: "晨光熹微，油画般的静谧定格",
      photo3Caption: "岁月从容，与你共度的每一个清晨"
    },
    act2: {
      actNumber: "ACT II",
      actTitle: "相爱 · 绿茵光影",
      quote: "我们在彼此的目光里，找到了同一个方向。",
      photo1Caption: "微风与晴空，奔赴彼此的明朗世界",
      photo2Caption: "并肩前行，丈量属于未来的风景",
      photo3Caption: "笑意蔓延，心之所向皆是欢喜"
    },
    act3: {
      actNumber: "ACT III",
      actTitle: "余生 · 庭阁之间",
      quote: "从此朝暮，共赴余生。",
      photo1Caption: "庭阁深处，时光缓缓流淌",
      photo2Caption: "执子之手，定格一生长情",
      photo3Caption: "一席盛宴，静候挚友亲朋"
    },
    details: {
      actNumber: "CREDITS",
      title: "放映信息",
      subtitle: "WEDDING CEREMONY & BANQUET",
      dateLabel: "放映日期",
      timeLabel: "启幕吉时",
      venueLabel: "放映场地",
      addressLabel: "详细地址",
      navigationButton: "一键地图导航",
      copyAddressButton: "复制地址",
      copySuccess: "地址已复制到剪贴板",
      tip: "席设室内宴会厅，现场备有专属地下停车位"
    },
    epilogue: {
      fin: "THE END",
      title: "我们的故事 · 未完待续",
      quote: "往后余生，岁岁年年皆胜意。",
      blessing: "期待与您相聚，共同见证这份幸福。",
      signature: "万卓洋 & 张佳敏 敬邀",
      shareHint: "点击微信右上角 · 分享给亲友",
      replayButton: "重温放映"
    },
    controls: {
      musicPlay: "播放音乐",
      musicPause: "暂停音乐",
      pageIndicator: "第 {current} / {total} 幕"
    },
    nav: {
      switchFilm: "🎞️ 电影风",
      switchFrench: "🍾 法式风",
      switchChinese: "🎋 中式风",
      switchMagazine: "📰 杂志风",
      music: "背景音乐"
    }
  };

  class I18n {
    constructor(defaultLang = 'zh-CN') {
      this.currentLang = defaultLang;
      this.translations = ZH_CN_BUNDLE;
    }

    async init() {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam) {
        this.currentLang = langParam;
      }

      // If running on http/https, attempt to fetch latest JSON
      if (window.location.protocol.startsWith('http')) {
        try {
          const res = await fetch(`./src/locales/${this.currentLang}.json`);
          if (res.ok) {
            this.translations = await res.json();
          }
        } catch (e) {
          // Keep bundled fallback
        }
      }

      this.applyTranslations();
    }

    t(path, fallback = '') {
      const keys = path.split('.');
      let current = this.translations;
      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return fallback;
        }
      }
      return typeof current === 'string' ? current : fallback;
    }

    applyTranslations() {
      const metaTitle = this.t('meta.title');
      if (metaTitle) {
        document.title = metaTitle;
      }

      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const val = this.t(key);
        if (val) {
          el.textContent = val;
        }
      });

      document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        const attrConfig = el.getAttribute('data-i18n-attr');
        const [attr, key] = attrConfig.split(':');
        const val = this.t(key);
        if (attr && val) {
          el.setAttribute(attr, val);
        }
      });
    }
  }

  /* --- 2. AUDIO PLAYER MODULE --- */
  class AudioPlayer {
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
      if (typeof window.WeixinJSBridge === 'object' && typeof window.WeixinJSBridge.invoke === 'function') {
        window.WeixinJSBridge.invoke('getNetworkType', {}, () => {});
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
      } else {
        this.toggleButton.classList.remove('playing');
      }
    }

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

      const chords = [
        [196.00, 246.94, 293.66, 392.00],
        [164.81, 196.00, 246.94, 329.63],
        [130.81, 196.00, 261.63, 329.63],
        [146.83, 220.00, 293.66, 369.99]
      ];

      let chordIndex = 0;
      const playNextChord = () => {
        if (!this.isPlaying || !this.synthContext) return;
        const chord = chords[chordIndex % chords.length];
        chordIndex++;
        const now = this.synthContext.currentTime;

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

  /* --- 3. SLIDE CONTROLLER MODULE --- */
  class SlideController {
    constructor(options = {}) {
      this.slides = Array.from(document.querySelectorAll('.slide'));
      this.currentIndex = 0;
      this.isTransitioning = false;
      this.touchStartY = 0;
      this.touchStartX = 0;
      this.touchEndY = 0;
      this.touchEndX = 0;
      this.onSlideChange = options.onSlideChange || null;
      this.pageBadge = document.getElementById('pageBadge');
      this.badgeText = document.getElementById('badgeText');
      this.musicController = document.getElementById('musicController');

      this.actGalleries = {};
      this.init();
    }

    init() {
      this.bindTouchEvents();
      this.bindWheelEvents();
      this.bindKeyboardEvents();
      this.initActGalleries();
      this.showSlide(0, false);
    }

    initActGalleries() {
      const acts = ['act1', 'act2', 'act3'];
      acts.forEach((actId) => {
        const slideEl = document.getElementById(actId);
        if (!slideEl) return;

        const photos = Array.from(slideEl.querySelectorAll('.gallery-photo'));
        const dots = Array.from(slideEl.querySelectorAll('.gallery-dot'));
        const captionEl = slideEl.querySelector('.photo-caption');

        if (photos.length > 0) {
          this.actGalleries[actId] = {
            photos,
            dots,
            captionEl,
            currentIndex: 0,
            timer: null
          };

          const container = slideEl.querySelector('.photo-strip');
          if (container) {
            container.addEventListener('click', () => {
              this.nextPhotoInAct(actId);
            });
          }

          dots.forEach((dot, idx) => {
            dot.addEventListener('click', (e) => {
              e.stopPropagation();
              this.setPhotoInAct(actId, idx);
            });
          });
        }
      });
    }

    nextPhotoInAct(actId) {
      const gallery = this.actGalleries[actId];
      if (!gallery || gallery.photos.length <= 1) return;
      const nextIdx = (gallery.currentIndex + 1) % gallery.photos.length;
      this.setPhotoInAct(actId, nextIdx);
    }

    prevPhotoInAct(actId) {
      const gallery = this.actGalleries[actId];
      if (!gallery || gallery.photos.length <= 1) return;
      const prevIdx = (gallery.currentIndex - 1 + gallery.photos.length) % gallery.photos.length;
      this.setPhotoInAct(actId, prevIdx);
    }

    setPhotoInAct(actId, index) {
      const gallery = this.actGalleries[actId];
      if (!gallery) return;

      gallery.currentIndex = index;
      gallery.photos.forEach((photo, idx) => {
        if (idx === index) {
          photo.style.display = 'block';
          photo.style.opacity = '1';
          photo.classList.add('ken-burns');
        } else {
          photo.style.display = 'none';
          photo.style.opacity = '0';
          photo.classList.remove('ken-burns');
        }
      });

      gallery.dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });

      if (gallery.captionEl && gallery.photos[index]) {
        const caption = gallery.photos[index].getAttribute('data-caption');
        if (caption) {
          gallery.captionEl.textContent = caption;
        }
      }
    }

    startActAutoCycle(actId) {
      this.stopActAutoCycle(actId);
      const gallery = this.actGalleries[actId];
      if (!gallery || gallery.photos.length <= 1) return;

      gallery.timer = setInterval(() => {
        this.nextPhotoInAct(actId);
      }, 2000);
    }

    stopActAutoCycle(actId) {
      const gallery = this.actGalleries[actId];
      if (gallery && gallery.timer) {
        clearInterval(gallery.timer);
        gallery.timer = null;
      }
    }

    bindTouchEvents() {
      document.addEventListener('touchstart', (e) => {
        this.touchStartY = e.touches[0].clientY;
        this.touchStartX = e.touches[0].clientX;
      }, { passive: true });

      document.addEventListener('touchend', (e) => {
        this.touchEndY = e.changedTouches[0].clientY;
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleGesture();
      }, { passive: true });
    }

    bindWheelEvents() {
      let lastWheelTime = 0;
      document.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastWheelTime < 600) return;
        lastWheelTime = now;

        if (e.deltaY > 20) {
          this.next();
        } else if (e.deltaY < -20) {
          this.prev();
        }
      }, { passive: true });
    }

    bindKeyboardEvents() {
      document.addEventListener('keydown', (e) => {
        if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
          this.next();
        } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
          this.prev();
        } else if (['ArrowRight'].includes(e.code)) {
          const currentSlide = this.slides[this.currentIndex];
          if (currentSlide && ['act1', 'act2', 'act3'].includes(currentSlide.id)) {
            this.nextPhotoInAct(currentSlide.id);
          }
        } else if (['ArrowLeft'].includes(e.code)) {
          const currentSlide = this.slides[this.currentIndex];
          if (currentSlide && ['act1', 'act2', 'act3'].includes(currentSlide.id)) {
            this.prevPhotoInAct(currentSlide.id);
          }
        }
      });
    }

    handleGesture() {
      const deltaY = this.touchStartY - this.touchEndY;
      const deltaX = this.touchStartX - this.touchEndX;
      const minDistance = 30;

      const currentSlide = this.slides[this.currentIndex];
      const currentActId = currentSlide ? currentSlide.id : null;
      const isActSlide = ['act1', 'act2', 'act3'].includes(currentActId);

      // 1. Horizontal swipe: Switch photos inside current Act
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minDistance) {
        if (isActSlide) {
          if (deltaX > 0) {
            // Swipe left -> Next photo
            this.nextPhotoInAct(currentActId);
          } else {
            // Swipe right -> Prev photo
            this.prevPhotoInAct(currentActId);
          }
          return;
        }
      }

      // 2. Vertical swipe: Switch between full-screen Acts / Scenes
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minDistance) {
        if (deltaY > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }

    showSlide(index, animate = true) {
      if (index < 0 || index >= this.slides.length) return;
      if (this.isTransitioning && animate) return;

      this.isTransitioning = true;
      const previousIndex = this.currentIndex;
      this.currentIndex = index;

      Object.keys(this.actGalleries).forEach((actId) => {
        this.stopActAutoCycle(actId);
      });

      this.slides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add('active');
          const actId = slide.id;
          if (this.actGalleries[actId]) {
            this.startActAutoCycle(actId);
          }
        } else {
          slide.classList.remove('active');
        }
      });

      if (this.pageBadge && this.badgeText) {
        if (index === 0) {
          this.pageBadge.classList.add('hidden');
          if (this.musicController) this.musicController.classList.add('hidden');
        } else {
          this.pageBadge.classList.remove('hidden');
          if (this.musicController) this.musicController.classList.remove('hidden');
          const currentSlide = this.slides[index];
          const chapterName = currentSlide.getAttribute('data-chapter') || `SCENE 0${index}`;
          this.badgeText.textContent = `${chapterName} · ${index}/${this.slides.length - 1}`;
        }
      }

      if (this.onSlideChange) {
        this.onSlideChange(index, previousIndex);
      }

      setTimeout(() => {
        this.isTransitioning = false;
      }, 700);
    }

    next() {
      if (this.currentIndex < this.slides.length - 1) {
        this.showSlide(this.currentIndex + 1);
      }
    }

    prev() {
      if (this.currentIndex > 1) {
        this.showSlide(this.currentIndex - 1);
      }
    }

    goTo(index) {
      this.showSlide(index);
    }
  }

  /* --- 4. APP BOOTSTRAP --- */
  class WeddingApp {
    constructor() {
      this.i18n = new I18n();
      this.audioPlayer = null;
      this.slideController = null;
    }

    async init() {
      await this.i18n.init();
      this.audioPlayer = new AudioPlayer();
      this.slideController = new SlideController();
      this.bindInteractions();
    }

    bindInteractions() {
      const btnOpenFilm = document.getElementById('btnOpenFilm');
      if (btnOpenFilm) {
        btnOpenFilm.addEventListener('click', () => {
          this.audioPlayer.play();
          this.slideController.goTo(1);
        });
      }

      const btnNavigate = document.getElementById('btnNavigate');
      if (btnNavigate) {
        btnNavigate.addEventListener('click', () => {
          const lat = this.i18n.t('meta.latitude', 39.9199);
          const lng = this.i18n.t('meta.longitude', 116.4475);
          const title = encodeURIComponent(this.i18n.t('meta.venueName', '婚礼场地'));
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
          if (isIOS) {
            window.location.href = `http://maps.apple.com/?daddr=${lat},${lng}&q=${title}`;
          } else {
            window.location.href = `https://uri.amap.com/marker?position=${lng},${lat}&name=${title}&src=wedding`;
          }
        });
      }

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

  document.addEventListener('DOMContentLoaded', () => {
    const app = new WeddingApp();
    app.init();
  });
})();
