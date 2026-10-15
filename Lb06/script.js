
document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme солих
  const themeToggle = document.getElementById("themeToggle");

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("nomad-coffee-theme") || "dark";
  } catch (error) {
    console.warn("Theme тохиргоог хадгалах боломжгүй байна.");
  }

  document.body.classList.toggle(
    "light-theme",
    savedTheme === "light"
  );

  function updateThemeButton() {
    if (!themeToggle) return;

    const isLight = document.body.classList.contains("light-theme");

    themeToggle.innerHTML = isLight
      ? "☀ <span>Light mode</span>"
      : "☾ <span>Dark mode</span>";
  }

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");

      const currentTheme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

      try {
        localStorage.setItem("nomad-coffee-theme", currentTheme);
      } catch (error) {
        console.warn("Theme тохиргоог хадгалах боломжгүй байна.");
      }

      updateThemeButton();
    });
  }

  // 2. Кофены карт эргүүлэх
  document.querySelectorAll(".coffee-card").forEach((card) => {
    function flipCard() {
      card.classList.toggle("flipped");
    }

    card.addEventListener("click", flipCard);

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        flipCard();
      }
    });
  });

  // 3. Хуудасны дээд хэсэг рүү буцах холбоос
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");

      if (!selector || selector === "#") return;

      const target = document.querySelector(selector);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 4. Footer дээр он харуулах
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 5. Видео алдаа шалгах
  const video = document.getElementById("coffeeVideo");

  if (video) {
    video.addEventListener("error", () => {
      console.error("Видео файлаа шалгана уу: video/clip.mp4");
    });
  }

  console.log("☕ NOMAD COFFEE амжилттай ачааллаа!");
});
