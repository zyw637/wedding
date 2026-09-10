/**
 * Neo-Chinese Palace Exhibition Engine
 * Includes: "天降吉囍" Falling Character Physics, 3D Scroll Unrolling, Earthly Branches Celestial Compass Countdown, and Guzheng Audio
 */

(function () {
  'use strict';

  /* --- 1. LOCALES & I18N DATA --- */
  const CHINESE_SCROLL_BUNDLE = {
    meta: {
      title: "婚礼邀请函 · 万卓洋 ＆ 张佳敏",
      groom: "万卓洋",
      bride: "张佳敏",
      groomEn: "Zhuoyang Wan",
      brideEn: "Jiamin Zhang",
      date: "2026.10.03",
      dateFormatted: "2026年10月3日",
      dateEn: "OCTOBER 3, 2026",
      lunarDate: "岁在丙午 农历八月廿三 宜嫁娶",
      time: "12:00",
      timeFormatted: "午时 12:00 · 礼启",
      venueName: "南昌高新区万达拆迁安置小区",
      latitude: 28.679281,
      longitude: 116.010453
    },
    scroll: {
      calligraphyTitle: "良缘永结",
      subtitle: "两姓联姻，一堂缔约",
      sealText: "囍",
      poemLine: "此生相约 · 共赴佳期",
      poemSub: "一纸请帖 · 邀君相见",
      hint: "✦ 轻触朱砂印章 · 展开请帖 ✦"
    },
    decree: {
      leadTitle: "谨定于公历二〇二六年十月三日",
      names: "万卓洋 ＆ 张佳敏",
      namesEn: "ZHUOYANG WAN & JIAMIN ZHANG",
      vow: "敬邀诸位亲朋，共赴良辰。\n薄设喜筵，恭候莅临，\n同证此生相守。"
    },
    compass: {
      tag: "吉日已定",
      title: "良辰已定 · 十月三日",
      solarDate: "公历 2026.10.03",
      lunarDate: "农历八月廿三 · 宜嫁娶",
      days: "天",
      hours: "时",
      minutes: "分",
      seconds: "秒"
    },
    gallery: {
      sec1Tag: "其一 · 相爱",
      sec1Title: "相爱 · 初见成诗",
      sec1Quote: "一见倾心，执手相携，愿朝朝暮暮，皆共此生。",
      sec2Tag: "其二 · 相守",
      sec2Title: "相守 · 朝暮同途",
      sec2Quote: "共历晴雨，愿岁岁年年，长相厮守。",
      swipeHint: "← 左右滑动 · 细览画卷 →"
    },
    banquet: {
      tag: "喜筵席设",
      title: "设席迎宾",
      dateLabel: "良辰吉日",
      timeLabel: "吉时礼启",
      venueLabel: "席设所在",
      navBtn: "地图引路",
      copyBtn: "复制席设",
      mapCaption: "— 席设地图 —",
      copySuccess: "✨ 席设名称已复制",
      tip: "席设专属停车位，凭帖可泊"
    },
    footer: {
      dragonPhoenix: "龙凤呈祥",
      blessing: "敬候亲朋莅临，同贺嘉礼圆满。",
      sign: "万卓洋 ＆ 张佳敏 敬邀",
      scrollTop: "✦ 重返卷首 ✦"
    },
    nav: {
      music: "古韵雅乐"
    }
  };

  /* --- 2. "天降吉囍" FALLING CHARACTER & GOLD DUST PARTICLE ENGINE --- */
  class FallingXiParticles {
    constructor() {
      this.canvas = document.getElementById('xiCanvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.xiParticles = [];
      this.goldDust = [];
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.initParticles();
      this.loop();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * window.devicePixelRatio;
      this.canvas.height = this.height * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    initParticles() {
      // 12 Falling "囍" characters
      for (let i = 0; i < 12; i++) {
        this.xiParticles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vy: Math.random() * 0.7 + 0.5,
          oscStep: Math.random() * Math.PI * 2,
          oscSpeed: Math.random() * 0.018 + 0.012,
          oscAmp: Math.random() * 1.2 + 0.8,
          rotation: (Math.random() - 0.5) * 0.4,
          rotSpeed: (Math.random() - 0.5) * 0.008,
          fontSize: Math.random() * 7 + 13,
          color: Math.random() > 0.4 ? '#FCE8BE' : '#E6A364',
          alpha: Math.random() * 0.4 + 0.5
        });
      }

      // 18 Floating gold dust specks
      for (let i = 0; i < 18; i++) {
        this.goldDust.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: Math.random() * 0.4 + 0.2,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.3
        });
      }
    }

    loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render Falling "囍" Characters
      this.ctx.font = '700 16px "Noto Serif SC", serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      for (let i = 0; i < this.xiParticles.length; i++) {
        const p = this.xiParticles[i];
        p.oscStep += p.oscSpeed;
        p.x += Math.sin(p.oscStep) * p.oscAmp;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y > this.height + 25) {
          p.y = -25;
          p.x = Math.random() * this.width;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.font = `700 ${p.fontSize}px "Noto Serif SC", serif`;
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = 'rgba(252, 232, 190, 0.6)';
        this.ctx.fillText('囍', 0, 0);
        this.ctx.restore();
      }

      // Render Floating Gold Dust Specks
      for (let i = 0; i < this.goldDust.length; i++) {
        const g = this.goldDust[i];
        g.x += g.vx;
        g.y += g.vy;

        if (g.y > this.height + 10) {
          g.y = -10;
          g.x = Math.random() * this.width;
        }

        this.ctx.save();
        this.ctx.globalAlpha = g.alpha;
        this.ctx.fillStyle = '#FCE8BE';
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = '#FCE8BE';
        this.ctx.beginPath();
        this.ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }

      requestAnimationFrame(() => this.loop());
    }
  }

  /* --- 3. GUZHENG & PENTATONIC AUDIO SYNTHESIZER --- */
  class ChineseAudioPlayer {
    constructor() {
      this.audioUrl = './src/assets/森系阳光.mp3';
      this.isPlaying = false;
      this.audioEl = null;
      this.synthContext = null;
      this.synthInterval = null;
      this.isSynthMode = false;
      this.btn = document.getElementById('chineseMusicBtn');

      this.initAudio();
      this.bindEvents();
    }

    initAudio() {
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
      if (this.btn) {
        this.btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggle();
        });
      }
    }

    async play() {
      if (this.isSynthMode) {
        this.startSynth();
        this.isPlaying = true;
        this.updateUI(true);
        return;
      }

      try {
        await this.audioEl.play();
        this.isPlaying = true;
        this.updateUI(true);
      } catch (e) {
        this.isSynthMode = true;
        this.startSynth();
        this.isPlaying = true;
        this.updateUI(true);
      }
    }

    pause() {
      if (this.audioEl) this.audioEl.pause();
      this.stopSynth();
      this.isPlaying = false;
      this.updateUI(false);
    }

    toggle() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }

    updateUI(playing) {
      if (!this.btn) return;
      if (playing) {
        this.btn.classList.add('playing');
      } else {
        this.btn.classList.remove('playing');
      }
    }

    startSynth() {
      if (this.synthInterval) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.synthContext) this.synthContext = new AudioCtx();
      if (this.synthContext.state === 'suspended') this.synthContext.resume();

      // Pentatonic Scale (D, E, F#, A, B)
      const pentatonicPatterns = [
        [293.66, 369.99, 440.00, 587.33],
        [220.00, 293.66, 329.63, 440.00],
        [246.94, 293.66, 369.99, 493.88],
        [196.00, 246.94, 293.66, 392.00]
      ];

      let idx = 0;
      const playGuzheng = () => {
        if (!this.isPlaying || !this.synthContext) return;
        const notes = pentatonicPatterns[idx % pentatonicPatterns.length];
        idx++;
        const now = this.synthContext.currentTime;

        notes.forEach((freq, i) => {
          const osc = this.synthContext.createOscillator();
          const gain = this.synthContext.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.18);

          gain.gain.setValueAtTime(0.001, now + i * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.06, now + i * 0.18 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.18 + 3.2);

          osc.connect(gain);
          gain.connect(this.synthContext.destination);

          osc.start(now + i * 0.18);
          osc.stop(now + i * 0.18 + 3.3);
        });
      };

      playGuzheng();
      this.synthInterval = setInterval(playGuzheng, 3600);
    }

    stopSynth() {
      if (this.synthInterval) {
        clearInterval(this.synthInterval);
        this.synthInterval = null;
      }
    }
  }

  /* --- 4. CELESTIAL COMPASS COUNTDOWN --- */
  class CompassCountdown {
    constructor(targetDateStr) {
      this.targetTime = new Date(targetDateStr).getTime();
      this.daysEl = document.getElementById('compassDays');
      this.hoursEl = document.getElementById('compassHours');
      this.minsEl = document.getElementById('compassMins');
      this.secsEl = document.getElementById('compassSecs');

      this.start();
    }

    start() {
      this.update();
      setInterval(() => this.update(), 1000);
    }

    update() {
      const now = new Date().getTime();
      const diff = this.targetTime - now;

      if (diff <= 0) {
        if (this.daysEl) this.daysEl.textContent = '00';
        if (this.hoursEl) this.hoursEl.textContent = '00';
        if (this.minsEl) this.minsEl.textContent = '00';
        if (this.secsEl) this.secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, '0');
      if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, '0');
      if (this.minsEl) this.minsEl.textContent = String(minutes).padStart(2, '0');
      if (this.secsEl) this.secsEl.textContent = String(seconds).padStart(2, '0');
    }
  }

  /* --- 5. CIRCULAR PHOTO SHOWCASES CONTROLLER --- */
  class ShowcaseController {
    constructor() {
      this.showcases = {};
      this.autoCycleStarted = false;
      this.init();
    }

    init() {
      ['showcase1', 'showcase2'].forEach((showcaseId) => {
        const showcase = document.getElementById(showcaseId);
        if (!showcase) return;

        const photos = Array.from(showcase.querySelectorAll('.showcase-photo'));
        const frame = showcase.querySelector('.showcase-photo-frame');
        const dots = Array.from(showcase.querySelectorAll('.showcase-dot'));

        if (photos.length === 0) return;

        this.showcases[showcaseId] = {
          photos,
          dots,
          currentIndex: 0,
          touchStartX: 0,
          touchStartY: 0,
          timer: null
        };

        this.setPhoto(showcaseId, 0);

        if (frame) {
          frame.addEventListener('touchstart', (event) => {
            this.showcases[showcaseId].touchStartX = event.touches[0].clientX;
            this.showcases[showcaseId].touchStartY = event.touches[0].clientY;
          }, { passive: true });

          frame.addEventListener('touchend', (event) => {
            const state = this.showcases[showcaseId];
            const deltaX = state.touchStartX - event.changedTouches[0].clientX;
            const deltaY = state.touchStartY - event.changedTouches[0].clientY;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
              if (deltaX > 0) {
                this.next(showcaseId);
              } else {
                this.prev(showcaseId);
              }
              this.resetAutoCycle(showcaseId);
            }
          }, { passive: true });
        }

        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            this.setPhoto(showcaseId, index);
            this.resetAutoCycle(showcaseId);
          });
        });
      });
    }

    startAutoCycle() {
      if (this.autoCycleStarted) return;
      this.autoCycleStarted = true;

      Object.keys(this.showcases).forEach((showcaseId) => {
        const showcase = this.showcases[showcaseId];
        if (showcase && showcase.photos.length > 1) {
          this.armTimer(showcaseId);
        }
      });
    }

    armTimer(showcaseId) {
      const showcase = this.showcases[showcaseId];
      if (!showcase) return;

      if (showcase.timer) clearTimeout(showcase.timer);

      const dwell = 4000 + Math.floor(Math.random() * 2001);
      showcase.timer = setTimeout(() => {
        showcase.timer = null;
        this.next(showcaseId);
        this.armTimer(showcaseId);
      }, dwell);
    }

    resetAutoCycle(showcaseId) {
      if (this.autoCycleStarted) this.armTimer(showcaseId);
    }

    next(showcaseId) {
      const showcase = this.showcases[showcaseId];
      if (!showcase) return;
      this.setPhoto(showcaseId, (showcase.currentIndex + 1) % showcase.photos.length);
    }

    prev(showcaseId) {
      const showcase = this.showcases[showcaseId];
      if (!showcase) return;
      this.setPhoto(showcaseId, (showcase.currentIndex - 1 + showcase.photos.length) % showcase.photos.length);
    }

    setPhoto(showcaseId, index) {
      const showcase = this.showcases[showcaseId];
      if (!showcase) return;

      showcase.currentIndex = index;
      showcase.photos.forEach((photo, photoIndex) => {
        const active = photoIndex === index;
        photo.style.display = active ? 'block' : 'none';
        photo.style.opacity = active ? '1' : '0';
      });
      showcase.dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
      });
    }
  }

  /* --- 6. MAIN APPLICATION BOOTSTRAP --- */
  class ChineseWeddingApp {
    constructor() {
      this.translations = CHINESE_SCROLL_BUNDLE;
      this.xiParticles = null;
      this.audioPlayer = null;
      this.countdown = null;
      this.showcaseController = null;
    }

    init() {
      // 1. Lock scrolling on entrance
      document.body.classList.add('chinese-locked');

      // 2. Apply Translations
      this.applyI18n();

      // 3. Initialize "天降吉囍" Particle Engine
      this.xiParticles = new FallingXiParticles();

      // 4. Initialize Audio & Compass Countdown
      this.audioPlayer = new ChineseAudioPlayer();
      this.countdown = new CompassCountdown('2026-10-03T12:00:00');
      this.showcaseController = new ShowcaseController();

      // 5. Bind User Interactions
      this.bindInteractions();

      // 6. Lazily Initialize Embedded AMap
      this.initChineseMap();
    }

    /* --- EMBEDDED AMAP (懒加载高德地图, 滚动到地址卡片时才拉起 SDK) --- */
    initChineseMap() {
      const mapEl = document.getElementById('chineseMap');
      const frameEl = document.getElementById('chineseMapFrame');
      if (!mapEl || !frameEl) return;

      const meta = this.translations.meta;
      const position = [meta.longitude, meta.latitude];
      const AMAP_KEY = '58881674711b8daba0509d63afdd9215';
      const hideFrame = () => {
        frameEl.style.display = 'none';
      };

      const loadSdk = () => new Promise((resolve, reject) => {
        if (window.AMap) return resolve();
        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('AMap SDK load failed'));
        document.head.appendChild(script);
      });

      const buildMap = () => {
        const map = new AMap.Map('chineseMap', {
          viewMode: '2D',
          zoom: 15,
          center: position,
          mapStyle: 'amap://styles/light',
          resizeEnable: true,
          dragEnable: false,
          zoomEnable: false,
          pinchEnable: false,
          doubleClickZoom: false,
          keyboardEnable: false,
          scrollWheel: false,
          touchZoom: false
        });

        const marker = new AMap.Marker({
          position,
          content: '<div class="chateau-map-marker"><span>囍</span></div>',
          offset: new AMap.Pixel(-10, -24)
        });
        marker.setMap(map);
      };

      const boot = () => loadSdk().then(buildMap).catch(hideFrame);

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              io.disconnect();
              boot();
              break;
            }
          }
        }, { rootMargin: '300px' });
        io.observe(mapEl);
      } else {
        boot();
      }
    }

    applyI18n() {
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const keys = key.split('.');
        let cur = this.translations;
        for (const k of keys) {
          if (cur && typeof cur === 'object' && k in cur) {
            cur = cur[k];
          } else {
            return;
          }
        }
        if (typeof cur === 'string') {
          el.textContent = cur;
        }
      });
    }

    bindInteractions() {
      // 3D Scroll Unrolling Click
      const scrollWrapper = document.getElementById('scrollWrapper');
      const scrollOverlay = document.getElementById('scrollOverlay');

      if (scrollWrapper && scrollOverlay) {
        let isOpening = false;
        const openScroll = (playAudio = true) => {
          if (isOpening) return;
          isOpening = true;
          scrollWrapper.classList.add('opening');

          // Audio starts only after a user gesture; autoplay policies may block it.
          if (playAudio) this.audioPlayer.play();

          // Smoothly dissolve overlay and unlock scrolling
          setTimeout(() => {
            scrollOverlay.classList.add('opened');
            document.body.classList.remove('chinese-locked');
            if (this.showcaseController) this.showcaseController.startAutoCycle();
          }, 950);
        };

        // Open automatically one second after the page loads; tapping still opens it immediately.
        scrollWrapper.addEventListener('click', () => openScroll(true));
        setTimeout(() => {
          const pageReady = window.__pageReady || Promise.resolve();
          pageReady.then(() => openScroll(false));
        }, 1000);
      }

      // Map Navigation Button
      const btnChineseNav = document.getElementById('btnChineseNav');
      if (btnChineseNav) {
        btnChineseNav.addEventListener('click', () => {
          const lat = this.translations.meta.latitude;
          const lng = this.translations.meta.longitude;
          const title = encodeURIComponent(this.translations.meta.venueName);
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
          if (isIOS) {
            window.location.href = `http://maps.apple.com/?daddr=${lat},${lng}&q=${title}`;
          } else {
            window.location.href = `https://uri.amap.com/marker?position=${lng},${lat}&name=${title}&src=wedding`;
          }
        });
      }

      // Copy Address Button
      const btnChineseCopy = document.getElementById('btnChineseCopy');
      if (btnChineseCopy) {
        btnChineseCopy.addEventListener('click', () => {
          const address = this.translations.meta.venueName;
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(address).then(() => {
              this.showToast(this.translations.banquet.copySuccess);
            }).catch(() => {
              this.fallbackCopy(address);
            });
          } else {
            this.fallbackCopy(address);
          }
        });
      }

      // Scroll to Top
      const btnScrollTop = document.getElementById('btnChineseTop');
      if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
        this.showToast(this.translations.banquet.copySuccess);
      } catch (err) {
        this.showToast(text);
      }
      document.body.removeChild(textArea);
    }

    showToast(msg) {
      let toast = document.getElementById('chineseToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'chineseToast';
        toast.className = 'chinese-toast';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const app = new ChineseWeddingApp();
    app.init();
  });
})();
