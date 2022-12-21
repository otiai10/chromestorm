
type ModelConstructor<T> = { new(props?: any): T, __name__(): string, __area__: chrome.storage.StorageArea };

export class Model {

    static __namespace__?: string;
    static __name__<T>(this: ModelConstructor<T>): string {
        return this["__namespace__"] ?? this.name;
    }
    static __nextID__: (ensemble?: { [key: string]: any }) => string = this.timestampID;
    static __area__: chrome.storage.StorageArea;

    static timestampID(): string {
        return String(Date.now());
    }
    static sequentialID(ensemble: { [key:string]: any}): string {
        const last = Object.keys(ensemble).map(id => parseInt(id, 10)).sort((prev, next) => (prev < next) ? -1 : 1).pop();
        return String((last || 0) + 1);
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
        const namespace: string = this.__name__();
        const area: chrome.storage.StorageArea = this.__area__;
        const ensemble = await area.get(namespace);
        const dict: { [key: string]: any } = ((ensemble || {})[namespace] || {});
        return Object.entries(dict).map(([id, props]) => {
            return (this as any)["new"](props, id); // decode to class instances.
        });
    }

    static async find<T>(this: ModelConstructor<T>, id: string): Promise<T | null> {
        const namespace: string = this.__name__();
        const area: chrome.storage.StorageArea = this.__area__;
        const ensemble = await area.get(namespace);
        const dict: { [key: string]: any } = ((ensemble || {})[namespace] || {});
        return dict[id] ?? null;
    }

    public __id: string | null;

    async save<T>(this: T & Model): Promise<T> {
        const namespace: string = this.constructor["__name__"]();
        const area: chrome.storage.StorageArea = this.constructor["__area__"];
        const ensemble = await area.get(namespace);
        const dict = ((ensemble || {})[namespace] || {});
        if (!this.__id) {
            this.__id = this.constructor["__nextID__"](dict);
        }
        dict[this.__id!] = this;
        await area.set({ [namespace]: dict });
        return this;
    }

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
