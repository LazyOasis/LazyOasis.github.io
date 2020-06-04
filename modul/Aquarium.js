import { grab, parametric } from "./Utils.js";
import { fishCards } from "./resources.js";


const bankCards = grab("info-cards");
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
let cardOpen = false;
let hoverThrottle = true;

let currentSelection;

function render() {

    if (breakdown) return;

    contexts.background.clearRect(0, 0, canvasWidth, canvasHeight);
    contexts.foreground.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let sprite of sprites) {
        if (sprite.selected) {
            contexts[sprite.context].filter = 'brightness(170%)';
        }
        contexts[sprite.context].drawImage(sprite.image, 0, sprite.currentFrame * sprite.height, sprite.width, sprite.height, sprite.posx, sprite.posy, sprite.width, sprite.height);
        if (sprite.selected) contexts[sprite.context].filter = 'none';

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

function clicker(e) {
    if (cardOpen) {
        fishCards[cardOpen.name].style.display = "none";
        cardOpen.resumeForce("base");
        cardOpen.playing = true;
        cardOpen = false;
        return;
    }

    const x = e.offsetX;
    const y = e.offsetY;

    for (let sprite of sprites) {
        if (
            (x >= sprite.posx && x <= sprite.posx + sprite.width) &&
            (y >= sprite.posy && y <= sprite.posy + sprite.height)
        ) {
            sprite.pauseForce("base");
            sprite.playing = false;

            cardOpen = sprite;

            let card = fishCards[sprite.name];
            card.style.left = (x < 600) ? `${x + 40}px` : `${x - 40 - 500}px`;
            card.style.top = (y < 320) ? `${y + 40}px` : `${y - 250}px`;
            card.style.display = "block";

            break;
        }
    }
}

function hoverer(e) {
    if (hoverThrottle) {
        hoverThrottle = false;
        let sprite = inspectPointer(e.offsetX, e.offsetY);
        if (sprite) {
            currentSelection = sprite;
            sprite.selected = true;
        } else {
            if (currentSelection) {
                currentSelection.selected = false;
                currentSelection = undefined;
            }
        }

        setTimeout(() => hoverThrottle = true, 100);
    }
}

function inspectPointer(x, y) {
    for (let sprite of sprites) {
        if (
            (x >= sprite.posx && x <= sprite.posx + sprite.width) &&
            (y >= sprite.posy && y <= sprite.posy + sprite.height)
        ) {
            return sprite;
        }
    }

    return false;
}


export function gameLoop() {
    breakdown = false;
    requestAnimationFrame(render);
    setInterval(cleaner, 4000);
    canvasForeground.addEventListener("click", clicker);

    for (let card of Object.values(fishCards)) {
        bankCards.appendChild(card);
    }

    canvasForeground.addEventListener("mousemove", hoverer);
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