
const sections = document.querySelectorAll("section");

function checkVisibility() {
  const triggerBottom = window.innerHeight * 0.8;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const elements = section.querySelectorAll('h2, .why-us li, .testimonials blockquote, .testimonials p, .contact h2, .contact h6, .contact input, .contact textarea, .contact button , .faq-item');

    if (sectionTop < triggerBottom) {
      section.classList.add("visible");

      // Animate children with delay
      elements.forEach((el, index) => {
        if (!el.style.animation) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
          el.style.transitionDelay = `${index * 0.2}s`;
        }
      });
    }
  });
}

checkVisibility();
window.addEventListener("scroll", checkVisibility);

  //testimonials slider  
  let currentSlideIndex = 0;
  const slider = document.querySelector('.testimonial-slider');
  const cards = document.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;

  function getCardsToShow() {
    if (window.innerWidth <= 768) return 1;        // Mobile
    if (window.innerWidth <= 1024) return 2;       // Tablet
    return 4; // Desktop
  }

  function updateSlider() {
    const cardsToShow = getCardsToShow();
    const cardWidth = slider.clientWidth / cardsToShow;
    slider.style.transform = `translateX(-${currentSlideIndex * cardWidth}px)`;
    slider.style.transition = 'transform 0.6s ease'; 
  }

  function nextSlide() {
    const cardsToShow = getCardsToShow();
    if (currentSlideIndex < totalCards - cardsToShow) {
      currentSlideIndex++;
    } else {
      currentSlideIndex = totalCards - cardsToShow; // Stay at last
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
    } else {
      currentSlideIndex = 0; // Stay at first
    }
    updateSlider();
  }

  window.addEventListener('load', updateSlider);
  window.addEventListener('resize', updateSlider);


  


  //close the navbar on mobile or tablet 

  
  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.getElementById('navbarText');

  if (toggler && collapse) {
    toggler.addEventListener('click', function () {
      // Use Bootstrap's Collapse API
      const collapseInstance = bootstrap.Collapse.getInstance(collapse);
      
      if (collapseInstance) {
        collapseInstance.toggle(); // open/close
      } else {
        new bootstrap.Collapse(collapse, { toggle: true });
      }
    });
  }

document.addEventListener('DOMContentLoaded', function () {
  // --- 1. إغلاق القائمة عند الضغط على رابط أو زر "Call Us" ---
  const collapseElement = document.getElementById('navbarText');

  if (collapseElement) {
    // إغلاق القائمة عند الضغط على رابط
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', function () {
        const collapseInstance = bootstrap.Collapse.getInstance(collapseElement);
        if (collapseInstance && collapseElement.classList.contains('show')) {
          collapseInstance.hide();
        }
      });
    });

    // إغلاق القائمة عند الضغط على "Call Us"
    const callBtn = document.getElementById('call-btn-link');
    if (callBtn) {
      callBtn.addEventListener('click', function () {
        const collapseInstance = bootstrap.Collapse.getInstance(collapseElement);
        if (collapseInstance && collapseElement.classList.contains('show')) {
          collapseInstance.hide();
        }
      });
    }
  }

  // --- 2. كروت الخدمات: فتح واحد فقط، وإغلاق التاني عند إعادة الضغط ---
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', function () {
      // نتأكد إننا في وضع الموبايل
      if (window.innerWidth <= 768) {
        // لو الكارت اللي ضغطت عليه مفتوح بالفعل → نغلقه
        if (this.classList.contains('active')) {
          this.classList.remove('active');
        }
        // لو كان مغلق → نفتحه ونقفل التانيين
        else {
          // أولاً: نغلق كل الكروت
          cards.forEach(c => c.classList.remove('active'));
          // ثانيًا: نفتح الكارت الحالي
          this.classList.add('active');
        }
      }
    });
  });
});