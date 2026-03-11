/* ========================================
   BATU SUNRISE CAMP - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ========== Navbar Scroll Effect ==========
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ========== Scroll to Top Button ==========
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
  }

  // ========== Close mobile nav on link click ==========
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ========== Animate on Scroll ==========
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(function (el) {
    observer.observe(el);
  });

  // ========== Counter Animation ==========
  const counters = document.querySelectorAll('.counter-number');
  let countersAnimated = false;

  function animateCounters() {
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = function () {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };
      updateCounter();
    });
    countersAnimated = true;
  }

  const counterSection = document.querySelector('.counter-section');
  if (counterSection) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(counterSection);
  }

  // ========== TOC Toggle ==========
  const tocHeader = document.querySelector('.toc-header');
  const tocList = document.querySelector('.toc-list');
  if (tocHeader && tocList) {
    tocHeader.addEventListener('click', function () {
      tocHeader.classList.toggle('collapsed');
      if (tocList.style.display === 'none') {
        tocList.style.display = 'block';
      } else {
        tocList.style.display = 'none';
      }
    });
  }

  // ========== Auto generate TOC ==========
  const articleBody = document.querySelector('.article-body');
  const tocListContainer = document.querySelector('.toc-list');
  if (articleBody && tocListContainer) {
    const headings = articleBody.querySelectorAll('h2, h3');
    tocListContainer.innerHTML = '';
    headings.forEach(function (heading, index) {
      const id = 'section-' + index;
      heading.setAttribute('id', id);
      const li = document.createElement('li');
      if (heading.tagName === 'H3') {
        li.classList.add('toc-h3');
      }
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = heading.textContent;
      li.appendChild(a);
      tocListContainer.appendChild(li);
    });
  }

  // ========== FAQ Toggle ==========
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Close all
      faqQuestions.forEach(function (q) {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('show');
      });

      // Open clicked
      if (!isActive) {
        this.classList.add('active');
        answer.classList.add('show');
      }
    });
  });

  // ========== Share Buttons ==========
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl = '';

      if (btn.classList.contains('wa')) {
        shareUrl = 'https://api.whatsapp.com/send?text=' + title + '%20' + url;
      } else if (btn.classList.contains('fb')) {
        shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
      } else if (btn.classList.contains('tw')) {
        shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
      } else if (btn.classList.contains('tg')) {
        shareUrl = 'https://t.me/share/url?url=' + url + '&text=' + title;
      } else if (btn.classList.contains('li')) {
        shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });

  // ========== Gallery Lightbox ==========
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay active';
        overlay.innerHTML = '<span class="lightbox-close">&times;</span><img src="' + img.src + '" alt="' + (img.alt || '') + '">';
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.addEventListener('click', function () {
          overlay.classList.remove('active');
          setTimeout(function () {
            overlay.remove();
            document.body.style.overflow = '';
          }, 300);
        });
      }
    });
  });

  // ========== Smooth Scroll for anchor links ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ========== Year in footer ==========
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
