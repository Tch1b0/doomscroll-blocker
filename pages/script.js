import { State } from "../lib/state.js";

const greetinEl = document.getElementById("greeting");
const timerEl = document.getElementById("timer");

const renderTime = () => {
    const secsSinceReset = (Date.now() - State.lastResetTimestamp) / 1000;
    const timeDiff = -(secsSinceReset - State.timeCount * 60);
    if (timeDiff < 0) {
        return;
    }
    const minLeft = Math.floor(timeDiff / 60);
    const secLeft = Math.floor(timeDiff % 60);
    timerEl.innerText = `${minLeft}:${
        (secLeft < 10 ? "0" : "") + String(secLeft)
    }`;
};

const greetings = [
    "Brainrot avoided. You are welcome.",
    "Doomscrolling successfully blocked.",
    "You can now go back to important stuff.",
];
greetinEl.innerText = greetings[Math.floor(Math.random() * greetings.length)];

// render the time every second
setInterval(renderTime, 1000);
renderTime();
