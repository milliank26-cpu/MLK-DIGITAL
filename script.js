/* ----------------------------------------------------
   Weblaunx — Functional Interactions Engine
   Responsive Nav Toggle, Accordion Core, Dynamic validation
------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu State Router Matrix
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    const toggleMenu = () => {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            navMenu.classList.remove('open');
            hamburgerBtn.classList.remove('open');
            document.body.style.overflow = '';
        } else {
            navMenu.classList.add('open');
            hamburgerBtn.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close menu when a navigation item receives click focus
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // 2. Interactive FAQ Accordion Action Handler
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const currentPanel = this.nextElementSibling;
            const isActive = currentItem.classList.contains('active');
            
            // Close all existing open panels systematically
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-panel').style.maxHeight = null;
            });
            
            // If the element clicked wasn't already active, transition its panel view height open
            if (!isActive) {
                currentItem.classList.add('active');
                currentPanel.style.maxHeight = currentPanel.scrollHeight + 'px';
            }
        });
    });


    // 3. Contact Form Client-Side Validation Matrix & Submission Handler
    const enquiryForm = document.getElementById('enquiryForm');
    const formFeedback = document.getElementById('formFeedback');

    const validateField = (groupElement, condition) => {
        if (condition) {
            groupElement.classList.remove('invalid');
            return true;
        } else {
            groupElement.classList.add('invalid');
            return false;
        }
    };

    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Target specific input variables
        const bizGroup = document.getElementById('businessName').parentElement;
        const bizValue = document.getElementById('businessName').value.trim();
        if (!validateField(bizGroup, bizValue.length > 0)) isFormValid = false;
        
        const nameGroup = document.getElementById('clientName').parentElement;
        const nameValue = document.getElementById('clientName').value.trim();
        if (!validateField(nameGroup, nameValue.length > 0)) isFormValid = false;
        
        const phoneGroup = document.getElementById('contactPhone').parentElement;
        const phoneValue = document.getElementById('contactPhone').value.trim();
        if (!validateField(phoneGroup, phoneValue.length > 4)) isFormValid = false;
        
        const helpGroup = document.getElementById('helpType').parentElement;
        const helpValue = document.getElementById('helpType').value;
        if (!validateField(helpGroup, helpValue !== "")) isFormValid = false;
        
        const msgGroup = document.getElementById('clientMessage').parentElement;
        const msgValue = document.getElementById('clientMessage').value.trim();
        if (!validateField(msgGroup, msgValue.length > 5)) isFormValid = false;
        
        // Optional email check validation pass rule if string content exists
        const emailInput = document.getElementById('contactEmail');
        const emailGroup = emailInput.parentElement;
        const emailValue = emailInput.value.trim();
        if (emailValue.length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!validateField(emailGroup, emailRegex.test(emailValue))) isFormValid = false;
        } else {
            emailGroup.classList.remove('invalid');
        }

        // If structure passes structural criteria validation rules, render response output success flow
        if (isFormValid) {
            formFeedback.className = 'form-feedback success';
            formFeedback.innerText = 'Thank you for reaching out! Your enquiry has been processed successfully. Our digital strategy partner team will connect with you via your provided phone / WhatsApp details shortly.';
            
            // To update or replace the email handoff hook down the line, adjust your endpoint routing or mailto strings here
            console.log('Weblaunx Form Submitted Details:', {
                business: bizValue,
                name: nameValue,
                phone: phoneValue,
                email: emailValue,
                type: helpValue,
                message: msgValue
            });
            
            // Flush layout inputs upon smooth completion
            enquiryForm.reset();
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Remove negative error classes instantly as user updates inputs actively
    const inputs = enquiryForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.parentElement.classList.remove('invalid');
        });
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                this.parentElement.classList.remove('invalid');
            });
        }
    });
});
