Object.defineProperty(Object.prototype, Symbol.iterator, {
    value: function * () {
        let keys = Object.keys(this);
        for(let key of keys) {
            let obj = {};
            obj[key] = this[key];
            yield obj;
        }
    },
    enumerable: false
});
