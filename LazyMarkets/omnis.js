import { loadSprites, loadTerrain, loadPlayer } from "./machina/loader.js";
import { randint, sample } from "./machina/utils.js";
import { readyReader, commitAction, resetAction } from "./machina/reader.js";


const canvasMain = document.getElementById("layer-main");
const canvasGround = document.getElementById("layer-ground");
const canvasStarry = document.getElementById("layer-starry");

const mainContext = canvasMain.getContext("2d");
const groundContext = canvasGround.getContext("2d");
const starryContext = canvasStarry.getContext("2d");

let map;
let loopID;
let loopStart;
let drawThings = 0;
let playerMoving = false;
let shackleControls = true;
let gameStatus = 0;

let terrainLib, spriteLib, starLib, Player;


async function gameInit() {
    Player = await loadPlayer();
    terrainLib = await loadTerrain();
    spriteLib = await loadSprites();
    starLib = [];

    readyReader();

    const starColours = ["#bbb9d1", "#9c82aa", "#9ca2b6", "#927289", "#d586a8"];

    for (let i = 0; i < 300; ++i) {
        let x = randint(0, 3200);
        let y = randint(0, 310);
        starryContext.fillStyle = sample(starColours);

        if (Math.random() > 0.8) {
            starryContext.fillRect(x, y, 1, 1);
            starryContext.fillRect(x-1, y, 1, 1);
            starryContext.fillRect(x+1, y, 1, 1);
            starryContext.fillRect(x, y-1, 1, 1);
            starryContext.fillRect(x, y+1, 1, 1);
        } else {
            let size = Math.random() > 0.38 ? 1 : 2;
            starryContext.fillRect(x, y, size, size);
        }
    }

    map = new Array(100).fill(0).map(() => randint(0, 3));
    for (let [index, tile] of map.entries()) {
        groundContext.drawImage(terrainLib.tiles.pic, tile*32, 0, 32, 32, index*32, 328, 32, 32);
    }

    // contrôles
    document.addEventListener("keydown", e => {
        if (shackleControls === true) {
            return;
        }

        if (playerMoving === false) {
            if (e.key === "ArrowRight") {
                playerMoving = true;
                resetAction();
                Player.setDirection("right");
                Player.setAnimation("running");
            } else if (e.key === "ArrowLeft") {
                playerMoving = true;
                resetAction();
                Player.setDirection("left");
                Player.setAnimation("running");
            } else if (e.key === "e") {
                resetAction();
                commitAction(Player.x + 12);
            }
        }
    });

    document.addEventListener("keyup", () => {
        Player.setAnimation("idle");
        playerMoving = false;
    });
}

function gameStart() {
    return new Promise(resolve => {
        const start = e => {
            if (e.key === "Enter") {
                document.removeEventListener("keyup", start);

                document.getElementById("megamask").style.opacity = "0";
                shackleControls = false;
                resolve();
            }
        }

        document.addEventListener("keyup", start);
    });
}

function gameLoop(timestamp) {
    loopID = requestAnimationFrame(gameLoop);

    if (timestamp - loopStart >= 25) {
        loopStart = timestamp;

        mainContext.clearRect(0, 0, canvasMain.width, canvasMain.height);

        for (let sprite of spriteLib) {
            sprite.draw(mainContext, !drawThings);
        }

        if (playerMoving === true) {
            Player.move();
        }
        Player.draw(mainContext, !drawThings);

        if (++drawThings > 3) drawThings = 0;
    }
}


export async function startLoop() {
    await gameInit();
    await gameStart();

    loopStart = await new Promise(resolve => requestAnimationFrame(t => resolve(t)));
    gameLoop();
}

export function stopLoop() {
    cancelAnimationFrame(loopID);
}
