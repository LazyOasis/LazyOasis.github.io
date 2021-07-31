export class Sprite {

    constructor(name, spriteData, x, y) {
        this.name = name;
        this.spriteData = spriteData;

        this.x = x;
        this.y = y;
        this.currentFrame = 0;
    }

    draw(context, frameUp) {
        context.drawImage(this.spriteData.pic, 0, this.currentFrame*this.spriteData.height, this.spriteData.width, this.spriteData.height, this.x, this.y, this.spriteData.width, this.spriteData.height);

        if (frameUp && ++this.currentFrame >= this.spriteData.frames) this.currentFrame = 0;
    }

}