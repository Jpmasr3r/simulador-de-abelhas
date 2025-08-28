import Honeycomb from "./Honeycomb.js";
import Id from "./Id.js";
import GameObject from "./Object.js";
import Path from "./Path.js";

class Queen extends GameObject {
	private _fertilized: boolean;
	private _path: Path | null;
	private _margin: number = 50;

	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 64, y: 64 }, "walkPaths", 5);

		this._fertilized = false;
		this._path = this.generateRandomPath();
	}

	// getters
	getFertilized(): boolean {
		return this._fertilized;
	}

	getPath(): Path | null {
		return this._path;
	}

	// setters
	setFertilized(fertilized: boolean): void {
		this._fertilized = fertilized;
	}

	setPath(path: Path): void {
		this._path = path;
	}

	// update
	update(): void {
		switch (this.getState()) {
			case "waitFood":
				this.waitFoodUpdate();
				break;

			case "walkPaths":
				this.walkPathsUpdate();
				break;
		}
	}

	// funções auxiliares
	waitFoodUpdate(): void {
		const honeycombs: Honeycomb[] = Id.filter(Honeycomb);

		for (const _honeycomb of honeycombs) {
			// lógica futura: buscar/comer/interagir com honeycomb
		}
	}

	walkPathsUpdate(): void {
		if (this.getFollow()) {
			this.move(this.getFollow());
			if (this.getPath() && this.colision(this.getPath())) {
				this.tradePath();
			}
		} else {
			this.tradePath();
		}
	}

	tradePath(): void {
		const path = this.generateRandomPath();
		this.setFollow(path);
		this.setPath(path);
	}

	generateRandomPath(): Path {
		const sizeX = this.getSizeX();
		const sizeY = this.getSizeY();

		const x =
			(this._margin + Math.random() * (800 - sizeX - this._margin * 2)) * 0.75;
		const y = this._margin + Math.random() * (600 - sizeY - this._margin * 2);

		return new Path(x, y);
	}
}

export default Queen;
