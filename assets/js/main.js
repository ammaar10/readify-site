/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    loadFooter();
    highlightCurrentPage();
});

function loadNavigation() {
    const navHTML = `
        <nav class="navbar">
            <div class="logo">Readify.</div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="explorer.html">Explorer</a></li>
                <li><a href="tracker.html">Tracker</a></li>
                <li><a href="recommender.html">Recommender</a></li>
                <li><a href="flow.html">Reading Flow</a></li>
                <li><a href="feedback.html">Feedback</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    `;

    // check if header exists before writing to it
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = navHTML;
    }

    // mobile logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

function loadFooter() {
    const footerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Readify</h3>
                <p>Your ultimate reading companion.</p>
            </div>
            <div class="footer-section">
                <h3>Newsletter</h3>
                <input type="email" id="newsletter-email" placeholder="Enter your email">
                <button onclick="subscribeNewsletter()">Subscribe</button>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 Readify. All rights reserved.
        </div>
    `;

    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active-link');
        }
    });
}

function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value;

    if (email) {
        localStorage.setItem('newsletterEmail', email);
        alert('Thank you for subscribing!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email.');
    }
}