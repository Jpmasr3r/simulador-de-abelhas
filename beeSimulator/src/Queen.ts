import Honeycomb from "./Honeycomb.js";
import id from "./Id.js";
import GameObject from "./Object.js";
import Path from "./Path.js";

class Queen extends GameObject {
	private _fertilized: boolean;
	private _path: Path | null;
	private _margin: number = 50;
	private _haveFood: boolean;

	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
	) {
		super(ctx, sprite, x, y, { x: 64, y: 64 }, "walkPaths", 3);

		this._fertilized = false;
		this._path = this.generateRandomPath();
		this._haveFood = false;
	}

	// getters
	getFertilized(): boolean {
		return this._fertilized;
	}

	getPath(): Path | null {
		return this._path;
	}

	getHaveFood(): boolean {
		return this._haveFood;
	}

	// setters
	setHaveFood(haveFood: boolean): void {
		this._haveFood = haveFood;
	}

	setFertilized(fertilized: boolean): void {
		this._fertilized = fertilized;
	}

	setPath(path: Path): void {
		this._path = path;
	}

	// update
	update(): void {
		console.log(this.getHaveFood());

		switch (this.getState()) {
			case "waitFood":
				this.waitFoodUpdate();
				break;

			case "walkPaths":
				this.walkPathsUpdate();
				break;

			case "reproduce":
				this.reproduceUpdate();
				break;

			default:
				break;
		}
	}

	// reprodução
	reproduceUpdate(): void {
		const follow = this.getFollow() as Honeycomb | null;

		if (follow) {
			this.move(follow);

			// chegou na colmeia e ela está vazia
			if (
				this.colision(follow) &&
				follow.getWormState() === 0 &&
				this.timer(5)
			) {
				follow.setWormState(1); // coloca o ovo
				follow.setHaveBee(false); // libera a colmeia
				this.setHaveFood(false); // come a comida
				this.setFertilized(false); // perde fertilidade
				this.setFollow(null); // pronto para procurar outra colmeia depois
				this.setState("walkPaths"); // volta a andar
			}
		}

		// se não tem colmeia alvo, procura uma disponível
		if (!this.getFollow() && this.getFertilized()) {
			const honeycombs = id.filter(Honeycomb) as Honeycomb[];
			for (const honeycomb of honeycombs) {
				if (!honeycomb.getHaveBee() && honeycomb.getWormState() === 0) {
					this.setFollow(honeycomb);
					honeycomb.setHaveBee(true);
					break;
				}
			}
		}
	}

	// busca comida
	waitFoodUpdate(): void {
		const follow = this.getFollow();

		if (follow instanceof Honeycomb) {
			if (follow.getWormState() !== 0) {
				this.setFollow(null);
				this.setState("walkPaths");
			} else {
				this.move(follow);

				if (this.getHaveFood()) {
					// já pegou comida, decide o que fazer
					if (this.getFertilized()) {
						this.setState("reproduce");
					} else {
						this.setState("walkPaths");
					}
					this.setFollow(null);
					follow.setHaveBee(false);
					follow.setHaveHoney(false);
					return;
				}

				// se colidiu, tenta pegar comida
				if (this.colision(follow) && this.timer(5)) {
					this.setHaveFood(true);
				}
			}
		} else {
			// procurar outro honeycomb com comida
			const honeycombs = id.filter(Honeycomb) as Honeycomb[];
			for (const honeycomb of honeycombs) {
				if (
					honeycomb.getHaveHoney() &&
					!honeycomb.getHaveBee() &&
					honeycomb.getWormState() === 0
				) {
					this.setFollow(honeycomb);
					honeycomb.setHaveBee(true);
					return;
				}
			}
			// se não achou, volta a andar
			this.setState("walkPaths");
		}
	}

	// andar aleatório
	walkPathsUpdate(): void {
		if (this.getFollow()) {
			this.move(this.getFollow());
			if (this.getPath() && this.colision(this.getPath())) {
				this.tradePath();
			}
		} else {
			this.tradePath();
		}

		// procura comida se estiver fertilizada
		if (this.getFertilized() && !this.getHaveFood()) {
			const honeycombs: Honeycomb[] = id.filter(Honeycomb);
			for (const honeycomb of honeycombs) {
				if (honeycomb.getHaveHoney() && !honeycomb.getHaveBee()) {
					this.setFollow(honeycomb);
					honeycomb.setHaveBee(true);
					this.setState("waitFood");
					break;
				}
			}
		}
	}

	// troca caminho
	tradePath(): void {
		const path = this.generateRandomPath();
		this.setFollow(path);
		this.setPath(path);
	}

	// gera um caminho aleatório
	generateRandomPath(): Path {
		const sizeX = this.getSizeX();
		const sizeY = this.getSizeY();

		const x =
			this._margin + Math.random() * (800 * 0.75 - sizeX - this._margin * 2);
		const y = this._margin + Math.random() * (600 - sizeY - this._margin * 2);

		return new Path(x, y);
	}
}

export default Queen;
