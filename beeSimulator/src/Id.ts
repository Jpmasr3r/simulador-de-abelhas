import type GameObject from "./Object";

class Id {
	private _ids: Array<GameObject> = [];

	//#region getter
	lastId() {
		return this._ids.at(-1);
	}

	allids() {
		return this._ids;
	}
	//#endregion

	//#region functions
	add(object: GameObject) {
		this._ids.push(object);
	}

	clear() {
		this._ids = [];
	}

	// biome-ignore lint/suspicious/noExplicitAny: <_class>
	filter(_class: any): any {
		return id.allids().filter((obj) => obj instanceof _class);
	}
	//#endregion
}

const id = new Id();

export default id;
