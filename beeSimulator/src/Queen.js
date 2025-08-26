import GameObject from "./Object.js";

class Queen extends GameObject {
    constructor(ctx, sprite, x, y) {
        super(ctx, sprite, x, y, { x: 64, y: 64 });
        this.fertilized = false;
    }
}

export default Queen;
