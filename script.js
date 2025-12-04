// ===========================
// Data Loading and Initialization
// ===========================

let coursesData = [];
let contactsData = [];
let settings = {};

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        coursesData = data.courses;
        contactsData = data.contacts;
        settings = data.settings || {};
        
        renderCourseCards();
        
        // Show/hide contacts section based on settings
        if (settings.showContactsSection) {
            renderContactCards();
        } else {
            hideContactsSection();
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Hide contacts section and navigation
function hideContactsSection() {
    // Hide the section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.style.display = 'none';
    }
    
    // Hide navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#contact') {
            link.parentElement.style.display = 'none';
        }
    });
    
    // Hide footer link
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        if (link.getAttribute('href') === '#contact') {
            link.parentElement.style.display = 'none';
        }
    });
}

// ===========================
// Check if course is new (added within last 7 days)
// ===========================

function isNewCourse(addedDate) {
    if (!addedDate) return false;
    
    const added = new Date(addedDate);
    const today = new Date();
    const diffTime = today - added;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 7;
}

// ===========================
// Render Course Cards (Grid View)
// ===========================

function renderCourseCards() {
    const courseGrid = document.getElementById('courseGrid');
    courseGrid.innerHTML = '';
    
    coursesData.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.setAttribute('data-course-id', course.id);
        
        // Check if course is new
        const isNew = isNewCourse(course.addedDate);
        if (isNew) {
            card.classList.add('new-course');
        }
        
        // Check if it's a Zoom session
        const locationIcon = course.mainSession.location.includes('Zoom') || course.mainSession.location.includes('זום') || course.mainSession.location.includes('زووم') 
            ? 'fa-video' 
            : 'fa-map-marker-alt';
        
        // Count active sessions (excluding cancelled)
        const activeSessions = course.sessions.filter(s => !s.isCancelled).length;
        
        card.innerHTML = `
            ${isNew ? '<div class="new-badge"><i class="fas fa-sparkles"></i> جديد</div>' : ''}
            <div class="course-header">
                <h3 class="course-name">${course.name}</h3>
                <span class="course-code">${course.code}</span>
            </div>
            ${course.instructor ? `
                <div class="course-instructor">
                    <i class="fas fa-user-tie"></i>
                    <span>${course.instructor}</span>
                </div>
            ` : ''}
            <div class="course-summary">
                <div class="summary-item">
                    <i class="fas fa-calendar-day"></i>
                    <span class="summary-day">${course.mainSession.day}</span>
                </div>
                <div class="summary-item">
                    <i class="fas fa-clock"></i>
                    <span class="summary-time">${course.mainSession.time}</span>
                </div>
                <div class="summary-item">
                    <i class="fas ${locationIcon}"></i>
                    <span class="summary-location">${course.mainSession.location}</span>
                </div>
            </div>
            <div class="course-cta">
                <i class="fas fa-info-circle"></i>
                عرض جميع الجلسات (${activeSessions})
            </div>
        `;
        
        card.addEventListener('click', () => openCourseModal(course));
        courseGrid.appendChild(card);
    });
}

// ===========================
// Modal Functionality
// ===========================

function openCourseModal(course) {
    const modal = document.getElementById('sessionModal');
    const modalBody = document.getElementById('modalBody');
    
    // Build session list HTML with accordion
    let activeSessionNumber = 0; // Counter for active (non-cancelled) sessions
    let sessionsHTML = course.sessions.map((session, index) => {
        const isTBD = session.isTBD || session.date === 'TBD';
        const isCancelled = session.isCancelled || false;
        const isZoom = session.isZoom || session.location.includes('Zoom') || session.location.includes('זום') || session.location.includes('زووم');
        const locationIcon = isZoom ? 'fa-video' : 'fa-map-marker-alt';
        
        // Only increment number for non-cancelled sessions
        if (!isCancelled) {
            activeSessionNumber++;
        }
        const displayNumber = activeSessionNumber;
        
        return `
        <div class="session-accordion ${session.isMarathon ? 'marathon' : ''} ${isTBD ? 'tbd' : ''} ${isCancelled ? 'cancelled' : ''}" data-session-index="${index}">
            <div class="session-accordion-header" onclick="toggleAccordion(${index})">
                <div class="session-number-badge ${isCancelled ? 'cancelled-badge' : ''}">${isCancelled ? '<i class="fas fa-times"></i>' : '#' + displayNumber}</div>
                <div class="session-summary-content">
                    <div class="session-summary-line">
                        ${isCancelled ? '<span class="session-type-badge cancelled-badge"><i class="fas fa-ban"></i> جلسة ملغاة</span>' : ''}
                        ${session.isMarathon ? '<span class="session-type-badge marathon-badge"><i class="fas fa-bolt"></i> جلسة ماراثون</span>' : ''}
                        ${isTBD ? '<span class="session-type-badge tbd-badge"><i class="fas fa-clock"></i> سيُحدد لاحقاً</span>' : ''}
                    </div>
                    <div class="session-summary-info">
                        ${session.date && session.date !== 'TBD' ? `
                            <span class="info-item">
                                <i class="fas fa-calendar"></i>
                                ${session.date}
                            </span>
                        ` : ''}
                        <span class="info-item">
                            <i class="fas fa-calendar-day"></i>
                            ${session.day}
                        </span>
                        ${!isTBD ? `
                            <span class="info-item">
                                <i class="fas fa-clock"></i>
                                ${session.time}
                            </span>
                        ` : ''}
                    </div>
                </div>
                <button class="accordion-toggle" aria-label="توسيع/طي">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <div class="session-accordion-content" id="session-content-${index}">
                <div class="session-details">
                    ${!isTBD ? `
                    <div class="detail-row">
                        <i class="fas ${locationIcon}"></i>
                        ${isZoom && course.zoomLink ? `
                            <a href="${course.zoomLink}" target="_blank" class="session-location-link" title="انقر للانضمام عبر Zoom">
                                ${session.location}
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : `
                            <span>${session.location}</span>
                        `}
                    </div>
                    ` : ''}
                    ${isZoom && course.zoomLink && !isTBD ? `
                    <div class="detail-row zoom-credentials">
                        <i class="fas fa-key"></i>
                        <div class="zoom-info-compact">
                            <span>Meeting ID: ${course.zoomMeetingId || 'N/A'}</span>
                            <span>Passcode: ${course.zoomPasscode || 'N/A'}</span>
                        </div>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <i class="fas fa-info-circle"></i>
                        <span>${session.description}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${course.name}</h2>
            <span class="modal-code">${course.code}</span>
            ${course.instructor ? `
                <div class="modal-instructor">
                    <i class="fas fa-user-tie"></i>
                    <span>المُمكِّن: ${course.instructor}</span>
                </div>
            ` : ''}
        </div>
        <div class="session-list">
            ${sessionsHTML}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('sessionModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Modal close button and outside click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('sessionModal');
    const closeBtn = document.getElementById('modalClose');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
            if (whatsappModal && whatsappModal.classList.contains('active')) {
                closeWhatsAppModal();
            }
        }
    });
    
    // WhatsApp Modal
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappModal = document.getElementById('whatsappModal');
    const whatsappModalClose = document.getElementById('whatsappModalClose');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', openWhatsAppModal);
    }
    
    if (whatsappModalClose) {
        whatsappModalClose.addEventListener('click', closeWhatsAppModal);
    }
    
    if (whatsappModal) {
        whatsappModal.addEventListener('click', (e) => {
            if (e.target === whatsappModal) {
                closeWhatsAppModal();
            }
        });
    }
});

// ===========================
// WhatsApp Modal Functions
// ===========================

function openWhatsAppModal() {
    const whatsappModal = document.getElementById('whatsappModal');
    if (whatsappModal) {
        whatsappModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeWhatsAppModal() {
    const whatsappModal = document.getElementById('whatsappModal');
    if (whatsappModal) {
        whatsappModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===========================
// Render Contact Cards
// ===========================

function renderContactCards() {
    const contactGrid = document.getElementById('contactGrid');
    contactGrid.innerHTML = '';
    
    contactsData.forEach(contact => {
        const card = document.createElement('div');
        card.className = 'info-card';
        
        card.innerHTML = `
            <div class="info-icon">
                <i class="fas ${contact.icon}"></i>
            </div>
            <h3>${contact.title}</h3>
            <p class="info-desc">${contact.description}</p>
            <div class="contact-details">
                <a href="mailto:${contact.email}">${contact.email}</a>
                <a href="tel:+972${contact.phone.replace(/[^0-9]/g, '')}">${contact.phone}</a>
            </div>
        `;
        
        contactGrid.appendChild(card);
    });
}

// ===========================
// Mobile Menu Toggle
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!hamburger || !navMenu) return;
    
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===========================
// Smooth Scroll Enhancement
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Active Navigation Link
// ===========================

const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-link');

function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        if (window.pageYOffset >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href) {
            const hrefId = href.substring(1);
            if (hrefId === current) {
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// ===========================
// Toggle Accordion for Session Details
// ===========================

function toggleAccordion(index) {
    const content = document.getElementById(`session-content-${index}`);
    const accordion = content.closest('.session-accordion');
    const toggleBtn = accordion.querySelector('.accordion-toggle i');
    
    if (accordion.classList.contains('active')) {
        accordion.classList.remove('active');
        toggleBtn.style.transform = 'rotate(0deg)';
    } else {
        accordion.classList.add('active');
        toggleBtn.style.transform = 'rotate(180deg)';
    }
}

// ===========================
// Update Copyright Year
// ===========================

const copyrightYear = document.querySelector('.footer-bottom p');
if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = `&copy; ${currentYear} SAWA - جامعة تل أبيب. جميع الحقوق محفوظة.`;
}

// ===========================
// Initialize Application
// ===========================

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
