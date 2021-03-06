import * as resources from "./modul/resources.js";
import Sprite from "./modul/Sprite.js";
import * as Aquarium from "./modul/Aquarium.js";
import { shuffle, randint, grab } from "./modul/Utils.js";

import { configuration } from "./config.js";


export const listSprites = Aquarium.listSprites;
export { resources };


const fishList = shuffle(Object.keys(resources.fishes));
// fishList.push("borfish", "colossus", "greynurse", "panzertank", "wtfhumanthing");

const bgSprite = grab("background-background-sprite");

function spriter(sprite, frames, width, height) {
    let inc = 0;

    setInterval(() => {
        sprite.style.backgroundPositionY = `${height * inc}px`;
        if (++inc === frames) inc = 0;
    }, configuration.animationSpeed);
};

const spawner = () => {
    if (fishList.length === 0) return;

    let fishRef = fishList.shift();
    const fishRes = resources.fishes[fishRef];
    let fishDeath = () => {
        fishList.push(fishRef);
        shuffle(fishList);
    };
    let direction = Math.random() > 0.5;
    let spawnX = (direction) ? 960 : 10 - fishRes.width;
    let spawnY = (fishRes.environment === "background") ? randint(20, 500 - fishRes.height) : 520 - fishRes.height + randint(-10, 10);
    let throttle = fishRes.throttle || 8;

    let fish = new Sprite(fishRef, fishDeath, throttle, spawnX, spawnY, direction);
    Aquarium.addSprite(fish);

    let speed = (direction) ? -fishRes.speed : fishRes.speed;
    fish.addForce("base", speed, 0, 0.5);
};

resources.onReady(() => {
    Aquarium.gameLoop();
    setInterval(spawner, 5000);

    spriter(bgSprite, 18, 956, 536);
});