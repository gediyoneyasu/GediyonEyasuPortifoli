// Mobile menu functionality
const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navbarLinks.forEach((link) => {
    link.addEventListener("click", () => menuOpenButton.click());
});

// Text animation for hero section
const text = document.querySelector(".second-text");
const textload = () => {
    setTimeout(() => { text.textContent = "Graphic Designer"; }, 0);
    setTimeout(() => { text.textContent = "Mobile App Developer"; }, 4000);
    setTimeout(() => { text.textContent = "Website Developer"; }, 8000);
};
textload();
setInterval(textload, 12000);

// Contact form submission with Formspree
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get values
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();
        const submitButton = form.querySelector('.submit-button');
        const messageDiv = document.getElementById('form-message');

        // Validation
        if (!name || !email || !message) {
            showMessage("Please fill in all fields", "error");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage("Please enter a valid email address", "error");
            return;
        }

        // Disable button
        const originalText = submitButton.textContent;
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        // Formspree endpoint from your URL
        const formspreeEndpoint = "https://formspree.io/f/meeoznzk";

        try {
            const formData = new FormData(form);

            // Convert FormData to JSON
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            if (response.ok) {
                showMessage("✅ Message sent successfully! I'll get back to you soon.", "success");
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error("Error:", error);

            // Fallback: Try direct form submission
            showMessage("📧 Sending via alternative method...", "warning");

            // Temporarily change form method to submit normally
            setTimeout(() => {
                form.removeEventListener('submit', arguments.callee);
                form.submit();
            }, 1000);
        } finally {
            // Restore button after a delay (in case of fallback)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });

    // Helper function to show messages
    function showMessage(text, type) {
        const messageDiv = document.getElementById('form-message');
        messageDiv.textContent = text;

        // Set styles based on message type
        switch (type) {
            case 'success':
                messageDiv.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
                messageDiv.style.color = "#00ff00";
                messageDiv.style.border = "1px solid #00ff00";
                break;
            case 'error':
                messageDiv.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
                messageDiv.style.color = "#ff0000";
                messageDiv.style.border = "1px solid #ff0000";
                break;
            case 'warning':
                messageDiv.style.backgroundColor = "rgba(255, 165, 0, 0.1)";
                messageDiv.style.color = "#ffa500";
                messageDiv.style.border = "1px solid #ffa500";
                break;
        }

        messageDiv.style.display = "block";

        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = "none";
        }, 5000);
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Active navigation link
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (window.scrollY >= (section.offsetTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// CSS for active link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background: #0cdbea !important;
        color: #252525 !important;
        font-weight: 600;
    }
    #form-message { 
        transition: all 0.3s ease; 
    }
`;
document.head.appendChild(style);

// Add some interactive effects to project cards
document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        const icon = box.querySelector('.project-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    box.addEventListener('mouseleave', () => {
        const icon = box.querySelector('.project-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Form input validation styling
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '#0cdbea';
        }
    });

    input.addEventListener('focus', function () {
        this.style.borderColor = '#0cdbea';
        this.style.boxShadow = '0 0 0 2px rgba(0, 255, 238, 0.2)';
    });
});