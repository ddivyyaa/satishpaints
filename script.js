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

function updateHeaderOnScroll() {
    header.classList.toggle("scrolled", window.scrollY > 80);
}

window.addEventListener("scroll", updateHeaderOnScroll);
updateHeaderOnScroll();


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
// Contact Form Submission (Web3Forms)
// ===============================

const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitBtn = form ? form.querySelector("button[type=submit]") : null;

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";
        formStatus.textContent = "";
        formStatus.className = "form-status";

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    formStatus.textContent = "Thank you! Your enquiry has been submitted successfully.";
                    formStatus.classList.add("success");
                    form.reset();
                } else {
                    formStatus.textContent = "Something went wrong. Please try again or call us directly.";
                    formStatus.classList.add("error");
                }

            })
            .catch(() => {
                formStatus.textContent = "Network error. Please check your connection and try again.";
                formStatus.classList.add("error");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });

    });

}