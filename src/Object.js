
class GameObject {
    constructor(ctx, sprite, x = 0, y = 0, size = { x: 32, y: 32 }) {
        this.ctx = ctx;
        this._sprite = sprite;
        this._x = x;
        this._y = y;
        this._size = size;
        this.spd = 1;

        this.draw();
    }

    get sprite() {
        return this._sprite;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get sizex() {
        return this._size.x;
    }

    get sizey() {
        return this._size.y;
    }

    set x(x) {
        this._x = x;
    }

    set sprite(sprite) {
        this._sprite = sprite;
    }

    set y(y) {
        this._y = y;
    }

    set sizex(x) {
        this._size.x = x;
    }

    set sizey(y) {
        this._size.y = y;
    }

    draw() {
        this.ctx.drawImage(this._sprite, this._x, this._y, this._size.x, this._size.y);
    }

    update() {

    }

    move(x, y) {

    }
}

export default GameObject;
