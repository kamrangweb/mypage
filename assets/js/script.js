'use strict';

/* Slider */
const swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* Typewriter */
function TxtType(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.isDeleting = false;
  this.tick();
}

TxtType.prototype.tick = function () {
  const i = this.loopNum % this.toRotate.length;
  const fullTxt = this.toRotate[i];

  this.txt = this.isDeleting
    ? fullTxt.substring(0, this.txt.length - 1)
    : fullTxt.substring(0, this.txt.length + 1);

  this.el.querySelector('.wrap').innerHTML = this.txt;

  let delta = 150 - Math.random() * 100;
  if (this.isDeleting) delta /= 2;

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(() => this.tick(), delta);
};

/* DOM is ready */
document.addEventListener("DOMContentLoaded", () => {
  // Typewriter start
  const elements = document.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-type');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // Scroll animation
  ScrollReveal().reveal('.site-row', { delay: 500 });
  ScrollReveal().reveal('#about', { delay: 500 });
  ScrollReveal().reveal('#technical', { delay: 500 });
  ScrollReveal().reveal('.row-contact', { delay: 500 });

  // Date update
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Scroll progress bar
  window.addEventListener("scroll", calcScrollValue);
  calcScrollValue();

  // Back to top
  window.addEventListener("scroll", () => {
    const btn = document.querySelector('button.back-to-top');
    if (!btn) return;
    btn.classList.toggle('show', window.scrollY > 200);
  });

  const backToTopBtn = document.querySelector('button.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

/* Scroll progress value */
function calcScrollValue() {
  const scrollProgress = document.getElementById("progress");
  const progressValue = document.getElementById("progress-value");
  if (!scrollProgress || !progressValue) return;

  const pos = document.documentElement.scrollTop;
  const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollValue = Math.round((pos * 100) / calcHeight);

  scrollProgress.style.display = pos > 100 ? "grid" : "none";

  scrollProgress.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollProgress.style.background = `conic-gradient(#0c5d76 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
}

/* Mobile menu */
let status = 1;

function openNav() {
  const nav = document.getElementById("myNav");
  if (!nav) return;

  nav.style.width = "100%";
  nav.style.left = "100%";

  if (status === 1) {
    nav.style.right = "-100%";
    status = 0;
  } else {
    nav.style.left = "-100%";
    status = 1;
  }
}

function openblock() {
  openNav();
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function closeblock() {
  openNav();
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

window.addEventListener("resize", () => {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
});

/* Custom cursor */
const cursor = document.querySelector('.cursor');
let timeout;

document.addEventListener('mousemove', (e) => {
  if (!cursor) return;

  const { pageX: x, pageY: y } = e;
  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  cursor.style.display = 'block';

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cursor.style.display = 'none';
  }, 1500);
});

document.addEventListener('mouseout', () => {
  if (cursor) cursor.style.display = 'none';
});
