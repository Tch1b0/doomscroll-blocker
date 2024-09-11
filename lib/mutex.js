export class Mutex {
    constructor() {
        this.locked = false;
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }

    unlockDeferred(delayMillis) {
        setTimeout(() => {
            this.unlock();
        }, delayMillis);
    }
}
