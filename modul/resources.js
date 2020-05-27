export const fishes = {
    borfish: {
        frames: 2,
        environment: "background",
        speed: 1,
    },
    colossus: {
        frames: 6,
        environment: "background",
        speed: 1,
    },
    greynurse: {
        frames: 10,
        environment: "background",
        speed: 1,
    },
    panzertank: {
        frames: 3,
        environment: "foreground",
        speed: 1,
    },
    wtfhumanthing: {
        frames: 12,
        environment: "foreground",
        speed: 1,
    },
};

export const fishCount = Object.keys(fishes).length;

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