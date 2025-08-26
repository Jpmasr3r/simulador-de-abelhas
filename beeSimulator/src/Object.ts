abstract class GameObject {
	private _ctx: CanvasRenderingContext2D;
	private _sprite: HTMLImageElement | null = null;
	private _x: number;
	private _y: number;
	private _size: { x: number; y: number };
	private _spd: number;
	private _state: string | null;
	private _follow: GameObject | null = null;

	constructor(
		ctx: CanvasRenderingContext2D,
		sprite: string,
		x: number,
		y: number,
		size: { x: number; y: number },
		state: string | null,
	) {
		this._ctx = ctx;
		this._x = x;
		this._y = y;
		this._size = size;
		this._spd = 1;
		this._state = state;

		this.loadSprite(sprite).then((img) => {
			this._sprite = img;
		});
	}

	private loadSprite(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
			img.src = src;
		});
	}

	//#region getters
	getSprite(): HTMLImageElement | null {
		return this._sprite;
	}

	getFollow(): GameObject | null {
		return this._follow;
	}

	getSpd(): number {
		return this._spd;
	}

	getCtx(): CanvasRenderingContext2D {
		return this._ctx;
	}

	getX(): number {
		return this._x;
	}

	getY(): number {
		return this._y;
	}

	getSizeX(): number {
		return this._size.x;
	}

	getSizeY(): number {
		return this._size.y;
	}

	getState(): string | null {
		return this._state;
	}
	//#endregion

	//#region setters
	setX(x: number): void {
		this._x = x;
	}

	setState(state: string | null): void {
		this._state = state;
	}

	setFollow(follow: GameObject): void {
		this._follow = follow;
	}

	setSprite(sprite: HTMLImageElement): void {
		this._sprite = sprite;
	}

	setY(y: number): void {
		this._y = y;
	}

	setSizeX(x: number): void {
		this._size.x = x;
	}

	setSizeY(y: number): void {
		this._size.y = y;
	}
	//#endregion

	//#region functions
	draw(): void {
		if (!this._sprite) return; // só desenha se já tiver carregado
		try {
			this.getCtx().drawImage(
				this._sprite,
				this._x,
				this._y,
				this._size.x,
				this._size.y,
			);
		} catch (_error) {
			console.log(_error);
		}
	}

	update(): void {}

	move(follow: GameObject | null): void {
		if (follow == null) {
			return;
		}
		const targetX: number =
			follow.getX() + follow.getSizeX() / 2 - this.getSizeX() / 2;
		const targetY: number =
			follow.getY() + follow.getSizeY() / 2 - this.getSizeY() / 2;

		if (this.getX() !== targetX || this.getY() !== targetY) {
			const dx: number = targetX - this.getX();
			const dy: number = targetY - this.getY();
			const dist: number = Math.sqrt(dx * dx + dy * dy);

			if (dist < this.getSpd()) {
				this.setX(targetX);
				this.setY(targetY);
			} else {
				this.setX((dx / dist) * this.getSpd() + this.getX());
				this.setY((dy / dist) * this.getSpd() + this.getY());
			}
		}
	}
	//#endregion
}

export default GameObject;
