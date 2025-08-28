import GameObject from "./Object.js";

class Flower extends GameObject {
	private _haveBee: boolean;

	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 64, y: 64 }, null);

		this._haveBee = false;
	}

	//getter
	getHaveBee(): boolean {
		return this._haveBee;
	}

	//setter
	setHaveBee(haveBee: boolean): void {
		this._haveBee = haveBee;
	}
}

export default Flower;
