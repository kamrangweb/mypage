'use strict';

/*Slider*/
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});

/*Text type*/

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  document.body.appendChild(css);
};

/*Scroll animations*/

ScrollReveal().reveal('.site-row', { delay: 500 });
ScrollReveal().reveal('#about', { delay: 500 });
ScrollReveal().reveal('#technical', { delay: 500 });
ScrollReveal().reveal('.row-contact', { delay: 500 });


let status=1;

function openNav() {
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("myNav").style.left = "100%";
    
    if(status==1){
        document.getElementById("myNav").style.right = "-100%";
        status=0;
    }else{
        document.getElementById("myNav").style.left = "-100%";
        status=1;
    }                
}

const cursor = document.querySelector('.cursor');
var timeout;

document.addEventListener('mousemove', (e)=>{
    let x = e.pageX;
    let y = e.pageY;

    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
    cursor.style.display = 'block';

    function mouseStopped(){
        cursor.style.display = 'none';
    }

    clearTimeout(timeout);
    timeout = setTimeout(mouseStopped, 1500)

})

document.addEventListener('mouseout', ()=>{
    cursor.style.display = 'none';
})




function openblock() {
  openNav()
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function closeblock() {
  openNav()
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

addEventListener("resize", (changeSize));

function changeSize(){
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

document.getElementById("year").innerHTML = (new Date().getFullYear());
