// ======================
// Booking Form → WhatsApp
// ======================
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const trip = document.getElementById('tripType').value;
  const dt = document.getElementById('datetime').value;
  const notes = document.getElementById('notes').value.trim();
  const msg = document.getElementById('formMsg');

  if (!name || !phone) {
    msg.textContent = 'कृपया नाम और फोन भरें';
    return false;
  }

  const text = encodeURIComponent(`नमस्ते Ham Safar,
बुकिंग के लिए जानकारी:
नाम: ${name}
फोन: ${phone}
ट्रिप: ${trip}
दिनांक/समय: ${dt}
नोट्स: ${notes}`);

  const waLink = `https://wa.me/919452072543?text=${text}`;
  window.open(waLink, '_blank');
  msg.textContent = 'धन्यवाद! हम जल्द कॉल करके पुष्टि करेंगे — WhatsApp भेजा गया है।';

  document.getElementById('datetime').value = '';
  document.getElementById('notes').value = '';
  return false;
}

// ======================
// Gallery Slider
// ======================
let index = 0;
const slides = document.getElementById("slides");
const totalSlides = slides ? slides.children.length : 0;
const dotsContainer = document.getElementById("dotsContainer");
const dots = [];

function updateDots() {
  dots.forEach(d => d.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

function showSlide(i) {
  index = (i + totalSlides) % totalSlides;
  slides.style.transform = `translateX(${-index * 100}%)`;
  updateDots();
}

function moveSlide(step) {   // ✅ अब ये global है
  showSlide(index + step);
}

if (slides && dotsContainer && totalSlides > 0) {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = () => showSlide(i);
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  // Init
  showSlide(index);
  setInterval(() => { moveSlide(1) }, 6000);
}


// ======================
// Modal Gallery
// ======================
let modalIndex = 0;
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const galleryImages = document.querySelectorAll("#slides img");

function openModal(n) {
  if (!modal) return;
  modal.style.display = "block";
  modalIndex = n;
  showModalImage();
}

function closeModal() {
  if (modal) modal.style.display = "none";
}

function showModalImage() {
  if (!modalImg || !galleryImages[modalIndex]) return;
  modalImg.src = galleryImages[modalIndex].src;
  captionText.innerHTML = galleryImages[modalIndex].alt;
}

function changeModalSlide(step) {
  modalIndex = (modalIndex + step + galleryImages.length) % galleryImages.length;
  showModalImage();
}

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowRight") changeModalSlide(1);
  if (event.key === "ArrowLeft") changeModalSlide(-1);
});

// ======================
// Map Switcher
// ======================
function changeMap(view) {
  const mapFrame = document.getElementById("mapFrame");
  if (!mapFrame) return;

  let url = "";
  if (view === "wide") {
    url = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5682.947289324244!2d83.238012!3d26.023479!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991178a4a0a0b25%3A0xe5d4b6f0a9811f01!2sBhimlapur%2C%20Pawai%2C%20Azamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694612345678!5m2!1sen!2sin";
  }
  else if (view === "medium") {
    url = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1420.736!2d83.238012!3d26.023479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991178a4a0a0b25%3A0xe5d4b6f0a9811f01!2sBhimlapur%2C%20Pawai%2C%20Azamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694612345678!5m2!1sen!2sin";
  }
  else if (view === "close") {
    url = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d710.368!2d83.238012!3d26.023479!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991178a4a0a0b25%3A0xe5d4b6f0a9811f01!2sBhimlapur%2C%20Pawai%2C%20Azamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694612345678!5m2!1sen!2sin";
  }

  mapFrame.src = url;
}

// ======================
// Reveal on Scroll
// ======================
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", revealOnScroll);

// ======================
// Navbar Hamburger Toggle
// ======================
(function () {
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('navList');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      navList.classList.toggle('active');
    });

    // Close mobile menu on link click
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (navList.classList.contains('active')) navList.classList.remove('active');
      });
    });
  }
})();

// ===== Highlight current navigation link =====
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  let currentPath = window.location.pathname.split("/").pop(); 
  // If empty (like when opening folder directly), assume index.html
  if (currentPath === "") {
    currentPath = "index.html";
  }

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");

    // Make both lowercase to avoid case issues
    if (linkPath.toLowerCase() === currentPath.toLowerCase()) {
      link.classList.add("active");
    }
  });
});

