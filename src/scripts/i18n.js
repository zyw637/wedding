/**
 * I18n Manager for Wedding Invitation
 * Loads locale JSON and populates data-i18n elements
 */
export class I18n {
  constructor(defaultLang = 'zh-CN') {
    this.currentLang = defaultLang;
    this.locales = {
      'zh-CN': './src/locales/zh-CN.json',
      'en-US': './src/locales/en-US.json'
    };

    // Full default translations fallback for offline/file:// protocol support
    this.translations = {
      meta: {
        title: "婚礼邀请函 · Wedding Invitation",
        description: "电影胶片风格电子婚礼请帖",
        groom: "周生",
        bride: "慕容",
        groomEn: "Sheng Zhou",
        brideEn: "Rong Murong",
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
        titleNames: "周生 & 慕容",
        subtitle: "沉浸式三幕胶片婚礼电影",
        enterButton: "点击启幕",
        musicHint: "开启声音体验更佳"
      },
      prologue: {
        sceneLabel: "PROLOGUE / 序幕",
        title: "放映定档",
        quote: "有些故事，在初见那一刻便已写下序章。",
        coupleNames: "周生 ＆ 慕容",
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
        signature: "周生 & 慕容 敬邀",
        shareHint: "点击微信右上角 · 分享给亲友",
        replayButton: "重温放映"
      },
      controls: {
        musicPlay: "播放音乐",
        musicPause: "暂停音乐",
        pageIndicator: "第 {current} / {total} 幕"
      }
    };
  }

  async init() {
    // Detect URL parameter ?lang=en-US if any
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && this.locales[langParam]) {
      this.currentLang = langParam;
    }

    try {
      const response = await fetch(this.locales[this.currentLang]);
      if (response.ok) {
        this.translations = await response.json();
      }
    } catch (e) {
      console.info('Loaded default locale bundle.');
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
    // Set page title
    const metaTitle = this.t('meta.title');
    if (metaTitle) {
      document.title = metaTitle;
    }

    // Apply text translations
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val) {
        el.textContent = val;
      }
    });

    // Apply attribute translations e.g. data-i18n-attr="title:meta.title"
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
