const timelineContainer = document.getElementById("timeline-container");
const timeline = document.getElementById("timeline");

const currentDayIndex = new Date().getDay();
const dayTasks = tasks[currentDayIndex % tasks.length];

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function findCurrentTaskIndex() {
  const now = getCurrentMinutes();
  return dayTasks.findIndex((task) => {
    const start = timeToMinutes(task.from);
    const end = timeToMinutes(task.to);
    return now >= start && now < end;
  });
}

function renderTimeline(currentIndex) {
  timeline.innerHTML = "";

  dayTasks.forEach((task, i) => {
    const el = document.createElement("div");
    el.className = "timeline-item";
    if (i === currentIndex) el.classList.add("current");

    el.innerHTML = `
      <div class="timeline-time">${task.from} - ${task.to}</div>
      <div class="timeline-task">${task.task}</div>
      <div class="timeline-desc">${task.desc}</div>
    `;

    timeline.appendChild(el);
  });
}

function scrollToCurrent(behavior = "smooth") {
  const current = document.querySelector(".timeline-item.current");
  if (current) {
    current.scrollIntoView({
      behavior,
      block: "center",
    });
  }
}

function updateTimeline(scroll = true) {
  const currentIndex = findCurrentTaskIndex();
  renderTimeline(currentIndex);

  if (scroll) scrollToCurrent();
}

updateTimeline(true);

setInterval(() => {
  updateTimeline(true);
}, 60 * 1000);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    scrollToCurrent();
  }
});
