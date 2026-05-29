const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const weddingDatePerm = new Date("2026-07-31T11:00:00+05:00");

function pad(value) {
  return String(value).padStart(2, "0");
}

function setCountdownValues(days, hours, minutes, seconds) {
  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

function updateCountdown() {
  const nowUtcMs = Date.now();
  const targetUtcMs = weddingDatePerm.getTime();
  const diffMs = targetUtcMs - nowUtcMs;

  if (diffMs <= 0) {
    setCountdownValues(0, 0, 0, 0);
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setCountdownValues(days, hours, minutes, seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const revealSections = document.querySelectorAll(".reveal-section");

if (revealSections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealSections.forEach((section) => observer.observe(section));
}
