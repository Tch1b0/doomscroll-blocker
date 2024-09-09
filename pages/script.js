const greetinEl = document.getElementById("greeting");
const timerEl = document.getElementById("timer");

const lastResetTimestamp = Number(localStorage.getItem("last-reset-timestamp"));
const timeCount = Number(localStorage.getItem("time-count"));

const renderTime = () => {
    const secsSinceReset = (Date.now() - lastResetTimestamp) / 1000;
    const timeDiff = Math.abs(secsSinceReset - timeCount * 60);
    const minLeft = Math.floor(timeDiff / 60);
    const secLeft = Math.floor(timeDiff % 60);
    timerEl.innerText = `${minLeft}:${
        (secLeft < 10 ? "0" : "") + String(secLeft)
    }`;
};

setInterval(renderTime, 1000);
renderTime();

const greetings = [
    "Brainrot avoided. You are welcome.",
    "Doomscrolling successfully blocked.",
    "You can now go back to important stuff.",
];
greetinEl.innerText = greetings[Math.floor(Math.random() * greetings.length)];
