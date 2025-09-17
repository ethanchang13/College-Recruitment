document.addEventListener("DOMContentLoaded", function () {
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    const programFilterButtons = document.querySelectorAll(
        ".program-filter button"
    );
    const programCards = document.querySelectorAll(".program-card");

    programFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            programFilterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            programCards.forEach((card) => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    const inquiryForm = document.getElementById("inquiryForm");
    if (inquiryForm) {
        inquiryForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            alert("Thank you for your interest! We will contact you soon.");
            this.reset();
        });
    }

    const stats = document.querySelectorAll(".stat-number");
    const observerOptions = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute("data-value"));
                animateValue(target, 0, endValue, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach((stat) => observer.observe(stat));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Scroll-triggered animations
    const scrollAnimationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    // Add animation classes to sections and observe them
    document.addEventListener("DOMContentLoaded", function () {
        // Animate section headings
        document.querySelectorAll("section h2").forEach((heading) => {
            scrollAnimationObserver.observe(heading);
        });

        // Animate program cards with stagger effect
        document.querySelectorAll(".program-card").forEach((card, index) => {
            card.classList.add("fade-in", "stagger-delay");
            card.style.transitionDelay = `${index * 0.1}s`;
            scrollAnimationObserver.observe(card);
        });

        // Animate campus features
        document
            .querySelectorAll(".campus-features > div")
            .forEach((feature, index) => {
                feature.classList.add("slide-left", "stagger-delay");
                feature.style.transitionDelay = `${index * 0.2}s`;
                scrollAnimationObserver.observe(feature);
            });

        // Animate stats cards
        document.querySelectorAll(".stats-card").forEach((card, index) => {
            card.classList.add("scale-in", "stagger-delay");
            card.style.transitionDelay = `${index * 0.15}s`;
            scrollAnimationObserver.observe(card);
        });

        // Animate alumni section content
        const alumniImage = document.querySelector("#alumni .position-relative");
        const alumniContent = document.querySelector("#alumni .d-flex");

        if (alumniImage) {
            alumniImage.classList.add("slide-left");
            scrollAnimationObserver.observe(alumniImage);
        }

        if (alumniContent) {
            alumniContent.classList.add("slide-right");
            scrollAnimationObserver.observe(alumniContent);
        }

        // Animate student life image and content
        const studentLifeImage = document.querySelector(
            "#student-life .position-relative"
        );
        const studentLifeContent = document.querySelector(
            "#student-life .campus-features"
        );

        if (studentLifeImage) {
            studentLifeImage.classList.add("slide-right");
            scrollAnimationObserver.observe(studentLifeImage);
        }

        if (studentLifeContent) {
            studentLifeContent.classList.add("slide-left");
            scrollAnimationObserver.observe(studentLifeContent);
        }

        // Animate admissions card
        const admissionsCard = document.querySelector("#costs .card");
        if (admissionsCard) {
            admissionsCard.classList.add("fade-in");
            scrollAnimationObserver.observe(admissionsCard);
        }
    });
});
