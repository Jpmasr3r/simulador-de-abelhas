abstract class GameObject {
	private _ctx: CanvasRenderingContext2D | null;
	private _sprite: HTMLImageElement | null = null;
	private _x: number;
	private _y: number;
	private _size: { x: number; y: number };
	private _spd: number;
	private _state: string | null;
	private _follow: GameObject | null = null;

	constructor(
		ctx: CanvasRenderingContext2D | null,
		sprite: string | null,
		x: number,
		y: number,
		size: { x: number; y: number },
		state: string | null,
		spd: number = 1,
	) {
		this._ctx = ctx;
		this._x = x;
		this._y = y;
		this._size = size;
		this._spd = spd;
		this._state = state;

		if (sprite) {
			this.loadSprite(sprite).then((img) => {
				this._sprite = img;
			});
		}
	}

	private loadSprite(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
			img.src = src;
		});
	}

	//getters
	getSprite(): HTMLImageElement | null {
		return this._sprite;
	}

	getFollow(): GameObject | null {
		return this._follow;
	}

	getSpd(): number {
		return this._spd;
	}

	getCtx(): CanvasRenderingContext2D | null {
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

	//setters
	setX(x: number): void {
		this._x = x;
	}

	setState(state: string | null): void {
		this._state = state;
	}

	setFollow(follow: GameObject | null): void {
		this._follow = follow;
	}

	setSprite(sprite: string): void {
		this.loadSprite(sprite).then((img) => {
			this._sprite = img;
		});
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

	//functions
	draw(): void {
		if (!this._sprite) return; // só desenha se já tiver carregado
		try {
			const ctx = this.getCtx();
			if (ctx) {
				ctx.drawImage(
					this._sprite,
					this._x,
					this._y,
					this._size.x,
					this._size.y,
				);
			}
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

	colision(follow: GameObject | null): boolean {
		if (!follow) {
			return false;
		}

		const ax1 = this.getX();
		const ay1 = this.getY();
		const ax2 = ax1 + this.getSizeX();
		const ay2 = ay1 + this.getSizeY();

		const bx1 = follow.getX();
		const by1 = follow.getY();
		const bx2 = bx1 + follow.getSizeX();
		const by2 = by1 + follow.getSizeY();

		// Check for rectangle overlap
		return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
	}

	private _timerEnd: number | null = null;

	timer(seconds: number): boolean {
		if (this._timerEnd === null) {
			this._timerEnd = Date.now() + seconds * 1000;
			return false;
		}

		if (Date.now() >= this._timerEnd) {
			this._timerEnd = Date.now() + seconds * 1000; // reinicia automaticamente
			return true;
		}

		return false;
	}
}

export default GameObject;
