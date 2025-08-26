import GameObject from "./Object.js";

class Flower extends GameObject {
    constructor(ctx, sprite, x, y) {
        super(ctx, sprite, x, y, { x: 64, y: 64 });
        this.haveBee = false;
    }
}

export default Flower;
