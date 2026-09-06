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
      venueName: "万达花园小区",
      latitude: 28.679281,
      longitude: 116.010453,
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
      act1Tag: "CHAPTER I · DEVOTION",
      act1Title: "相爱 · 琴瑟和鸣",
      act1Quote: "琴瑟和鸣共此生，\n一弦一柱皆深情。",
      act2Tag: "CHAPTER II · ETERNITY",
      act2Title: "相守 · 朝暮相依",
      act2Quote: "朝朝暮暮与君老，\n岁岁年年共白头。",
      swipeHint: "← 左右滑动 翻阅多图 →",
    },
    itinerary: {
      tag: "A DAY TOGETHER",
      title: "相聚一席",
      t1Time: "ARRIVE",
      t1Name: "如约而至 · 入席相聚",
      t2Time: "CEREMONY",
      t2Name: "共候礼启 · 见证良缘",
      t3Time: "CELEBRATE",
      t3Name: "礼成开席 · 举杯同庆",
    },
    location: {
      tag: "LOCATION & BANQUET",
      title: "盛宴席设",
      dateLabel: "盛宴吉日",
      timeLabel: "启幕吉时",
      venueLabel: "举办场地",
      navBtn: "一键地图导航",
      copyBtn: "复制场地名称",
      mapCaption: "— CHÂTEAU MAP · 席设地图 —",
      copySuccess: "✨ 场地名称已复制到剪贴板",
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
  // Six petal silhouettes extracted from src/assets/svg/petal*.svg (iconfont paths)
  const PETAL_SHAPE_DEFS = [
    {
      // petal.svg
      vw: 1024,
      vh: 1024,
      d: "M280.756486 46.639688s-334.406562 635.232549 100.275329 902.944358c300.825987 167.43648 377.315075 0 377.315075 0s157.642145 33.580575 90.947391-234.131233S548.468294 447.741004 448.192965 247.190346C371.703877 94.678566 347.917636-87.216216 280.756486 46.639688z",
    },
    {
      // petal2.svg
      vw: 1436,
      vh: 1024,
      d: "M1.630573 18.47983s-38.046709 229.367304 267.414013 420.144374c-38.046709 114.683652 152.730361 267.414013 344.050955 305.460722 169.036093 33.698514 697.88535 97.834395 790.284501 270.675159 8.152866 14.675159 29.350318 10.326964 30.980892-6.522293C1474.038217 601.681529 787.566879-124.467091 1.630573 18.47983z",
    },
    {
      // petal3.svg
      vw: 1024,
      vh: 1024,
      d: "M311.600954 0s0 59.337748 214.463576 133.086093 509.033113 459.019868 227.602649 784.529801S112.819497 740.450331 158.594331 459.019868 298.461881 162.754967 311.600954 0z",
    },
    {
      // petal4.svg
      vw: 1295,
      vh: 1024,
      d: "M1295.918625 828.786383S418.328837-339.880851 126.379901 98.478298-20.030311 1413.555745 1295.918625 828.786383z",
    },
    {
      // petal5.svg
      vw: 1323,
      vh: 1024,
      d: "M476.013031 268.077231s243.764738-364.687403 486.889673-243.124935 730.65441 852.216878-121.562468 974.419148S-132.439109 755.606706 110.685826 633.404436C354.450563 511.841969 476.013031 268.077231 476.013031 268.077231z",
    },
    {
      // petal6.svg
      vw: 1375,
      vh: 1024,
      d: "M0.416794 1024s-33.747954-809.950901 506.219313-978.690672 978.690672 168.739771 843.698855 438.723405c-438.723405-101.243863-1046.18658 67.495908-1349.918168 539.967267z",
    },
  ];

  // Five French garden rose color themes (shared by all petal shapes)
  const PETAL_PALETTES = [
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

  class PetalPhysicsEngine {
    constructor() {
      this.canvas = document.getElementById("petalCanvas");
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext("2d");
      this.petals = [];
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.petalShapes = PETAL_SHAPE_DEFS.map((def) => ({
        path: new Path2D(def.d),
        vw: def.vw,
        vh: def.vh,
      }));
      this.buildSpriteCache();

      this.resize();
      window.addEventListener("resize", () => this.resize());
      this.initAmbientPetals();
      this.bindTouch();
      this.loop();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      // Cap DPR at 2 and use setTransform to avoid compounding scale on resize
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = this.width + "px";
      this.canvas.style.height = this.height + "px";
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Pre-render every shape × palette combo once (gradient, rim & soft shadow
    // baked in) so the animation loop only does cheap drawImage calls.
    buildSpriteCache() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const maxPx = 52; // largest petal display size
      this.spriteCache = this.petalShapes.map((shape) =>
        PETAL_PALETTES.map((palette) => {
          const s = (maxPx * dpr) / shape.vh;
          const cv = document.createElement("canvas");
          cv.width = Math.ceil(shape.vw * s);
          cv.height = Math.ceil(shape.vh * s);
          const c = cv.getContext("2d");
          const inv = 1 / s;

          const grad = c.createRadialGradient(
            shape.vw * 0.5,
            shape.vh * 0.55,
            shape.vh * 0.06,
            shape.vw * 0.5,
            shape.vh * 0.5,
            Math.max(shape.vw, shape.vh) * 0.62,
          );
          grad.addColorStop(0, palette.core + "0.96)");
          grad.addColorStop(0.5, palette.mid + "0.9)");
          grad.addColorStop(0.88, palette.tip + "0.85)");
          grad.addColorStop(1, palette.tip + "0.35)");

          c.scale(s, s);
          c.shadowColor = palette.shadow;
          c.shadowBlur = 5 * inv;
          c.shadowOffsetY = 2 * inv;
          c.fillStyle = grad;
          c.fill(shape.path);

          c.shadowColor = "transparent";
          c.strokeStyle = palette.highlight;
          c.lineWidth = 0.8 * inv;
          c.stroke(shape.path);

          return cv;
        }),
      );
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
      const paletteIndex = Math.floor(Math.random() * PETAL_PALETTES.length);
      const type = Math.floor(Math.random() * PETAL_SHAPE_DEFS.length); // Six SVG petal silhouettes, uniformly random
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
        paletteIndex: paletteIndex,

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
      // Hard cap to keep the animation loop cheap on long gestures
      if (this.petals.length > 80) return;
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
      const shape = this.petalShapes[p.type];
      const sprite = this.spriteCache[p.type][p.paletteIndex];
      const scale = p.size / shape.vh; // fit petal height to p.size

      // 3D projections: roll (width flip) & pitch (height tilt)
      const scaleX = Math.cos(p.rollAngle);
      const scaleY = Math.cos(p.pitchAngle * 0.85);
      const effScaleX =
        Math.abs(scaleX) < 0.08 ? 0.08 * Math.sign(scaleX || 1) : scaleX;

      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(effScaleX * p.aspectRatio, scaleY);
      ctx.drawImage(
        sprite,
        (-shape.vw * scale) / 2,
        (-shape.vh * scale) / 2,
        shape.vw * scale,
        shape.vh * scale,
      );
      ctx.restore();
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
      this.audioUrl = "./src/assets/森系阳光.mp3";
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
      // Per-chapter intervals: longer dwell time, and deliberately different
      // per card so the two carousels never auto-flip at the same moment.
      const AUTO_INTERVALS = {
        showcase1: 4500, // 相爱 · 琴瑟和鸣
        showcase2: 6500, // 相守 · 朝暮相依
      };

      Object.keys(this.showcases).forEach((scId, i) => {
        const sc = this.showcases[scId];
        if (sc && sc.photos.length > 1) {
          const interval = AUTO_INTERVALS[scId] || 5000;
          // Stagger the start so timers are out of phase from the beginning
          const initialDelay = (i * interval) / 3;
          sc.timer = setTimeout(() => {
            sc.timer = setInterval(() => {
              this.next(scId);
            }, interval);
          }, initialDelay);
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

      // 6. Lazily Init Embedded AMap
      this.initChateauMap();
    }

    /* --- EMBEDDED AMAP (懒加载高德地图, 滚动到地点卡片时才拉起 SDK) --- */
    initChateauMap() {
      const mapEl = document.getElementById("chateauMap");
      const frameEl = document.getElementById("chateauMapFrame");
      if (!mapEl || !frameEl) return;

      const meta = this.translations.meta;
      const position = [meta.longitude, meta.latitude];
      const AMAP_KEY = "58881674711b8daba0509d63afdd9215";
      const hideFrame = () => {
        frameEl.style.display = "none";
      };

      const loadSdk = () =>
        new Promise((resolve, reject) => {
          if (window.AMap) return resolve();
          const script = document.createElement("script");
          script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}`;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("AMap SDK load failed"));
          document.head.appendChild(script);
        });

      const buildMap = () => {
        const map = new AMap.Map("chateauMap", {
          viewMode: "2D",
          zoom: 16,
          center: position,
          mapStyle: "amap://styles/light",
          resizeEnable: true,
          dragEnable: true,
          zoomEnable: true, // 允许缩放
          pinchEnable: true, // 移动端双指捏合
          doubleClickZoom: true, // 双击放大
          scrollWheel: false, // 桌面端禁用滚轮, 避免劫持页面滚动
        });

        // Gold Chateau Marker
        const marker = new AMap.Marker({
          position,
          content: '<div class="chateau-map-marker"><span>囍</span></div>',
          offset: new AMap.Pixel(-17, -36),
        });
        marker.setMap(map);

        // Ivory InfoWindow, always open
        const info = new AMap.InfoWindow({
          isCustom: true,
          autoMove: true,
          offset: new AMap.Pixel(0, -40),
          content:
            '<div class="chateau-map-info">' +
            "<b>" + meta.venueName + "</b>" +
            "</div>",
        });
        info.open(map, position);

        // Tap marker to toggle info
        marker.on("click", () => info.open(map, position));
      };

      const boot = () => loadSdk().then(buildMap).catch(hideFrame);

      // Lazy: only fetch SDK when the location section approaches viewport
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                io.disconnect();
                boot();
                break;
              }
            }
          },
          { rootMargin: "300px" }
        );
        io.observe(mapEl);
      } else {
        boot();
      }
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
          const address = this.translations.meta.venueName;
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
