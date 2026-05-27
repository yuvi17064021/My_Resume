// Lightweight portfolio interactions: no frameworks, no dependencies.
(() => {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector("[data-header]");
    const loader = document.querySelector("[data-loader]");
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navMenu = document.querySelector("[data-nav-menu]");
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const sections = document.querySelectorAll("[data-section]");
    const revealItems = document.querySelectorAll("[data-reveal]");
    const skillTags = document.querySelectorAll("[data-skill]");
    const counters = document.querySelectorAll("[data-count]");
    const printButtons = document.querySelectorAll("[data-print]");
    const tiltCards = document.querySelectorAll("[data-tilt]");
    const currentYear = document.getElementById("current-year");
    const portraitImage = document.querySelector(".portrait-frame img");

    document.body.classList.add("is-loading");

    const hideLoader = () => {
        if (!loader) {
            document.body.classList.remove("is-loading");
            return;
        }
        loader.classList.add("is-hidden");
        document.body.classList.remove("is-loading");
    };

    window.addEventListener("load", () => window.setTimeout(hideLoader, 420));
    window.setTimeout(hideLoader, 1300);

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear().toString();
    }

    // Missing profile images degrade into a polished monogram instead of a broken icon.
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

    const updateHeaderState = () => {
        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        }
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

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

    printButtons.forEach((button) => {
        button.addEventListener("click", () => window.print());
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

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
            item.style.setProperty("--reveal-delay", `${Math.min(index * 34, 260)}ms`);
            revealObserver.observe(item);
        });

        window.setTimeout(() => {
            revealItems.forEach((item) => item.classList.add("is-visible"));
        }, 1500);
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    skillTags.forEach((tag, index) => {
        tag.style.setProperty("--delay", `${(index % 12) * 42}ms`);
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
        }, { threshold: 0.22 });

        skillTags.forEach((tag) => skillObserver.observe(tag));

        window.setTimeout(() => {
            skillTags.forEach((tag) => tag.classList.add("is-visible"));
        }, 1600);
    } else {
        skillTags.forEach((tag) => tag.classList.add("is-visible"));
    }

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
        }, { threshold: 0.75 });

        counters.forEach((counter) => counterObserver.observe(counter));
    } else {
        counters.forEach((counter) => {
            const decimals = Number(counter.dataset.decimals || 0);
            counter.textContent = formatNumber(Number(counter.dataset.count), decimals);
        });
    }

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

    // Premium but restrained card tilt, disabled on touch/coarse pointers.
    if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
        tiltCards.forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                card.style.setProperty("--tilt-y", `${x * 2.8}deg`);
                card.style.setProperty("--tilt-x", `${y * -2.8}deg`);
            });

            card.addEventListener("mouseleave", () => {
                card.style.setProperty("--tilt-y", "0deg");
                card.style.setProperty("--tilt-x", "0deg");
            });
        });
    }

    // Canvas visual: stochastic paths, Gaussian curve, particles, and data-flow lines.
    const canvas = document.getElementById("quant-canvas");
    if (!canvas || prefersReducedMotion) {
        return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
        return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.min(54, Math.max(26, Math.floor(width / 32)));
        particles = Array.from({ length: count }, (_, index) => ({
            x: (index * 97) % width,
            y: (index * 53) % height,
            vx: 0.08 + (index % 5) * 0.018,
            vy: 0.05 + (index % 7) * 0.012,
            r: 0.7 + (index % 4) * 0.28
        }));
    };

    const drawPath = (time, baseY, amplitude, color, phase) => {
        context.beginPath();
        for (let x = 0; x <= width; x += 14) {
            const t = x / width;
            const y = baseY
                + Math.sin(t * Math.PI * 4 + time * 0.001 + phase) * amplitude
                + Math.sin(t * Math.PI * 9 + time * 0.0007 + phase) * amplitude * 0.35;
            if (x === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        }
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.stroke();
    };

    const drawGaussian = (time) => {
        const centerX = width * 0.76 + mouseX * 10;
        const centerY = height * 0.24 + mouseY * 8;
        const sigma = Math.max(64, width * 0.08);
        const scale = Math.min(96, height * 0.11);

        context.beginPath();
        for (let i = -150; i <= 150; i += 5) {
            const x = centerX + i;
            const density = Math.exp(-(i * i) / (2 * sigma * sigma));
            const y = centerY + scale - density * scale * (0.88 + Math.sin(time * 0.001) * 0.05);
            if (i === -150) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        }
        context.strokeStyle = "rgba(245, 208, 111, 0.28)";
        context.lineWidth = 1.2;
        context.stroke();
    };

    const drawParticles = () => {
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x > width + 20) particle.x = -20;
            if (particle.y > height + 20) particle.y = -20;

            const px = particle.x + mouseX * (index % 5) * 4;
            const py = particle.y + mouseY * (index % 7) * 3;

            context.beginPath();
            context.arc(px, py, particle.r, 0, Math.PI * 2);
            context.fillStyle = index % 4 === 0 ? "rgba(245, 208, 111, 0.22)" : "rgba(110, 231, 200, 0.20)";
            context.fill();

            for (let j = index + 1; j < particles.length; j += 1) {
                const other = particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 92) {
                    context.beginPath();
                    context.moveTo(px, py);
                    context.lineTo(other.x + mouseX * (j % 5) * 4, other.y + mouseY * (j % 7) * 3);
                    context.strokeStyle = `rgba(143, 183, 255, ${0.06 * (1 - dist / 92)})`;
                    context.lineWidth = 1;
                    context.stroke();
                }
            }
        });
    };

    const render = (time) => {
        context.clearRect(0, 0, width, height);
        drawPath(time, height * 0.68 + mouseY * 12, 28, "rgba(110, 231, 200, 0.18)", 0.2);
        drawPath(time, height * 0.74 - mouseY * 8, 20, "rgba(143, 183, 255, 0.13)", 1.7);
        drawGaussian(time);
        drawParticles();
        requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    resizeCanvas();
    requestAnimationFrame(render);
})();
