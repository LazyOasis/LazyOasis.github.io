import { grab, parametric } from "./Utils.js";


const canvasForeground = grab("canvas-foreground");
const canvasBackground = grab("canvas-background");
const contexts = {
    foreground: canvasForeground.getContext("2d"),
    background: canvasBackground.getContext("2d")
};

const canvasWidth = canvasForeground.width;
const canvasHeight = canvasForeground.height;

const fps = 30;
const framerate = 1000 / fps;

/** @type {Sprite[]} */
const sprites = [];

let breakdown = false;

function render() {

    if (breakdown) return;

    contexts.background.clearRect(0, 0, canvasWidth, canvasHeight);
    contexts.foreground.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let sprite of sprites) {
        contexts[sprite.context].drawImage(sprite.image, 0, sprite.currentFrame * sprite.height, sprite.width, sprite.height, sprite.posx, sprite.posy, sprite.width, sprite.height);

        if (sprite.playing === true) {
            if (++sprite.throttledFrame > sprite.throttle - 1) {
                sprite.throttledFrame = 0;
                if (++sprite.currentFrame > sprite.frames - 1) sprite.currentFrame = 0;
            }
        }

        for (let force of Object.values(sprite.forces)) {
            if (force.currentAccel < 0.5) {
                sprite.posx += force.x * parametric(force.currentAccel);
                sprite.posy += force.y * parametric(force.currentAccel);
                force.currentAccel += force.acceleration;
            } else {
                sprite.posx += force.x;
                sprite.posy += force.y;
            }

        }
    }

    requestAnimationFrame(render);
    // setTimeout(() => requestAnimationFrame(render), framerate);
}

function cleaner() {
    if (breakdown) return;

    sprites.forEach((sprite, idx, sprites) => {
        if (
            sprite.posx > 956 ||
            sprite.posx < -300 ||
            sprite.posy > 536 ||
            sprite.posy < -40
        ) {
            sprite.onDeath();
            sprites.splice(idx, 1);
        }
    });
}


export function gameLoop() {
    breakdown = false;
    requestAnimationFrame(render);
    setInterval(cleaner, 4000);
}

export function breakLoop() {
    breakdown = true;
}

export function addSprite(sprite) {
    sprites.push(sprite);
}

export function tick() {
    render();
}

export function listSprites() {
    let all = {};
    for (let sprite of sprites) {
        all[sprite.name] = sprite;
    }

    return all;
}
