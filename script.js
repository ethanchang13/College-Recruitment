document.addEventListener("DOMContentLoaded", function () {
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
});
