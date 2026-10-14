const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
matchMedia('(min-width:901px)').addEventListener('change', closeMenu);

const motionReduced = matchMedia('(prefers-reduced-motion:reduce)');
const thumbnails = Array.from(document.querySelectorAll('.case-thumb'));
const featuredImage = document.querySelector('#featured-image');
const featuredCaption = document.querySelector('#featured-caption');
const openCase = document.querySelector('#open-case');
const count = document.querySelector('#gallery-count');
const dialog = document.querySelector('#case-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogTitle = document.querySelector('#dialog-title');
let activeCase = 0;
let imageTransition;
let loadRequest = 0;

function selectCase(index, animate = true) {
  activeCase = (index + thumbnails.length) % thumbnails.length;
  const thumbnail = thumbnails[activeCase];
  const image = thumbnail.querySelector('img');
  const title = thumbnail.dataset.title;
  thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === activeCase)));
  count.textContent = `${String(activeCase + 1).padStart(2, '0')} / 06 · ${title}`;
  featuredCaption.textContent = title;
  openCase.setAttribute('aria-label', `Ampliar registro: ${title.toLocaleLowerCase('pt-BR')}`);
  const request = ++loadRequest;
  const candidate = new Image();
  candidate.onload = () => {
    if (request !== loadRequest) return;
    imageTransition?.cancel();
    featuredImage.src = image.src;
    featuredImage.alt = image.alt;
    if (animate && !motionReduced.matches) {
      imageTransition = featuredImage.animate([{opacity:.65},{opacity:1}],{duration:260,easing:'ease-out'});
    }
  };
  candidate.onerror = () => {
    if (request === loadRequest) {
      featuredImage.src = image.src;
      featuredImage.alt = image.alt;
    }
  };
  candidate.src = image.src;
  dialogImage.src = image.src;
  dialogImage.alt = image.alt;
  dialogTitle.textContent = `${String(activeCase + 1).padStart(2, '0')} / 06 · ${title}`;
}
thumbnails.forEach((button, index) => {
  button.addEventListener('click', () => selectCase(index));
  button.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + thumbnails.length) % thumbnails.length;
      selectCase(next);
      thumbnails[next].focus();
    }
  });
});
document.querySelector('#previous-case').addEventListener('click', () => selectCase(activeCase - 1));
document.querySelector('#next-case').addEventListener('click', () => selectCase(activeCase + 1));
document.querySelector('#dialog-previous').addEventListener('click', () => selectCase(activeCase - 1));
document.querySelector('#dialog-next').addEventListener('click', () => selectCase(activeCase + 1));
openCase.addEventListener('click', event => {
  if (swiped && event.detail > 0) {swiped = false;return;}
  swiped = false;
  selectCase(activeCase, false);
  document.body.classList.add('dialog-open');
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    selectCase(activeCase + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let touchStart = null;
let swiped = false;
openCase.addEventListener('pointerdown', event => {
  swiped = false;
  if (event.pointerType === 'touch') touchStart = {x:event.clientX,y:event.clientY};
});
openCase.addEventListener('pointerup', event => {
  if (!touchStart) return;
  const dx = event.clientX - touchStart.x;
  const dy = event.clientY - touchStart.y;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
    selectCase(activeCase + (dx < 0 ? 1 : -1));
    swiped = true;
  }
  touchStart = null;
});
openCase.addEventListener('pointercancel', () => {touchStart=null;});
selectCase(0, false);

const progress = document.querySelector('.reading-progress');
let progressFrame = false;
function updateProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${available > 0 ? Math.min(1,Math.max(0,scrollY / available)) : 0})`;
  progressFrame = false;
}
window.addEventListener('scroll', () => {
  if (!progressFrame) {progressFrame=true;requestAnimationFrame(updateProgress);}
},{passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();

if ('IntersectionObserver' in window) {
  const floatingContact = document.querySelector('.floating-wa');
  const galleryVisibility = new IntersectionObserver(entries => {
    const suppress = entries[0].isIntersecting && document.activeElement !== floatingContact;
    floatingContact.classList.toggle('is-suppressed', suppress);
  }, {threshold:0});
  galleryVisibility.observe(document.querySelector('#resultados'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (!motionReduced.matches && typeof entry.target.animate === 'function') {
        entry.target.animate([{opacity:.5,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,easing:'cubic-bezier(.2,.65,.3,1)'});
      }
    });
  },{threshold:.12});
  document.querySelectorAll('.section-heading,.treatment,.about-copy,.about-portrait,.steps>div,.faq-grid>div,.location-copy,.closing-inner').forEach(element => observer.observe(element));
}
motionReduced.addEventListener('change', () => {
  if (motionReduced.matches) document.getAnimations().forEach(animation => animation.cancel());
});
document.documentElement.dataset.siteReady = 'true';

