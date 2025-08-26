import Honeycomb from "./Honeycomb.js";
import Id from "./Id.js";
import GameObject from "./Object.js";

// !states!
// * wait_food => esperando comida para começar a reproduzir *

class Queen extends GameObject {
	private _fertilized: boolean;
	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 64, y: 64 }, "waitFood");

		this._fertilized = false;
	}

	//#region getter
	getFertilized(): boolean {
		return this._fertilized;
	}
	//#endregion

	//#region setter
	setFertilized(fertilized: boolean): void {
		this._fertilized = fertilized;
	}
	//#endregion

	//#region functions
	update() {
		switch (this.getState()) {
			case "waitFood":
				this.waitFoodUpdate();
				break;

			default:
				break;
		}
	}

	waitFoodUpdate() {
		const honeycombs: Honeycomb[] = Id.filter(Honeycomb);

		for (let honeycomb of honeycombs) {
		}
	}

	//#endregion
}

export default Queen;
