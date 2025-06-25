
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