/**
 * Magazine & Editorial 3D Flipbook Engine
 * Includes: 3D Multi-Page Turn Physics, Gesture Swipes, Starlight Canvas, Multi-photo Lookbook, Countdown, and Lounge Audio
 */

(function () {
  'use strict';

  /* --- 1. LOCALES & I18N DATA --- */
  const MAGAZINE_BUNDLE_LOCALE = {
    'zh-CN': {
      meta: {
        title: "VOWS · 万卓洋 ＆ 张佳敏 婚礼特辑",
        edition: "AUTUMN 2026 SPECIAL EDITION",
        issueNo: "NO. 10.18 · VOL. 26",
        price: "PRICELESS / 珍藏版"
      },
      nav: {
        switchFilm: "🎞️ 电影风",
        switchFrench: "🍾 法式风",
        switchChinese: "🎋 中式风",
        switchMagazine: "📰 杂志风",
        music: "背景音乐"
      },
      flipbook: {
        prev: "◀ PREV",
        next: "NEXT ▶",
        indicator: "PAGE {current} / {total}",
        coverHint: "← 向左滑动或点击 翻阅杂志 →",
        pageHint: "← 左右滑动翻页 →",
        openPrompt: "OPEN ISSUE / 翻开杂志"
      },
      cover: {
        masthead: "VOWS",
        subtitle: "THE WEDDING ISSUE · SPECIAL EDITION",
        volume: "VOL. 26 · ISSUE 10",
        headline: "TWO HEARTS · ONE HORIZON",
        subheadline: "万卓洋 ＆ 张佳敏 · 婚礼独家特刊",
        leadStory: "独家专访：关于爱、笃定与并肩同行的岁月",
        barcodeText: "WEDDING-2026-1018-VOWS",
        openHint: "← 向左滑动或轻触 翻开杂志特辑 →",
        openBtn: "OPEN ISSUE / 翻开特辑"
      },
      editorial: {
        tag: "EDITOR'S LETTER · 卷首寄语",
        title: "写在爱意蔓延时",
        subtitle: "AN EXCLUSIVE INTERVIEW & LETTER",
        dropCap: "在",
        body1: "漫长而喧嚣的岁月里，遇见一个能让心神笃定、彼此映照的人，是最温柔的奇迹。从初见的怦然心动，到并肩漫步晨光暮色，我们找到了生命中最契合的音符。",
        body2: "2026年10月18日，我们将在一众挚爱亲朋的见证下，共同翻开属于两个人的全新人生篇章。诚挚邀请您，成为这本爱意特辑中最珍贵的见证者。",
        quote: "“爱不是彼此凝望，而是一起注视着同一个方向。”",
        quoteAuthor: "—— WAN ZHUOYANG & ZHANG JIAMIN"
      },
      countdown: {
        tag: "TIME & METRICS · 纪念档案",
        title: "倒计时 · 奔赴吉时",
        days: "DAYS",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS",
        stat1Label: "LOVED DAYS",
        stat1Val: "1,314+",
        stat2Label: "ISSUE DATE",
        stat2Val: "OCT 18",
        stat3Label: "CEREMONY",
        stat3Val: "11:58",
        story: "自相遇的那一刻起，每一个寻常日子都因你而熠熠生辉。静候金秋十月，与您一同开启人生崭新盛典。"
      },
      lookbook: {
        tag: "EDITORIAL SPREAD · 秀场大片",
        title: "高定视觉特辑",
        spread1Tag: "LOOK 01 · MORNING SERENITY",
        spread1Title: "晨光油画 · 静谧心动",
        spread1Quote: "在油画般流淌的光影里，定格初遇的深情与温柔。",
        spread2Tag: "LOOK 02 · SUNLIT FAIRWAY",
        spread2Title: "绿茵光影 · 奔赴明朗",
        spread2Quote: "微风与晴空之下，笑意蔓延，心之所向皆是欢喜。",
        spread3Tag: "LOOK 03 · TIMELESS COURTYARD",
        spread3Title: "庭阁深处 · 一生长情",
        spread3Quote: "执子之手，定格长情，共赴往后每一个四季朝暮。",
        tapHint: "✦ 轻触大片可切换多图 ✦"
      },
      runway: {
        tag: "RUNWAY SCHEDULE · 秀场时刻",
        title: "婚礼流程日程",
        t1Time: "11:00",
        t1Name: "PRE-SHOW · 香槟迎宾",
        t1Desc: "签到入场，于迎宾区享用法式冷餐与香槟特调",
        t2Time: "11:58",
        t2Name: "MAIN CEREMONY · 神圣典礼",
        t2Desc: "见山艺术厅内，新郎新娘步入华堂，誓言礼成",
        t3Time: "12:30",
        t3Name: "GRAND BANQUET · 臻享婚宴",
        t3Desc: "品鉴高定婚宴美馔，举杯同庆良辰吉日",
        t4Time: "14:00",
        t4Name: "AFTER PARTY · 庄园合影",
        t4Desc: "与新人合影留念，共度温馨午后时光"
      },
      vipPass: {
        tag: "VIP ACCESS PASS · 贵宾席位",
        title: "盛宴席设与入场凭证",
        passNo: "PASS N° 20261018",
        seat: "ROW A · FRONT SEAT",
        dateLabel: "CEREMONY DATE",
        dateVal: "2026年10月18日",
        lunarVal: "岁在丙午 农历九月初九 宜嫁娶",
        timeLabel: "RECEPTION TIME",
        timeVal: "上午 11:58 启幕",
        venueLabel: "FASHION VENUE",
        venueVal: "云境庄园 · 见山艺术厅",
        addressLabel: "OFFICIAL ADDRESS",
        addressVal: "北京市朝阳区芳草地艺术中心8号",
        navBtn: "一键地图导航",
        copyBtn: "复制场地地址",
        copySuccess: "✨ 场地地址已复制到剪贴板",
        note: "★ 凭此 VIP 凭证入场，庄园设有专属 VIP 停车位"
      },
      colophon: {
        tag: "COLOPHON & CREDITS · 封底制作群",
        title: "制作鸣谢",
        masthead: "VOWS MAGAZINE · WEDDING ISSUE",
        editorInChief: "主编 / 万卓洋 ＆ 张佳敏",
        photo: "视觉影像 / 云境庄园 · 见山艺术厅",
        date: "发行日期 / 2026年10月18日",
        blessing: "感谢每一位出现在我们生命中的挚友亲朋，期待与您在秋日相见。",
        signature: "WAN ZHUOYANG & ZHANG JIAMIN",
        replayBtn: "✦ 翻回封面重温 ✦"
      },
      hud: {
        title: "翻页动效实验室",
        toggleBtn: "⚙️ 翻页参数",
        presetLabel: "精选预设",
        presets: {
          diagonalBend: "📰 经典右下角卷曲",
          origamiFold: "📐 折纸风琴折叠",
          verticalRoll: "📜 竖向画册翻卷",
          softWave: "🌊 超柔纸张波浪"
        },
        directionLabel: "翻页方向",
        directions: {
          rtl: "从右到左 (RTL)",
          ltr: "从左到右 (LTR)",
          btt: "从下到上 (BTT)",
          ttb: "从上到下 (TTB)"
        },
        modeLabel: "翻页方式",
        modes: {
          bend: "柔性弯曲 (Bend)",
          fold: "几何折叠 (Fold)"
        },
        subdivisionsLabel: "页面细分切片 (N)",
        overlapLabel: "细分重叠防撕裂 (px)",
        zGapLabel: "Z轴空间间隙 (px)",
        angleLabel: "翻转倾角 (deg)",
        falloffLabel: "波衰减系数",
        closeBtn: "收起面板"
      }
    },
    'en-US': {
      meta: {
        title: "VOWS · Zhuoyang Wan & Jiamin Zhang Wedding Issue",
        edition: "AUTUMN 2026 SPECIAL EDITION",
        issueNo: "NO. 10.18 · VOL. 26",
        price: "PRICELESS / SPECIAL COLLECTOR'S ISSUE"
      },
      nav: {
        switchFilm: "🎞️ Film Style",
        switchFrench: "🍾 French Style",
        switchChinese: "🎋 Chinese Style",
        switchMagazine: "📰 Magazine Style",
        music: "Music"
      },
      flipbook: {
        prev: "◀ PREV",
        next: "NEXT ▶",
        indicator: "PAGE {current} / {total}",
        coverHint: "← Swipe left or tap to open magazine →",
        pageHint: "← Swipe left / right to turn page →",
        openPrompt: "OPEN ISSUE"
      },
      cover: {
        masthead: "VOWS",
        subtitle: "THE WEDDING ISSUE · SPECIAL EDITION",
        volume: "VOL. 26 · ISSUE 10",
        headline: "TWO HEARTS · ONE HORIZON",
        subheadline: "Zhuoyang Wan & Jiamin Zhang · Exclusive Wedding Issue",
        leadStory: "EXCLUSIVE STORY: LOVE, DEVOTION AND WALKING HAND IN HAND",
        barcodeText: "WEDDING-2026-1018-VOWS",
        openHint: "← Swipe left or tap to turn page →",
        openBtn: "OPEN ISSUE"
      },
      editorial: {
        tag: "EDITOR'S LETTER",
        title: "Written in Love & Radiance",
        subtitle: "AN EXCLUSIVE INTERVIEW & LETTER",
        dropCap: "I",
        body1: "n the vast and bustling world, finding someone who brings peace, warmth, and quiet strength to your soul is life's most exquisite wonder. From the very first spark to walking side by side through sunrise and twilight, we found our shared harmony.",
        body2: "On October 18, 2026, surrounded by our dearest family and closest friends, we will turn the page to begin our brand-new chapter together. We cordially invite you to be the most treasured witness of our love story.",
        quote: "“Love is not just looking at each other, it's looking in the same direction together.”",
        quoteAuthor: "—— WAN ZHUOYANG & ZHANG JIAMIN"
      },
      countdown: {
        tag: "TIME & METRICS",
        title: "Count Every Precious Second",
        days: "DAYS",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS",
        stat1Label: "LOVED DAYS",
        stat1Val: "1,314+",
        stat2Label: "ISSUE DATE",
        stat2Val: "OCT 18",
        stat3Label: "CEREMONY",
        stat3Val: "11:58",
        story: "Every moment since we met has been made radiant by your presence. We look forward to celebrating this brand-new chapter with you."
      },
      lookbook: {
        tag: "EDITORIAL SPREAD · LOOKBOOK",
        title: "Haute Couture Visual Special",
        spread1Tag: "LOOK 01 · MORNING SERENITY",
        spread1Title: "Oil Painting Serenity",
        spread1Quote: "Bathed in painterly light, capturing our first spark and timeless tenderness.",
        spread2Tag: "LOOK 02 · SUNLIT FAIRWAY",
        spread2Title: "Green Horizon & Breeze",
        spread2Quote: "Under the golden sun and open sky, joy blossoms towards our shared future.",
        spread3Tag: "LOOK 03 · TIMELESS COURTYARD",
        spread3Title: "Deep Pavilion Eternity",
        spread3Quote: "Hand in hand, holding onto everlasting love through all seasons of life.",
        tapHint: "✦ Tap photo to browse gallery ✦"
      },
      runway: {
        tag: "RUNWAY SCHEDULE",
        title: "Wedding Order of Events",
        t1Time: "11:00",
        t1Name: "PRE-SHOW · Welcome Reception",
        t1Desc: "Guest arrival, signature drinks, and champagne cocktails at the reception lounge",
        t2Time: "11:58",
        t2Name: "MAIN CEREMONY · Exchange of Vows",
        t2Desc: "Witness the couple's procession and sacred vows inside Mountain View Art Hall",
        t3Time: "12:30",
        t3Name: "GRAND BANQUET · Haute Cuisine",
        t3Desc: "Savor bespoke culinary courses and raise a toast to eternal joy",
        t4Time: "14:00",
        t4Name: "AFTER PARTY · Group Photos",
        t4Desc: "Capture timeless memories in the estate gardens with loved ones"
      },
      vipPass: {
        tag: "VIP ACCESS PASS",
        title: "Venue & Seat Pass",
        passNo: "PASS N° 20261018",
        seat: "ROW A · FRONT SEAT",
        dateLabel: "CEREMONY DATE",
        dateVal: "Sunday, October 18, 2026",
        lunarVal: "An auspicious autumn day of love",
        timeLabel: "RECEPTION TIME",
        timeVal: "11:58 AM Reception & Ceremony",
        venueLabel: "FASHION VENUE",
        venueVal: "The Grand Cloud Estate · Mountain View Art Hall",
        addressLabel: "OFFICIAL ADDRESS",
        addressVal: "No. 8 Fangcaodi Art Center, Chaoyang District, Beijing",
        navBtn: "Open Navigation",
        copyBtn: "Copy Venue Address",
        copySuccess: "✨ Venue address copied to clipboard",
        note: "★ VIP entrance pass. Complimentary valet & underground parking available."
      },
      colophon: {
        tag: "COLOPHON & CREDITS",
        title: "Issue Credits",
        masthead: "VOWS MAGAZINE · WEDDING ISSUE",
        editorInChief: "Editor-in-Chief / Zhuoyang Wan & Jiamin Zhang",
        photo: "Photography / The Grand Cloud Estate",
        date: "Issue Date / October 18, 2026",
        blessing: "With deepest gratitude to everyone in our lives. We cannot wait to celebrate with you.",
        signature: "WAN ZHUOYANG & ZHANG JIAMIN",
        replayBtn: "✦ REPLAY FROM COVER ✦"
      },
      hud: {
        title: "Flip Dynamics Lab",
        toggleBtn: "⚙️ Physics HUD",
        presetLabel: "Curated Presets",
        presets: {
          diagonalBend: "📰 Editorial Corner Bend",
          origamiFold: "📐 Origami Geometric Fold",
          verticalRoll: "📜 Vertical Calendar Roll",
          softWave: "🌊 Ultra-Soft Paper Wave"
        },
        directionLabel: "Flip Direction",
        directions: {
          rtl: "Right-to-Left",
          ltr: "Left-to-Right",
          btt: "Bottom-to-Top",
          ttb: "Top-to-Bottom"
        },
        modeLabel: "Deformation Mode",
        modes: {
          bend: "Flexible Bend",
          fold: "Origami Fold"
        },
        subdivisionsLabel: "Mesh Subdivisions (N)",
        overlapLabel: "Overlap Clearance (px)",
        zGapLabel: "Z-Axis Depth Gap (px)",
        angleLabel: "Corner Angle (deg)",
        falloffLabel: "Wave Falloff Factor",
        closeBtn: "Close HUD"
      }
    }
  };

  /* --- 2. CAMERA FLASH & STARLIGHT CANVAS --- */
  class MagazineFlashCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.flashes = [];
      this.maxParticles = 30;
      this.isRunning = false;

      this.resize = this.resize.bind(this);
      this.animate = this.animate.bind(this);
      this.onPointerDown = this.onPointerDown.bind(this);

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', this.resize);
      window.addEventListener('pointerdown', this.onPointerDown);

      for (let i = 0; i < this.maxParticles; i++) {
        this.particles.push(this.createParticle());
      }

      this.isRunning = true;
      requestAnimationFrame(this.animate);
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
    }

    createParticle() {
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? 'rgba(194, 165, 102, ' : 'rgba(255, 248, 230, '
      };
    }

    onPointerDown(e) {
      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : this.width / 2);
      const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : this.height / 2);

      this.flashes.push({
        x: x,
        y: y,
        radius: 8,
        maxRadius: 80,
        alpha: 0.7,
        color: 'rgba(255, 250, 240, '
      });

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i + Math.random() * 0.2;
        const speed = Math.random() * 2 + 1;
        this.particles.push({
          x: x,
          y: y,
          size: Math.random() * 2.5 + 1.2,
          alpha: 0.9,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          pulseSpeed: 0.05,
          pulseAngle: 0,
          color: 'rgba(194, 165, 102, ',
          isBurst: true
        });
      }
    }

    animate() {
      if (!this.isRunning) return;

      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.flashes.length - 1; i >= 0; i--) {
        const f = this.flashes[i];
        f.radius += (f.maxRadius - f.radius) * 0.15;
        f.alpha -= 0.04;

        if (f.alpha <= 0) {
          this.flashes.splice(i, 1);
          continue;
        }

        const grad = this.ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, f.color + f.alpha + ')');
        grad.addColorStop(0.3, 'rgba(194, 165, 102, ' + (f.alpha * 0.5) + ')');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseAngle += p.pulseSpeed;

        if (p.isBurst) {
          p.alpha -= 0.025;
          p.size *= 0.98;
          if (p.alpha <= 0 || p.size <= 0.3) {
            this.particles.splice(i, 1);
            continue;
          }
        } else {
          if (p.x < 0) p.x = this.width;
          if (p.x > this.width) p.x = 0;
          if (p.y < 0) p.y = this.height;
          if (p.y > this.height) p.y = 0;
        }

        const currentAlpha = p.isBurst ? p.alpha : Math.max(0.1, p.alpha + Math.sin(p.pulseAngle) * 0.2);

        this.ctx.fillStyle = p.color + currentAlpha + ')';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      requestAnimationFrame(this.animate);
    }
  }

  /* --- 3. WEB AUDIO SYNTHESIZER --- */
  class MagazineAudioPlayer {
    constructor() {
      this.isPlaying = false;
      this.synthContext = null;
      this.timerId = null;
      this.noteIndex = 0;

      this.musicBtn = document.getElementById('magMusicBtn');
      if (this.musicBtn) {
        this.musicBtn.addEventListener('click', () => this.toggle());
      }
    }

    initAudio() {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.synthContext) {
        this.synthContext = new AudioCtx();
      }
      if (this.synthContext.state === 'suspended') {
        this.synthContext.resume();
      }
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.play();
      }
    }

    play() {
      this.initAudio();
      if (!this.synthContext) return;
      this.isPlaying = true;
      if (this.musicBtn) {
        this.musicBtn.classList.add('playing');
      }
      this.startMelodyLoop();
    }

    stop() {
      this.isPlaying = false;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      if (this.musicBtn) {
        this.musicBtn.classList.remove('playing');
      }
    }

    startMelodyLoop() {
      const chords = [
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
        [392.00, 493.88, 587.33, 698.46], // G7
        [329.63, 392.00, 493.88, 587.33], // Em7
        [440.00, 523.25, 659.25, 783.99], // Am7
        [293.66, 349.23, 440.00, 523.25], // Dm7
        [392.00, 493.88, 587.33, 698.46], // G7
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [261.63, 392.00, 523.25, 659.25]  // Cadd9
      ];

      const playChord = () => {
        if (!this.isPlaying || !this.synthContext) return;
        const chord = chords[this.noteIndex % chords.length];
        this.noteIndex++;

        chord.forEach((freq, idx) => {
          setTimeout(() => {
            if (!this.isPlaying) return;
            this.playTone(freq, 2.2, 0.08);
          }, idx * 160);
        });
      };

      playChord();
      this.timerId = setInterval(playChord, 2400);
    }

    playTone(frequency, duration, volume) {
      if (!this.synthContext) return;
      const ctx = this.synthContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    }

    playPageFlipSound() {
      // Luxurious acoustic physical paper friction & air whoosh
      if (!this.synthContext) return;
      const ctx = this.synthContext;
      if (ctx.state === 'suspended') return;

      try {
        // 1. Gentle paper friction noise sweep (0.45s)
        const dur = 0.45;
        const bufferSize = Math.floor(ctx.sampleRate * dur);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + dur);
        filter.Q.setValueAtTime(1.8, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + dur);

        // 2. Slow air displacement sine whoosh (0.55s)
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.55);

        oscGain.gain.setValueAtTime(0.001, ctx.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.1);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.55);
      } catch (err) {
        // graceful fallback if audio restricted
      }
    }
  }

  /* --- 4. TRUE PHYSICAL LEFT-SPINE 3D FLIPBOOK ENGINE --- */
  class MagazineFlipbook {
    constructor(audioPlayer) {
      this.audioPlayer = audioPlayer;
      this.bookEl = document.getElementById('magBook');
      this.pages = Array.from(document.querySelectorAll('.mag-page'));
      this.totalPages = this.pages.length;
      this.currentIndex = 0;
      this.isAnimating = false;

      // Touch drag state
      this.isDragging = false;
      this.dragDirection = null; // 'forward' or 'backward'
      this.dragAxis = null; // 'vertical' or 'horizontal'
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchStartTime = 0;
      this.currentDragProgress = 0;
      this.animRafId = null;

      // Inject paper backface and dynamic lighting layers
      this.pages.forEach((p) => {
        if (!p.querySelector('.mag-page-back')) {
          const backEl = document.createElement('div');
          backEl.className = 'mag-page-back';
          p.appendChild(backEl);
        }
        if (!p.querySelector('.mag-paper-curl-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'mag-paper-curl-overlay';
          p.appendChild(overlay);
        }
        if (!p.querySelector('.mag-page-drop-shadow')) {
          const dropShadow = document.createElement('div');
          dropShadow.className = 'mag-page-drop-shadow';
          p.appendChild(dropShadow);
        }
        if (!p.querySelector('.mag-page-edge-highlight')) {
          const edgeHighlight = document.createElement('div');
          edgeHighlight.className = 'mag-page-edge-highlight';
          p.appendChild(edgeHighlight);
        }
      });

      this.init();
    }

    init() {
      if (!this.bookEl || this.totalPages === 0) return;

      // Open Cover Button
      const btnOpenCover = document.getElementById('btnMagCoverOpen');
      if (btnOpenCover) {
        btnOpenCover.addEventListener('click', (e) => {
          e.stopPropagation();
          this.nextPage();
        });
      }

      // Replay from cover button
      const btnReplay = document.getElementById('btnMagFlipReplay');
      if (btnReplay) {
        btnReplay.addEventListener('click', (e) => {
          e.stopPropagation();
          this.goToPage(0, false);
        });
      }

      // Stage Touch Gestures & Real-Time Finger Drag (Universal Vertical & Horizontal Swipes)
      const stage = document.getElementById('magStage');
      if (stage) {
        stage.addEventListener('touchstart', (e) => {
          if (this.isAnimating) return;
          if (e.touches && e.touches.length > 0) {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.touchStartTime = Date.now();
            this.isDragging = false;
            this.dragDirection = null;
            this.dragAxis = null;
            this.currentDragProgress = 0;
          }
        }, { passive: false });

        stage.addEventListener('touchmove', (e) => {
          if (this.isAnimating) return;
          if (!e.touches || e.touches.length === 0) return;

          const clientX = e.touches[0].clientX;
          const clientY = e.touches[0].clientY;
          const deltaX = clientX - this.touchStartX;
          const deltaY = clientY - this.touchStartY;
          const absX = Math.abs(deltaX);
          const absY = Math.abs(deltaY);

          // Detect Gesture Direction (Vertical Swipe Up/Down or Horizontal Swipe Left/Right)
          if (!this.isDragging) {
            if (absY > 6 || absX > 6) {
              if (absY >= absX) {
                // Vertical Drag
                if (deltaY < 0 && this.currentIndex < this.totalPages - 1) {
                  this.isDragging = true;
                  this.dragDirection = 'forward';
                  this.dragAxis = 'vertical';
                } else if (deltaY > 0 && this.currentIndex > 0) {
                  this.isDragging = true;
                  this.dragDirection = 'backward';
                  this.dragAxis = 'vertical';
                }
              } else {
                // Horizontal Drag
                if (deltaX < 0 && this.currentIndex < this.totalPages - 1) {
                  this.isDragging = true;
                  this.dragDirection = 'forward';
                  this.dragAxis = 'horizontal';
                } else if (deltaX > 0 && this.currentIndex > 0) {
                  this.isDragging = true;
                  this.dragDirection = 'backward';
                  this.dragAxis = 'horizontal';
                }
              }
            }
          }

          if (this.isDragging) {
            e.preventDefault(); // Prevent native browser bounce/scroll
            const dragDist = (this.dragAxis === 'vertical') ? -deltaY : -deltaX;
            this.handleRealtimeDrag(dragDist);
          }
        }, { passive: false });

        stage.addEventListener('touchend', (e) => {
          if (this.isAnimating) return;
          const clientX = (e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0].clientX : this.touchStartX;
          const clientY = (e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0].clientY : this.touchStartY;
          const deltaX = clientX - this.touchStartX;
          const deltaY = clientY - this.touchStartY;
          const absX = Math.abs(deltaX);
          const absY = Math.abs(deltaY);
          const elapsed = Date.now() - this.touchStartTime;
          this.lastGestureTime = Date.now();

          if (this.isDragging) {
            const dragDist = (this.dragAxis === 'vertical') ? -deltaY : -deltaX;
            this.finishDrag(dragDist, elapsed);
          } else {
            // Universal Swipe Gestures: Up/Left -> Next, Down/Right -> Prev
            if (absY > 20 || absX > 20) {
              if (absY >= absX) {
                if (deltaY < -20) {
                  this.nextPage();
                  return;
                }
                if (deltaY > 20) {
                  this.prevPage();
                  return;
                }
              } else {
                if (deltaX < -20) {
                  this.nextPage();
                  return;
                }
                if (deltaX > 20) {
                  this.prevPage();
                  return;
                }
              }
            }

            // Screen Center Line Tap
            if (absX <= 15 && absY <= 15 && elapsed < 400) {
              if (e.target.closest('a, button, input, select, .mag-spread-img-box, .mag-spread-dots-strip, .mag-vip-action-btns')) {
                return;
              }
              const midX = window.innerWidth / 2;
              if (clientX > midX) {
                this.nextPage();
              } else {
                this.prevPage();
              }
            }
          }
        }, { passive: true });

        // Screen center line mouse click for desktop preview (guarded against ghost clicks)
        stage.addEventListener('click', (e) => {
          if (this.isDragging || this.isAnimating) return;
          if (Date.now() - this.lastGestureTime < 350) return;
          if (e.target.closest('a, button, input, select, .mag-spread-img-box, .mag-spread-dots-strip, .mag-vip-action-btns')) {
            return;
          }
          const midX = window.innerWidth / 2;
          if (e.clientX > midX) {
            this.nextPage();
          } else {
            this.prevPage();
          }
        });
      }

      this.updateZIndexAndStates();
    }

    // 3D Paper Curl Transform (preserve-3d restored for full 3D animation)
    applyPaperCurlTransform(turningPage, underPage, progress, isForward = true) {
      if (!turningPage) return;
      const p = Math.min(1, Math.max(0, progress));

      // Parabolic 3D arch wave: reaches peak lift at p = 0.5
      const wave = Math.sin(p * Math.PI);
      const edgePulse = Math.pow(wave, 0.72);
      // Continuous Rotation: Forward (0 -> -180deg), Backward (-180deg -> 0deg)
      const angleY = isForward ? -p * 180 : -180 + p * 180;
      const liftZ = wave * 72; // 3D parabolic arch elevation (px)
      const scaleX = 1 - wave * 0.105; // Natural paper perspective horizontal contraction
      const rotateZ = (isForward ? -1 : 1) * wave * 3.2; // Natural paper corner gravitational tilt
      const rotateX = (isForward ? 1 : -1) * wave * 1.4;
      const edgeSkew = (isForward ? -1 : 1) * wave * 4;

      turningPage.classList.add('dragging');
      turningPage.style.setProperty('--mag-flip-progress', p.toFixed(3));
      turningPage.style.setProperty('--mag-flip-wave', wave.toFixed(3));
      turningPage.style.display = 'flex';
      turningPage.style.zIndex = '160';
      turningPage.style.opacity = '1';
      turningPage.style.visibility = 'visible';
      turningPage.style.transformOrigin = 'left center';
      turningPage.style.transform = `translateZ(${liftZ}px) rotateX(${rotateX}deg) rotateY(${angleY}deg) rotateZ(${rotateZ}deg) scaleX(${scaleX})`;
      turningPage.style.boxShadow = `
        ${isForward ? '-' : ''}${Math.round(8 + wave * 26)}px 10px ${Math.round(22 + wave * 36)}px rgba(0, 0, 0, ${(0.18 + wave * 0.34).toFixed(2)}),
        0 ${Math.round(12 + wave * 18)}px ${Math.round(28 + wave * 28)}px rgba(0, 0, 0, ${(0.16 + wave * 0.22).toFixed(2)})
      `;

      // Dynamic traveling light wave on turning page
      const overlay = turningPage.querySelector('.mag-paper-curl-overlay');
      if (overlay) {
        overlay.style.opacity = (wave * 0.72).toFixed(2);
        const posPercent = isForward ? (p * 100) : (100 - p * 100);
        overlay.style.backgroundPosition = `${posPercent}% 0`;
      }

      const edgeHighlight = turningPage.querySelector('.mag-page-edge-highlight');
      if (edgeHighlight) {
        edgeHighlight.style.opacity = (edgePulse * 0.9).toFixed(2);
        edgeHighlight.style.transform = `translateZ(5px) skewY(${edgeSkew}deg)`;
      }

      // Dynamic depth drop shadow on the page underneath
      if (underPage) {
        const dropShadow = underPage.querySelector('.mag-page-drop-shadow');
        if (dropShadow) {
          dropShadow.style.opacity = (wave * 0.72).toFixed(2);
        }
      }
    }

    handleRealtimeDrag(dragDist) {
      const dimension = (this.dragAxis === 'vertical') 
        ? Math.max(320, this.bookEl.offsetHeight || 550) 
        : Math.max(280, this.bookEl.offsetWidth || 360);

      let progress = 0;
      if (this.dragDirection === 'forward') {
        progress = Math.min(1, Math.max(0, dragDist / (dimension * 0.7)));
        const turningPage = this.pages[this.currentIndex];
        const nextPage = this.pages[this.currentIndex + 1];
        if (turningPage) {
          turningPage.style.display = 'flex';
          this.applyPaperCurlTransform(turningPage, nextPage, progress, true);
        }
        if (nextPage) {
          nextPage.style.display = 'flex';
          nextPage.classList.remove('stack-below');
          nextPage.classList.add('under-next');
          nextPage.style.zIndex = '80';
          nextPage.style.opacity = '1';
          nextPage.style.visibility = 'visible';
        }
      } else {
        // Instant 1px Backward Lift: Previous page starts at -180deg and follows finger
        progress = Math.min(1, Math.max(0, -dragDist / (dimension * 0.7)));
        const turningPage = this.pages[this.currentIndex - 1];
        const curPage = this.pages[this.currentIndex];
        if (turningPage) {
          turningPage.style.display = 'flex';
          turningPage.classList.remove('flipped');
          turningPage.style.opacity = '1';
          turningPage.style.visibility = 'visible';
          this.applyPaperCurlTransform(turningPage, curPage, progress, false);
        }
        if (curPage) {
          curPage.style.display = 'flex';
          curPage.style.zIndex = '90';
          curPage.style.opacity = '1';
          curPage.style.visibility = 'visible';
        }
      }

      this.currentDragProgress = progress;
    }

    finishDrag(dragDist, elapsed) {
      this.isDragging = false;
      const progress = this.currentDragProgress;
      const timeMs = Math.max(1, elapsed);
      const velocity = Math.abs(dragDist) / timeMs;
      const isFastSwipe = velocity > 0.35 || Math.abs(dragDist) > 25;
      const shouldFlip = progress > 0.18 || isFastSwipe;

      const isForward = (this.dragDirection === 'forward');
      const turningIndex = isForward ? this.currentIndex : this.currentIndex - 1;
      const targetIndex = isForward ? (shouldFlip ? this.currentIndex + 1 : this.currentIndex) : (shouldFlip ? this.currentIndex - 1 : this.currentIndex);

      const flipDuration = isFastSwipe
        ? Math.max(300, Math.min(550, 600 * (1 - progress)))
        : Math.max(450, Math.min(750, 800 * (1 - progress)));

      if (shouldFlip) {
        this.animateFlip(turningIndex, targetIndex, progress, 1.0, isForward, flipDuration);
      } else {
        const revertDuration = Math.max(220, Math.min(420, 420 * progress));
        this.animateFlip(turningIndex, this.currentIndex, progress, 0.0, isForward, revertDuration, () => {
          this.updateZIndexAndStates();
        });
      }
    }

    resetPageEffects(page) {
      if (!page) return;

      const overlay = page.querySelector('.mag-paper-curl-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
      }

      const edgeHighlight = page.querySelector('.mag-page-edge-highlight');
      if (edgeHighlight) {
        edgeHighlight.style.opacity = '0';
        edgeHighlight.style.transform = 'translateZ(5px)';
      }

      const dropShadow = page.querySelector('.mag-page-drop-shadow');
      if (dropShadow) {
        dropShadow.style.opacity = '0';
      }

      page.style.setProperty('--mag-flip-progress', '0');
      page.style.setProperty('--mag-flip-wave', '0');
      page.style.boxShadow = '';
    }

    prepareFlipLayers(turningPageIndex, underPageIndex) {
      this.pages.forEach((page, idx) => {
        page.classList.remove('active', 'flipped', 'under-next', 'stack-below', 'dragging', 'animating');
        page.style.transformOrigin = 'left center';
        page.style.pointerEvents = 'none';
        page.style.willChange = 'auto';
        this.resetPageEffects(page);

        if (idx === turningPageIndex) {
          page.classList.add('dragging', 'animating');
          page.style.display = 'flex';
          page.style.zIndex = '160';
          page.style.opacity = '1';
          page.style.visibility = 'visible';
          page.style.pointerEvents = 'none';
          page.style.willChange = 'transform';
        } else if (idx === underPageIndex) {
          page.classList.add('under-next');
          page.style.display = 'flex';
          page.style.transform = 'rotateY(0deg) translate3d(0, 0, 0)';
          page.style.zIndex = '80';
          page.style.opacity = '1';
          page.style.visibility = 'visible';
        } else {
          page.classList.add(idx < this.currentIndex ? 'flipped' : 'stack-below');
          page.style.display = 'none';
          page.style.transform = '';
          page.style.zIndex = '-1';
          page.style.opacity = '0';
          page.style.visibility = 'hidden';
        }
      });
    }

    // Buttery Smooth 3D Cylindrical Curved Page Flip Animation (100% Intact Page, Zero Jitter)
    animateFlip(turningPageIndex, targetIndex, startP, endP, isForward, duration = 720, onComplete = null) {
      if (this.animRafId) cancelAnimationFrame(this.animRafId);
      this.isAnimating = true;

      const turningPage = this.pages[turningPageIndex];
      const underPageIndex = isForward ? turningPageIndex + 1 : this.currentIndex;
      const underPage = this.pages[underPageIndex];

      this.prepareFlipLayers(turningPageIndex, underPageIndex);

      const startTime = performance.now();
      const dur = Math.max(220, duration);

      const frame = (now) => {
        const elapsed = now - startTime;
        const linearT = Math.min(1, elapsed / dur);

        // Forward: Smooth Cosine Ease; Backward: Smooth Cubic Ease-Out for Immediate Fluid Entry
        let easeT = 0;
        if (isForward) {
          easeT = 0.5 - 0.5 * Math.cos(linearT * Math.PI);
        } else {
          // Cubic ease-out: starts continuously at -180deg and glides smoothly into view within 50ms
          easeT = 1 - Math.pow(1 - linearT, 2.6);
        }
        const curP = startP + (endP - startP) * easeT;

        this.applyPaperCurlTransform(turningPage, underPage, curP, isForward);

        if (linearT < 1) {
          this.animRafId = requestAnimationFrame(frame);
        } else {
          this.isAnimating = false;
          this.animRafId = null;
          if (onComplete) {
            onComplete();
          } else {
            this.currentIndex = targetIndex;
            this.updateZIndexAndStates();
          }
        }
      };

      this.animRafId = requestAnimationFrame(frame);
    }

    nextPage() {
      if (this.currentIndex < this.totalPages - 1 && !this.isAnimating) {
        if (this.audioPlayer) {
          if (!this.audioPlayer.isPlaying && this.currentIndex === 0) {
            this.audioPlayer.play();
          }
          this.audioPlayer.playPageFlipSound();
        }
        this.animateFlip(this.currentIndex, this.currentIndex + 1, 0.0, 1.0, true, 720);
      }
    }

    prevPage() {
      if (this.currentIndex > 0 && !this.isAnimating) {
        if (this.audioPlayer) {
          this.audioPlayer.playPageFlipSound();
        }
        this.animateFlip(this.currentIndex - 1, this.currentIndex - 1, 0.0, 1.0, false, 720);
      }
    }

    goToPage(index, isForward = true) {
      if (index === this.currentIndex || index < 0 || index >= this.totalPages || this.isAnimating) return;

      if (this.audioPlayer) {
        if (!this.audioPlayer.isPlaying && index > 0) {
          this.audioPlayer.play();
        }
        this.audioPlayer.playPageFlipSound();
      }

      if (index > this.currentIndex) {
        this.animateFlip(this.currentIndex, index, 0.0, 1.0, true, 720);
      } else {
        this.animateFlip(index, index, 0.0, 1.0, false, 720);
      }
    }

    updateZIndexAndStates() {
      this.pages.forEach((page, idx) => {
        page.classList.remove('active', 'flipped', 'under-next', 'stack-below', 'dragging', 'animating');
        page.style.transformOrigin = 'left center';
        this.resetPageEffects(page);

        if (idx < this.currentIndex) {
          page.classList.add('flipped');
          page.style.display = 'none';
          page.style.transform = '';
          page.style.zIndex = '-1';
          page.style.opacity = '0';
          page.style.visibility = 'hidden';
          page.style.pointerEvents = 'none';
          page.style.willChange = 'auto';
        } else if (idx === this.currentIndex) {
          page.classList.add('active');
          page.style.display = 'flex';
          page.style.transform = 'rotateY(0deg) translate3d(0, 0, 0)';
          page.style.zIndex = '100';
          page.style.opacity = '1';
          page.style.visibility = 'visible';
          page.style.pointerEvents = 'auto';
          page.style.willChange = 'transform';
        } else if (idx === this.currentIndex + 1) {
          page.classList.add('under-next');
          page.style.display = 'flex';
          page.style.transform = 'rotateY(0deg) translate3d(0, 0, 0)';
          page.style.zIndex = '80';
          page.style.opacity = '1';
          page.style.visibility = 'visible';
          page.style.pointerEvents = 'none';
          page.style.willChange = 'auto';
        } else {
          page.classList.add('stack-below');
          page.style.display = 'none';
          page.style.transform = '';
          page.style.zIndex = '-1';
          page.style.opacity = '0';
          page.style.visibility = 'hidden';
          page.style.pointerEvents = 'none';
          page.style.willChange = 'auto';
        }
      });
    }
  }

  /* --- 5. MULTI-PHOTO GALLERY IN SPREADS --- */
  class LookbookPhotoSwitcher {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.photos = this.container.querySelectorAll('.mag-spread-img');
      this.dots = this.container.querySelectorAll('.mag-spread-dot');
      this.currentIndex = 0;
      this.total = this.photos.length;

      this.init();
    }

    init() {
      if (this.total === 0) return;

      // Click frame to advance
      const frame = this.container.querySelector('.mag-spread-img-box');
      if (frame) {
        frame.addEventListener('click', (e) => {
          e.stopPropagation();
          this.next();
        });
      }

      // Click dots
      this.dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          this.goTo(idx);
        });
      });

      this.updateUI();
    }

    next() {
      this.goTo((this.currentIndex + 1) % this.total);
    }

    goTo(index) {
      this.currentIndex = index;
      this.updateUI();
    }

    updateUI() {
      this.photos.forEach((photo, idx) => {
        if (idx === this.currentIndex) {
          photo.style.opacity = '1';
          photo.style.transform = 'scale(1)';
          photo.style.pointerEvents = 'auto';
        } else {
          photo.style.opacity = '0';
          photo.style.transform = 'scale(1.03)';
          photo.style.pointerEvents = 'none';
        }
      });

      this.dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }
  }

  /* --- 6. WEDDING COUNTDOWN TIMER --- */
  class MagazineCountdown {
    constructor(targetDateStr) {
      this.targetDate = new Date(targetDateStr).getTime();
      this.daysEl = document.getElementById('cntMagDays');
      this.hoursEl = document.getElementById('cntMagHours');
      this.minsEl = document.getElementById('cntMagMins');
      this.secsEl = document.getElementById('cntMagSecs');

      if (this.daysEl && this.hoursEl && this.minsEl && this.secsEl) {
        this.update();
        setInterval(() => this.update(), 1000);
      }
    }

    update() {
      const now = new Date().getTime();
      const distance = this.targetDate - now;

      if (distance < 0) {
        this.daysEl.textContent = '00';
        this.hoursEl.textContent = '00';
        this.minsEl.textContent = '00';
        this.secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      this.daysEl.textContent = String(days).padStart(2, '0');
      this.hoursEl.textContent = String(hours).padStart(2, '0');
      this.minsEl.textContent = String(mins).padStart(2, '0');
      this.secsEl.textContent = String(secs).padStart(2, '0');
    }
  }

  /* --- 7. TOAST NOTIFICATION --- */
  function showMagToast(msg) {
    let toast = document.getElementById('magToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'magToast';
      toast.className = 'mag-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /* --- 8. DOM READY & INIT --- */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Resolution
    const userLang = (navigator.language && navigator.language.startsWith('en')) ? 'en-US' : 'zh-CN';
    const bundle = MAGAZINE_BUNDLE_LOCALE[userLang] || MAGAZINE_BUNDLE_LOCALE['zh-CN'];

    // 2. Populate I18n Attributes
    const getNestedVal = (obj, path) => {
      return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : '', obj);
    };

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedVal(bundle, key);
      if (val) {
        el.innerText = val;
      }
    });

    // 3. Starlight Canvas
    new MagazineFlashCanvas('magCanvas');

    // 4. Audio Player & 3D Flipbook
    const audioPlayer = new MagazineAudioPlayer();
    new MagazineFlipbook(audioPlayer);

    // 5. Lookbook Photo Switchers
    new LookbookPhotoSwitcher('spreadBox1');
    new LookbookPhotoSwitcher('spreadBox2');
    new LookbookPhotoSwitcher('spreadBox3');

    // 6. Countdown (2026-10-18 11:58:00)
    new MagazineCountdown('2026-10-18T11:58:00');

    // 7. Navigation & Address Actions
    const btnNav = document.getElementById('btnMagNav');
    if (btnNav) {
      btnNav.addEventListener('click', (e) => {
        e.stopPropagation();
        const lat = 39.9199;
        const lng = 116.4475;
        const name = encodeURIComponent('云境庄园 · 见山艺术厅');
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
          window.location.href = `maps://maps.apple.com/?q=${name}&ll=${lat},${lng}`;
        } else {
          window.location.href = `https://uri.amap.com/marker?position=${lng},${lat}&name=${name}`;
        }
      });
    }

    const btnCopy = document.getElementById('btnMagCopy');
    if (btnCopy) {
      btnCopy.addEventListener('click', (e) => {
        e.stopPropagation();
        const address = '北京市朝阳区芳草地艺术中心8号 云境庄园 · 见山艺术厅';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(address).then(() => {
            showMagToast(bundle.vipPass.copySuccess || '✨ 场地地址已复制到剪贴板');
          }).catch(() => {
            fallbackCopy(address);
          });
        } else {
          fallbackCopy(address);
        }
      });
    }

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showMagToast(bundle.vipPass.copySuccess || '✨ 场地地址已复制到剪贴板');
      } catch (err) {
        showMagToast('请手动复制：' + text);
      }
      document.body.removeChild(textarea);
    }
  });

})();
