import Bee from "./src/Bee.js";
import Drone from "./src/Drone.js";
import Flower from "./src/Flower.js";
import Honeycomb from "./src/Honeycomb.js";
import id from "./src/Id.js";
import Queen from "./src/Queen.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;


function spawn() {
    for (let i = 0; i < 25; i++) {
        let img = new Image();
        img.src = "assets/honeycomb.png";
        let x = Math.random() * ((canvas.width * 0.75) - 64);
        let y = Math.random() * (canvas.height - 64);

        const honeycomb = new Honeycomb(ctx, img, x, y);
        id.add(honeycomb);
    }

    for (let i = 0; i < 10; i++) {
        let img = new Image();
        img.src = "assets/flower.png";
        let x = (canvas.width * 0.75) + Math.random() * ((canvas.width * 0.25) - 64);
        let y = Math.random() * (canvas.height - 64);

        const flower = new Flower(ctx, img, x, y);
        id.add(flower);
    }

    for (let i = 0; i < 10; i++) {
        let img = new Image();
        img.src = "assets/bee.png";
        let x = Math.random() * ((canvas.width * 0.75) - 32);
        let y = Math.random() * (canvas.height - 32);

        const bee = new Bee(ctx, img, x, y);
        id.add(bee);
    }

    for (let i = 0; i < 10; i++) {
        let img = new Image();
        img.src = "assets/drone.png";
        let x = Math.random() * ((canvas.width * 0.75) - 32);
        let y = Math.random() * (canvas.height - 32);

        const drone = new Drone(ctx, img, x, y);
        id.add(drone);
    }

    let img = new Image();
    img.src = "assets/queen.png";
    const queen = new Queen(
        ctx,
        img,
        Math.random() * ((canvas.width * 0.75) - 64),
        Math.random() * (canvas.height - 64)
    );
    id.add(queen);

}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    id.ids.forEach(obj => {
        obj.draw();
        obj.update();
    });

    requestAnimationFrame(loop);
}

spawn();
loop();
