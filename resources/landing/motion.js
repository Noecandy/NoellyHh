/**
 * Motion graphics for the landing page. Pure DOM + requestAnimationFrame, no dependencies.
 * Everything degrades to a static page when the visitor prefers reduced motion.
 */

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (from, to, amount) => from + (to - from) * amount;

/** Splits an element's text into animated characters, keeping words unbreakable and readable by screen readers. */
export function splitText(element) {
    const text = element.textContent;
    const visual = document.createElement('span');
    let index = 0;

    visual.setAttribute('aria-hidden', 'true');
    visual.className = 'split';

    text.split(' ').forEach((word, wordIndex, words) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';

        [...word].forEach((character) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = character;
            charSpan.style.setProperty('--i', String(index++));
            wordSpan.append(charSpan);
        });

        visual.append(wordSpan);

        if (wordIndex < words.length - 1) {
            visual.append(' ');
        }
    });

    const label = document.createElement('span');
    label.className = 'sr-only';
    label.textContent = text;

    element.replaceChildren(label, visual);
}

/** Splits a paragraph into words that light up as the visitor scrolls through it. */
export function splitWords(element) {
    const text = element.textContent;
    const visual = document.createElement('span');

    visual.setAttribute('aria-hidden', 'true');
    text.split(' ').forEach((word, wordIndex) => {
        const span = document.createElement('span');
        span.className = 'fill-word';
        span.textContent = word;
        visual.append(span, wordIndex < text.split(' ').length - 1 ? ' ' : '');
    });

    const label = document.createElement('span');
    label.className = 'sr-only';
    label.textContent = text;

    element.replaceChildren(label, visual);
}

/** Prepares any text element that needs splitting after its content changed. */
export function prepareText(element) {
    if (element.hasAttribute('data-split')) {
        splitText(element);
    }

    if (element.hasAttribute('data-fill')) {
        splitWords(element);
    }
}

function startPreloader() {
    const finish = () => document.documentElement.classList.add('is-loaded');
    const minimumTime = prefersReducedMotion ? 0 : 1100;
    const started = performance.now();
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.race([fontsReady, new Promise((resolve) => setTimeout(resolve, 2500))]).then(() => {
        setTimeout(finish, Math.max(0, minimumTime - (performance.now() - started)));
    });
}

function observeReveals() {
    const elements = document.querySelectorAll('.reveal-on-scroll');

    if (!('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('is-visible'));

        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    elements.forEach((element, index) => {
        element.style.setProperty('--stagger', String(index % 4));
        observer.observe(element);
    });
}

function setupMagneticElements() {
    document.querySelectorAll('.magnetic').forEach((element) => {
        element.addEventListener('pointermove', (event) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            element.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        });

        element.addEventListener('pointerleave', () => {
            element.style.transform = '';
        });
    });
}

function setupCards() {
    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            card.style.setProperty('--mx', `${x * 100}%`);
            card.style.setProperty('--my', `${y * 100}%`);
            card.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
            card.style.setProperty('--ry', `${(x - 0.5) * 9}deg`);
        });

        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        });
    });
}

function setupCursor() {
    const cursor = document.querySelector('.cursor');

    if (!cursor) {
        return;
    }

    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPosition = { ...target };

    document.documentElement.classList.add('has-cursor');

    window.addEventListener('pointermove', (event) => {
        target.x = event.clientX;
        target.y = event.clientY;
        dot.style.transform = `translate(${target.x}px, ${target.y}px)`;
        cursor.classList.add('is-active');
    }, { passive: true });

    document.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));

    document.addEventListener('pointerover', (event) => {
        cursor.classList.toggle('is-hovering', Boolean(event.target.closest('a, button')));
    });

    const follow = () => {
        ringPosition.x = lerp(ringPosition.x, target.x, 0.18);
        ringPosition.y = lerp(ringPosition.y, target.y, 0.18);
        ring.style.transform = `translate(${ringPosition.x}px, ${ringPosition.y}px)`;
        requestAnimationFrame(follow);
    };

    follow();
}

function setupSparkleField() {
    const canvas = document.querySelector('.sparkle-field');
    const context = canvas?.getContext('2d');

    if (!context) {
        return;
    }

    const colors = ['#e3a2bf', '#d4b6e8', '#f2c6d6', '#c9a3d9', '#f0b8cc'];
    const pointer = { x: -9999, y: -9999 };
    let particles = [];
    let width = 0;
    let height = 0;
    let isVisible = true;

    const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        const count = Math.round(clamp((width * height) / 26000, 18, 60));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: 1 + Math.random() * 3.2,
            speed: 0.08 + Math.random() * 0.25,
            drift: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            isStar: Math.random() > 0.72,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
    };

    const drawStar = (x, y, size) => {
        context.beginPath();
        for (let point = 0; point < 8; point++) {
            const radius = point % 2 === 0 ? size * 2.4 : size * 0.55;
            const angle = (point * Math.PI) / 4;
            context.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
        }
        context.closePath();
        context.fill();
    };

    const draw = (time) => {
        context.clearRect(0, 0, width, height);

        particles.forEach((particle) => {
            if (!prefersReducedMotion) {
                particle.y -= particle.speed;
                particle.x += Math.sin(time / 2400 + particle.drift) * 0.18;

                const dx = particle.x - pointer.x;
                const dy = particle.y - pointer.y;
                const distance = Math.hypot(dx, dy);

                if (distance < 120) {
                    particle.x += (dx / distance) * 1.4;
                    particle.y += (dy / distance) * 1.4;
                }

                if (particle.y < -10) {
                    particle.y = height + 10;
                    particle.x = Math.random() * width;
                }
            }

            context.globalAlpha = 0.25 + (Math.sin(time / 700 + particle.phase) + 1) * 0.3;
            context.fillStyle = particle.color;

            if (particle.isStar) {
                drawStar(particle.x, particle.y, particle.size);
            } else {
                context.beginPath();
                context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                context.fill();
            }
        });

        if (!prefersReducedMotion && isVisible) {
            requestAnimationFrame(draw);
        }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        const wasVisible = isVisible;
        isVisible = document.visibilityState === 'visible';

        if (isVisible && !wasVisible && !prefersReducedMotion) {
            requestAnimationFrame(draw);
        }
    });

    requestAnimationFrame(draw);
}

/** Scroll-driven effects: progress bar, sticky header, tickers that react to scroll speed, parallax and text fill. */
function setupScrollEffects() {
    const root = document.documentElement;
    const topbar = document.querySelector('.topbar');
    const flower = document.querySelector('.heading-flower');
    const hero = document.querySelector('.hero');
    const heroArt = document.querySelector('.hero-art');
    const parallaxLayers = [...document.querySelectorAll('.parallax')];
    const tickers = [...document.querySelectorAll('.ticker')].map((ticker) => ({
        track: ticker.querySelector('.ticker-track'),
        direction: ticker.classList.contains('ticker-backward') ? 1 : -1,
        offset: 0,
    }));

    const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0 };
    let lastScroll = window.scrollY;
    let velocity = 0;

    if (hasFinePointer && hero) {
        hero.addEventListener('pointermove', (event) => {
            pointer.x = event.clientX / window.innerWidth - 0.5;
            pointer.y = event.clientY / window.innerHeight - 0.5;
        });
        hero.addEventListener('pointerleave', () => {
            pointer.x = 0;
            pointer.y = 0;
        });
    }

    const updateFill = () => {
        document.querySelectorAll('[data-fill]').forEach((element) => {
            const rect = element.getBoundingClientRect();
            const progress = clamp((window.innerHeight * 0.85 - rect.top) / (rect.height + window.innerHeight * 0.35), 0, 1);
            const words = element.querySelectorAll('.fill-word');
            const litCount = progress * words.length;

            words.forEach((word, index) => {
                word.style.setProperty('--fill', String(clamp(litCount - index, 0, 1)));
            });
        });
    };

    const tick = () => {
        const scroll = window.scrollY;
        const maxScroll = root.scrollHeight - window.innerHeight;

        velocity = lerp(velocity, scroll - lastScroll, 0.12);
        lastScroll = scroll;

        root.style.setProperty('--scroll-progress', String(maxScroll > 0 ? scroll / maxScroll : 0));
        topbar?.classList.toggle('is-scrolled', scroll > 24);

        if (!prefersReducedMotion) {
            pointer.smoothX = lerp(pointer.smoothX, pointer.x, 0.07);
            pointer.smoothY = lerp(pointer.smoothY, pointer.y, 0.07);

            parallaxLayers.forEach((layer) => {
                const depth = Number(layer.dataset.depth);
                layer.style.transform = `translate3d(${pointer.smoothX * depth * 28}px, ${pointer.smoothY * depth * 28 - scroll * depth * 0.06}px, 0)`;
            });

            if (heroArt) {
                heroArt.style.setProperty('--hero-scroll', String(Math.min(scroll / window.innerHeight, 1)));
            }

            const speed = 0.6 + Math.min(Math.abs(velocity) * 0.35, 12);

            tickers.forEach((ticker) => {
                const loopWidth = ticker.track.scrollWidth / 2;

                if (loopWidth > 0) {
                    ticker.offset = (ticker.offset + speed * ticker.direction) % loopWidth;
                    const position = ticker.direction < 0 ? ticker.offset : ticker.offset - loopWidth;
                    ticker.track.style.transform = `translate3d(${position}px, 0, 0) skewX(${clamp(-velocity * 0.4, -10, 10)}deg)`;
                }
            });

            if (flower) {
                flower.style.transform = `rotate(${scroll * 0.25}deg)`;
            }
        }

        updateFill();
        requestAnimationFrame(tick);
    };

    tick();
}

function indexAnimatedBars() {
    document.querySelectorAll('.waveform, .equalizer, .art-wave').forEach((group) => {
        [...group.children].forEach((bar, index) => bar.style.setProperty('--i', String(index)));
    });
}

export function startMotion() {
    indexAnimatedBars();
    startPreloader();
    observeReveals();
    setupScrollEffects();
    setupSparkleField();

    if (prefersReducedMotion) {
        return;
    }

    setupCards();

    if (hasFinePointer) {
        setupMagneticElements();
        setupCursor();
    }
}
