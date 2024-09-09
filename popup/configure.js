const remainingVideosEl = document.getElementById("remainingVideos");
const configToggleEl = document.getElementById("configToggle");
const configEl = document.getElementById("config");
const timerEl = document.getElementById("timer");

configToggleEl.addEventListener("click", () => {
    const hidden = configEl.style.display === "none";
    if (hidden) {
        configEl.style.display = "block";
        configToggleEl.innerText = "hide config";
    } else {
        configEl.style.display = "none";
        configToggleEl.innerText = "show config";
    }
});

function updateRemainingVideosElement() {
    const remaining =
        Number(localStorage.getItem("video-count")) -
        Number(localStorage.getItem("videos-watched"));

    if (remaining === NaN || remaining === undefined || remaining === null) {
        remainingVideosEl.innerText = "?";
    } else {
        remainingVideosEl.innerText = String(remaining);
    }
}

function configureStepOption(prefix, defaultValue) {
    let count = Number(localStorage.getItem(`${prefix}-count`)) || defaultValue;
    const countEl = document.getElementById(`${prefix}-count`);
    countEl.innerText = String(count);

    function countstep(step) {
        if (count + step < 0) {
            return;
        }

        count += step;
        countEl.innerText = String(count);
        localStorage.setItem(`${prefix}-count`, count);

        updateRemainingVideosElement();
    }

    document
        .getElementById(`${prefix}-sub-btn`)
        .addEventListener("click", () => countstep(-1));
    document
        .getElementById(`${prefix}-add-btn`)
        .addEventListener("click", () => countstep(1));

    countstep(0);
}

configureStepOption("video", 3);
configureStepOption("time", 30);

const renderTime = () => {
    const lastResetTimestamp = Number(
        localStorage.getItem("last-reset-timestamp")
    );
    const timeCount = Number(localStorage.getItem("time-count"));

    const secsSinceReset = (Date.now() - lastResetTimestamp) / 1000;
    const timeDiff = Math.abs(secsSinceReset - timeCount * 60);
    const minLeft = Math.floor(timeDiff / 60);
    timerEl.innerText = `${minLeft} min`;
};

setInterval(renderTime, 1000);
renderTime();
