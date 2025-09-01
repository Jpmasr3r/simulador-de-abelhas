import id from "./Id.js";
import GameObject from "./Object.js";
import Path from "./Path.js";
import Queen from "./Queen.js";

class Drone extends GameObject {
	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 32, y: 32 }, "walkPaths", 2);
	}

	update(): void {
		switch (this.getState()) {
			case "reproduce":
				this.reproduceUpdate();
				break;
			case "walkPaths":
				this.walkPathsUpdate();
				break;
		}
	}

	reproduceUpdate(): void {
		let follow = this.getFollow() as Queen | null;

		// se não tem alvo, procura rainha não fertilizada
		if (!follow || follow.getFertilized()) {
			const queens: Queen[] = id.filter(Queen);
			follow = queens.find((q) => !q.getFertilized()) || null;
			this.setFollow(follow);
			if (!follow) {
				this.setState("walkPaths"); // nada a fazer, vai vagar
				return;
			}
		}

		// se há alvo, move e fertiliza
		this.move(follow);
		if (this.colision(follow) && this.timer(5)) {
			follow.setFertilized(true);
			this.die();
		}
	}

	walkPathsUpdate(): void {
		if (this.getFollow()) {
			console.log(this.getFollow());

			this.move(this.getFollow());
			const queens = id.filter(Queen) as Queen[];
			for (const queen of queens) {
				if (!queen.getFertilized()) {
					this.setFollow(queen);
					this.setState("reproduce");
					break;
				}
			}
		} else {
			// movimento aleatório
			const x = Math.random() * (800 * 0.75 - this.getSizeX());
			const y = Math.random() * (600 - this.getSizeY());
			const path = new Path(x, y);
			this.setFollow(path);
		}
	}

	die() {
		id.delete(this);
	}
}

export default Drone;
