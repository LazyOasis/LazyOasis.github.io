import { fishes } from "./resources";


export default class Sprite {

    constructor(resource, onDeath, throttle = 1, x = 0, y = 0, flipped = false) {
        Object.assign(this, fishes[resource]);

        this.name = resource;
        this.context = this.environment;
        this.onDeath = onDeath;

        this.posx = x;
        this.posy = y;

        this.playing = true;
        this.currentFrame = 0;
        this.throttledFrame = 0;
        this.throttle = throttle;
        this.image = (flipped) ? this.teehs: this.sheet;

        this.forces = {};
    }

    addForce(id, x, y, acceleration = 0.1) {
            this.forces[id] = { x, y, acceleration, currentAccel: 0 };
    }

    flip() {
        this.image = (this.image = this.sheet) ? this.teehs : this.sheet;
    }

}