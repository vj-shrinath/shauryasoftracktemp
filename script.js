// Website Developed by: Vijay, Shravani, Ajay (2025)

// Hamburger toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// Auto close menu on link click
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

// ===================================================
// SCROLL REVEAL ANIMATION
// ===================================================
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

// Custom dropdown
const customSelect = document.getElementById("serviceSelect");
if (customSelect) {
  const trigger = customSelect.querySelector(".select-trigger");
  const options = customSelect.querySelector(".select-options");
  const hiddenInput = customSelect.querySelector("input");

  trigger.addEventListener("click", () => {
    customSelect.classList.toggle("open");
  });

  // Close dropdown on click outside
  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("open");
    }
  });

  // When option clicked
  options.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      trigger.textContent = option.textContent;
      hiddenInput.value = option.dataset.value;
      customSelect.classList.remove("open");
    });
  });
}




// ===================================
// VALIDATION HELPERS
// ===================================
function showError(input, message) {
    const group = input.parentElement;
    const text = group.querySelector(".error-text");
    input.classList.add("error");
    text.style.display = "block";
    text.textContent = message;
}

function clearError(input) {
    const group = input.parentElement;
    const text = group.querySelector(".error-text");
    input.classList.remove("error");
    text.style.display = "none";
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(mobile) {
    return /^[0-9]{10}$/.test(mobile);
}

// ===================================
// FORM VALIDATION + SUBMISSION
// ===================================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;

    const fullName = this.querySelector('input[name="Full Name"]');
    const mobile = this.querySelector('input[name="Mobile Number"]');
    const email = this.querySelector('input[name="Email"]');
    const city = this.querySelector('input[name="City / State"]');
    const message = this.querySelector('textarea[name="Message"]');
    const service = this.querySelector('input[name="Service Interested"]');

    [fullName, mobile, email, city, message, service].forEach(clearError);

    if (fullName.value.trim() === "") { showError(fullName, "Enter your full name"); isValid = false; }
    if (!validateMobile(mobile.value)) { showError(mobile, "Enter valid 10-digit mobile number"); isValid = false; }
    if (!validateEmail(email.value)) { showError(email, "Enter valid email address"); isValid = false; }
    if (city.value.trim() === "") { showError(city, "Enter your city/state"); isValid = false; }
    if (service.value.trim() === "") { showError(service, "Select a service"); isValid = false; }
    if (message.value.trim().length < 5) { showError(message, "Message must be at least 5 characters"); isValid = false; }

    if (!isValid) return;

    // FORM IS VALID → SUBMIT NOW
    this.submit();

    // RESET FORM AFTER SEND
    this.reset();

    // OPEN SUCCESS POPUP
    const popup = document.createElement("div");
    popup.classList.add("popup-bg");
    popup.innerHTML = `
      <div class="popup-box">
        <h3>Thank You!</h3>
        <p>Your message has been sent successfully.<br>We will contact you soon.</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    document.body.appendChild(popup);
});}
