
/* =========================================================
   SAI SAMYUKTHA PAMMI PORTFOLIO — INTERACTIONS
   Includes the updated 14-card Leadership & Impact modal.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("site-header");
    const menuButton = document.getElementById("mobile-menu-button");
    const navLinksContainer = document.getElementById("nav-links");
    const navLinks = Array.from(
        document.querySelectorAll(".nav-link")
    );

    function updateHeader() {
        header?.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    menuButton?.addEventListener("click", () => {
        const isOpen =
            navLinksContainer?.classList.toggle("open") ??
            false;

        menuButton.classList.toggle("open", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinksContainer?.classList.remove("open");
            menuButton?.classList.remove("open");

            menuButton?.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");
        });
    });


    /* =====================================================
       IMAGE GALLERIES
    ===================================================== */

    const galleries = Array.from(
        document.querySelectorAll(".gallery")
    );

    function showSlide(gallery, requestedIndex) {
        const slides = Array.from(
            gallery.querySelectorAll(".gallery-slide")
        );

        if (!slides.length) return;

        const index =
            ((requestedIndex % slides.length) +
                slides.length) %
            slides.length;

        gallery.dataset.galleryIndex = String(index);

        slides.forEach((slide, slideIndex) => {
            const active = slideIndex === index;

            slide.classList.toggle("active", active);

            slide.setAttribute(
                "aria-hidden",
                String(!active)
            );
        });

        const counter = gallery.querySelector(
            ".gallery-counter"
        );

        if (counter) {
            counter.textContent =
                `${String(index + 1).padStart(2, "0")} / ` +
                `${String(slides.length).padStart(2, "0")}`;
        }
    }


    /* =====================================================
       INITIALISE GALLERIES + MOBILE SWIPE
    ===================================================== */

    galleries.forEach((gallery) => {
        const slides = Array.from(
            gallery.querySelectorAll(".gallery-slide")
        );

        const initial = Math.max(
            0,
            slides.findIndex((slide) =>
                slide.classList.contains("active")
            )
        );

        showSlide(gallery, initial);

        let startX = 0;

        gallery.addEventListener(
            "touchstart",
            (event) => {
                startX = event.changedTouches[0].screenX;
            },
            { passive: true }
        );

        gallery.addEventListener(
            "touchend",
            (event) => {
                const difference =
                    startX -
                    event.changedTouches[0].screenX;

                if (Math.abs(difference) < 50) return;

                const current = Number(
                    gallery.dataset.galleryIndex || 0
                );

                showSlide(
                    gallery,
                    current + (difference > 0 ? 1 : -1)
                );
            },
            { passive: true }
        );
    });


    /* =====================================================
       GALLERY ARROWS
    ===================================================== */

    document.addEventListener("click", (event) => {
        const button = event.target.closest(
            ".gallery-prev, .gallery-next"
        );

        if (!button) return;

        const gallery = button.closest(".gallery");

        if (!gallery) return;

        event.preventDefault();
        event.stopPropagation();

        const current = Number(
            gallery.dataset.galleryIndex || 0
        );

        const direction = button.classList.contains(
            "gallery-next"
        )
            ? 1
            : -1;

        showSlide(gallery, current + direction);
    });


    /* =====================================================
       PROJECT SELECTOR
    ===================================================== */

    const projectTabs = Array.from(
        document.querySelectorAll(".project-tab")
    );

    const projectPanels = Array.from(
        document.querySelectorAll(".project-panel")
    );

    function activateProject(projectKey) {
        if (!projectKey) return;

        projectTabs.forEach((tab) => {
            const active =
                tab.dataset.project === projectKey;

            tab.classList.toggle("active", active);

            tab.setAttribute(
                "aria-selected",
                String(active)
            );

            tab.setAttribute(
                "tabindex",
                active ? "0" : "-1"
            );
        });

        projectPanels.forEach((panel) => {
            const active =
                panel.dataset.projectPanel === projectKey;

            panel.classList.toggle("active", active);

            panel.setAttribute(
                "aria-hidden",
                String(!ac