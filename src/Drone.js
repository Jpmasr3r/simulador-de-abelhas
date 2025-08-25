import GameObject from "./Object.js";

class Drone extends GameObject {
    constructor(ctx, sprite, x, y) {
        super(ctx, sprite, x, y, { x: 32, y: 32 });
    }
}

export default Drone;
