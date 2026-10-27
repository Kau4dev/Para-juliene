/**
 * Vinícius & Juliene — 8 Anos de Amor ∞
 * Lógica Interativa, Abertura Realista do Envelope, Carrossel Infinito e Player Spotify Nativo
 */

// ==========================================
// 1. CONFIGURAÇÕES PERSONALIZÁVEIS
// ==========================================
const CONFIG = {
  // Data de início (28 de Outubro de 2018)
  startDate: new Date(2018, 9, 28, 0, 0, 0),


  // Intervalo de troca automática das fotos em milissegundos (3500ms = 3,5 segundos)
  carouselInterval: 3500,
  
  // Lista unificada com as 19 fotos da pasta assets/fotos/
  photos: [
    { src: 'assets/fotos/foto_01.jpeg', caption: 'O início de tudo e a certeza do para sempre.' },
    { src: 'assets/fotos/foto_02.jpeg', caption: 'O seu sorriso é o meu lugar favorito.' },
    { src: 'assets/fotos/foto_03.jpeg', caption: 'Cumplicidade em cada detalhe da nossa rotina.' },
    { src: 'assets/fotos/foto_04.jpeg', caption: 'Ao seu lado, qualquer dia se torna especial.' },
    { src: 'assets/fotos/foto_05.jpeg', caption: 'Mais um capítulo inesquecível da nossa linda história.' },
    { src: 'assets/fotos/foto_06.jpeg', caption: 'O amor verdadeiro que só se multiplica com o tempo.' },
    { src: 'assets/fotos/foto_07.jpeg', caption: '8 anos de parceria, carinho e respeito mútuo.' },
    { src: 'assets/fotos/foto_08.jpeg', caption: 'Seu abraço cura tudo e me traz a maior paz.' },
    { src: 'assets/fotos/foto_09.jpeg', caption: 'Minha melhor amiga, meu grande amor.' },
    { src: 'assets/fotos/foto_10.jpeg', caption: 'A beleza de sonhar e construir uma vida a dois.' },
    { src: 'assets/fotos/foto_11.jpeg', caption: 'O casal mais lindo e apaixonado desse mundo.', position: 'center 8%' },
    { src: 'assets/fotos/foto_12.jpeg', caption: 'A felicidade estampada em nossos olhares.', position: 'center 6%', isFocusFace: true },
    { src: 'assets/fotos/foto_13.jpeg', caption: 'Juntos vencemos desafios e celebramos cada vitória.' },
    { src: 'assets/fotos/foto_14.jpeg', caption: 'Por mais milhares de amanheceres com você.' },
    { src: 'assets/fotos/foto_15.jpeg', caption: 'Amor, lealdade e cumplicidade sem fim.' },
    { src: 'assets/fotos/foto_16.jpeg', caption: 'Cada segundo ao seu lado é motivo de alegria.', position: 'center 4%' },
    { src: 'assets/fotos/foto_17.jpeg', caption: 'O meu beijo e o meu coração são todinhos seus.', position: 'center 10%' },
    { src: 'assets/fotos/foto_18.jpeg', caption: 'O carinho mais doce que transforma meus dias.', position: 'center 4%' },
    { src: 'assets/fotos/foto_19.jpeg', caption: 'Vinícius & Juliene: brindando ao nosso amor e ao nosso infinito ∞', position: 'center 15%' }
  ]
};

// ==========================================
// 2. ABERTURA REALISTA DA CARTA (MOVIMENTO 3D)
// ==========================================
const envelopeOverlay = document.getElementById('envelope-overlay');
const envelope = document.getElementById('envelope');
const openEnvelopeBtn = document.getElementById('open-envelope-btn');
const mainContent = document.getElementById('main-content');

let isEnvelopeOpening = false;

function unlockAudio() {
  if (!audioElement) return;
  audioElement.playsInline = true;
  if (!audioElement.src || audioElement.src === '' || audioElement.src.endsWith('/')) {
    audioElement.src = 'assets/musica.mp3';
  }
  const playPromise = audioElement.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isPlaying = true;
        updatePlayerUI();
      })
      .catch((err) => {
        console.warn('iOS Autoplay check:', err);
        isPlaying = false;
        updatePlayerUI();
      });
  }
}

function openEnvelope(e) {
  if (isEnvelopeOpening) return;
  isEnvelopeOpening = true;

  // 1. Dispara a reprodução de áudio diretamente no gesto do usuário (vital para iOS/Safari/Chrome)
  unlockAudio();

  // 2. Inicia movimento da aba e quebra do selo
  envelope.classList.add('is-opening');

  // 3. Chuva de corações comemorativa durante a abertura
  triggerLoveShower(50);

  // 4. Aguarda a carta subir do envelope para revelar o conteúdo principal
  setTimeout(() => {
    envelopeOverlay.classList.add('opened');
    mainContent.classList.remove('is-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Garante que o carrossel inicie sempre na Foto 1 ao abrir a página
    trackIndex = 1;
    if (carouselTrack) {
      carouselTrack.style.transition = 'none';
      carouselTrack.style.transform = 'translateX(-100%)';
      void carouselTrack.offsetHeight;
    }
    updateDotsAndCounter();
    startAutoPlay();
  }, 1700);
}

const handleEnvelopeOpen = (e) => {
  if (e && e.type === 'touchend') {
    e.preventDefault();
  }
  openEnvelope(e);
};

if (openEnvelopeBtn) {
  openEnvelopeBtn.addEventListener('click', handleEnvelopeOpen);
  openEnvelopeBtn.addEventListener('touchend', handleEnvelopeOpen, { passive: false });
}
if (envelope) {
  envelope.addEventListener('click', handleEnvelopeOpen);
  envelope.addEventListener('touchend', handleEnvelopeOpen, { passive: false });
}

// Fallback para iOS: se o navegador bloqueou o áudio na abertura, o próximo toque em qualquer lugar da tela desbloqueia
document.addEventListener('touchend', function unlockOnFirstTouch() {
  if (audioElement && audioElement.paused && isEnvelopeOpening) {
    unlockAudio();
  }
}, { once: true, passive: true });

// ==========================================
// 3. CONTADOR DE TEMPO EM TEMPO REAL
// ==========================================
function updateCountdown() {
  const now = new Date();
  const start = CONFIG.startDate;
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const elYears = document.getElementById('time-years');
  const elMonths = document.getElementById('time-months');
  const elDays = document.getElementById('time-days');
  const elHours = document.getElementById('time-hours');
  const elMinutes = document.getElementById('time-minutes');
  const elSeconds = document.getElementById('time-seconds');

  if (elYears) elYears.textContent = Math.max(0, years);
  if (elMonths) elMonths.textContent = Math.max(0, months);
  if (elDays) elDays.textContent = Math.max(0, days);
  if (elHours) elHours.textContent = String(hours).padStart(2, '0');
  if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
  if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================================
// 4. CARROSSEL INFINITO (SEAMLESS LOOP)
// ==========================================
const carouselTrack = document.getElementById('carousel-track');
const carouselDotsContainer = document.getElementById('carousel-dots');
const carouselCounter = document.getElementById('carousel-counter');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const carouselViewport = document.getElementById('carousel-viewport');

const totalPhotos = CONFIG.photos.length;
// trackIndex inicia em 1 porque o slide 0 é o clone do último
let trackIndex = 1;
let isAnimating = false;
let carouselTimer = null;

function createSlideElement(photo, logicalIndex) {
  const slide = document.createElement('div');
  slide.className = 'carousel-slide';
  slide.dataset.logicalIndex = logicalIndex;

  const focusStyle = photo.position ? `style="object-position: ${photo.position};"` : '';
  const focusClass = photo.isFocusFace ? 'focus-face-12' : '';

  slide.innerHTML = `
    <div class="polaroid-card">
      <img src="${photo.src}" alt="${photo.caption}" class="polaroid-img ${focusClass}" ${focusStyle} loading="lazy">
      <p class="polaroid-caption">${photo.caption}</p>
    </div>
  `;

  slide.addEventListener('click', () => openLightbox(logicalIndex));
  return slide;
}

function initCarousel() {
  if (!carouselTrack) return;
  carouselTrack.innerHTML = '';
  carouselDotsContainer.innerHTML = '';

  // 1. Clone do último slide no início (para scroll infinito para trás)
  const lastPhoto = CONFIG.photos[totalPhotos - 1];
  carouselTrack.appendChild(createSlideElement(lastPhoto, totalPhotos - 1));

  // 2. Slides originais (1 a 15)
  CONFIG.photos.forEach((photo, idx) => {
    carouselTrack.appendChild(createSlideElement(photo, idx));

    // Indicador (dot)
    const dot = document.createElement('button');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Ir para a foto ${idx + 1}`);
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToLogicalSlide(idx);
    });
    carouselDotsContainer.appendChild(dot);
  });

  // 3. Clone do primeiro slide no final (para scroll infinito para frente)
  const firstPhoto = CONFIG.photos[0];
  carouselTrack.appendChild(createSlideElement(firstPhoto, 0));

  // Posição inicial no slide 1 (primeira foto original) sem transição
  trackIndex = 1;
  carouselTrack.style.transition = 'none';
  carouselTrack.style.transform = `translateX(-${trackIndex * 100}%)`;

  updateDotsAndCounter();

  // Só inicia autoplay imediatamente se o envelope já estiver aberto
  if (!envelopeOverlay || envelopeOverlay.classList.contains('opened')) {
    startAutoPlay();
  }
}

function updateDotsAndCounter() {
  const logicalIndex = (trackIndex - 1 + totalPhotos) % totalPhotos;

  const dots = carouselDotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === logicalIndex);
  });

  if (carouselCounter) {
    carouselCounter.textContent = `Foto ${logicalIndex + 1} de ${totalPhotos}`;
  }
}

function moveTrack(toIndex, withTransition = true) {
  if (isAnimating && withTransition) return;
  isAnimating = withTransition;
  trackIndex = toIndex;

  if (withTransition) {
    carouselTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
  } else {
    carouselTrack.style.transition = 'none';
  }

  carouselTrack.style.transform = `translateX(-${trackIndex * 100}%)`;
  updateDotsAndCounter();
}

// Manipulação do fim da transição para o loop infinito contínuo
carouselTrack.addEventListener('transitionend', () => {
  isAnimating = false;

  // Se passou do último (está no clone da primeira foto), pula instantaneamente para a primeira foto original
  if (trackIndex === totalPhotos + 1) {
    carouselTrack.style.transition = 'none';
    trackIndex = 1;
    carouselTrack.style.transform = `translateX(-${trackIndex * 100}%)`;
    // Força reflow
    void carouselTrack.offsetHeight;
  }

  // Se voltou antes do primeiro (está no clone da última foto), pula instantaneamente para a última foto original
  if (trackIndex === 0) {
    carouselTrack.style.transition = 'none';
    trackIndex = totalPhotos;
    carouselTrack.style.transform = `translateX(-${trackIndex * 100}%)`;
    void carouselTrack.offsetHeight;
  }

  updateDotsAndCounter();
});

function nextSlide() {
  if (isAnimating) return;
  moveTrack(trackIndex + 1);
  resetAutoPlay();
}

function prevSlide() {
  if (isAnimating) return;
  moveTrack(trackIndex - 1);
  resetAutoPlay();
}

function goToLogicalSlide(logicalIdx) {
  if (isAnimating) return;
  moveTrack(logicalIdx + 1);
  resetAutoPlay();
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

function startAutoPlay() {
  stopAutoPlay();
  carouselTimer = setInterval(nextSlide, CONFIG.carouselInterval || 4500);
}

function stopAutoPlay() {
  if (carouselTimer) clearInterval(carouselTimer);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Suporte a Touch / Swipe em Smartphones
let touchStartX = 0;
let touchEndX = 0;

if (carouselViewport) {
  carouselViewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  carouselViewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
  }, { passive: true });

  carouselViewport.addEventListener('mouseenter', stopAutoPlay);
  carouselViewport.addEventListener('mouseleave', startAutoPlay);
}

function handleSwipe() {
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) > 40) {
    if (diff < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

// ==========================================
// 5. MODAL LIGHTBOX (ZOOM NAS FOTOS)
// ==========================================
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(index) {
  const photo = CONFIG.photos[index];
  if (!photo || !lightboxModal) return;
  lightboxImg.src = photo.src;
  lightboxCaption.textContent = photo.caption;
  lightboxModal.classList.remove('is-hidden');
  stopAutoPlay();
}

function closeLightbox() {
  if (lightboxModal) {
    lightboxModal.classList.add('is-hidden');
    startAutoPlay();
  }
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ==========================================
// 6. PLAYER DE ÁUDIO NATIVO ESTILO SPOTIFY
// ==========================================
const audioElement = document.getElementById('audio-element');
const btnPlayPause = document.getElementById('btn-play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const playerBody = document.getElementById('custom-player-view');
const spotifyCard = document.getElementById('spotify-card');
const statusTextFull = document.getElementById('music-status-text-full');
const statusTextShort = document.getElementById('music-status-text-short');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
const btnBackward = document.getElementById('btn-backward');
const btnForward = document.getElementById('btn-forward');

let isPlaying = false;

function playAudio() {
  unlockAudio();
}

function pauseAudio() {
  if (!audioElement) return;
  audioElement.pause();
  isPlaying = false;
  updatePlayerUI();
}

function togglePlayPause() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function updatePlayerUI() {
  if (isPlaying) {
    playIcon.classList.add('is-hidden');
    pauseIcon.classList.remove('is-hidden');
    playerBody.classList.add('playing');
    if (spotifyCard) spotifyCard.classList.add('playing');
    if (statusTextFull) statusTextFull.textContent = 'Tocando Agora';
    if (statusTextShort) statusTextShort.textContent = 'Tocando';
  } else {
    playIcon.classList.remove('is-hidden');
    pauseIcon.classList.add('is-hidden');
    playerBody.classList.remove('playing');
    if (spotifyCard) spotifyCard.classList.remove('playing');
    if (statusTextFull) statusTextFull.textContent = 'Pausado';
    if (statusTextShort) statusTextShort.textContent = 'Pausado';
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

const handlePlayPause = (e) => {
  if (e && e.type === 'touchend') {
    e.preventDefault();
  }
  if (btnPlayPause) btnPlayPause.blur();
  togglePlayPause();
};

if (btnPlayPause) {
  btnPlayPause.addEventListener('click', handlePlayPause);
  btnPlayPause.addEventListener('touchend', handlePlayPause, { passive: false });
}

if (btnBackward) {
  btnBackward.addEventListener('click', () => {
    btnBackward.blur();
    if (audioElement) audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);
  });
  btnBackward.addEventListener('touchend', () => {
    btnBackward.blur();
  }, { passive: true });
}

if (btnForward) {
  btnForward.addEventListener('click', () => {
    btnForward.blur();
    if (audioElement) audioElement.currentTime = Math.min(audioElement.duration || 0, audioElement.currentTime + 10);
  });
  btnForward.addEventListener('touchend', () => {
    btnForward.blur();
  }, { passive: true });
}

if (audioElement) {
  audioElement.addEventListener('timeupdate', () => {
    const cur = audioElement.currentTime;
    const dur = audioElement.duration || 0;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(cur);
    if (totalDurationEl && dur > 0) totalDurationEl.textContent = formatTime(dur);
    if (dur > 0 && progressFill) {
      const pct = (cur / dur) * 100;
      progressFill.style.width = `${pct}%`;
    }
  });

  audioElement.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayerUI();
    if (progressFill) progressFill.style.width = '0%';
  });
}

if (progressContainer) {
  progressContainer.addEventListener('click', (e) => {
    if (!audioElement || !audioElement.duration) return;
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioElement.currentTime = pos * audioElement.duration;
  });
}

// ==========================================
// 7. PARTICULAS DE CORAÇÕES NO FUNDO (CANVAS)
// ==========================================
const canvas = document.getElementById('hearts-canvas');
let ctx = canvas ? canvas.getContext('2d') : null;
let hearts = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class HeartParticle {
  constructor(x, y, isExplosion = false) {
    this.x = x ?? Math.random() * canvas.width;
    this.y = y ?? (isExplosion ? canvas.height / 2 : canvas.height + 20);
    this.size = Math.random() * 12 + 8;
    this.speedY = isExplosion ? (Math.random() - 0.5) * 8 - 4 : Math.random() * 1.2 + 0.5;
    this.speedX = isExplosion ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.fade = isExplosion ? 0.012 : 0.003;
    this.color = ['#f08080', '#e8a598', '#ffd1dc', '#e2b774'][Math.floor(Math.random() * 4)];
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.opacity -= this.fade;
  }

  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);

    ctx.beginPath();
    const d = this.size;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
    ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

function animateHearts() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hearts.length < 25 && Math.random() < 0.08) {
    hearts.push(new HeartParticle());
  }

  hearts.forEach((heart, i) => {
    heart.update();
    heart.draw();
    if (heart.opacity <= 0 || heart.y < -30) {
      hearts.splice(i, 1);
    }
  });

  requestAnimationFrame(animateHearts);
}
animateHearts();

// ==========================================
// 8. CHUVA DE AMOR / EXPLOSÃO DE CORAÇÕES
// ==========================================
function triggerLoveShower(amount = 60) {
  const startX = window.innerWidth / 2;
  const startY = window.innerHeight * 0.65;
  for (let i = 0; i < amount; i++) {
    hearts.push(new HeartParticle(startX + (Math.random() - 0.5) * 200, startY, true));
  }
}

const btnSurprise = document.getElementById('btn-surprise');
if (btnSurprise) {
  btnSurprise.addEventListener('click', () => {
    triggerLoveShower(80);
    btnSurprise.innerHTML = '<span class="btn-heart">❤️</span> Te amo infinitamente!';
    setTimeout(() => {
      btnSurprise.innerHTML = '<span class="btn-heart">&hearts;</span> Clique aqui para uma chuva de amor';
    }, 30000);
  });
}

// Inicializa o carrossel e o pré-carregamento de áudio para dispositivos móveis
window.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  if (audioElement) {
    audioElement.playsInline = true;
    audioElement.load();
  }

  // Previne que botões fiquem com estado "pressionado" ou com foco retido em celulares
  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('touchend', function () {
      this.blur();
    }, { passive: true });
  });
});
