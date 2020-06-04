import { fishes } from "./resources.js";


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
        this.pausedForces = {};
    }

    addForce(id, x, y, acceleration = 0.1) {
            this.forces[id] = { x, y, acceleration, currentAccel: 0 };
    }

    removeForce(id) {
        delete this.forces[id];
    }

    pauseForce(id) {
        this.pausedForces[id] = this.forces[id];
        delete this.forces[id];
    }

    resumeForce(id) {
        this.forces[id] = this.pausedForces[id];
        delete this.pausedForces[id];
    }

    flip() {
        this.image = (this.image = this.sheet) ? this.teehs : this.sheet;
    }

}