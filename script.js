// ========== TRANSLATIONS ==========
const translations = {
  id: {
    "nav.about": "Tentang",
    "nav.experience": "Pengalaman",
    "nav.projects": "Project",
    "hero.role": "Web Developer • Mobile Developer • UI/UX Designer",
    "hero.subtitle": "Saya Sanxnn — mahasiswa Teknik Informatika di Politeknik Negeri Jember yang bersemangat membangun solusi digital.",
    "hero.projects-btn": "Lihat Project",
    "hero.cv-btn": "Download CV",
    "about.title": "Tentang Saya",
    "about.p1": "Halo! Saya <strong>Sanxnn</strong>, mahasiswa <strong>Teknik Informatika</strong> di <strong>Politeknik Negeri Jember</strong>.",
    "about.p2": "Saya fokus pada pengembangan web & aplikasi, dengan pengalaman magang selama 6 bulan di <strong>PT Universal Big Data, Malang</strong>.",
    "about.p3": "Saya percaya teknologi harus dibangun dengan prinsip: <em>clean code, user-centric design, dan scalable architecture</em>.",
    "about.skills": "Keahlian",
    "experience.title": "Pengalaman",
    "experience.desc": "Mengembangkan sistem berbasis web dengan Laravel & React. Fokus pada integrasi API, optimasi performa, dan UI/UX refinement.",
    "projects.title": "Project",
    "projects.p1.title": "Project Name",
    "projects.p1.desc": "Deskripsi singkat project. Teknologi yang digunakan, tujuan, dan hasil.",
    "projects.p2.title": "Mobile App",
    "projects.p2.desc": "Aplikasi Android/iOS untuk manajemen tugas. Fitur notifikasi, sinkron cloud, dan UI responsif.",
    "projects.p3.title": "UI/UX Design",
    "projects.p3.desc": "Redesign antarmuka sistem manajemen sekolah — peningkatan usability & aksesibilitas.",
    "projects.view": "Lihat Demo",
    "projects.code": "Source Code",
    "projects.proto": "Lihat Prototype",
    "footer.note": "Template portofolio — siap dikustomisasi."
  },
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "hero.role": "Web Developer • Mobile Developer • UI/UX Designer",
    "hero.subtitle": "I'm Sanxnn — an enthusiastic Informatics Engineering student at Politeknik Negeri Jember, passionate about building digital solutions.",
    "hero.projects-btn": "View Projects",
    "hero.cv-btn": "Download CV",
    "about.title": "About Me",
    "about.p1": "Hi! I'm <strong>Sanxnn</strong>, an <strong>Informatics Engineering</strong> student at <strong>Politeknik Negeri Jember</strong>.",
    "about.p2": "I focus on web & app development, with a 6-month internship experience at <strong>PT Universal Big Data, Malang</strong>.",
    "about.p3": "I believe technology should be built with: <em>clean code, user-centric design, and scalable architecture</em>.",
    "about.skills": "Skills",
    "experience.title": "Experience",
    "experience.desc": "Developed web-based systems using Laravel & React. Focused on API integration, performance optimization, and UI/UX refinement.",
    "projects.title": "Projects",
    "projects.p1.title": "Project Name",
    "projects.p1.desc": "Brief project description. Technologies used, goals, and outcomes.",
    "projects.p2.title": "Mobile App",
    "projects.p2.desc": "Android/iOS task management app with notifications, cloud sync, and responsive UI.",
    "projects.p3.title": "UI/UX Design",
    "projects.p3.desc": "Redesigned school management system interface — improved usability & accessibility.",
    "projects.view": "View Demo",
    "projects.code": "Source Code",
    "projects.proto": "View Prototype",
    "footer.note": "Portfolio template — ready to customize."
  }
};

// ========== DOM ELEMENTS ==========
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const langFlag = document.getElementById('lang-flag');
const langLoading = document.getElementById('lang-loading');

// ========== HELPER: Apply language instantly (no loading) ==========
function applyLanguage(lang) {
  html.setAttribute('lang', lang);
  html.setAttribute('data-lang', lang);
  langFlag.textContent = lang === 'id' ? '🇮🇩' : '🇬🇧';
  translatePage(lang);
  localStorage.setItem('lang', lang);
}

// ========== TRANSLATE PAGE ==========
function translatePage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
}

// ========== THEME TOGGLE ==========
function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.innerHTML = `<i class="fas fa-${theme === 'dark' ? 'moon' : 'sun'}"></i>`;
}

// ========== LANGUAGE TOGGLE (with loading for user action) ==========
function toggleLanguage() {
  const current = html.getAttribute('data-lang');
  const newLang = current === 'id' ? 'en' : 'id';

  langLoading.classList.add('active');

  // Delay realistic: 300ms cukup (1000ms terlalu lama)
  setTimeout(() => {
    applyLanguage(newLang);
    langLoading.classList.remove('active');
  }, 800);
}

// ========== INIT: Theme & Language (NO LOADING on first load!) ==========
// Theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Language — ✅ apply langsung, TANPA loading
const savedLang = localStorage.getItem('lang') || 'id';
applyLanguage(savedLang); // ← ini yang penting: tidak pakai setLanguage()

// ========== EVENT LISTENERS ==========
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

langToggle.addEventListener('click', toggleLanguage);

// ========== SCROLL ANIMATIONS ==========
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up, .timeline-item, .project-card').forEach(el => {
    observer.observe(el);
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');
const menuIcon = mobileMenuBtn.querySelector('i');

function closeMenu() {
  navLinks.classList.remove('active');
  navOverlay.classList.remove('active');
  menuIcon.className = 'fas fa-bars';
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', () => {
  const isActive = navLinks.classList.toggle('active');
  navOverlay.classList.toggle('active', isActive);
  menuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
  document.body.style.overflow = isActive ? 'hidden' : '';
});

// Tutup saat klik: overlay, link, atau tombol toggle
document.querySelectorAll('.nav-overlay, .nav-link, .nav-actions .btn-icon').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link')) {
      // Biarkan link jalan dulu, baru tutup
      setTimeout(closeMenu, 200);
    } else {
      closeMenu();
    }
  });
});