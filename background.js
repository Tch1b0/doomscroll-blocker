import { Mutex } from "./lib/mutex.js";
import { State } from "./lib/state.js";

function reset() {
    State.lastResetTimestamp = Date.now();
    State.videosWatched = 0;
}

function checkReset() {
    const lastResetTimestamp = State.lastResetTimestamp || 0;
    const timeDiff = Date.now() - lastResetTimestamp;
    if (timeDiff / 1000 / 60 >= State.timeCount) {
        reset();
    }
}

const loading = new Mutex();

async function beforeVideoWatch() {
    checkReset();
    if (loading.locked) {
        return;
    }

    if (State.videosWatched >= State.videoCount) {
        const [tab] = await browser.tabs.query({
            currentWindow: true,
            active: true,
        });
        await browser.tabs.update(tab.id, { url: "pages/blocked.html" });
    } else {
        loading.lock();
        State.videosWatched += 1;
        loading.unlockDeferred(5000);
    }
}

browser.webRequest.onBeforeSendHeaders.addListener(
    beforeVideoWatch,
    {
        urls: [
            "https://www.youtube.com/watch?*",
            "https://www.youtube.com/shorts/*",
        ],
    },
    ["blocking"]
);

browser.tabs.onUpdated.addListener(async (ev) => {
    const [tab] = await browser.tabs.query({
        currentWindow: true,
        active: true,
    });

    if (tab.status !== "complete") return;
    const tabUrl = tab.url;

    if (
        tabUrl.startsWith("https://www.youtube.com/watch") ||
        tabUrl.startsWith("https://www.youtube.com/shorts")
    ) {
        await beforeVideoWatch();
    }
});

reset();

console.log("Doomscroll Blocker activated");
