function sample(collection) {
    return collection[collection.length * Math.random() | 0];
}


let smokes = [];

export async function loadSmokes() {
    const smokeSmall = new Image;
    smokeSmall.src = "src/smokesmall.png";
    const smokeMed = new Image;
    smokeMed.src = "src/smokemed.png";
    const smokeBig = new Image;
    smokeBig.src = "src/smokebig.png";

    smokes.push(smokeSmall, smokeMed, smokeBig);

    await Promise.all([smokeSmall.decode(), smokeMed.decode(), smokeBig.decode()]);
}


export class Smoker {

    constructor(context) {
        this.context = context;
        this.particles = [];
    }

    draw(x, y) {
        this.context.clearRect(0, 0, 640, 360);
        for (let particle of this.particles.slice()) {
            this.context.drawImage( smokes[particle.p], x-particle.t*6+~~(Math.random()*6-3), y-~~(6*Math.log(particle.t)+particle.v) );

            if (++particle.t > 80) {
                this.particles.splice(this.particles.indexOf(particle), 1);
            }
        }
    }

    emit() {
        if (this.particles.length < 80) {
            this.particles.push({
                t: 0,
                v: Math.random()*8-2,
                p: ~~(Math.random()*3)
            });
        }
    }

}