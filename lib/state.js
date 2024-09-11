export const State = new Proxy(
    {
        videosWatched: 0,
        videoCount: 0,

        timeCount: 0,
        lastResetTimestamp: 0,
    },
    {
        get(_target, property, _receiver) {
            // in this case only numbers are stored, so we can just cast it to number
            return Number(localStorage.getItem(property));
        },
        set(_target, property, value, _receiver) {
            localStorage.setItem(property, String(value));
            return true;
        },
    }
);
