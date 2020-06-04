export const fishes = {
    borfish: {
        frames: 2,
        environment: "background",
        speed: 1,
        extension: "gif",
    },
    colossus: {
        frames: 6,
        environment: "background",
        speed: 1,
        extension: "gif",
    },
    greynurse: {
        frames: 10,
        environment: "background",
        speed: 1,
        extension: "png",
    },
    panzertank: {
        frames: 3,
        environment: "foreground",
        speed: 1,
        extension: "gif",
    },
    wtfhumanthing: {
        frames: 12,
        environment: "foreground",
        speed: 1,
        extension: "png",
    },
    spidereel: {
        frames: 7,
        environment: "background",
        speed: 2,
        extension: "gif",
    },
    angerpuppy: {
        frames: 4,
        environment: "background",
        speed: 1,
        throttle: 20,
        extension: "gif",
    },
};

export const fishCount = Object.keys(fishes).length;

export const fishCards = {};

let loaded = 0;
let readyCallback;

function isReady() {
    if (loaded === fishCount && readyCallback) {
        readyCallback();
    }
}

for (let [name, fish] of Object.entries(fishes)) {
    fish.sheet = new Image;
    fish.sheet.src = `src/fish/${name}.png`;
    fish.teehs = new Image;
    fish.teehs.src = `src/fish/${name}.png`;
    fishCards[name] = new Image;
    fishCards[name].src = `src/cards/${name}.${fish.extension}`;

    fish.sheet.onload = () => {
        loaded += 0.5;
        fish.width = fish.sheet.width;
        fish.height = fish.sheet.height / fish.frames;

        isReady();
    };
    fish.teehs.onload = () => {
        loaded += 0.5;

        let c = document.createElement('canvas');
        c.width = fish.sheet.width;
        c.height = fish.sheet.height;

        let ctx = c.getContext('2d');
        ctx.scale(-1,1);
        ctx.drawImage(fish.sheet, -c.width, 0);

        fish.teehs.onload = undefined;
        fish.teehs.src = c.toDataURL();

        isReady();
    }
}


export function onReady(cb) {
    readyCallback = cb;
}