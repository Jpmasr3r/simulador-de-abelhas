import Flower from "./Flower.js";
import id from "./Id.js";
import GameObject from "./Object.js";

class Bee extends GameObject {
	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 32, y: 32 }, "flower");
	}

	//#region functions
	update(): void {
		switch (this.getState()) {
			case "flower":
				this.flowerUpdate();
				break;

			default:
				break;
		}
	}

	flowerUpdate(): void {
		if (this.getFollow()) {
			this.move(this.getFollow());
		} else {
			const flowers: Flower[] = id.filter(Flower);
			for (const flower of flowers) {
				if (!flower.getHaveBee()) {
					flower.setHaveBee(true);
					this.setFollow(flower);
					break;
				}
			}
		}
	}
	//#endregion
}

export default Bee;
