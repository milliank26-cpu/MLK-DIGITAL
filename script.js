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

// 4. Send contact form to WhatsApp
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values from the form
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const packageName = document.getElementById('package').options[
            document.getElementById('package').selectedIndex
        ].text;
        const message = document.getElementById('message').value.trim();

        // Create WhatsApp message
        const rawMessage = `Hello, I would like to make an enquiry.

Name / Business: ${name}
Phone: ${phone}
Package: ${packageName}

Business description:
${message}`;

        // Encode message
        const encodedMessage = encodeURIComponent(rawMessage);

        // Your WhatsApp number — digits only
        const whatsappNumber = '256768527454';

        // Open WhatsApp
        const targetUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.location.href = targetUrl;
    });
}
});
