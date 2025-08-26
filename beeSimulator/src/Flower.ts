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

	//#region getter
	getHaveBee(): boolean {
		return this._haveBee;
	}
	//#endregion

	//#region setter
	setHaveBee(haveBee: boolean): void {
		this._haveBee = haveBee;
	}
	//#endregion
}

export default Flower;
