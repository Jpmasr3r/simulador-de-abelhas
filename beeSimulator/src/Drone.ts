import Id from "./Id.js";
import GameObject from "./Object.js";
import Queen from "./Queen.js";

class Drone extends GameObject {
	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 32, y: 32 }, "reproduce");
	}

	//functions
	update() {
		switch (this.getState()) {
			case "reproduce":
				this.reproduceUpdate();
				break;

			default:
				break;
		}
	}

	reproduceUpdate() {
		const queens: Queen[] = Id.filter(Queen);

		if (this.getFollow()) {
			const queen = this.getFollow() as Queen;
			this.move(queen);
			if (queen.getFertilized()) {
				this.setFollow(null);
			} else if (this.colision(this.getFollow())) {
				queen.setFertilized(true);
			}
		} else {
			for (const queen of queens) {
				if (!queen.getFertilized()) {
					this.setFollow(queen);
					break;
				}
			}
		}
	}
}

export default Drone;
