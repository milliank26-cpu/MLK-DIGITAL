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

// 4. Strictly URL-encode the final compiled string
const encodedMessage = encodeURIComponent(rawMessage);

// 5. WhatsApp direct chat link
// Replace 2567XXXXXXXX with your actual WhatsApp number
const whatsappNumber = '256768527454';
const targetUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

// 6. Create a temporary physical link element
const dynamicLink = document.createElement('a');
dynamicLink.href = targetUrl;
dynamicLink.target = '_blank';
dynamicLink.rel = 'noopener noreferrer';

// 7. Trigger the WhatsApp link
document.body.appendChild(dynamicLink);
dynamicLink.click();
document.body.removeChild(dynamicLink);

// 8. Reset the form
contactForm.reset();


});
