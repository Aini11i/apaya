const intro = document.getElementById("intro");
const bookSection = document.getElementById("bookSection");
const openBook = document.getElementById("openBook");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const pageNow = document.getElementById("pageNow");
const pageTotal = document.getElementById("pageTotal");
const pages = document.querySelectorAll(".page");
const song = document.getElementById("song");
const songSource = document.getElementById("songSource");
const songButtons = document.querySelectorAll(".song-btn");

let currentPage = 0;

pageTotal.textContent = pages.length;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle("active", i === index);
  });

  pageNow.textContent = index + 1;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === pages.length - 1;

  prevBtn.style.opacity = prevBtn.disabled ? "0.45" : "1";
  nextBtn.style.opacity = nextBtn.disabled ? "0.45" : "1";
}

let currentSong = 0;

function playSong(index) {
  const button = songButtons[index];

  songButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  songSource.src = button.dataset.src;
  songSource.type = button.dataset.type;

  song.load();
  song.play().catch(() => {});
}

songButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentSong = index;
    playSong(currentSong);
  });
});

song.addEventListener("ended", () => {
  currentSong++;

  if (currentSong >= songButtons.length) {
    currentSong = 0;
  }

  playSong(currentSong);
});

openBook.addEventListener("click", () => {
  intro.classList.add("hidden");
  bookSection.classList.remove("hidden");

  showPage(currentPage);

  if (song) {
    song.play().catch(() => {});
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
});

restartBtn.addEventListener("click", () => {
  currentPage = 0;
  showPage(currentPage);
});

document.addEventListener("keydown", (event) => {
  if (bookSection.classList.contains("hidden")) return;

  if (event.key === "ArrowRight") {
    nextBtn.click();
  }

  if (event.key === "ArrowLeft") {
    prevBtn.click();
  }
});

showPage(currentPage);