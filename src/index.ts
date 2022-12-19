
type ModelConstructor<T> = { new(props?: any): T }

export class Model {

    static __namespace__?: string;
    private static __name__<T>(this: ModelConstructor<T>): string {
        return this["__namespace__"] ?? this.name;
    }
    static __nextID__: (dict?: { [key: string]: any }) => string = () => String(Date.now());
    static __area__: chrome.storage.StorageArea;

    static new<T>(this: ModelConstructor<T>, props?: Record<string, any>): T {
        const instance: T = new this(props);
        instance["__id"] = null;
        Object.entries<any>(props || {}).map(([key, value]) => {
            instance[key] = value;
        });
        return instance;
    }

    static async create<T>(this: ModelConstructor<T>, props?: Record<string, any>): Promise<T> {
        return await this["new"](props).save();
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

}
