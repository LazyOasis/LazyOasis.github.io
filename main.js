import * as resources from "./modul/resources.js";
import Sprite from "./modul/Sprite.js";
import * as Aquarium from "./modul/Aquarium.js";
import { shuffle, randint } from "./modul/Utils.js";


export const listSprites = Aquarium.listSprites;
export { resources };


const fishList = shuffle(Object.keys(resources.fishes));
// fishList.push("borfish", "colossus", "greynurse", "panzertank", "wtfhumanthing");

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

    let fish = new Sprite(fishRef, fishDeath, 8, spawnX, spawnY, direction);
    Aquarium.addSprite(fish);

    let speed = (direction) ? -fishRes.speed : fishRes.speed;
    fish.addForce("iamspeed", speed, 0, 0.5);
};

resources.onReady(() => {
    Aquarium.gameLoop();
    setInterval(spawner, 5000);
});
