
type ModelConstructor<T> = {
    new(props?: any): T;
    __name__(): string;
    __area__: chrome.storage.StorageArea;
    __rawdict__(): { [key: string]: any };
    __nextID__(ensemble?: { [key: string]: any }): string;
};

class IDProvider {
    static __nextID__: (ensemble?: { [key: string]: any }) => string = this.timestampID;
    static timestampID(): string {
        return String(Date.now());
    }
    static sequentialID(ensemble: { [key:string]: any}): string {
        const last = Object.keys(ensemble).map(id => parseInt(id, 10)).sort((prev, next) => (prev < next) ? -1 : 1).pop();
        return String((last || 0) + 1);
    }
}

export class Model extends IDProvider {

    static __namespace__?: string;
    static __name__<T>(this: ModelConstructor<T>): string {
        return this["__namespace__"] ?? this.name;
    }
    static __area__: chrome.storage.StorageArea = chrome.storage.local;

    static async __rawdict__<T>(this: ModelConstructor<T>): Promise<{ [key: string]: any }> {
        const namespace: string = this.__name__();
        const ensemble = await this.__area__.get(namespace);
        return ((ensemble || {})[namespace] || {});
    }

    static new<T>(this: ModelConstructor<T>, props?: Record<string, any>, __id?: string): T {
        const instance: T = new this(props);
        instance["__id"] = __id ?? null;
        Object.entries<any>(props || {}).map(([key, value]) => {
            instance[key] = value;
        });
        return instance;
    }

    static async create<T>(this: ModelConstructor<T>, props?: Record<string, any>): Promise<T> {
        return await this["new"](props).save();
    }

    static async list<T>(this: ModelConstructor<T>): Promise<T[]> {
        const dict = await this.__rawdict__();
        return Object.entries(dict).map(([id, props]) => {
            return (this as any)["new"](props, id); // decode to class instances.
        });
    }

    static async find<T>(this: ModelConstructor<T>, id: string): Promise<T | null> {
        const dict = await this.__rawdict__();
        return dict[id] ? this["new"](dict[id], id) : null;
    }

    public __id: string | null;

    async save<T>(this: T & Model): Promise<T> {
        const parent = (this.constructor as ModelConstructor<T>);
        const dict = await parent.__rawdict__();
        if (!this.__id) this.__id = parent.__nextID__(dict);
        dict[this.__id!] = this;
        await parent.__area__.set({ [parent.__name__()]: dict });
        return this;
    }

    // async delete<T>(this: T & Model): Promise<T> {
    //     const namespace: string = this.constructor["__name__"]();
    //     const area: chrome.storage.StorageArea = this.constructor["__area__"];
    //     const ensemble = await area.get(namespace);
    //     const dict = ((ensemble || {})[namespace] || {});
    // }

    // TODO: See https://github.com/otiai10/chomex/blob/main/src/Model/index.ts#L330-L348
    // public decode<T>(this: T, obj: { [key: string]: any }) {
    //     Object.keys(obj).map(key => {
    //         this[key] = obj[key];
    //     });
    //     return this;
    // }

    // TODO: See https://github.com/otiai10/chomex/blob/main/src/Model/index.ts#L350-L373
    // public encode<T>(this: T): { [key: string]: any } {
    //     const encoded: { [key: string]: any } = {};
    //     for (const prop in this) {
    //         if (!this.hasOwnProperty(prop)) {
    //             continue;
    //         }
    //         encoded[prop] = this[prop];
    //     }
    //     return encoded;
    // }
}
