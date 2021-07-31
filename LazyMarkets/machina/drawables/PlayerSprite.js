import { Sprite } from "./Sprite";


const gameFrame = document.getElementById("game");


export class PlayerSprite extends Sprite {

    constructor(name, spriteData, x, y) {
        super(name, spriteData, x, y);

        this.direction = "right";
        this.animation = "idle";
        this.currentFrame = 0;
    }

    draw(context, frameUp) {
        const data = this.spriteData[this.direction][this.animation];
        context.drawImage(data.pic, 0, this.currentFrame*data.height, data.width, data.height, this.x, this.y, data.width, data.height);

        if (frameUp && ++this.currentFrame >= data.frames) this.currentFrame = 0;
    }

    setDirection(dir) {
        this.direction = dir;
    }

    setAnimation(anim) {
        this.animation = anim;
        this.currentFrame = 0;
    }

    move() {
        let amount = this.direction === "right" ? 6 : -6;
        this.x += amount;
        if (this.x > 360 && this.x < 2840) {
            gameFrame.scrollBy(amount, 0);
        }
    }

}