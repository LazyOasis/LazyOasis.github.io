import { Sprite } from "./drawables/Sprite.js";
import { PlayerSprite } from "./drawables/PlayerSprite.js";
import { shuffle } from "./utils.js";


const stalls = {
    kairu: { frames: 8, offsety: 10 },
    boror: { frames: 4, offsety: 4 },
    artemis: { frames: 16, offsety: 4 },
    agent: { frames: 13, offsety: 16 },
    gizmo: { frames: 19, offsety: 0 },
    jon: { frames: 8, offsety: 0 },
    wildcard: { frames: 32, offsety: 0 },
    elja2: { frames: 8, offsety: 7 },
    fig: { frames: 8, offsety: 7 },
};

const terrain = {
    background: {},
    tiles: {},
}

export async function loadSprites() {
    let sprites = [];

    let idx = 0;
    for (let [name, data] of Object.entries(stalls)) {
        let sheet = new Image;
        sheet.src = "pics/stalls/"+name+".png";
        await sheet.decode();

        data.width = sheet.width;
        data.height = sheet.height / data.frames;
        data.pic = sheet;

        sprites.push(new Sprite(name, data, 320 + 288 * idx, 328 - data.height + (data.offsety || 0)));
        ++idx;
    }

    return sprites;
}

export async function loadTerrain() {
    for (let [name, data] of Object.entries(terrain)) {
        let pic = new Image;
        pic.src = "pics/"+name+".png";
        await pic.decode();

        data.pic = pic;
    }

    return terrain;
}

export async function loadPlayer() {
    let pics = {
        idleLeft: { anim: "idle", dir: "left", frames: 12 },
        idleRight: { anim: "idle", dir: "right",  frames: 12 },
        runningLeft: { anim: "running", dir: "left",  frames: 8 },
        runningRight: { anim: "running", dir: "right",  frames: 8 },
    };

    let spriteData = {
        left: {},
        right: {}
    };

    for (let [key, data] of Object.entries(pics)) {
        data.pic = new Image;
        data.pic.src = "pics/char/"+key+".png";
        await data.pic.decode();

        data.width = data.pic.width;
        data.height = data.pic.height / data.frames;

        spriteData[data.dir][data.anim] = data;
        delete data.dir;
        delete data.anim;
    }

    return new PlayerSprite("ego", spriteData, 50, 280);
}
