// ふわっとでるアニメーション
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.15}s`;
      entry.target.classList.add('active');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

fadeElements.forEach(el => fadeObserver.observe(el));


// お問合せボタン & ハンバーガーボタン
const spacer = document.querySelector('.mainvisual-spacer');
const btnArea = document.querySelector('.btn-area');
const hamburgerBtn = document.querySelector('.hamburger-menu');

if (spacer) {
  const btnObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        btnArea.classList.add('is-visible');
        hamburgerBtn.classList.add('is-show');
      } else {
        btnArea.classList.remove('is-visible');
        hamburgerBtn.classList.remove('is-show');
      }
    });
  }, { threshold: 0 });

  btnObserver.observe(spacer);
} else {
  btnArea.classList.add('is-visible');
  hamburgerBtn.classList.add('is-show');
}

// ハンバーガーメニュー開閉
const hamburgerNav = document.querySelector('.hamburger-navigation');

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('active');
  hamburgerNav.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-list-sp a, .cta-btn-sp, .line-btn-sp');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('active');
    hamburgerNav.classList.remove('active');
  });
});


// FAQアコーディオン
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    faqItems.forEach(other => other.classList.remove('is-open'));
    if (!isOpen) {
      item.classList.add('is-open');
    }
  });
});


// サイドナビ:スクロールでアクティブ切り替え(SERVICE・FAQ・WORKS共通)
const sideLinks = document.querySelectorAll('.side-nav-link');
const sideNavTargets = document.querySelectorAll('.faq-group, .service-block, .works-container01');

if (sideLinks.length > 0 && sideNavTargets.length > 0) {
  const sideNavObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      let correspondingLink = null;

      // WORKSページ:data-categoryで紐付け
      if (entry.target.hasAttribute('data-category')) {
        const category = entry.target.getAttribute('data-category');
        correspondingLink = document.querySelector(`.side-nav-link[data-category="${category}"]`);
      } else {
        // SERVICE・FAQページ:idで紐付け(今まで通り)
        const id = entry.target.getAttribute('id');
        correspondingLink = document.querySelector(`.side-nav-link[href="#${id}"]`);
      }

      if (correspondingLink) {
        sideLinks.forEach(link => link.classList.remove('is-active'));
        correspondingLink.classList.add('is-active');
      }
    });
  }, {
    rootMargin: '-40% 0px -40% 0px'
  });

  sideNavTargets.forEach(target => sideNavObserver.observe(target));
}

