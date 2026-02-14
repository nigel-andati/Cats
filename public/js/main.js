/* ========================================
   Campus Cats APA Club - Main JavaScript
   ======================================== */

// ---- Navbar scroll effect ----
(function() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ---- Mobile nav toggle ----
(function() {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    links.classList.toggle('open');
    // Animate hamburger
    var spans = toggle.querySelectorAll('span');
    if (links.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click (mobile)
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
      var spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
})();

// ---- Leaders Carousel ----
(function() {
  var track = document.getElementById('carouselTrack');
  var dotsContainer = document.getElementById('carouselDots');
  if (!track || !dotsContainer) return;

  var cards = track.querySelectorAll('.leader-card');
  var dots = dotsContainer.querySelectorAll('.carousel-dot');
  var current = 0;
  var total = cards.length;
  var interval = null;
  var DELAY = 3000;

  function showCard(index) {
    cards.forEach(function(card, i) {
      card.classList.remove('active', 'exiting');
      if (i === current) {
        card.classList.add('exiting');
      }
    });
    dots.forEach(function(d) { d.classList.remove('active'); });

    // Small delay for exit animation
    setTimeout(function() {
      cards.forEach(function(card) {
        card.classList.remove('active', 'exiting');
      });
      cards[index].classList.add('active');
      dots[index].classList.add('active');
      current = index;
    }, 150);
  }

  function next() {
    showCard((current + 1) % total);
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(next, DELAY);
  }

  function stopAuto() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  // Dot clicks
  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-index'), 10);
      if (idx !== current) {
        showCard(idx);
        startAuto(); // Reset timer on manual change
      }
    });
  });

  // Pause on hover
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // Start
  startAuto();
})();
