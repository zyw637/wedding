/**
 * Slide Controller for Cinematic Presentation
 * Handles touch gestures, wheel scrolling, act image rotation, and lifecycle animations
 */
export class SlideController {
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
    // Setup nested photo cyclers for Act I, Act II, Act III
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

        // Click on photo or dot to cycle
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

    // Horizontal swipe on photo acts
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minDistance) {
      if (isActSlide) {
        if (deltaX > 0) {
          this.nextPhotoInAct(currentActId);
        } else {
          this.prevPhotoInAct(currentActId);
        }
        return;
      }
    }

    // Vertical swipe between scenes
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

    // Manage Act Gallery timers
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

    // Update Indicators
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
    if (this.currentIndex > 1) { // Don't swipe back to curtain
      this.showSlide(this.currentIndex - 1);
    }
  }

  goTo(index) {
    this.showSlide(index);
  }
}
