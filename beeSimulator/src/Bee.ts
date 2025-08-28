import Flower from "./Flower.js";
import Honeycomb from "./Honeycomb.js";
import id from "./Id.js";
import GameObject from "./Object.js";

// !states!
// * produce => produce honey in honeycomb *
// * flower => go to the flower to get pollen*
class Bee extends GameObject {
	private _havePollen: boolean;
	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 32, y: 32 }, "flower");

		this._havePollen = false;
	}

	//getter
	getHavePollen(): boolean {
		return this._havePollen;
	}

	//setter
	setHavePollen(havePollen: boolean): void {
		this._havePollen = havePollen;
	}

	//functions
	update(): void {
		switch (this.getState()) {
			case "flower":
				this.flowerUpdate();
				break;

			case "produce":
				this.produceUpdate();
				break;

			default:
				break;
		}
	}

	flowerUpdate(): void {
		if (this.getFollow()) {
			const follow = this.getFollow() as Flower;
			this.move(follow);
			if (this.getHavePollen()) {
				this.setState("produce");
				this.setFollow(null);
				follow.setHaveBee(false);
			} else if (this.colision(follow)) {
				if (this.timer(5)) {
					this.setHavePollen(true);
				}
			}
		} else {
			const flowers: Flower[] = id.filter(Flower);
			for (const flower of flowers) {
				if (!flower.getHaveBee()) {
					this.setFollow(flower);
					flower.setHaveBee(true);
					break;
				}
			}
		}
	}

	produceUpdate() {
		const _honeycombs: Honeycomb[] = id.filter(Honeycomb);

		if (this.getFollow()) {
			this.move(this.getFollow());
		} else {
			for (const honeycomb of _honeycombs) {
				if (!honeycomb.getHaveBee()) {
					this.setFollow(honeycomb);
					honeycomb.setHaveBee(true);
					break;
				}
			}
		}
	}
}

export default Bee;
