export default class Wagon {

    constructor(data) {
        this.frames = 0;
        Object.assign(this, data);

        this.delta = 0;
    }

    frameUp() {
        if (++this.delta >= this.frames) this.delta = 0;
    }

}