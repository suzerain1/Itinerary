
document.querySelectorAll('.day-list').forEach(list => {
  const items = list.querySelectorAll('li');
  items.forEach((li, index) => {
    li.style.animation = 'fadeSlideIn 0.6s ease forwards';
    li.style.animationDelay = `${0.5 * (index + 1)}s`;
  });
});

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
      if (tab.id === target) {
        tab.classList.add('active');
      }
    });
  });
});

// Modal logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Firebase SDK
  // Import Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyB2dUQGd-vOjQ1Yabm-GlE5kj4BTGiLGm4",
    authDomain: "itinerary-fdef9.firebaseapp.com",
    projectId: "itinerary-fdef9",
    storageBucket: "itinerary-fdef9.firebasestorage.app",
    messagingSenderId: "1043947374334",
    appId: "1:1043947374334:web:052184e16cffce53c407af",
    measurementId: "G-R5PWFKYR37"
  };

  // Init Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Handle suggestion submission
  window.submitSuggestion = async function () {
    const name = document.getElementById("name").value.trim();
    const suggestion = document.getElementById("suggestion").value.trim();

    if (!name || !suggestion) {
      document.getElementById("saved-msg").innerText = "⚠️ Please enter your name and suggestion.";
      return;
    }

    try {
      await addDoc(collection(db, "suggestions"), {
        name: name,
        suggestion: suggestion,
        timestamp: Date.now()
      });
      document.getElementById("saved-msg").innerText = "✅ Suggestion sent!";
      document.getElementById("name").value = "";
      document.getElementById("suggestion").value = "";
      loadSuggestions(); // Refresh suggestions list
    } catch (e) {
      document.getElementById("saved-msg").innerText = "❌ Failed to send suggestion.";
      console.error("Error adding document: ", e);
    }
  };

// Display suggestions

// Fetch and display all suggestions
async function loadSuggestions() {
  const suggestionList = document.getElementById("suggestion-list");
  suggestionList.innerHTML = "<li>Loading suggestions...</li>";

  try {
    const q = query(collection(db, "suggestions"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    suggestionList.innerHTML = ""; // Clear loading state

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement("li");
      item.innerHTML = `<p class="title">${data.name}</p><p class="desc">${data.suggestion}</p>`;
      suggestionList.appendChild(item);
    });

    if (suggestionList.innerHTML === "") {
      suggestionList.innerHTML = "<li>No suggestions yet.</li>";
    }
  } catch (e) {
    console.error("Error loading suggestions:", e);
    suggestionList.innerHTML = "<li>⚠️ Failed to load suggestions.</li>";
  }
}

// Call this function after page loads
window.addEventListener("DOMContentLoaded", loadSuggestions);

// Counter JS
const countdownDate = new Date("July 5, 2025 08:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = countdownDate - now;

  if (diff < 0) {
    document.querySelector('.countdown').innerHTML = "🎉 It's time!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days.toString().padStart(2, '0');
  document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

updateCountdown(); // Run immediately
setInterval(updateCountdown, 1000); // Then update every second


// Head animation
document.querySelectorAll('.head').forEach(head => {
  const delay = (Math.random() * 1.5).toFixed(2); // random delay between 0s and 1.5s
  head.style.animationDelay = `${delay}s`;
});