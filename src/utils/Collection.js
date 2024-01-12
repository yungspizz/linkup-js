class Collection {
    constructor(items = []) {
        this.items = items;
    }

    static make(items = []) {
        return new Collection(items);
    }

    map(callback) {
        return new Collection(this.items.map(callback));
    }

    filter(callback) {
        return new Collection(this.items.filter(callback));
    }

    reduce(callback, initialValue) {
        return this.items.reduce(callback, initialValue);
    }

    each(callback) {
        this.items.forEach(callback);
        return this;
    }

    // Add more methods like sort, unique, push etc...
    slice(start, end) {
        return new Collection(this.items.slice(start, end));
    }

    flatten() {
        return new Collection(this.items.reduce((acc, val) => acc.concat(val), []));
    }

    toArray() {
        return this.items;
    }
}