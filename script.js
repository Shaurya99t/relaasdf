const CONFIG = {
  demoMode: true,
  girlfriendName: "HER NAME",
  nickname: "Jaan Bacha",
  relationshipStart: "2021-09-09",
  birthday: "2026-09-09",
  anniversaryYears: 5,
  currentYear: 6,
  assets: {
    birthday: "assets/photos/photo-01.jpg",
    year2021: "assets/photos/photo-02.jpg",
    year2022: "assets/photos/photo-03.jpg",
    year2023: "assets/photos/photo-04.jpg",
    year2024: "assets/photos/photo-05.jpg",
    year2025: "assets/photos/photo-06.jpg",
    year2026: "assets/photos/photo-07.jpg",
    story01: "assets/photos/photo-18.jpg",
    story02: "assets/photos/photo-19.jpg",
    story03: "assets/photos/photo-20.jpg"
  },
  playlist: [
    { title: "Andaz E Karam", src: "assets/music/Andaz E Karam.mp3" },
    { title: "Jaane Meriye", src: "assets/music/jaane_meriye.mp3" },
    { title: "Kasam Ki Kasam", src: "assets/music/kasam_ki_kasam.mp3" },
    { title: "Romantic", src: "assets/music/romantic.mp3" }
  ],
  demoAssets: {
    birthday: "assets/demo/demo-birthday.svg",
    year2021: "assets/demo/demo-year-2021.svg",
    year2022: "assets/demo/demo-year-2022.svg",
    year2023: "assets/demo/demo-year-2023.svg",
    year2024: "assets/demo/demo-year-2024.svg",
    year2025: "assets/demo/demo-year-2025.svg",
    year2026: "assets/demo/demo-year-2026.svg",
    story01: "assets/demo/demo-story-01.svg",
    story02: "assets/demo/demo-story-02.svg",
    story03: "assets/demo/demo-story-03.svg"
  },
  memories: [
    ["photo-08.jpg", "the kind of ordinary", "One of those ordinary days that became a favourite memory.", "A day that did not know it was going to stay with me."],
    ["photo-09.jpg", "our favourite detours", "Somewhere we did not plan to go.", "The best parts of us have always had a little room for getting lost."],
    ["photo-10.jpg", "laughing too much", "The joke was probably not even that funny.", "But we were there, and that made it enough."],
    ["photo-11.jpg", "just us", "A small moment, kept forever.", "The kind of quiet that feels comfortable because it is ours."],
    ["photo-12.jpg", "another little adventure", "A day I would happily do all over again.", "Five years of proof that plans are optional when I am with you."],
    ["photo-13.jpg", "my favourite person", "Somehow, you make every place feel familiar.", "Even the days that start messy find their way back to us."],
    ["photo-14.jpg", "the in-between moments", "Not a big occasion. Still completely special.", "This is the stuff I hope we never stop noticing."],
    ["photo-15.jpg", "one for the memory box", "A frame from the life we are making.", "I like this version of us: happy, imperfect, together."],
    ["photo-16.jpg", "still choosing you", "Five years later, the answer is still easy.", "You. On the easy days and the difficult ones too."],
    ["photo-17.jpg", "the next page", "A memory waiting to happen.", "Year 6 has plenty of blank space for us to fill." ]
  ],
  notes: [
    "I love how comfortable I feel being completely myself around you.",
    "I love that you're the first person I want to tell when something good happens.",
    "I love our completely stupid conversations that somehow become the best part of my day.",
    "I love the little things you do that you probably don't even realise I notice.",
    "You're not just someone I love. You're the person I want to share my everyday life with.",
    "And yes, jaan bacha... I even love you when you're annoying me. 😂❤️",
    "Jaan bacha, thank you for being my favourite person. After 5 years, I'd still choose you."
  ],
  stories: [
    ["story01", "Sometimes we're just like this.", "Bas ek table, do drinks aur bohot saari random baatein. Honestly, tumhare saath ordinary moments bhi thode special lagte hain."],
    ["story02", "Sometimes you're scolding me. 😂", "You're probably right. Main bas maan nahi raha hoon. jaan bacha being jaan bacha ❤️"],
    ["story03", "Sometimes, it's just us.", "Nothing fancy. Nothing planned. Bas tum saamne ho, aur somehow that's enough."]
  ]
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const imagePath = (key) => CONFIG.assets[key] || key;
const demoImagePath = (key) => CONFIG.demoAssets[key] || "assets/demo/demo-memory-01.svg";

function setImageWithFallback(frame, realPath, demoPath, alt) {
  let image = $('img', frame);
  if (!image) {
    image = document.createElement('img');
    image.loading = 'lazy';
    frame.prepend(image);
  }
  image.alt = alt;
  frame.classList.remove('is-demo', 'image-missing');
  if (frame._imageErrorHandler) image.removeEventListener('error', frame._imageErrorHandler);
  let usingDemo = false;
  const markDemo = () => {
    frame.classList.add('is-demo');
    if (!$('.demo-label', frame)) {
      const label = document.createElement('span');
      label.className = 'demo-label';
      label.textContent = 'demo artwork · replace with your memory';
      frame.append(label);
    }
  };
  const showDemo = () => {
    if (usingDemo) {
      frame.classList.add('image-missing');
      image.removeAttribute('src');
      return;
    }
    usingDemo = true;
    markDemo();
    image.src = demoPath;
  };
  frame._imageErrorHandler = showDemo;
  image.addEventListener('error', showDemo);
  image.src = realPath || demoPath;
  if (!realPath) { usingDemo = true; markDemo(); image.src = demoPath; }
}

function hydrateImages() {
  $$('[data-image]').forEach((frame) => {
    const key = frame.dataset.image;
    const img = $('[data-image-src]', frame);
    if (!img) return;
    setImageWithFallback(frame, imagePath(key), demoImagePath(key), img.alt || key);
  });
}

function createMemoryCards() {
  const grid = $('#memoryGrid');
  CONFIG.memories.forEach(([file, title, text, caption], index) => {
    const card = document.createElement('button');
    card.className = 'photo-card reveal';
    card.type = 'button';
    card.dataset.memoryIndex = index;
    card.setAttribute('aria-label', `Open memory: ${title}`);
    card.innerHTML = `<div class="image-frame"><img src="${`assets/photos/${file}`}" alt="${title}" loading="lazy"><span class="image-placeholder">memory ${String(index + 1).padStart(2, '0')}<br>goes here</span></div><div class="memory-copy"><span class="memory-date">memory ${String(index + 1).padStart(2, '0')} · our story</span><h3>${title}</h3><p>${text}</p></div>`;
    const img = $('img', card);
    img.addEventListener('error', () => {
      $('.image-frame', card).classList.add('image-missing');
      img.removeAttribute('src');
    }, { once: true });
    card.addEventListener('click', () => openLightbox(index));
    grid.append(card);
  });
}

function createStoryCards() {
  const grid = $('#storyGrid');
  CONFIG.stories.forEach(([key, title, description], index) => {
    const card = document.createElement('article');
    card.className = 'story-card reveal';
    card.innerHTML = `<div class="story-image image-frame" data-image="${key}"><img data-image-src alt="${title}" loading="lazy"><span class="image-placeholder">story ${String(index + 1).padStart(2, '0')}<br>goes here</span></div><div class="story-copy"><small>story ${String(index + 1).padStart(2, '0')} · us</small><h3>${title}</h3><p>${description}</p></div>`;
    grid.append(card);
  });
}

function createNoteCards() {
  const grid = $('#notesGrid');
  CONFIG.notes.forEach((message, index) => {
    const card = document.createElement('button');
    card.className = 'note-card reveal';
    card.type = 'button';
    card.setAttribute('aria-expanded', 'false');
    card.innerHTML = `<span class="note-inner"><span class="note-front"><span>Open this ♥</span><span>note 0${index + 1}</span></span><span class="note-back">${message}</span></span>`;
    card.addEventListener('click', () => {
      const open = card.classList.toggle('is-open');
      card.setAttribute('aria-expanded', String(open));
    });
    grid.append(card);
  });
}

let lightboxIndex = 0;
function openLightbox(index) {
  lightboxIndex = index;
  renderLightbox();
  const lightbox = $('#lightbox');
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  $('#lightboxClose').focus();
}
function renderLightbox() {
  const [file, title, text, caption] = CONFIG.memories[lightboxIndex];
  const image = $('#lightboxImage');
  const frame = $('.lightbox-image');
  frame.classList.remove('image-missing');
  const memoryNumber = String((lightboxIndex % 6) + 1).padStart(2, '0');
  setImageWithFallback(frame, `assets/photos/${file}`, `assets/demo/demo-memory-${memoryNumber}.svg`, title);
  $('#lightboxDate').textContent = caption;
  $('#lightboxTitle').textContent = title;
  $('#lightboxText').textContent = text;
}
function closeLightbox() {
  $('#lightbox').classList.remove('is-open');
  $('#lightbox').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}
function moveLightbox(direction) {
  lightboxIndex = (lightboxIndex + direction + CONFIG.memories.length) % CONFIG.memories.length;
  renderLightbox();
}

function spawnHearts(count = 18, origin = null) {
  const x = origin?.clientX ?? window.innerWidth / 2;
  const y = origin?.clientY ?? window.innerHeight / 2;
  for (let index = 0; index < count; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-burst';
    heart.textContent = index % 3 === 0 ? '✦' : '♥';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--x', `${(Math.random() - .5) * 230}px`);
    heart.style.setProperty('--y', `${-70 - Math.random() * 210}px`);
    heart.style.animationDelay = `${Math.random() * .22}s`;
    document.body.append(heart);
    window.setTimeout(() => heart.remove(), 2200);
  }
}

function setupOpening() {
  const opening = $('#opening-screen');
  const story = $('#story');
  $('#openHeart').addEventListener('click', (event) => {
    opening.classList.add('is-open');
    document.body.classList.remove('is-locked');
    story.setAttribute('aria-hidden', 'false');
    $('#siteNav').classList.add('is-visible');
    spawnHearts(prefersReducedMotion ? 5 : 28, event);
  }, { once: true });
}

const audio = $('#ourSong');
function formatTime(seconds) { if (!Number.isFinite(seconds)) return '0:00'; return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`; }

const demoAudio = { active: false, playing: false, context: null, timer: null, interval: null, startedAt: 0, duration: 24 };
function startDemoMelody() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) { showToast('Your browser cannot play the demo melody.'); return; }
  demoAudio.context ||= new AudioContextClass();
  demoAudio.context.resume();
  demoAudio.playing = true;
  demoAudio.startedAt = performance.now() / 1000;
  $('#musicToggle') && ($('#musicToggle').textContent = 'Ⅱ');
  $('#player')?.classList.add('is-playing');
  scheduleDemoMelody();
  demoAudio.interval = window.setInterval(() => {
    const elapsed = (performance.now() / 1000) - demoAudio.startedAt;
    if ($('#musicProgress')) $('#musicProgress').value = Math.min(100, (elapsed / demoAudio.duration) * 100);
    if ($('#musicCurrent')) $('#musicCurrent').textContent = formatTime(Math.min(elapsed, demoAudio.duration));
    if ($('#progressRange')) $('#progressRange').value = Math.min(100, (elapsed / demoAudio.duration) * 100);
    if ($('#currentTime')) $('#currentTime').textContent = formatTime(Math.min(elapsed, demoAudio.duration));
  }, 120);
}
function scheduleDemoMelody() {
  if (!demoAudio.playing) return;
  const notes = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23, 261.63, 329.63, 392, 493.88, 440, 392, 329.63, 261.63];
  const start = demoAudio.context.currentTime + .08;
  notes.forEach((frequency, index) => {
    const oscillator = demoAudio.context.createOscillator();
    const gain = demoAudio.context.createGain();
    const time = start + index * 1.2;
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.055, time + .06);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.05);
    oscillator.connect(gain).connect(demoAudio.context.destination);
    oscillator.start(time);
    oscillator.stop(time + 1.1);
  });
  demoAudio.timer = window.setTimeout(() => { if (demoAudio.playing) { demoAudio.startedAt = performance.now() / 1000; scheduleDemoMelody(); } }, demoAudio.duration * 1000);
}
function stopDemoMelody() {
  demoAudio.playing = false;
  window.clearTimeout(demoAudio.timer);
  window.clearInterval(demoAudio.interval);
  if ($('#musicToggle')) $('#musicToggle').textContent = '▶';
  $('#player')?.classList.remove('is-playing');
}

function setupPlayer() {
  if (!audio || !CONFIG.playlist?.length) return;
  const state = { index: 0, started: false, demo: false };
  const top = {
    title: $('#musicTitle'), position: $('#musicPosition'), toggle: $('#musicToggle'), prev: $('#musicPrev'), next: $('#musicNext'),
    progress: $('#musicProgress'), current: $('#musicCurrent'), duration: $('#musicDuration'),
    volume: $('#musicVolume'), prompt: $('#musicAutoplayPrompt')
  };
  const modulo = (value, total) => (value + total) % total;
  const syncLegacy = (current, duration, playing) => {
    if ($('#playerStatus')) $('#playerStatus').textContent = state.demo ? 'Demo melody' : CONFIG.playlist[state.index].title;
    if ($('#duration')) $('#duration').textContent = formatTime(duration);
    if ($('#currentTime')) $('#currentTime').textContent = formatTime(current);
    if ($('#progressRange')) $('#progressRange').value = duration ? (current / duration) * 100 : 0;
    if ($('#playButton')) $('#playButton').textContent = playing ? 'Ⅱ' : '▶';
    $('#player')?.classList.toggle('is-playing', playing);
  };
  const showPrompt = (visible) => { if (top.prompt) top.prompt.hidden = !visible; };
  const renderSong = () => {
    const item = CONFIG.playlist[state.index];
    top.title.textContent = item.title;
    top.position.textContent = `${String(state.index + 1).padStart(2, '0')} / ${String(CONFIG.playlist.length).padStart(2, '0')}`;
    top.current.textContent = '0:00';
    top.duration.textContent = '0:00';
    top.progress.value = 0;
    audio.src = item.src;
    audio.load();
  };
  const playCurrent = () => {
    state.started = true;
    if (state.demo) { startDemoMelody(); return; }
    const result = audio.play();
    result?.catch(() => showPrompt(true));
  };
  const selectSong = (nextIndex, autoPlay = state.started) => {
    if (state.demo) stopDemoMelody();
    audio.pause();
    audio.currentTime = 0;
    state.demo = false;
    state.index = modulo(nextIndex, CONFIG.playlist.length);
    renderSong();
    if (autoPlay) playCurrent();
  };
  top.prev.addEventListener('click', () => selectSong(state.index - 1));
  top.next.addEventListener('click', () => selectSong(state.index + 1));
  top.toggle.addEventListener('click', () => audio.paused ? playCurrent() : audio.pause());
  top.prompt.addEventListener('click', playCurrent);
  top.progress.addEventListener('input', (event) => { if (audio.duration) audio.currentTime = (event.target.value / 100) * audio.duration; });
  top.volume.addEventListener('input', (event) => { audio.volume = Number(event.target.value); });
  audio.volume = Number(top.volume.value);
  audio.addEventListener('loadedmetadata', () => {
    if (state.demo) return;
    top.duration.textContent = formatTime(audio.duration);
    syncLegacy(audio.currentTime, audio.duration, !audio.paused);
  });
  audio.addEventListener('timeupdate', () => {
    if (state.demo || !audio.duration) return;
    top.progress.value = (audio.currentTime / audio.duration) * 100;
    top.current.textContent = formatTime(audio.currentTime);
    syncLegacy(audio.currentTime, audio.duration, !audio.paused);
  });
  audio.addEventListener('play', () => { showPrompt(false); top.toggle.textContent = 'Ⅱ'; top.toggle.setAttribute('aria-label', `Pause ${CONFIG.playlist[state.index].title}`); syncLegacy(audio.currentTime, audio.duration, true); });
  audio.addEventListener('pause', () => { top.toggle.textContent = '▶'; top.toggle.setAttribute('aria-label', `Play ${CONFIG.playlist[state.index].title}`); syncLegacy(audio.currentTime, audio.duration, false); });
  audio.addEventListener('ended', () => selectSong(state.index + 1, true));
  audio.addEventListener('error', () => { state.demo = true; top.title.textContent = 'Demo melody · replace anytime'; top.duration.textContent = formatTime(demoAudio.duration); showPrompt(true); });
  renderSong();
  const autoplay = audio.play();
  autoplay?.catch(() => showPrompt(true));
  window.addEventListener('pointerdown', () => { if (audio.paused && !state.started) playCurrent(); }, { once: true, passive: true });
}

function setupSecret() {
  $('#openSecret').addEventListener('click', (event) => {
    $('#secretCard').classList.add('is-open');
    spawnHearts(prefersReducedMotion ? 4 : 16, event);
  });
}
function setupWish() {
  const wishCopy = $('.wish-copy');
  if (wishCopy) wishCopy.insertAdjacentHTML('beforeend', '<p class="wish-after">Ab bas wish ye hai ki main tumhare saath bohot saare birthdays celebrate karun.</p>');
  $('#wishButton').addEventListener('click', (event) => {
    $('#wishCard')?.classList.add('is-wished');
    $('.wish-card').classList.add('is-wished');
    $('#wishResult').textContent = 'Wish made. ♥';
    spawnHearts(prefersReducedMotion ? 5 : 22, event);
  });
}
function setupLightbox() {
  $('#lightboxClose').addEventListener('click', closeLightbox);
  $('#lightboxPrev').addEventListener('click', () => moveLightbox(-1));
  $('#lightboxNext').addEventListener('click', () => moveLightbox(1));
  $('#lightbox').addEventListener('click', (event) => { if (event.target === $('#lightbox')) closeLightbox(); });
  document.addEventListener('keydown', (event) => {
    if (!$('#lightbox').classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });
  let startX = 0;
  $('#lightbox').addEventListener('touchstart', (event) => { startX = event.changedTouches[0].screenX; }, { passive: true });
  $('#lightbox').addEventListener('touchend', (event) => { const delta = event.changedTouches[0].screenX - startX; if (Math.abs(delta) > 45) moveLightbox(delta > 0 ? -1 : 1); }, { passive: true });
}

function setupReveal() {
  const items = $$('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  items.forEach((item) => observer.observe(item));
  window.setTimeout(() => items.forEach((item) => item.classList.add('is-visible')), 1800);
}
function setupProgress() {
  const progress = $('#storyProgress');
  const update = () => { const scrollable = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${scrollable ? (window.scrollY / scrollable) * 100 : 0}%`; };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
function setupReplay() {
  const replay = () => { closeLightbox(); window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }); };
  $('#navReplay').addEventListener('click', replay);
  $('#finalReplay').addEventListener('click', replay);
}
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible'); window.setTimeout(() => toast.classList.remove('is-visible'), 2800); }

// Shared scrapbook deck: native scroll-snap handles touch, while the small pointer
// drag layer makes the same cards feel natural with a mouse on desktop.
function buildSwipeDeckLegacy(target, items, renderCard, label) {
  target.classList.add('swipe-deck', 'reveal');
  target.setAttribute('tabindex', '0');
  target.setAttribute('aria-label', label);
  target.innerHTML = '<div class="deck-viewport"><div class="deck-track"></div></div><div class="deck-controls"><button class="deck-arrow" data-direction="prev" type="button" aria-label="Previous card">←</button><span class="deck-count">01 / 01</span><button class="deck-arrow" data-direction="next" type="button" aria-label="Next card">→</button></div><div class="deck-dots"></div>';
  const viewport = $('.deck-viewport', target);
  const track = $('.deck-track', target);
  const count = $('.deck-count', target);
  const dots = $('.deck-dots', target);
  items.forEach((item, index) => track.append(renderCard(item, index)));
  items.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'deck-dot';
    dot.setAttribute('aria-label', `Go to card ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dots.append(dot);
  });
  let active = 0;
  let dragging = false;
  let dragStart = 0;
  let scrollStart = 0;
  let moved = false;
  const cards = () => $$('.deck-card', track);
  const update = () => {
    const cardList = cards();
    if (!cardList.length) return;
    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    active = cardList.reduce((closest, card, index) => Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) < Math.abs(cardList[closest].offsetLeft + cardList[closest].offsetWidth / 2 - center) ? index : closest, 0);
    count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cardList.length).padStart(2, '0')}`;
    cardList.forEach((card, index) => card.classList.toggle('is-active', index === active));
    $$('.deck-dot', target).forEach((dot, index) => dot.classList.toggle('is-active', index === active));
  };
  function goTo(index) {
    const card = cards()[Math.max(0, Math.min(index, cards().length - 1))];
    if (!card) return;
    viewport.scrollTo({ left: card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    window.setTimeout(update, prefersReducedMotion ? 0 : 250);
  }
  viewport.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true });
  viewport.addEventListener('pointerdown', (event) => { if (event.pointerType === 'mouse') { dragging = true; moved = false; dragStart = event.clientX; scrollStart = viewport.scrollLeft; viewport.classList.add('is-dragging'); viewport.setPointerCapture(event.pointerId); } });
  viewport.addEventListener('pointermove', (event) => { if (!dragging) return; const delta = event.clientX - dragStart; if (Math.abs(delta) > 4) moved = true; viewport.scrollLeft = scrollStart - delta; });
  const finishDrag = () => { if (!dragging) return; dragging = false; viewport.classList.remove('is-dragging'); if (moved) goTo(active + (viewport.scrollLeft < scrollStart ? 1 : -1)); };
  viewport.addEventListener('pointerup', finishDrag);
  viewport.addEventListener('pointercancel', finishDrag);
  viewport.addEventListener('click', (event) => { if (moved) { event.preventDefault(); event.stopPropagation(); moved = false; } }, true);
  $$('.deck-arrow', target).forEach((button) => button.addEventListener('click', () => goTo(active + (button.dataset.direction === 'next' ? 1 : -1))));
  target.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') { event.preventDefault(); goTo(active + 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(active - 1); } });
  window.requestAnimationFrame(() => { update(); goTo(0); });
  return { goTo };
}

// Circular deck implementation. The logical index wraps forever; cards are
// positioned by their relative distance from the active card.
function buildSwipeDeckThreeCardLegacy(target, items, renderCard, label) {
  target.classList.add('swipe-deck', 'reveal');
  target.setAttribute('tabindex', '0');
  target.setAttribute('aria-label', label);
  target.innerHTML = '<div class="deck-viewport"><div class="deck-track"></div></div><div class="deck-controls"><button class="deck-arrow" data-direction="prev" type="button" aria-label="Previous card">←</button><span class="deck-count">01 / 01</span><button class="deck-arrow" data-direction="next" type="button" aria-label="Next card">→</button></div><div class="deck-dots"></div><p class="deck-hint" aria-hidden="true">← swipe to explore →</p>';
  const viewport = $('.deck-viewport', target);
  const track = $('.deck-track', target);
  const count = $('.deck-count', target);
  const dots = $('.deck-dots', target);
  items.forEach((item, index) => track.append(renderCard(item, index)));
  let currentIndex = 0;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerDelta = 0;
  let pointerActive = false;
  let horizontalDrag = false;
  let suppressClick = false;
  const cards = () => $$('.deck-card', track);
  const modulo = (value) => (value + items.length) % items.length;
  const relativeIndex = (index) => {
    let distance = (index - currentIndex + items.length) % items.length;
    if (distance > items.length / 2) distance -= items.length;
    return distance;
  };
  items.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'deck-dot';
    dot.setAttribute('aria-label', `Go to card ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dots.append(dot);
  });
  const update = (dragOffset = 0) => {
    const cardList = cards();
    if (!cardList.length) return;
    const cardWidth = cardList[0].getBoundingClientRect().width || viewport.clientWidth * .86;
    const gap = 18;
    count.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(cardList.length).padStart(2, '0')}`;
    cardList.forEach((card, index) => {
      const distance = relativeIndex(index);
      const visible = Math.abs(distance) <= 1;
      const scale = distance === 0 ? 1 : .88;
      const opacity = distance === 0 ? 1 : visible ? .45 : 0;
      card.style.visibility = visible ? 'visible' : 'hidden';
      card.style.opacity = String(opacity);
      card.style.transform = `translate3d(calc(-50% + ${(distance * (cardWidth + gap)) + dragOffset}px), 0, 0) scale(${scale}) rotate(${distance === 0 ? 0 : distance > 0 ? .55 : -.55}deg)`;
      card.classList.toggle('is-active', index === currentIndex);
      card.tabIndex = index === currentIndex ? 0 : -1;
      card.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
    });
    $$('.deck-dot', target).forEach((dot, index) => dot.classList.toggle('is-active', index === currentIndex));
  };
  function goTo(index) {
    currentIndex = modulo(index);
    target.classList.add('has-interacted');
    update();
  }
  viewport.addEventListener('pointerdown', (event) => {
    pointerActive = true;
    horizontalDrag = false;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerDelta = 0;
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!pointerActive) return;
    const dx = event.clientX - pointerStartX;
    const dy = event.clientY - pointerStartY;
    if (!horizontalDrag && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { horizontalDrag = true; suppressClick = true; }
    if (!horizontalDrag) return;
    event.preventDefault();
    pointerDelta = dx;
    update(pointerDelta);
  });
  const finishPointer = () => {
    if (!pointerActive) return;
    pointerActive = false;
    if (horizontalDrag && Math.abs(pointerDelta) >= 50) goTo(currentIndex + (pointerDelta < 0 ? 1 : -1));
    else update();
    horizontalDrag = false;
    pointerDelta = 0;
    window.setTimeout(() => { suppressClick = false; }, 500);
  };
  viewport.addEventListener('pointerup', finishPointer);
  viewport.addEventListener('pointercancel', finishPointer);
  viewport.addEventListener('click', (event) => { if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; } }, true);
  $$('.deck-arrow', target).forEach((button) => button.addEventListener('click', () => goTo(currentIndex + (button.dataset.direction === 'next' ? 1 : -1))));
  target.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') { event.preventDefault(); goTo(currentIndex + 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(currentIndex - 1); } });
  window.addEventListener('resize', () => update(), { passive: true });
  window.requestAnimationFrame(() => update());
  return { goTo };
}

function buildSwipeDeckBroken(target, items, renderCard, label) {
  target.classList.add('swipe-deck', 'reveal');
  target.setAttribute('tabindex', '0');
  target.setAttribute('aria-label', label);
  target.innerHTML = '<div class="deck-viewport"><div class="deck-track"></div></div><div class="deck-controls"><button class="deck-arrow" data-direction="prev" type="button" aria-label="Previous card">←</button><span class="deck-count">01 / 01</span><button class="deck-arrow" data-direction="next" type="button" aria-label="Next card">→</button></div><div class="deck-dots"></div><p class="deck-hint" aria-hidden="true">← swipe to explore →</p>';
  const viewport = $('.deck-viewport', target);
  const track = $('.deck-track', target);
  const count = $('.deck-count', target);
  const dots = $('.deck-dots', target);
  let currentIndex = 0;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerDelta = 0;
  let pointerActive = false;
  let horizontalDrag = false;
  let suppressClick = false;
  let moving = false;
  let queuedSteps = 0;
  let queuedTarget = null;
  const modulo = (index) => (index + items.length) % items.length;
  const slotFor = (index) => ({ prev: modulo(index - 1), active: index, next: modulo(index + 1) });
  const cards = () => $$('.deck-card', track);
  const offsetForSlot = (slot) => slot === 'prev' ? -1 : slot === 'next' ? 1 : 0;
  const cardTransform = (offset, dragOffset = 0) => {
    const card = cards()[0];
    const width = card?.getBoundingClientRect().width || Math.min(window.innerWidth * .88, 620);
    const gap = window.innerWidth < 700 ? 14 : 22;
    const scale = offset === 0 ? 1 : .88;
    const angle = offset === 0 ? 0 : offset < 0 ? -.55 : .55;
    return `translate3d(calc(-50% + ${(offset * (width + gap)) + dragOffset}px),0,0) scale(${scale}) rotate(${angle}deg)`;
  };
  const applyCardPosition = (card, offset, dragOffset = 0, animate = true) => {
    card.style.transition = animate && !prefersReducedMotion ? '' : 'none';
    card.style.transform = cardTransform(offset, dragOffset);
    card.style.opacity = offset === 0 ? '1' : '.48';
    card.style.visibility = Math.abs(offset) <= 1 ? 'visible' : 'hidden';
    card.style.zIndex = offset === 0 ? '3' : '1';
  };
  const updateMeta = () => {
    count.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    $$('.deck-dot', target).forEach((dot, index) => dot.classList.toggle('is-active', index === currentIndex));
  };
  const renderVisible = () => {
    track.innerHTML = '';
    const indices = slotFor(currentIndex);
    Object.entries(indices).forEach(([slot, itemIndex]) => {
      const card = renderCard(items[itemIndex], itemIndex);
      card.classList.add('deck-card', `deck-slot-${slot}`);
      card.dataset.cardIndex = String(itemIndex);
      card.dataset.slot = slot;
      card.tabIndex = slot === 'active' ? 0 : -1;
      card.setAttribute('aria-hidden', slot === 'active' ? 'false' : 'true');
      track.append(card);
    });
    cards().forEach((card) => applyCardPosition(card, offsetForSlot(card.dataset.slot), 0, false));
    updateMeta();
  };
  const markInteracted = () => target.classList.add('has-interacted');
  const finishMove = (nextIndex) => {
    currentIndex = modulo(nextIndex);
    renderVisible();
    moving = false;
  };
  const goTo = (nextIndex, direction = 0) => {
    if (!items.length) return;
    if (moving) {
      if (direction) queuedSteps += direction;
      else queuedTarget = modulo(nextIndex);
      return;
    }
    markInteracted();
    const targetIndex = modulo(nextIndex);
    if (!direction || prefersReducedMotion) { finishMove(targetIndex); return; }
    moving = true;
    const shift = direction > 0 ? -1 : 1;
    cards().forEach((card) => {
      const nextOffset = offsetForSlot(card.dataset.slot) + shift;
      applyCardPosition(card, nextOffset, 0, true);
    });
    window.setTimeout(() => {
      finishMove(targetIndex);
      if (queuedTarget !== null) {
        const targetToVisit = queuedTarget;
        queuedTarget = null;
        queuedSteps = 0;
        goTo(targetToVisit);
      } else if (queuedSteps) {
        const step = queuedSteps > 0 ? 1 : -1;
        queuedSteps -= step;
        goTo(currentIndex + step, step);
      }
    }, prefersReducedMotion ? 0 : 480);
  };
  items.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'deck-dot';
    dot.setAttribute('aria-label', `Go to card ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dots.append(dot);
  });
  const dragUpdate = () => cards().forEach((card) => applyCardPosition(card, offsetForSlot(card.dataset.slot), pointerDelta, false));
  viewport.addEventListener('pointerdown', (event) => {
    if (moving) return;
    pointerActive = true;
    horizontalDrag = false;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerDelta = 0;
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!pointerActive) return;
    const dx = event.clientX - pointerStartX;
    const dy = event.clientY - pointerStartY;
    if (!horizontalDrag && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { horizontalDrag = true; suppressClick = true; }
    if (!horizontalDrag) return;
    event.preventDefault();
    pointerDelta = dx;
    dragUpdate();
  });
  const finishPointer = () => {
    if (!pointerActive) return;
    pointerActive = false;
    if (horizontalDrag && Math.abs(pointerDelta) >= 50) goTo(currentIndex + (pointerDelta < 0 ? 1 : -1), pointerDelta < 0 ? 1 : -1);
    else cards().forEach((card) => applyCardPosition(card, offsetForSlot(card.dataset.slot), 0, true));
    horizontalDrag = false;
    pointerDelta = 0;
    window.setTimeout(() => { suppressClick = false; }, 500);
  };
  viewport.addEventListener('pointerup', finishPointer);
  viewport.addEventListener('pointercancel', finishPointer);
  viewport.addEventListener('click', (event) => { if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; } }, true);
  $$('.deck-arrow', target).forEach((button) => button.addEventListener('click', () => goTo(currentIndex + (button.dataset.direction === 'next' ? 1 : -1), button.dataset.direction === 'next' ? 1 : -1)));
  target.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') { event.preventDefault(); goTo(currentIndex + 1, 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(currentIndex - 1, -1); } });
  window.addEventListener('resize', () => { if (!moving) cards().forEach((card) => applyCardPosition(card, offsetForSlot(card.dataset.slot), 0, false)); });
  renderVisible();
  return { goTo };
}

function buildSwipeDeck(target, items, renderCard, label) {
  if (!target) {
    console.error(`Carousel container not found: ${label}`);
    return { goTo: () => {} };
  }
  if (!Array.isArray(items) || !items.length) {
    console.error(`Carousel has no cards: ${label}`);
    return { goTo: () => {} };
  }
  target.classList.add('swipe-deck', 'simple-deck', 'reveal', 'is-visible');
  target.setAttribute('tabindex', '0');
  target.setAttribute('aria-label', label);
  target.style.opacity = '1';
  target.style.visibility = 'visible';
  target.style.transform = 'none';
  target.innerHTML = '<div class="deck-viewport"><div class="deck-track"></div></div><div class="deck-controls"><button class="deck-arrow" data-direction="prev" type="button" aria-label="Previous card">←</button><span class="deck-count"></span><button class="deck-arrow" data-direction="next" type="button" aria-label="Next card">→</button></div><div class="deck-dots"></div><p class="deck-hint" aria-hidden="true">← swipe to explore →</p>';
  const viewport = $('.deck-viewport', target);
  const track = $('.deck-track', target);
  const count = $('.deck-count', target);
  const dots = $('.deck-dots', target);
  let currentIndex = 0;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerActive = false;
  let horizontalDrag = false;
  const modulo = (value) => (value + items.length) % items.length;

  items.forEach((item, index) => {
    const card = renderCard(item, index);
    if (!card) return;
    card.classList.add('deck-card');
    card.dataset.cardIndex = String(index);
    card.tabIndex = index === 0 ? 0 : -1;
    card.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    track.append(card);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'deck-dot';
    dot.setAttribute('aria-label', `Go to card ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dots.append(dot);
  });
  const renderedCards = $$('.deck-card', track);
  if (!renderedCards.length) {
    console.error(`Carousel rendered zero cards: ${label}`);
    return { goTo: () => {} };
  }
  const update = () => {
    renderedCards.forEach((card, index) => {
      const active = index === currentIndex;
      card.classList.toggle('is-active', active);
      card.style.display = active ? 'block' : 'none';
      card.style.opacity = active ? '1' : '0';
      card.style.visibility = active ? 'visible' : 'hidden';
      card.style.transform = 'none';
      card.tabIndex = active ? 0 : -1;
      card.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    count.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    $$('.deck-dot', target).forEach((dot, index) => dot.classList.toggle('is-active', index === currentIndex));
  };
  function goTo(index) {
    currentIndex = modulo(index);
    target.classList.add('has-interacted');
    update();
  }
  const finishPointer = (event) => {
    if (!pointerActive) return;
    pointerActive = false;
    const dx = event.clientX - pointerStartX;
    if (horizontalDrag && Math.abs(dx) >= 50) goTo(currentIndex + (dx < 0 ? 1 : -1));
    horizontalDrag = false;
  };
  viewport.addEventListener('pointerdown', (event) => {
    pointerActive = true;
    horizontalDrag = false;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    viewport.setPointerCapture?.(event.pointerId);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!pointerActive) return;
    const dx = event.clientX - pointerStartX;
    const dy = event.clientY - pointerStartY;
    if (!horizontalDrag && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) horizontalDrag = true;
    if (horizontalDrag) event.preventDefault();
  });
  viewport.addEventListener('pointerup', finishPointer);
  viewport.addEventListener('pointercancel', finishPointer);
  $$('.deck-arrow', target).forEach((button) => button.addEventListener('click', () => goTo(currentIndex + (button.dataset.direction === 'next' ? 1 : -1))));
  target.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(currentIndex + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(currentIndex - 1); }
  });
  update();
  return { goTo };
}

function imageCard(path, alt, placeholder, className = '') {
  const frame = document.createElement('div');
  frame.className = `image-frame ${className}`;
  frame.innerHTML = `<span class="image-placeholder">${placeholder}</span>`;
  const key = Object.keys(CONFIG.assets).find((assetKey) => CONFIG.assets[assetKey] === path);
  const memoryMatch = path && path.match(/photo-(\d+)\.[^.]+$/);
  const memoryDemoNumber = memoryMatch ? String(((Number(memoryMatch[1]) - 8) % 6 + 6) % 6 + 1).padStart(2, '0') : '01';
  const fallback = key ? demoImagePath(key) : memoryMatch ? `assets/demo/demo-memory-${memoryDemoNumber}.svg` : "assets/demo/demo-memory-01.svg";
  setImageWithFallback(frame, path, fallback, alt);
  return frame;
}

function setupScrapbookDecks() {
  const storyHeading = $('#stories .section-heading h2');
  if (storyHeading) storyHeading.innerHTML = 'Us, In Little<br><i>Stories</i> <span>✦</span>';
  const birthdayHeading = $('#birthday .section-heading h2');
  if (birthdayHeading) birthdayHeading.innerHTML = 'Happy Birthday,<br><i>My Love</i> <span>♥</span>';
  const finaleLines = $('.finale-lines');
  if (finaleLines) finaleLines.innerHTML = '<span>5 Years <i>♥</i></span><span>1,825+ days</span><span>Countless memories</span><span>One <i>Jaan Bacha</i></span>';
  const finaleLast = $('.finale-last');
  if (finaleLast) finaleLast.textContent = 'Still you. Still us. Still choosing you.';
  const finalReplay = $('#finalReplay');
  if (finalReplay) finalReplay.innerHTML = 'Start Our Story Again <span>↻</span>';
  const years = [
    ['2021', 'THE BEGINNING', 'Ek simple beginning...<br>and somehow it became us.', 'year2021'],
    ['2022', 'BECOMING US', "Learning each other's moods, jokes, habits and all the little things.", 'year2022'],
    ['2023', 'MORE MEMORIES', 'More laughter, more stories,<br>more reasons to keep choosing each other.', 'year2023'],
    ['2024', 'GROWING TOGETHER', 'Life kept changing,<br>but we kept growing together.', 'year2024'],
    ['2025', 'STILL US', 'Another year, another thousand little moments.', 'year2025'],
    ['2026', '5 YEARS COMPLETE ♥', 'Five years later...<br>and still my favourite person.', 'year2026'],
    ['YEAR 6', 'BEGINS HERE ♥', '5 years completed.<br>Abhi toh aur bohot kuch jeena baaki hai.', null]
  ];
  buildSwipeDeck($('.timeline'), years, ([year, title, text, image], index) => {
    const card = document.createElement('article');
    card.className = `deck-card timeline-deck-card ${index === 6 ? 'year-six-card' : ''}`;
    const visual = image ? imageCard(imagePath(image), `A memory from ${year}`, `${year}<br>goes here`) : imageCard('', 'Year 6 begins', 'year 6<br>begins here');
    card.append(visual);
    const copy = document.createElement('div');
    copy.className = 'deck-card-copy';
    copy.innerHTML = `<span class="timeline-year">${year}</span><h3>${title}</h3><p>${text}</p><small>${index === 6 ? 'Jaan bacha, this is only the beginning.' : 'a page from the life we are making'}</small>`;
    card.append(copy);
    return card;
  }, 'Five years of us');

  const memoryTarget = $('#memoryGrid');
  buildSwipeDeck(memoryTarget, CONFIG.memories, ([file, title, text, caption], index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'deck-card memory-deck-card';
    card.setAttribute('aria-label', `Open memory: ${title}`);
    card.append(imageCard(`assets/photos/${file}`, title, `memory ${String(index + 1).padStart(2, '0')}<br>goes here`, 'memory-card-image'));
    const copy = document.createElement('div');
    copy.className = 'deck-card-copy';
    copy.innerHTML = `<span class="memory-date">MEMORY ${String(index + 1).padStart(2, '0')} · OUR STORY</span><h3>${title}</h3><p>${index === 0 ? 'Ek normal sa din tha... but somehow yaadgaar ban gaya.' : index === 1 ? 'Plan kuch aur tha, but hum kahin aur pahunch gaye. 😂' : index === 2 ? 'Joke actually funny nahi tha... but hum dono ko funny laga.' : index === 3 ? 'Bas hum the, aur honestly, that was enough.' : index === 4 ? 'Chhoti si memory, but meri favourite ones mein se ek.' : index === 5 ? 'Har jagah thodi familiar lagti hai jab tum saath hoti ho.' : text}</p>`;
    card.append(copy);
    card.addEventListener('click', () => openLightbox(index));
    card.append(document.createElement('span'));
    return card;
  }, 'Our little moments');

  buildSwipeDeck($('#storyGrid'), CONFIG.stories, ([key, title], index) => {
    const card = document.createElement('article');
    card.className = `deck-card story-deck-card story-variant-${index + 1}`;
    card.append(imageCard(imagePath(key), title, `story ${String(index + 1).padStart(2, '0')}<br>goes here`, 'story-card-image'));
    const copy = document.createElement('div');
    copy.className = 'deck-card-copy';
    const storyDescriptions = [
      'Bas ek table, do drinks aur bohot saari random baatein. Honestly, tumhare saath ordinary moments bhi thode special lagte hain.',
      'You are probably right. Main bas maan nahi raha hoon. Jaan bacha being jaan bacha.',
      'Nothing fancy. Nothing planned. Bas tum saamne ho, aur somehow that is enough.'
    ];
    const storyDescription = storyDescriptions[index];
    const storyQuotes = [
      'With you, even ordinary days become our memories.',
      'You are probably right. Main bas maan nahi raha hoon.',
      'Bas tum saamne ho, aur somehow that is enough.'
    ];
    copy.insertAdjacentHTML('beforeend', `<blockquote class="story-quote">${storyQuotes[index]}</blockquote>`);
    copy.innerHTML = `<span class="memory-date">STORY ${String(index + 1).padStart(2, '0')} · US</span><h3>${title}</h3><p>${storyDescription}</p>`;
    card.append(copy);
    return card;
  }, 'Us in little stories');

  buildSwipeDeck($('#notesGrid'), CONFIG.notes.slice(0, 7), (message, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `deck-card note-deck-card note-variant-${index + 1}`;
    card.innerHTML = `<div class="note-front"><span>Open this ♥</span><small>note 0${index + 1}</small></div><div class="note-back">${["I love how comfortable I am with you.", "Good news hoti hai toh sabse pehle tumhe batane ka mann karta hai.", "Sometimes I don't need a plan. Bas tum saath ho toh enough hai.", "I notice the little things you do, even when I don't always say it.", "You're still the person I want to annoy for the rest of my life. 😂❤️", "5 years later... still you."][index]}</div>`;
    card.querySelector('.note-back').textContent = message;
    const noteHeadings = [
      'You make normal days special', 'I am proud of us', 'You are home',
      'I notice the little things', 'Still my favourite person', 'Still you', 'My favourite person'
    ];
    card.innerHTML = `<div class="note-front"><span class="note-number">${String(index + 1).padStart(2, '0')} / 07</span><h3>${noteHeadings[index]}</h3><p>${message}</p><small>open for one more thing ♥</small></div><div class="note-back">${message}</div>`;
    card.addEventListener('click', () => card.classList.toggle('is-open'));
    return card;
  }, 'Things I never say enough');

  const future = $('.future-card');
  buildSwipeDeck(future, [
    ['Not a perfect future.', 'Aage kya hoga, honestly mujhe nahi pata. Life mein kya changes aayenge, hum kahan honge, kitna busy honge, ye sab main predict nahi kar sakta.<br><br>Main ye promise nahi karunga ki sab kuch perfect hoga.'],
    ['Just a real one.', 'Fights hongi, busy days honge, life messy bhi hogi. But mujhe tumhare saath woh everyday wali life jeeni hai — random conversations, chhoti outings, stupid jokes, late-night talks aur ek dusre ko pareshan karna.'],
    ["Still choosing us.", 'Gusse mein bhi samajhne ki koshish karunga. Ego ko humse bada nahi hone dunga. Jab life difficult hogi, tumhare saath khada rahunga. It is never me against you — it is always us against the problem.'],
    ['Year 6 → ♥', '5 years complete. Abhi bohot saal aur bohot memories baaki hain. Bas itna promise hai ki main tumhe choose karta rahunga, aur years later hum smile karke bolenge: Haan... humne saath mein bohot accha kiya.']
  ], ([title, text], index) => { const card = document.createElement('article'); card.className = `deck-card future-deck-card future-variant-${index + 1}`; card.innerHTML = `<span class="card-index">promise 0${index + 1} / 04</span><h3>${title}</h3><p>${text}</p><span class="future-mark">always us</span>`; return card; }, 'Promises for our next chapter');

  setupLetterPages();
}

function setupLetterPages() {
  const letter = $('.love-letter');
  letter.innerHTML = '<div class="letter-cover"><span class="card-index">one letter · for one person</span><strong>Open me,<br><i>jaan bacha.</i> ♥</strong><button class="button button-dark" type="button" id="openLetter">Open it</button></div><div class="letter-pages swipe-deck"><div class="deck-viewport"><div class="deck-track"></div></div><div class="deck-controls"><button class="deck-arrow" data-direction="prev" type="button">←</button><span class="deck-count">01 / 04</span><button class="deck-arrow" data-direction="next" type="button">→</button></div><div class="deck-dots"></div></div>';
  const pages = [
    ['5 years… ♥', "Honestly, kabhi kabhi sochta hoon ki ye 5 saal itni jaldi kaise nikal gaye. Five years ago, I did not know that one person would become such a huge part of my life, but somehow a simple beginning became us.<br><br>Jab peeche mudkar dekhta hoon toh realise hota hai ki humne saath mein kitna kuch experience kar liya — memories, hasi-mazaak, random conversations, fights, misunderstandings, emotional moments aur woh chhoti chhoti cheezein jo shayad kisi aur ke liye normal hongi, but mere liye hamesha special rahengi."],
    ['What you became to me', "Meri jaan bacha, tum kab meri life ka itna important part ban gayi, pata hi nahi chala. Ab koi achhi baat hoti hai toh sabse pehle tumhe batane ka mann karta hai. Kuch bura ho toh tumse baat karne ka mann karta hai, aur kabhi kabhi bina kisi reason ke bhi bas tumse baat karne ka mann karta hai.<br><br>Tumhare saath ek alag sa comfort hai. I can be completely myself with you — meri achhi side bhi, meri stupid side bhi, meri irritating habits bhi — aur phir bhi mujhe pata hota hai ki tum ho. Pehle love shayad zyada excitement tha; aaj uske saath understanding, comfort aur respect bhi hai."],
    ["What we've been through", "Humara relationship kabhi perfect nahi raha, aur honestly, main chahta bhi nahi ki woh perfect ho. Hum lade hain, gussa hue hain, kabhi ek dusre ko samajhne mein fail hue hain, kabhi ek dusre ko hurt bhi kiya hai. Life change hui, situations change hui, humari priorities bhi change hui.<br><br>But every time, somehow, we found our way back to each other. Gusse mein bhi tumhe samajhne ki koshish karna, ego ko humse bada nahi hone dena, aur difficult moments mein relationship ko choose karna — I think that is what makes what we have so real."],
    ['What I want for our future', "Mujhe future ka exact plan nahi pata. Bas itna pata hai ki usmein tum honi chahiye. Mujhe tumhare saath sirf special days nahi chahiye; mujhe woh normal life bhi chahiye — random plans, late-night talks, chhoti outings, stupid jokes, ek dusre ko unnecessarily irritate karna, aur kisi chhoti fight ke baad kuch der mein sab normal kar lena.<br><br>Main perfect future promise nahi kar raha. Bas itna promise hai ki main tumhe choose karta rahunga. It's never me against you — it's always us against the problem. Thank you for these 5 years. Knowing everything we have been through, I would still choose you. Every single time."]
  ];
  const deck = $('.letter-pages');
  const track = $('.deck-track', deck);
  pages.forEach(([title, text], index) => { const page = document.createElement('article'); page.className = `deck-card letter-page letter-page-${index + 1}`; page.innerHTML = `<span class="card-index">page 0${index + 1} / 04</span><h3>${title}</h3><p>${text}</p><span class="letter-page-mark">with all my love</span>`; track.append(page); });
  let opened = false;
  $('#openLetter').addEventListener('click', () => { opened = true; letter.classList.add('is-open'); if (!prefersReducedMotion) spawnHearts(8); });
  if (!opened) deck.setAttribute('aria-hidden', 'true');
  deck.addEventListener('focusin', () => letter.classList.add('is-open'));
  buildSwipeDeck(deck, pages, ([title, text], index) => { const page = document.createElement('article'); page.className = `deck-card letter-page letter-page-${index + 1}`; page.innerHTML = `<span class="card-index">page 0${index + 1} / 04</span><h3>${title}</h3><p>${text}</p><span class="letter-page-mark">with all my love</span>`; return page; }, 'A letter for you');
  deck.setAttribute('aria-hidden', 'true');
  $('#openLetter').addEventListener('click', () => deck.setAttribute('aria-hidden', 'false'), { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
  createMemoryCards();
  createStoryCards();
  createNoteCards();
  hydrateImages();
  setupOpening();
  setupPlayer();
  setupSecret();
  setupWish();
  setupScrapbookDecks();
  setupLightbox();
  setupReveal();
  setupProgress();
  setupReplay();
});
