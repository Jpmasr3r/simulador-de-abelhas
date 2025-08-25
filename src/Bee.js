import Flower from "./Flower.js";
import id from "./Id.js";
import GameObject from "./Object.js";

class Bee extends GameObject {
    constructor(ctx, sprite, x, y) {
        super(ctx, sprite, x, y, { x: 32, y: 32 });
        this.state = "flower";
        this.follow = null;
    }

    update() {
        switch (this.state) {
            case "flower":
                this.flowerUpdate();
                break;

            default:
                break;
        }
    }

    flowerUpdate() {
        let flowers = id.ids.filter(obj => obj instanceof Flower);

        if (this.follow == null) {
            for (let flower of flowers) {
                if (!flower.haveBee) {
                    flower.haveBee = true;
                    this.follow = flower;
                    break;
                }
            }
        } else {
            let targetX = this.follow.x + this.follow.sizex / 2 - this.sizex / 2;
            let targetY = this.follow.y + this.follow.sizey / 2 - this.sizey / 2;

            if (this._x !== targetX || this._y !== targetY) {
                let dx = targetX - this._x;
                let dy = targetY - this._y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.spd) {
                    this._x = targetX;
                    this._y = targetY;
                } else {
                    this._x += (dx / dist) * this.spd;
                    this._y += (dy / dist) * this.spd;
                }
            }
        }


    }
}

export default Bee;
