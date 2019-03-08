class RouteStorage {
    constructor() {
        this.store = {}
    }

    saveData(key,data) {
        this.store[key] = data;
    }

    getData(key) {
        return this.store[key]
    }

    keyExist(key) {
        if(key in this.store) {
            return true
        } else {
            return false
        }
    }
}

let store = new RouteStorage()

module.exports = store