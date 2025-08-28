import GameObject from "./Object.js";

class Honeycomb extends GameObject {
	private _haveHoney: boolean;
	private _haveBee: boolean;

	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 64, y: 64 }, null);

		this._haveHoney = false;
		this._haveBee = false;
	}

	//setter
	sethaveHoney(haveHoney: boolean): void {
		this._haveHoney = haveHoney;
	}

	setHaveBee(haveBee: boolean): void {
		this._haveBee = haveBee;
	}

	//getter
	gethaveHoney(): boolean {
		return this._haveHoney;
	}
	getHaveBee(): boolean {
		return this._haveBee;
	}
}

export default Honeycomb;
