import id from "./Id.js";
import GameObject from "./Object.js";
import Queen from "./Queen.js";

class Drone extends GameObject {
    constructor(ctx, sprite, x, y) {
        super(ctx, sprite, x, y, { x: 32, y: 32 }, "reproduce");
        this.follow;
    }

    update() {
        switch (this.state) {
            case "reproduce":
                this.reproduceUpdate();
                break;

            default:
                break;
        }
    }

    reproduceUpdate() {
        let queens = id.ids.filter(obj => obj instanceof Queen);

        if (this.follow) {
            this.move(this.follow);
        } else {
            for (let queen of queens) {
                if (queen.fertilized) { continue; }
                this.follow = queen;
                break;
            }
        }
    }
}

export default Drone;
