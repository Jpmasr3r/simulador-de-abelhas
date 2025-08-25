class Id {
    ids = [];

    get lastId() {
        return this.ids.at(-1);
    }

    get allids() {
        return this.ids;
    }

    add(object) {
        this.ids.push(object)
    }
}

let id = new Id();

export default id;