// ===============================
// Mobile Navigation Toggle
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});


// ===============================
// Sticky Navbar Shadow on Scroll
// ===============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
    } else {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";
    }

});


// ===============================
// FAQ Accordion
// ===============================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {
                faq.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});


// ===============================
// Scroll Reveal Animation
// ===============================

const revealElements = document.querySelectorAll(
`
.section-title,
.service-card,
.about-item,
.why-card,
.process-box,
.project-card,
.brand-card,
.contact-form,
.contact-info
`
);

function revealOnScroll() {

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const rect = el.getBoundingClientRect();

        if (rect.top < triggerBottom) {

            el.style.opacity = "1";
            el.style.transform = "translateY(0)";

        }

    });

}

revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all .7s ease";

});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ===============================
// Smooth Scrolling
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ===============================
// Active Navigation Link
// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ===============================
// Contact Form Demo
// ===============================

const form = document.querySelector(".contact-form");

if (form) {

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        alert("Thank you! Your enquiry has been submitted successfully.");

        form.reset();

    });

}