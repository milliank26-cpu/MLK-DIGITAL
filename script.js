document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
            mainNav.classList.toggle('active');
            
            // Basic animation transformation for hamburger button
            menuToggle.classList.toggle('open');
        });
    }

    // Close menu when a link is clicked on mobile
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('open');
            }
        });
    });

    // 2. Package Selector Interaction (Pre-fills package in contact form)
    const orderButtons = document.querySelectorAll('.order-btn');
    const packageSelect = document.getElementById('package');

    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const packageName = btn.getAttribute('data-package');
            if (packageSelect) {
                if (packageName === 'Digital Presence Setup') {
                    packageSelect.value = 'presence';
                } else if (packageName === 'Website Lite') {
                    packageSelect.value = 'lite';
                } else if (packageName === 'Simple Business Website') {
                    packageSelect.value = 'simple';
                }
            }
        });
    });

    // 3. FAQ Accordion Action
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Close other open FAQ items for a accordion behavior
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

 // 4. Contact Form redirected directly to WhatsApp (Fixed Formatting)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const packageSelected = document.getElementById('package').options[document.getElementById('package').selectedIndex].text;
        const message = document.getElementById('message').value;
        
        // Write text naturally using \n for breaks
        const rawMessage = `Hello MLK Digital,\n\nI would like to make an enquiry:\n*Name:* ${name}\n*Phone:* ${phone}\n*Package:* ${packageSelected}\n*Business Brief:* ${message}`;
        
        // Encode everything cleanly at once
        const encodedMessage = encodeURIComponent(rawMessage);
        
        // Clean URL structure without spaces, symbols, or double-encoding bugs
        const whatsappUrl = `https://wa.me{encodedMessage}`;
        
        // Overrides browser restrictions on Android devices to fire the WhatsApp app directly
        window.location.href = whatsappUrl;
        
        contactForm.reset();
    });
}

});
