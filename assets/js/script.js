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

  // Add click event to all links for refresh
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't refresh if it's an external link or has target="_blank"
      if (!this.getAttribute('target') && !this.href.startsWith('http')) {
        e.preventDefault();
        window.location.reload();
      }
    });
  });

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

  const el = document.getElementById('auto-underline');

  if (!el.classList.contains('active')) {
    el.classList.add('no-hover');
  
    setTimeout(() => {
      el.classList.add('active'); 
      removeHover();              
    }, 3000);
  }
  
  function removeHover() {
    setTimeout(() => {
      el.classList.remove('active');    
      el.classList.remove('no-hover');  
    }, 3000);
  }
    
  // Function to center menu items on hover
  function centerMenuItems() {
    const menuWrappers = document.querySelectorAll('.column-nav .column .column-nav-links');
    const sections = document.querySelectorAll('section[id]');

    // Function to center menu item and add background
    function centerMenuItem(wrapper, link) {
      // Center the text
      const parentWidth = wrapper.clientWidth;
      const icon = link.querySelector('i');
      const iconWidth = icon ? icon.offsetWidth : 0;
      const gap = 10;
      const textWidth = link.scrollWidth - iconWidth - gap;
      const totalContentWidth = iconWidth + gap + textWidth;
      const translateValue = (parentWidth - totalContentWidth) / 2;
      const safeTranslate = translateValue > 0 ? translateValue : 0;
      link.style.transform = `translateX(${safeTranslate}px)`;
      
      // Add background
      wrapper.style.setProperty("background", "linear-gradient(to right, #093637, #44A08D)");
    }

    // Function to reset menu item
    function resetMenuItem(wrapper, link) {
      link.style.transform = 'translateX(0)';
      wrapper.style.backgroundColor = '';
      wrapper.style.setProperty("background", "none");
      wrapper.style.borderRadius = '';
    }

    // Existing hover functionality for menu items
    menuWrappers.forEach(wrapper => {
      const link = wrapper.querySelector('a');

      wrapper.addEventListener('mouseenter', function () {
        centerMenuItem(wrapper, link);
      });

      wrapper.addEventListener('mouseleave', function () {
        resetMenuItem(wrapper, link);
      });
    });

    // Add hover functionality for sections
    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.column-nav-links a[href="#${sectionId}"]`);
      
      if (correspondingLink) {
        const wrapper = correspondingLink.parentElement;

        section.addEventListener('mouseenter', function() {
          centerMenuItem(wrapper, correspondingLink);
        });

        section.addEventListener('mouseleave', function() {
          resetMenuItem(wrapper, correspondingLink);
        });
      }
    });
  }
  
  // Call the function when DOM is loaded
  centerMenuItems();

  // Move down chevron click handler
  document.getElementById('moveDown').addEventListener('click', function() {
    // Get the portfolio section
    const portfolioSection = document.getElementById('portfolio');
    
    if (portfolioSection) {
        // Smooth scroll to portfolio section
        portfolioSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
  });

});

/* Scroll progress value */
function calcScrollValue() {
  const scrollProgress = document.getElementById("progress");
  const progressValue = document.getElementById("progress-value");
  if (!scrollProgress || !progressValue) return;

  // Get the scroll position
  const pos = document.documentElement.scrollTop;
  
  // Calculate total scrollable height using window properties
  const calcHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Calculate scroll percentage
  const scrollValue = Math.min(Math.round((pos * 100) / calcHeight), 100);

  // Show/hide progress indicator
  scrollProgress.style.display = pos > 100 ? "grid" : "none";

  // Add click event for smooth scroll to top
  scrollProgress.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Update progress gradient
  scrollProgress.style.background = `conic-gradient(#006A71 ${scrollValue}%, #44A08D ${scrollValue}%)`;
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

  const { clientX: x, clientY: y } = e;
  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  cursor.style.display = 'block';
});

// Add cursor effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .column-nav-links, input, textarea');
interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});

document.addEventListener('mouseout', () => {
  if (cursor) cursor.style.display = 'none';
});