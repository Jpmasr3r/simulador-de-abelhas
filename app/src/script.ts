import Bee from "./Bee.js";
import Drone from "./Drone.js";
import Flower from "./Flower.js";
import Honeycomb from "./Honeycomb.js";
import id from "./Id.js";
import type GameObject from "./Object.js";
import Queen from "./Queen.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;

const rebootBtn = document.querySelector("#reboot") as HTMLButtonElement;

const inputs = {
	numBee: document.querySelector("#numBee") as HTMLInputElement,
	numQueen: document.querySelector("#numQueen") as HTMLInputElement,
	numDrone: document.querySelector("#numDrone") as HTMLInputElement,
	numFlower: document.querySelector("#numFlower") as HTMLInputElement,
	numHoneycomb: document.querySelector("#numHoneycomb") as HTMLInputElement,
};

type SpawnConfig = {
	classRef: typeof GameObject;
	img: string;
	count: number;
	width: number;
	height: number;
	area: "left" | "right" | "full";
};

function randomPos(area: "left" | "right" | "full", w: number, h: number) {
	let x: number;
	if (area === "left") {
		x = Math.random() * (canvas.width * 0.75 - w);
	} else if (area === "right") {
		x = canvas.width * 0.75 + Math.random() * (canvas.width * 0.25 - w);
	} else {
		x = Math.random() * (canvas.width - w);
	}
	const y = Math.random() * (canvas.height - h);
	return { x, y };
}

function spawnObjects(cfg: SpawnConfig) {
	for (let i = 0; i < cfg.count; i++) {
		const { x, y } = randomPos(cfg.area, cfg.width, cfg.height);
		const obj = new (cfg.classRef as any)(ctx, cfg.img, x, y);
		id.add(obj);
	}
}

function spawn(): void {
	id.clear();

	const configs: SpawnConfig[] = [
		{
			classRef: Honeycomb,
			img: "../assets/honeycomb.png",
			count: Number(inputs.numHoneycomb.value),
			width: 64,
			height: 64,
			area: "left",
		},
		{
			classRef: Flower,
			img: "../assets/flower.png",
			count: Number(inputs.numFlower.value),
			width: 64,
			height: 64,
			area: "right",
		},
		{
			classRef: Bee,
			img: "../assets/bee.png",
			count: Number(inputs.numBee.value),
			width: 32,
			height: 32,
			area: "left",
		},
		{
			classRef: Drone,
			img: "../assets/drone.png",
			count: Number(inputs.numDrone.value),
			width: 32,
			height: 32,
			area: "left",
		},
		{
			classRef: Queen,
			img: "../assets/queen.png",
			count: Number(inputs.numQueen.value),
			width: 64,
			height: 64,
			area: "left",
		},
	];

	configs.forEach(spawnObjects);
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
