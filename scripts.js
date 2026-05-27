// Portfolio interactions are intentionally lightweight and framework-free.
(() => {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector("[data-header]");
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navMenu = document.querySelector("[data-nav-menu]");
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const sections = document.querySelectorAll("[data-section]");
    const revealItems = document.querySelectorAll("[data-reveal]");
    const skillTags = document.querySelectorAll("[data-skill]");
    const counters = document.querySelectorAll("[data-count]");
    const currentYear = document.getElementById("current-year");
    const portraitImage = document.querySelector(".portrait-frame img");

    // Keep the footer current without touching the markup every year.
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear().toString();
    }

    // Hide a missing profile image and replace it with a clean monogram fallback.
    if (portraitImage) {
        const handlePortraitError = () => {
            const frame = portraitImage.closest(".portrait-frame");
            if (frame) {
                frame.classList.add("is-missing");
            }
            portraitImage.remove();
        };

        if (portraitImage.complete && portraitImage.naturalWidth === 0) {
            handlePortraitError();
        } else {
            portraitImage.addEventListener("error", handlePortraitError, { once: true });
        }
    }

    // Add a subtle header treatment after the user starts scrolling.
    const updateHeaderState = () => {
        if (!header) {
            return;
        }
        header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    // Mobile navigation with accessible expanded state.
    const closeMenu = () => {
        if (!navToggle || !navMenu) {
            return;
        }
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        document.body.classList.remove("nav-open");
    };

    const toggleMenu = () => {
        if (!navToggle || !navMenu) {
            return;
        }
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navMenu.classList.toggle("is-open", !isOpen);
        document.body.classList.toggle("nav-open", !isOpen);
    };

    if (navToggle) {
        navToggle.addEventListener("click", toggleMenu);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Smooth anchor scrolling while preserving reduced-motion preferences.
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            closeMenu();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
            history.pushState(null, "", href);
        });
    });

    // Reveal sections as they enter the viewport for a refined, non-flashy feel.
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -8% 0px"
        });

        revealItems.forEach((item, index) => {
            item.style.setProperty("--reveal-delay", `${Math.min(index * 35, 260)}ms`);
            revealObserver.observe(item);
        });

        // Fail-safe: content should never stay hidden if observer callbacks are delayed.
        window.setTimeout(() => {
            revealItems.forEach((item) => item.classList.add("is-visible"));
        }, 1400);
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    // Skill tags animate independently so the skills section feels responsive and alive.
    skillTags.forEach((tag, index) => {
        tag.style.setProperty("--delay", `${(index % 12) * 45}ms`);
    });

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.25
        });

        skillTags.forEach((tag) => skillObserver.observe(tag));

        // Fail-safe for browsers or embedded previews with unreliable observer callbacks.
        window.setTimeout(() => {
            skillTags.forEach((tag) => tag.classList.add("is-visible"));
        }, 1600);
    } else {
        skillTags.forEach((tag) => tag.classList.add("is-visible"));
    }

    // Animated metrics add polish without introducing heavy dependencies.
    const formatNumber = (value, decimals) => {
        if (decimals > 0) {
            return value.toFixed(decimals);
        }
        return Math.round(value).toLocaleString("en-GB");
    };

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.count);
        const decimals = Number(counter.dataset.decimals || 0);
        const duration = 1100;
        const startTime = performance.now();

        const tick = (now) => {
            const elapsed = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - elapsed, 3);
            counter.textContent = formatNumber(target * eased, decimals);

            if (elapsed < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = formatNumber(target, decimals);
            }
        };

        requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.8
        });

        counters.forEach((counter) => counterObserver.observe(counter));
    } else {
        counters.forEach((counter) => {
            const decimals = Number(counter.dataset.decimals || 0);
            counter.textContent = formatNumber(Number(counter.dataset.count), decimals);
        });
    }

    // Highlight the active section in the sticky navigation.
    if ("IntersectionObserver" in window && sections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
                });
            });
        }, {
            threshold: 0.2,
            rootMargin: "-42% 0px -42% 0px"
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }
})();
