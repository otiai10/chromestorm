
/// <reference path="../../node_modules/@types/chrome/index.d.ts" />

Object.assign(global, {
    chrome: {
        storage: {
            local: {
                __dict___: {},
                getBytesInUse(callback) { },
                getBytesInUse(keys) {},
                async clear() {
                    this.__dict___ = {};
                    return Promise.resolve();
                },
                async set(obj) {
                    Object.keys(obj).map(key => {
                        this.__dict___[key] = { ...this.__dict___[key], ...obj[key] };
                    });
                    return await Promise.resolve();
                },
                async remove(key) {
                    const keys = (key instanceof Array) ? key : [key];
                    keys.map(k => this.__dict___[k] = undefined);
                    return Promise.resolve();
                },
                async get(key) {
                    const result = {};
                    const keys = (key instanceof Array) ? key : [key];
                    keys.map(k => result[k] = { ...this.__dict___[k] });
                    return result;
                }
            }
        }
    }
});
