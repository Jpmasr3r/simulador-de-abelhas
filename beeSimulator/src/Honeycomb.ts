import GameObject from "./Object.js";

class Honeycomb extends GameObject {
	private _haveFood: boolean;

	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 64, y: 64 }, null);

		this._haveFood = false;
	}

	//#region setter
	setHaveFood(haveFood: boolean): void {
		this._haveFood = haveFood;
	}
	//#endregion

	//#region getter
	getHaveFood(): boolean {
		return this._haveFood;
	}
	//#endregion
}

export default Honeycomb;
