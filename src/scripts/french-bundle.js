/**
 * French Provence Chateau Engine
 * Includes: Rose Petal Physics, 3D Double Gate Opening, Vintage Calendar Countdown, Photo Carousels, and Audio Manager
 */

(function () {
  "use strict";

  /* --- 1. LOCALES & I18N DATA --- */
  const FRENCH_CHATEAU_BUNDLE = {
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
      time: "11:58",
      timeFormatted: "上午 11:58 启幕",
      venueName: "云境庄园 · 见山艺术厅",
      address: "北京市朝阳区芳草地艺术中心8号",
      addressDetail: "北京市朝阳区东大桥路9号 芳草地艺术中心",
      latitude: 39.9199,
      longitude: 116.4475,
    },
    gate: {
      script: "Wedding Invitation",
      names: "万卓洋 ＆ 张佳敏",
      sealText: "囍",
      hint: "✦ 轻触火漆 · 推门即是我们的明天 ✦",
    },
    hero: {
      script: "Save the Date",
      subtitleEn: "A CELEBRATION OF LOVE",
      names: "万卓洋 ＆ 张佳敏",
      namesEn: "ZHUOYANG WAN & JIAMIN ZHANG",
      poem: "风在晨光里，替我们轻轻落笔。\n诚邀您赴这一场，以爱为名的约。",
    },
    calendar: {
      saveDateHeader: "SAVE THE DATE · 婚礼吉日",
      year: "ANNO DOMINI · MMXXVI",
      weekday: "SATURDAY · 星期六",
      countdownTitle: "奔赴良辰 · 倒计时",
      days: "天",
      hours: "时",
      minutes: "分",
      seconds: "秒",
    },
    gallery: {
      act1Tag: "CHAPTER I · FLUTTER",
      act1Title: "心动 · 初见倾心",
      act1Quote: "只缘初见那一瞥，\n从此心动皆是你。",
      act2Tag: "CHAPTER II · DEVOTION",
      act2Title: "相爱 · 琴瑟和鸣",
      act2Quote: "琴瑟和鸣共此生，\n一弦一柱皆深情。",
      act3Tag: "CHAPTER III · ETERNITY",
      act3Title: "相守 · 朝暮相依",
      act3Quote: "朝朝暮暮与君老，\n岁岁年年共白头。",
      swipeHint: "← 左右滑动 翻阅多图 →",
    },
    itinerary: {
      tag: "SCHEDULE",
      title: "婚礼当日流程",
      t1Time: "11:00",
      t1Name: "晨光迎宾 · 香槟冷餐",
      t1Desc: "签到入场，于庄园迎宾区享用法式香槟与甜品",
      t2Time: "11:58",
      t2Name: "神圣典礼 · 誓言礼成",
      t2Desc: "见山艺术厅内，共同见证浪漫誓约开启",
      t3Time: "12:30",
      t3Name: "臻享喜宴 · 举杯共庆",
      t3Desc: "品味定制婚宴珍馐，传递温情与祝福",
      t4Time: "14:00",
      t4Name: "敬茶答谢 · 庄园合影",
      t4Desc: "与挚爱亲友合影定格永恒记忆",
    },
    location: {
      tag: "LOCATION & BANQUET",
      title: "盛宴席设",
      dateLabel: "盛宴吉日",
      timeLabel: "启幕吉时",
      venueLabel: "举办场地",
      addressLabel: "详细地址",
      navBtn: "一键地图导航",
      copyBtn: "复制场地地址",
      copySuccess: "✨ 场地地址已复制到剪贴板",
      tip: "现场备有专属地下停车场，凭请帖享免费停车",
    },
    footer: {
      script: "With Love",
      blessing: "盼与您，于良辰里共一室温光，见证长情。",
      sign: "万卓洋 & 张佳敏 敬邀",
      scrollTop: "✦ 返回顶部 ✦",
    },
    nav: {
      switchFilm: "🎞️ 电影风",
      switchChinese: "🎋 中式风",
      switchMagazine: "📰 杂志风",
      music: "MUSIQUE",
    },
  };

  /* --- 2. ROMANTIC FRENCH ROSE PETAL PHYSICS ENGINE (真实 3D 玫瑰花瓣) --- */
  class PetalPhysicsEngine {
    constructor() {
      this.canvas = document.getElementById("petalCanvas");
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext("2d");
      this.petals = [];
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.resize();
      window.addEventListener("resize", () => this.resize());
      this.initAmbientPetals();
      this.bindTouch();
      this.loop();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * window.devicePixelRatio;
      this.canvas.height = this.height * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    initAmbientPetals() {
      const count = this.width < 600 ? 18 : 26;
      for (let i = 0; i < count; i++) {
        this.petals.push(
          this.createPetal(
            Math.random() * this.width,
            Math.random() * this.height,
            true,
          ),
        );
      }
    }

    createPetal(x, y, ambient = false) {
      // Natural French garden rose color themes
      const palettes = [
        {
          // Damask Rose Velvet
          base: "rgba(255, 235, 240, ",
          core: "rgba(215, 60, 85, ",
          mid: "rgba(240, 110, 130, ",
          tip: "rgba(255, 225, 232, ",
          shadow: "rgba(165, 35, 55, 0.28)",
          highlight: "rgba(255, 240, 245, 0.65)",
        },
        {
          // French Blush Pink
          base: "rgba(255, 242, 245, ",
          core: "rgba(230, 95, 120, ",
          mid: "rgba(248, 155, 175, ",
          tip: "rgba(255, 238, 242, ",
          shadow: "rgba(185, 65, 85, 0.25)",
          highlight: "rgba(255, 245, 248, 0.6)",
        },
        {
          // Champagne Coral Rose
          base: "rgba(255, 246, 238, ",
          core: "rgba(235, 115, 100, ",
          mid: "rgba(252, 170, 160, ",
          tip: "rgba(255, 238, 232, ",
          shadow: "rgba(180, 75, 65, 0.25)",
          highlight: "rgba(255, 248, 242, 0.65)",
        },
        {
          // Provence Crimson Velvet
          base: "rgba(250, 220, 228, ",
          core: "rgba(178, 38, 62, ",
          mid: "rgba(215, 75, 100, ",
          tip: "rgba(248, 195, 208, ",
          shadow: "rgba(140, 25, 45, 0.32)",
          highlight: "rgba(255, 235, 242, 0.7)",
        },
        {
          // Ivory Peony Rose with blush glow
          base: "rgba(255, 255, 255, ",
          core: "rgba(245, 185, 198, ",
          mid: "rgba(255, 228, 234, ",
          tip: "rgba(255, 255, 255, ",
          shadow: "rgba(195, 125, 140, 0.2)",
          highlight: "rgba(255, 255, 255, 0.75)",
        },
      ];

      const palette = palettes[Math.floor(Math.random() * palettes.length)];
      const type = Math.floor(Math.random() * 2); // Two naturally asymmetric rose-petal silhouettes
      const size = ambient
        ? Math.random() * 8 + 10
        : Math.random() * 10 + 13;

      return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 1.1,
        vy: ambient ? Math.random() * 0.7 + 0.6 : Math.random() * 2.2 + 1.2,
        size: size,
        type: type,
        aspectRatio: Math.random() * 0.14 + 0.88,
        palette: palette,

        // 3D rotations
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,

        rollAngle: Math.random() * Math.PI * 2,
        rollSpeed: Math.random() * 0.024 + 0.015,

        pitchAngle: Math.random() * Math.PI * 2,
        pitchSpeed: Math.random() * 0.018 + 0.012,

        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.022 + 0.012,
        swayAmp: Math.random() * 1.0 + 0.6,

        alpha: ambient ? Math.random() * 0.25 + 0.75 : 1,
        decay: ambient ? 0 : Math.random() * 0.008 + 0.007,
      };
    }

    spawnTouchPetals(x, y, count = 8) {
      for (let i = 0; i < count; i++) {
        const p = this.createPetal(
          x + (Math.random() - 0.5) * 36,
          y + (Math.random() - 0.5) * 36,
          false,
        );
        p.vx = (Math.random() - 0.5) * 3;
        p.vy = Math.random() * 2.5 + 1.5;
        this.petals.push(p);
      }
    }

    bindTouch() {
      window.addEventListener(
        "touchmove",
        (e) => {
          const touch = e.touches[0];
          if (touch && Math.random() > 0.4) {
            this.spawnTouchPetals(touch.clientX, touch.clientY, 2);
          }
        },
        { passive: true },
      );

      window.addEventListener("click", (e) => {
        this.spawnTouchPetals(e.clientX, e.clientY, 10);
      });
    }

    drawRosePetal(p) {
      const w = p.size * 0.56 * p.aspectRatio;
      const h = p.size * 1.08;

      // 3D projections: roll (width flip) & pitch (height tilt)
      const scaleX = Math.cos(p.rollAngle);
      const scaleY = Math.cos(p.pitchAngle * 0.85);
      const effScaleX =
        Math.abs(scaleX) < 0.08 ? 0.08 * Math.sign(scaleX || 1) : scaleX;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.scale(effScaleX, scaleY);

      // Natural multi-tone radial velvet gradient centered near the cup
      const grad = this.ctx.createRadialGradient(
        0,
        h * 0.15,
        p.size * 0.08,
        0,
        0,
        p.size * 1.3,
      );
      grad.addColorStop(0, p.palette.core + "0.96)");
      grad.addColorStop(0.5, p.palette.mid + "0.9)");
      grad.addColorStop(0.88, p.palette.tip + "0.85)");
      grad.addColorStop(1, p.palette.tip + "0.35)");

      // Soft shadow underneath petal
      this.ctx.shadowColor = p.palette.shadow;
      this.ctx.shadowBlur = 5;
      this.ctx.shadowOffsetY = 2;

      this.ctx.beginPath();

      if (p.type === 0) {
        // Heart-notched crown and tapered base form a recognizable rose petal.
        this.ctx.moveTo(0, h * 0.58);
        this.ctx.bezierCurveTo(
          -w * 0.25, h * 0.43, -w * 0.92, h * 0.14, -w, -h * 0.2,
        );
        this.ctx.bezierCurveTo(
          -w * 1.06, -h * 0.48, -w * 0.58, -h * 0.68, -w * 0.18, -h * 0.52,
        );
        this.ctx.quadraticCurveTo(0, -h * 0.34, w * 0.18, -h * 0.52);
        this.ctx.bezierCurveTo(
          w * 0.58, -h * 0.68, w * 1.06, -h * 0.48, w, -h * 0.2,
        );
        this.ctx.bezierCurveTo(
          w * 0.92, h * 0.14, w * 0.25, h * 0.43, 0, h * 0.58,
        );
      } else if (p.type === 1) {
        // A slightly curled, asymmetric rose petal keeps the fall organic.
        this.ctx.moveTo(0, h * 0.6);
        this.ctx.bezierCurveTo(
          -w * 0.4, h * 0.36, -w * 1.05, h * 0.06, -w * 0.92, -h * 0.32,
        );
        this.ctx.bezierCurveTo(
          -w * 0.82, -h * 0.62, -w * 0.38, -h * 0.66, -w * 0.12, -h * 0.48,
        );
        this.ctx.quadraticCurveTo(0, -h * 0.32, w * 0.2, -h * 0.53);
        this.ctx.bezierCurveTo(
          w * 0.52, -h * 0.68, w * 0.98, -h * 0.46, w, -h * 0.12,
        );
        this.ctx.bezierCurveTo(
          w * 0.98, h * 0.2, w * 0.38, h * 0.45, 0, h * 0.6,
        );
      }

      this.ctx.closePath();
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Subtle translucent edge highlight rim
      this.ctx.shadowColor = "transparent";
      this.ctx.strokeStyle = p.palette.highlight;
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();

      // Subtle inner cupped vein fold
      this.ctx.beginPath();
      this.ctx.moveTo(0, h * 0.48);
      this.ctx.quadraticCurveTo(
        -w * 0.16,
        h * 0.02,
        0,
        -h * 0.28,
      );
      this.ctx.strokeStyle = p.palette.tip + "0.45)";
      this.ctx.lineWidth = 1.0;
      this.ctx.stroke();

      this.ctx.restore();
    }

    loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.petals.length - 1; i >= 0; i--) {
        const p = this.petals[i];
        p.swayAngle += p.swaySpeed;
        p.rollAngle += p.rollSpeed;
        p.pitchAngle += p.pitchSpeed;
        p.rotation += p.rotationSpeed;

        p.x += p.vx + Math.sin(p.swayAngle) * p.swayAmp;
        p.y += p.vy;

        if (p.decay > 0) {
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            this.petals.splice(i, 1);
            continue;
          }
        } else {
          // Ambient petal loop reset to top
          if (p.y > this.height + 35) {
            p.y = -35;
            p.x = Math.random() * this.width;
          }
        }

        this.drawRosePetal(p);
      }

      requestAnimationFrame(() => this.loop());
    }
  }

  /* --- 3. AUDIO ENGINE --- */
  class FrenchAudioPlayer {
    constructor() {
      this.audioUrl =
        "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-violin-piano-1011.mp3";
      this.isPlaying = false;
      this.audioEl = null;
      this.synthContext = null;
      this.synthInterval = null;
      this.isSynthMode = false;
      this.btn = document.getElementById("frenchMusicBtn");

      this.initAudio();
      this.bindEvents();
    }

    initAudio() {
      this.audioEl = new Audio();
      this.audioEl.src = this.audioUrl;
      this.audioEl.loop = true;
      this.audioEl.preload = "auto";
      this.audioEl.crossOrigin = "anonymous";

      this.audioEl.addEventListener("error", () => {
        this.isSynthMode = true;
      });
    }

    bindEvents() {
      if (this.btn) {
        this.btn.addEventListener("click", (e) => {
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
      this.btn.setAttribute("aria-pressed", String(playing));
      if (playing) {
        this.btn.classList.add("playing");
      } else {
        this.btn.classList.remove("playing");
      }
    }

    startSynth() {
      if (this.synthInterval) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.synthContext) this.synthContext = new AudioCtx();
      if (this.synthContext.state === "suspended") this.synthContext.resume();

      const chords = [
        [293.66, 369.99, 440.0, 587.33], // D major
        [246.94, 293.66, 369.99, 493.88], // B minor
        [196.0, 246.94, 293.66, 392.0], // G major
        [220.0, 277.18, 329.63, 440.0], // A major
      ];

      let idx = 0;
      const playChord = () => {
        if (!this.isPlaying || !this.synthContext) return;
        const chord = chords[idx % chords.length];
        idx++;
        const now = this.synthContext.currentTime;

        chord.forEach((freq, i) => {
          const osc = this.synthContext.createOscillator();
          const gain = this.synthContext.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.12);

          gain.gain.setValueAtTime(0.001, now + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.045, now + i * 0.12 + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

          osc.connect(gain);
          gain.connect(this.synthContext.destination);

          osc.start(now + i * 0.12);
          osc.stop(now + 4.0);
        });
      };

      playChord();
      this.synthInterval = setInterval(playChord, 3800);
    }

    stopSynth() {
      if (this.synthInterval) {
        clearInterval(this.synthInterval);
        this.synthInterval = null;
      }
    }
  }

  /* --- 4. VINTAGE CALENDAR COUNTDOWN --- */
  class CalendarCountdown {
    constructor(targetDateStr) {
      this.targetTime = new Date(targetDateStr).getTime();
      this.daysEl = document.getElementById("cntDays");
      this.hoursEl = document.getElementById("cntHours");
      this.minsEl = document.getElementById("cntMins");
      this.secsEl = document.getElementById("cntSecs");

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
        if (this.daysEl) this.daysEl.textContent = "00";
        if (this.hoursEl) this.hoursEl.textContent = "00";
        if (this.minsEl) this.minsEl.textContent = "00";
        if (this.secsEl) this.secsEl.textContent = "00";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, "0");
      if (this.hoursEl)
        this.hoursEl.textContent = String(hours).padStart(2, "0");
      if (this.minsEl)
        this.minsEl.textContent = String(minutes).padStart(2, "0");
      if (this.secsEl)
        this.secsEl.textContent = String(seconds).padStart(2, "0");
    }
  }

  /* --- 5. CHATEAU PHOTO SHOWCASES CONTROLLER --- */
  class ShowcaseController {
    constructor() {
      this.showcases = {};
      this.init();
    }

    init() {
      const showcases = ["showcase1", "showcase2", "showcase3"];
      showcases.forEach((scId) => {
        const el = document.getElementById(scId);
        if (!el) return;

        const photos = Array.from(el.querySelectorAll(".showcase-photo"));
        const dots = Array.from(el.querySelectorAll(".showcase-dot"));
        const frame = el.querySelector(".showcase-photo-frame");

        if (photos.length > 0) {
          this.showcases[scId] = {
            photos,
            dots,
            currentIndex: 0,
            touchStartX: 0,
            touchStartY: 0,
          };

          if (frame) {
            frame.addEventListener("click", () => {
              this.next(scId);
            });

            frame.addEventListener(
              "touchstart",
              (e) => {
                this.showcases[scId].touchStartX = e.touches[0].clientX;
                this.showcases[scId].touchStartY = e.touches[0].clientY;
              },
              { passive: true },
            );

            frame.addEventListener(
              "touchend",
              (e) => {
                const deltaX =
                  this.showcases[scId].touchStartX -
                  e.changedTouches[0].clientX;
                const deltaY =
                  this.showcases[scId].touchStartY -
                  e.changedTouches[0].clientY;
                if (
                  Math.abs(deltaX) > Math.abs(deltaY) &&
                  Math.abs(deltaX) > 30
                ) {
                  if (deltaX > 0) {
                    this.next(scId);
                  } else {
                    this.prev(scId);
                  }
                }
              },
              { passive: true },
            );
          }

          dots.forEach((dot, idx) => {
            dot.addEventListener("click", (e) => {
              e.stopPropagation();
              this.setPhoto(scId, idx);
            });
          });
        }
      });

      this.startAutoCycle();
    }

    startAutoCycle() {
      Object.keys(this.showcases).forEach((scId) => {
        const sc = this.showcases[scId];
        if (sc && sc.photos.length > 1) {
          sc.timer = setInterval(() => {
            this.next(scId);
          }, 2000);
        }
      });
    }

    next(scId) {
      const sc = this.showcases[scId];
      if (!sc) return;
      const nextIdx = (sc.currentIndex + 1) % sc.photos.length;
      this.setPhoto(scId, nextIdx);
    }

    prev(scId) {
      const sc = this.showcases[scId];
      if (!sc) return;
      const prevIdx =
        (sc.currentIndex - 1 + sc.photos.length) % sc.photos.length;
      this.setPhoto(scId, prevIdx);
    }

    setPhoto(scId, index) {
      const sc = this.showcases[scId];
      if (!sc) return;

      sc.currentIndex = index;
      sc.photos.forEach((photo, idx) => {
        if (idx === index) {
          photo.style.display = "block";
          photo.style.opacity = "1";
        } else {
          photo.style.display = "none";
          photo.style.opacity = "0";
        }
      });

      sc.dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === index);
      });
    }
  }

  /* --- 6. MAIN APPLICATION BOOTSTRAP --- */
  class FrenchChateauApp {
    constructor() {
      this.translations = FRENCH_CHATEAU_BUNDLE;
      this.petalEngine = null;
      this.audioPlayer = null;
      this.countdown = null;
      this.showcaseController = null;
    }

    init() {
      // 1. Lock scrolling on entry
      document.body.classList.add("french-locked");

      // 2. Apply I18n translations
      this.applyI18n();

      // 3. Initialize Petal Physics
      this.petalEngine = new PetalPhysicsEngine();

      // 4. Initialize Audio, Countdown & Showcases
      this.audioPlayer = new FrenchAudioPlayer();
      this.countdown = new CalendarCountdown("2026-10-03T11:58:00");
      this.showcaseController = new ShowcaseController();

      // 5. Bind User Interactions
      this.bindInteractions();
    }

    applyI18n() {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const keys = key.split(".");
        let cur = this.translations;
        for (const k of keys) {
          if (cur && typeof cur === "object" && k in cur) {
            cur = cur[k];
          } else {
            return;
          }
        }
        if (typeof cur === "string") {
          el.textContent = cur;
        }
      });
    }

    bindInteractions() {
      // 3D Double Gate Opening Click
      const gateFrame = document.getElementById("chateauGateFrame");
      const gateOverlay = document.getElementById("chateauGateOverlay");

      if (gateFrame && gateOverlay) {
        gateFrame.addEventListener("click", (e) => {
          gateFrame.classList.add("opening");

          // Spawn celebration petals
          const rect = gateFrame.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          if (this.petalEngine) {
            this.petalEngine.spawnTouchPetals(centerX, centerY, 20);
          }

          // Start Audio
          this.audioPlayer.play();

          // Smoothly dissolve overlay and unlock scrolling
          setTimeout(() => {
            gateOverlay.classList.add("opened");
            document.body.classList.remove("french-locked");
          }, 850);
        });
      }

      // Map Navigation Button
      const btnFrenchNav = document.getElementById("btnFrenchNav");
      if (btnFrenchNav) {
        btnFrenchNav.addEventListener("click", () => {
          const lat = this.translations.meta.latitude;
          const lng = this.translations.meta.longitude;
          const title = encodeURIComponent(this.translations.meta.venueName);
          const isIOS =
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
          if (isIOS) {
            window.location.href = `http://maps.apple.com/?daddr=${lat},${lng}&q=${title}`;
          } else {
            window.location.href = `https://uri.amap.com/marker?position=${lng},${lat}&name=${title}&src=wedding`;
          }
        });
      }

      // Copy Address Button
      const btnFrenchCopy = document.getElementById("btnFrenchCopy");
      if (btnFrenchCopy) {
        btnFrenchCopy.addEventListener("click", () => {
          const address =
            this.translations.meta.addressDetail ||
            this.translations.meta.address;
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
              .writeText(address)
              .then(() => {
                this.showToast(this.translations.location.copySuccess);
              })
              .catch(() => {
                this.fallbackCopy(address);
              });
          } else {
            this.fallbackCopy(address);
          }
        });
      }

      // Scroll to Top
      const btnScrollTop = document.getElementById("btnScrollTop");
      if (btnScrollTop) {
        btnScrollTop.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    }

    fallbackCopy(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        this.showToast(this.translations.location.copySuccess);
      } catch (err) {
        this.showToast(text);
      }
      document.body.removeChild(textArea);
    }

    showToast(msg) {
      let toast = document.getElementById("frenchToast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "frenchToast";
        toast.className = "french-toast";
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2500);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const app = new FrenchChateauApp();
    app.init();
  });
})();
