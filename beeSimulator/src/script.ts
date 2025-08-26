import Bee from "./Bee.js";
import Drone from "./Drone.js";
import Flower from "./Flower.js";
import Honeycomb from "./Honeycomb.js";
import id from "./Id.js";
import type GameObject from "./Object.js";
import Queen from "./Queen.js";

const canvas: HTMLCanvasElement = document.getElementById(
	"canvas",
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
	"2d",
) as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;

const rebootBtn: HTMLButtonElement = document.querySelector(
	"#reboot",
) as HTMLButtonElement;

const numBeeInput: HTMLInputElement = document.querySelector(
	"#numBee",
) as HTMLInputElement;
const numQueenInput: HTMLInputElement = document.querySelector(
	"#numQueen",
) as HTMLInputElement;
const numDroneInput: HTMLInputElement = document.querySelector(
	"#numDrone",
) as HTMLInputElement;
const numFlowerInput: HTMLInputElement = document.querySelector(
	"#numFlower",
) as HTMLInputElement;
const numHoneycombInput: HTMLInputElement = document.querySelector(
	"#numHoneycomb",
) as HTMLInputElement;

function spawn(): void {
	id.clear();

	for (let i = 0; i < Number(numHoneycombInput.value); i++) {
		const img = "./assets/honeycomb.png";
		const x = Math.random() * (canvas.width * 0.75 - 64);
		const y = Math.random() * (canvas.height - 64);

		const honeycomb = new Honeycomb(ctx, img, x, y);
		id.add(honeycomb);
	}

	for (let i = 0; i < Number(numFlowerInput.value); i++) {
		const img = "./assets/flower.png";
		const x = canvas.width * 0.75 + Math.random() * (canvas.width * 0.25 - 64);
		const y = Math.random() * (canvas.height - 64);

		const flower = new Flower(ctx, img, x, y);
		id.add(flower);
	}

	for (let i = 0; i < Number(numBeeInput.value); i++) {
		const img = "./assets/bee.png";
		const x = Math.random() * (canvas.width * 0.75 - 32);
		const y = Math.random() * (canvas.height - 32);

		const bee = new Bee(ctx, img, x, y);
		id.add(bee);
	}

	for (let i = 0; i < Number(numDroneInput.value); i++) {
		const img = "./assets/drone.png";
		const x = Math.random() * (canvas.width * 0.75 - 32);
		const y = Math.random() * (canvas.height - 32);

		const drone = new Drone(ctx, img, x, y);
		id.add(drone);
	}

	for (let i = 0; i < Number(numQueenInput.value); i++) {
		const img = "./assets/queen.png";
		const queen = new Queen(
			ctx,
			img,
			Math.random() * (canvas.width * 0.75 - 64),
			Math.random() * (canvas.height - 64),
		);
		id.add(queen);
	}
}

function loop(): void {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	id.allids().forEach((obj: GameObject) => {
		obj.draw();
		obj.update();
	});

	requestAnimationFrame(loop);
}

spawn();
loop();

rebootBtn.addEventListener("click", spawn);
