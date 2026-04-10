class ReefHoverGallery extends HTMLElement {
  connectedCallback() {
    this.images = Array.from(this.querySelectorAll('[data-gallery-image]'));
    this.currentIndex = 0;
    this.hoverTimeout = null;
    this.cycleInterval = null;
    this.mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    this.delay = Number(this.dataset.galleryDelay || 2800);
    this.initialDelay = Number(this.dataset.galleryInitialDelay || 140);

    if (this.images.length === 0) return;

    this.showImage(0);

    if (this.images.length <= 1) return;

    this.handlePointerEnter = this.handlePointerEnter.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);

    this.addEventListener('pointerenter', this.handlePointerEnter);
    this.addEventListener('pointerleave', this.handlePointerLeave);

    if (typeof this.mediaQuery.addEventListener === 'function') {
      this.mediaQuery.addEventListener('change', this.handleMediaChange);
    } else if (typeof this.mediaQuery.addListener === 'function') {
      this.mediaQuery.addListener(this.handleMediaChange);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('pointerenter', this.handlePointerEnter);
    this.removeEventListener('pointerleave', this.handlePointerLeave);

    if (this.mediaQuery) {
      if (typeof this.mediaQuery.removeEventListener === 'function') {
        this.mediaQuery.removeEventListener('change', this.handleMediaChange);
      } else if (typeof this.mediaQuery.removeListener === 'function') {
        this.mediaQuery.removeListener(this.handleMediaChange);
      }
    }

    this.clearTimers();
  }

  handlePointerEnter() {
    if (!this.mediaQuery.matches || this.images.length <= 1) return;

    this.clearTimers();
    this.hoverTimeout = window.setTimeout(() => {
      this.advance();
      this.cycleInterval = window.setInterval(() => this.advance(), this.delay);
    }, this.initialDelay);
  }

  handlePointerLeave() {
    this.clearTimers();
    this.showImage(0);
  }

  handleMediaChange(event) {
    if (event.matches) return;
    this.handlePointerLeave();
  }

  advance() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage(nextIndex);
  }

  showImage(index) {
    this.currentIndex = index;
    this.images.forEach((image, imageIndex) => {
      image.classList.toggle('is-active', imageIndex === index);
    });
  }

  clearTimers() {
    window.clearTimeout(this.hoverTimeout);
    window.clearInterval(this.cycleInterval);
    this.hoverTimeout = null;
    this.cycleInterval = null;
  }
}

if (!customElements.get('reef-hover-gallery')) {
  customElements.define('reef-hover-gallery', ReefHoverGallery);
}
