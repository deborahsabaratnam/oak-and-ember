
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".carousel-dots .dot");
    const prevBtn = document.querySelector(".carousel-arrow.prev");
    const nextBtn = document.querySelector(".carousel-arrow.next");

    if (!slides.length) return;

    let currentSlide = 0;
    let autoSlide;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const isActive = i === currentSlide;
            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));

            // Prevent keyboard focus on hidden slide links.
            slide.inert = !isActive;
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
            dot.setAttribute(
                "aria-pressed",
                String(i === currentSlide)
            );
        });
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    function startAutoSlide() {
        stopAutoSlide();

        if (!reducedMotion) {
            autoSlide = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }
    }

    prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        startAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoSlide();
        });
    });

    const hero = document.querySelector(".hero");

    hero.addEventListener("mouseenter", stopAutoSlide);
    hero.addEventListener("mouseleave", startAutoSlide);
    hero.addEventListener("focusin", stopAutoSlide);
    hero.addEventListener("focusout", event => {
        if (!hero.contains(event.relatedTarget)) {
            startAutoSlide();
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    showSlide(0);
    startAutoSlide();
});


/* ========================================
   MENU CATEGORY FILTERING
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".menu-filter");
    const menuCategories = document.querySelectorAll(".menu-category");

    if (!filterButtons.length || !menuCategories.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.category;

            filterButtons.forEach(btn => {
                const isActive = btn === button;
                btn.classList.toggle("active", isActive);
                btn.setAttribute("aria-pressed", String(isActive));
            });

            menuCategories.forEach(category => {
                const isActive =
                    category.dataset.menu === selectedCategory;

                category.classList.toggle("active", isActive);
                category.hidden = !isActive;
            });

        });
    });

});


/* ========================================
   RESERVATION EMAIL ENQUIRY
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const reservationForm =
        document.getElementById("reservation-form");

    if (!reservationForm) return;

    const dateInput =
        document.getElementById("reservation-date");

    // Prevent selecting dates in the past.
    const today = new Date();
    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localToday;

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!reservationForm.reportValidity()) return;

        const name =
            document.getElementById("guest-name").value.trim();

        const email =
            document.getElementById("guest-email").value.trim();

        const phone =
            document.getElementById("guest-phone").value.trim();

        const guests =
            document.getElementById("guest-count").value;

        const date =
            document.getElementById("reservation-date").value;

        const time =
            document.getElementById("reservation-time").value;

        const requests =
            document.getElementById("reservation-requests")
                .value.trim() || "None";

        const subject =
            `Reservation Enquiry - ${name}`;

        const body = [
            "Hello Oak & Ember Team,",
            "",
            "I would like to enquire about a reservation.",
            "",
            `Full Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Number of Guests: ${guests}`,
            `Preferred Date: ${date}`,
            `Preferred Time: ${time}`,
            "",
            `Special Requests: ${requests}`,
            "",
            "Please let me know if this reservation is available.",
            "",
            "Thank you."
        ].join("\n");

        // Replace with a real restaurant email address
        // before using this on a live business website.
        const restaurantEmail = "hello@oakandember.example";

        const mailtoLink =
            `mailto:${restaurantEmail}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    });

});

/* ========================================
   MOBILE NAVIGATION
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    function closeMenu() {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    // Close menu after selecting a navigation link.
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu when switching to desktop width.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });

    // Close menu with Escape key.
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

});
