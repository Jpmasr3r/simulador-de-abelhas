import Bee from "./Bee.js";
import id from "./Id.js";
import GameObject from "./Object.js";

class Honeycomb extends GameObject {
	private _haveHoney: boolean;
	private _haveBee: boolean;
	private _wormState: number;

	// sprites organizados em lista
	private wormSprites: string[] = [
		"./assets/honeycomb.png", // 0 sem nada
		"./assets/honeycomb_worm01.png", // 1 larva fase 1
		"./assets/honeycomb_worm02.png", // 2 larva fase 2
		"./assets/honeycomb_worm03.png", // 3 larva fase 3
	];

	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 64, y: 64 }, null);

		this._haveHoney = false;
		this._haveBee = false;
		this._wormState = 0;
	}

	update(): void {
		switch (this._wormState) {
			case 0:
				this.setSprite(
					this._haveHoney
						? "./assets/honeycomb_honey.png"
						: this.wormSprites[0],
				);
				break;
			case 1:
				this.setSprite(this.wormSprites[1]);
				if (this.timer(10)) this.setWormState(2);
				break;
			case 2:
				this.setSprite(this.wormSprites[2]);
				if (this.timer(10)) this.setWormState(3);
				break;
			case 3:
				this.setSprite(this.wormSprites[3]);
				if (this.timer(10)) this.spawnBee();
				break;
		}
	}

	// setters
	setHaveHoney(h: boolean): void {
		this._haveHoney = h;
	}

	setWormState(w: number): void {
		this._wormState = w;
	}

	setHaveBee(b: boolean): void {
		this._haveBee = b;
	}

	// getters
	getHaveHoney(): boolean {
		return this._haveHoney;
	}

	getHaveBee(): boolean {
		return this._haveBee;
	}

	getWormState(): number {
		return this._wormState;
	}

	// cria abelha
	spawnBee(): void {
		const offsetX = (Math.random() - 0.5) * 20; // variação -10 a +10
		const offsetY = (Math.random() - 0.5) * 20;

		const bee = new Bee(
			this.getCtx() as CanvasRenderingContext2D,
			"./assets/bee.png",
			this.getX() + offsetX,
			this.getY() + offsetY,
		);

		id.add(bee);

		// reseta estado da colmeia
		this._haveHoney = false;
		this._wormState = 0;
		this._haveBee = false;
	}
}

export default Honeycomb;
