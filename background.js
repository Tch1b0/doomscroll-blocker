function checkReset() {
    const lastResetTimestamp = new Date(
        Number(localStorage.getItem("last-reset-timestamp")) || 0
    );
    const timeCount = localStorage.getItem("time-count");
    if ((Date.now() - lastResetTimestamp.getTime()) / 1000 / 60 >= timeCount) {
        reset();
    }
}

function reset() {
    localStorage.setItem("last-reset-timestamp", Date.now());
    localStorage.setItem("videos-watched", 0);
}

let loadingLock = false;

async function beforeVideoWatch() {
    checkReset();
    if (loadingLock) {
        return;
    }

    const videosWatched = Number(localStorage.getItem("videos-watched"));
    const videosAllowed = Number(localStorage.getItem("video-count"));
    console.log(videosWatched, videosAllowed);
    if (videosWatched > videosAllowed) {
        const [tab] = await browser.tabs.query({
            currentWindow: true,
            active: true,
        });
        await browser.tabs.update(tab.id, { url: "pages/blocked.html" });
    } else {
        localStorage.setItem("videos-watched", videosWatched + 1);

        loadingLock = true;
        setTimeout(() => {
            loadingLock = false;
        }, 5000);
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

console.log("init done");

reset();
