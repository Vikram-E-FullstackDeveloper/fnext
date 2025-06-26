// ==========================
// Modal Functions
// ==========================

function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Close modals when clicking outside the content
window.onclick = function (e) {
  document.querySelectorAll(".modal").forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
};

// ==========================
// Theme Toggle
// ==========================

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// ==========================
// Dynamic Project Cards (optional demo)
// ==========================

const projects = [
  {
    title: "AI BabyCare App",
    description: "An AI assistant for Indian parents with baby care tips and reminders.",
    link: "#"
  },
  {
    title: "Green Construction Estimator",
    description: "Suggests eco-friendly and cost-effective materials for buildings.",
    link: "#"
  },
  {
    title: "Smart Disaster Rescue Drone",
    description: "Drone that detects human heartbeats using Micro-Doppler radar.",
    link: "#"
  }
];

const grid = document.getElementById("projectsGrid");
if (grid) {
  projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `<h3>${proj.title}</h3><p>${proj.description}</p><a href="${proj.link}" target="_blank">View</a>`;
    grid.appendChild(card);
  });
}

// ==========================
// Contact Form Submission
// ==========================

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const status = document.getElementById("formStatus");

    if (!name || !email || !message) {
      status.textContent = "❌ Please fill in all fields.";
      return;
    }

    status.textContent = "⏳ Sending...";

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await res.json();

      if (result.success) {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        status.textContent = "❌ Failed to send message.";
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      status.textContent = "❌ Server error. Try again later.";
    }
  });
}
