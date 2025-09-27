// Run initializers once the DOM is fully parsed
document.addEventListener("DOMContentLoaded", function () {
  initSmoothScrolling();      // enable smooth scroll for nav links
  initScrollAnimations();     // fade-in / intersection observer animations
  initNavbarScroll();         // dynamic navbar background on scroll
  initFormValidation();       // set up quick application form submission handling
  addScrollToTopButton();     // add floating back-to-top button
  initHeroEnhancements();     // hero animations & interactive tiles

  // Gracefully handle any broken images in mini gallery
  document.querySelectorAll("#mini-gallery img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.opacity = ".35";          // fade broken image
      img.style.filter = "grayscale(1)";  // visually indicate issue
      img.alt = (img.alt || "image") + " (missing)"; // update alt text
    });
  });
});

// Smooth scroll behavior for navbar anchor links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();                 // prevent default jump
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // offset for fixed navbar
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });
}

// Reveal elements as they enter viewport
function initScrollAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, observerOptions);
  const animateElements = document.querySelectorAll(
    ".feature-card, .program-card, .student-life-item, .alumni-card"
  );
  animateElements.forEach((el) => {
    el.classList.add("fade-in");   // base animation class
    observer.observe(el);           // watch for entry
  });
}

// Adjust navbar styling after scrolling past threshold
function initNavbarScroll() {
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.backgroundColor = "rgba(13, 110, 253, 0.95)"; // more opaque when scrolled
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.backgroundColor = ""; // revert to original
      navbar.style.backdropFilter = "blur(10px)";
    }
  });
}

// Scroll to programs and animate each card with staggered pulse
function showPrograms() {
  const programsSection = document.querySelector("#programs");
  const offsetTop = programsSection.offsetTop - 80;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
  const programCards = document.querySelectorAll(".program-card");
  setTimeout(() => {
    programCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("pulse");          // temporary pulse effect
        setTimeout(() => card.classList.remove("pulse"), 1000);
      }, index * 200);                          // stagger delay
    });
  }, 800);                                      // wait for scroll finish
}

// Toggle quick application form panel with animated transition
function toggleApplicationForm() {
  const form = document.getElementById("application-form");
  const contactSection = document.querySelector("#contact");
  const placeholder = document.getElementById("application-placeholder");
  const offsetTop = contactSection.offsetTop - 80;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
  setTimeout(() => {
    const opening = form.style.display === "none" || form.style.display === "";
    if (opening) {
      if (placeholder) placeholder.style.display = "none"; // hide placeholder
      form.style.display = "block";
      form.classList.add("show");
      // start hidden for animation
      form.style.opacity = "0";
      form.style.transform = "translateY(24px) scale(.98)";
      setTimeout(() => {
        form.style.transition = "all 0.55s cubic-bezier(.16,.8,.3,1)";
        form.style.opacity = "1";
        form.style.transform = "translateY(0) scale(1)";
      }, 40);
    } else {
      // closing animation
      form.style.opacity = "0";
      form.style.transform = "translateY(18px) scale(.98)";
      setTimeout(() => {
        form.style.display = "none";
        form.classList.remove("show");
        if (placeholder) {
          placeholder.style.display = "flex";
          placeholder.style.opacity = "0";
          setTimeout(() => {
            placeholder.style.transition = "opacity .4s ease";
            placeholder.style.opacity = "1"; // fade placeholder back in
          }, 30);
        }
      }, 450);
    }
  }, 800); // delay ensures scroll finishes first
}

// Build and show a dynamic bootstrap modal with program details
function showProgramDetails(program) {
  const programData = {  // simple lookup object
    college: {
      title: "Yale College",
      duration: "4 Years",
      description:
        "Liberal arts undergraduate education with over 80 majors in humanities, sciences, and social sciences.",
      courses: [
        "Literature & Writing",
        "History & Philosophy",
        "Mathematics & Sciences",
        "Economics & Political Science",
        "Art & Music",
        "Foreign Languages",
      ],
      career:
        "Academic Research, Public Service, Business Leadership, Creative Arts",
    },
    medicine: {
      title: "Yale School of Medicine",
      duration: "4 Years",
      description:
        "World-renowned medical education combining clinical excellence with groundbreaking research.",
      courses: [
        "Anatomy & Physiology",
        "Pathology & Pharmacology",
        "Clinical Medicine",
        "Biomedical Research",
        "Public Health",
        "Medical Ethics",
      ],
      career: "Physician, Surgeon, Medical Researcher, Public Health Leader",
    },
    management: {
      title: "Yale School of Management",
      duration: "2 Years",
      description:
        "MBA program focused on developing leaders who create positive impact in organizations and society.",
      courses: [
        "Strategic Management",
        "Financial Analysis",
        "Marketing & Operations",
        "Leadership Development",
        "Social Impact",
        "Global Business",
      ],
      career:
        "CEO, Management Consultant, Investment Banker, Social Entrepreneur",
    },
  };

  const data = programData[program]; // selected dataset

  // Construct modal markup dynamically
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${data.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="text-primary">Program Overview</h6>
                            <p>${data.description}</p>
                            <h6 class="text-primary mt-3">Duration</h6>
                            <p>${data.duration}</p>
                            <h6 class="text-primary mt-3">Career Opportunities</h6>
                            <p>${data.career}</p>
                        </div>
                        <div class="col-md-6">
                            <h6 class="text-primary">Core Courses</h6>
                            <ul class="list-unstyled">
                                ${data.courses
      .map(
        (course) =>
          `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${course}</li>`
      )
      .join("")}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="toggleApplicationForm(); bootstrap.Modal.getInstance(this.closest('.modal')).hide();">Apply Now</button>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);           // inject into DOM
  const bsModal = new bootstrap.Modal(modal); // init bootstrap modal
  bsModal.show();
  // Clean up element after hiding
  modal.addEventListener("hidden.bs.modal", function () {
    document.body.removeChild(modal);
  });
}

// Simple client-side validation for quick application form
function initFormValidation() {
  const form = document.querySelector("#application-form form");
  if (!form) return; // guard if form not rendered yet
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form); // reserved if extended later
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const program = form.querySelector("select").value;
    // presence checks
    if (!name || !email || !program) {
      showNotification("Please fill in all required fields.", "warning");
      return;
    }
    // basic email syntax check
    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "danger");
      return;
    }
    // disable UI while simulating async submit
    form.style.opacity = "0.5";
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;
    setTimeout(() => {
      const programName = getProgramName(program);
      // build success notification element
      const notification = document.createElement("div");
      notification.className =
        "alert alert-success alert-dismissible fade show position-fixed";
      notification.style.cssText =
        "top: 100px; right: 20px; z-index: 9999; max-width: 300px;";
      const messageSpan = document.createElement("span");
      messageSpan.textContent = `Thank you, ${name}! Your application for ${programName} has been submitted successfully.`;
      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "btn-close";
      closeBtn.setAttribute("data-bs-dismiss", "alert");
      notification.appendChild(messageSpan);
      notification.appendChild(closeBtn);
      document.body.appendChild(notification);
      // auto dismiss sequence
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          if (notification.parentNode) document.body.removeChild(notification);
        }, 150);
      }, 5000);
      form.reset();
      form.style.opacity = "1";
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      // auto close form after a pause
      setTimeout(() => { toggleApplicationForm(); }, 2000);
    }, 2000); // simulate 2s network delay
  });
}

// Basic regex email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Map select value to human-readable program label
function getProgramName(value) {
  const programs = {
    college: "Yale College",
    medicine: "Yale School of Medicine",
    management: "Yale School of Management",
  };
  return programs[value] || value;
}

// Generic alert notification helper that auto dismisses after timeout
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText = "top: 100px; right: 20px; z-index: 9999; max-width: 300px;";
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => { if (notification.parentNode) document.body.removeChild(notification); }, 150);
  }, 5000);
}

// Create floating scroll-to-top button that appears after scrolling
function addScrollToTopButton() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  scrollBtn.className = "btn btn-primary scroll-top-btn";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollBtn);
  window.addEventListener("scroll", function () {
    scrollBtn.style.display = window.pageYOffset > 300 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Highlight current nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
  });
}

// Activate nav highlight handler
updateActiveNavLink();

// Hero animations & interactive glass tile hover effect
function initHeroEnhancements() {
  const scrollIndicator = document.querySelector(".hero-scroll-indicator");
  const hero = document.querySelector(".hero-section");
  if (scrollIndicator && hero) {
    window.addEventListener("scroll", () => {
      const threshold = hero.offsetHeight * 0.3; // fade indicator after 30% scroll
      if (window.scrollY > threshold) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.transform = "translate(-50%, 10px) scale(0.7)";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.transform = "translate(-50%, 0) scale(1)";
      }
    });
  }
  // Intro animation for hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(40px)";
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroContent.style.transition = "all 1s cubic-bezier(.16,.8,.38,.98)";
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
      }, 80);
    });
  }
  // Interactive gradient following cursor on feature tiles
  const glassTiles = document.querySelectorAll(".glass-tile");
  glassTiles.forEach((tile) => {
    tile.addEventListener("mousemove", (e) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tile.style.setProperty("--mx", x + "px");
      tile.style.setProperty("--my", y + "px");
      tile.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.9), rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.4) 70%)`;
    });
    tile.addEventListener("mouseleave", () => {
      tile.style.background = "rgba(255,255,255,0.7)"; // reset background
    });
  });
}