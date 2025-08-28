import GameObject from "./Object.js";

class Path extends GameObject {
	constructor(
		x: number,
		y: number,
		size: { x: number; y: number } = { x: 64, y: 64 },
	) {
		super(null, null, x, y, size, null);
	}
}

export default Path;
