const initBtn = document.getElementById("init-btn");
initBtn.addEventListener("click", (_ev) => {
    vidcountstep(0);
    timecountstep(0);
    document.getElementById("before-init").style.display = "none";
    document.getElementById("after-init").style.display = "block";
});

function inited() {
    document.getElementById("before-init").style.display = "none";
    document.getElementById("after-init").style.display = "block";
}

if (localStorage.getItem("video-count") && localStorage.getItem("time-count")) {
    inited();
}

let vidCount = Number(localStorage.getItem("video-count")) || 3;
const vidCountEl = document.getElementById("vid-count");
vidCountEl.innerText = String(vidCount);

document
    .getElementById("vid-sub-btn")
    .addEventListener("click", () => vidcountstep(-1));
document
    .getElementById("vid-add-btn")
    .addEventListener("click", () => vidcountstep(1));

function vidcountstep(step) {
    if (vidCount + step < 0) {
        return;
    }

    vidCount += step;
    vidCountEl.innerText = String(vidCount);
    localStorage.setItem("video-count", vidCount);
}

let timeCount = Number(localStorage.getItem("time-count")) || 30;
const timeCountEl = document.getElementById("time-count");
timeCountEl.innerText = String(timeCount);

document
    .getElementById("time-sub-btn")
    .addEventListener("click", () => timecountstep(-1));
document
    .getElementById("time-add-btn")
    .addEventListener("click", () => timecountstep(1));

function timecountstep(step) {
    if (timeCount + step < 0) {
        return;
    }

    timeCount += step;
    timeCountEl.innerText = String(timeCount);
    localStorage.setItem("time-count", timeCount);
}
