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
      date: "2026.10.18",
      dateFormatted: "2026年10月18日",
      dateEn: "OCTOBER 18, 2026",
      lunarDate: "岁在丙午 农历九月初九 宜嫁娶 宜纳吉",
      time: "11:58",
      timeFormatted: "午初吉时 11:58 华堂启幕",
      venueName: "云境庄园 · 见山艺术厅",
      address: "北京市朝阳区芳草地艺术中心8号",
      addressDetail: "北京市朝阳区东大桥路9号 芳草地艺术中心",
      latitude: 39.9199,
      longitude: 116.4475
    },
    scroll: {
      calligraphyTitle: "良缘永结",
      subtitle: "两姓联姻 · 一堂缔约",
      sealText: "囍",
      poemLine: "两姓联姻 一堂缔约",
      poemSub: "良缘永结 · 匹配同称",
      hint: "✦ 轻触朱砂印章 · 启阅良缘长卷 ✦"
    },
    decree: {
      leadTitle: "谨定于公历二〇二六年十月十八日",
      names: "万卓洋 ＆ 张佳敏",
      namesEn: "ZHUOYANG WAN & JIAMIN ZHANG",
      vow: "两姓联姻，一堂缔约，良缘永结，匹配同称。\n看此日桃花灼灼，宜室宜家；\n卜他年瓜瓞绵绵，尔昌尔炽。\n特此敬邀 诸位尊长亲朋 莅临华堂。"
    },
    compass: {
      tag: "LUNAR ALMANAC",
      title: "十二时辰吉时乾坤罗盘",
      solarDate: "公历 2026.10.18",
      lunarDate: "农历九月初九 · 宜嫁娶",
      days: "天",
      hours: "时",
      minutes: "分",
      seconds: "秒"
    },
    gallery: {
      sec1Tag: "殿堂大赏 · 菱花金窗",
      sec1Title: "三交六椀 · 晨光初见",
      sec1Quote: "遇一人白首，择一城终老。在静谧光影里，定格初见惊鸿。",
      sec2Tag: "江南园林 · 景窗对影",
      sec2Title: "海棠景窗 · 圆月洞门",
      sec2Quote: "清风徐来，水波不兴。执子之手，与子偕行于天地广袤之间。",
      sec3Tag: "宋韵雅集 · 泥金折扇",
      sec3Title: "泥金折扇 · 庭阁长情",
      sec3Quote: "雕梁画栋，水榭亭台。一诺相许，朝暮并肩共赴余生长情。"
    },
    ceremony: {
      title: "华堂六礼 · 吉时时序",
      t1Time: "巳正初刻 · 11:00",
      t1Name: "喜迎宾朋 · 奉茶纳吉",
      t1Desc: "亲友签到入席，于华堂迎宾区享用茶点与喜酒",
      t2Time: "午初吉时 · 11:58",
      t2Name: "华堂吉礼 · 誓缔良缘",
      t2Desc: "见山艺术厅内，共同见证喜结连理、誓言永固",
      t3Time: "午正二刻 · 12:30",
      t3Name: "喜筵盛席 · 举杯同庆",
      t3Desc: "华堂大宴，佳肴满席，把酒言欢叙深情",
      t4Time: "未初正刻 · 14:00",
      t4Name: "礼成谢恩 · 喜结同心",
      t4Desc: "与挚爱亲朋合影留念，定格良辰吉日"
    },
    banquet: {
      title: "盛筵席设",
      dateLabel: "良辰吉日",
      timeLabel: "启幕吉时",
      venueLabel: "举办华堂",
      addressLabel: "详细地址",
      navBtn: "一键地图导航",
      copyBtn: "复制华堂地址",
      copySuccess: "✨ 华堂地址已复制到剪贴板",
      tip: "现场备有专属地下停车位，凭请帖免费停车"
    },
    footer: {
      dragonPhoenix: "龙凤呈祥",
      blessing: "谨以此卷，诚邀诸位长辈亲朋拨冗光临。",
      sign: "万卓洋 ＆ 张佳敏 敬邀",
      scrollTop: "✦ 返回卷首 ✦"
    },
    nav: {
      switchFrench: "🍾 法式风",
      switchFilm: "🎞️ 电影风",
      switchMagazine: "📰 杂志风",
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
      this.audioUrl = 'https://assets.mixkit.co/music/preview/mixkit-chinese-new-year-lantern-festival-117.mp3';
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

  /* --- 5. MAIN APPLICATION BOOTSTRAP --- */
  class ChineseWeddingApp {
    constructor() {
      this.translations = CHINESE_SCROLL_BUNDLE;
      this.xiParticles = null;
      this.audioPlayer = null;
      this.countdown = null;
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
      this.countdown = new CompassCountdown('2026-10-18T11:58:00');

      // 5. Bind User Interactions
      this.bindInteractions();
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
        scrollWrapper.addEventListener('click', () => {
          scrollWrapper.classList.add('opening');

          // Start Audio
          this.audioPlayer.play();

          // Smoothly dissolve overlay and unlock scrolling
          setTimeout(() => {
            scrollOverlay.classList.add('opened');
            document.body.classList.remove('chinese-locked');
          }, 950);
        });
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
          const address = this.translations.meta.addressDetail || this.translations.meta.address;
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
