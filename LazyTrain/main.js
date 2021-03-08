import Wagon from "./modul/Wagon.js";


export const wagons = [
    { ref: "jrowagon", frames: 6 },
    { ref: "kairu", frames: 15 },
    { ref: "yivo", frames: 4 },
    { ref: "haram", frames: 4 },
    { ref: "flopper", frames: 1 },
    { ref: "agent", frames: 1 },
    { ref: "finboror", frames: 1 },
    { ref: "wildcard", frames: 1 },
    { ref: "pixelle", frames: 1 },
];

for (let i = wagons.length - 1; i > 0; --i) {
    let j = Math.floor(Math.random() * (i + 1));
    [wagons[i], wagons[j]] = [wagons[j], wagons[i]];
}

wagons.push({
    ref: "locomotive",
    frames: 8,
});

let gameSprites = [];
let trainLength = 0;

// préchargement des wagons
export async function loadAssets() {
    for (let wagonData of Object.values(wagons)) {
        let pic = new Image;
        wagonData.pic = pic;
        pic.src = `src/wagons/${wagonData.ref}.png`;
        await pic.decode();
        console.log(pic);

        wagonData.width = pic.width;
        wagonData.height = pic.height / wagonData.frames;
        trainLength += wagonData.width;
        gameSprites.push(new Wagon(wagonData));
    }
}


const canvas = document.getElementById("train");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.oImageSmoothingEnabled = false;


export const Game = {
    index: 0,
    acceleration: 0.5,
    motion: 0,
};

export function render() {
    ctx.clearRect(0, 0, 640, 360);

    let position = -trainLength;

    for (let { pic, height, width, delta } of gameSprites) {
        ctx.drawImage(pic, 0, height*delta, width, height, position+Game.motion, 343-height, width, height);
        position += width;
    }
}

export function compute() {
    // if (Game.index < 10) {
    //     Game.motion += ~~(Game.acceleration * (Game.index / 10)**3);
    // } else {
    //     Game.motion += Game.acceleration;
    // }
    Game.motion += Game.acceleration;

    ++Game.index;
}

export function spriting() {
    for (let sprite of gameSprites) {
        sprite.frameUp();
    }
}

const tracks = document.getElementById("bg-tracks");
const dunesFore = document.getElementById("bg-dunes-fore");
const dunesMid = document.getElementById("bg-dunes-mid");
const dunesBack = document.getElementById("bg-dunes-back");

let offset = 640;
export function parallax() {
    dunesFore.style.backgroundPositionX = `${offset*6}px`;
    tracks.style.backgroundPositionX = `${offset*4}px`;
    dunesMid.style.backgroundPositionX = `${offset*2}px`;
    dunesBack.style.backgroundPositionX = `${offset}px`;
    offset -= 1;

    if (offset <= 0) offset = 640;
}
