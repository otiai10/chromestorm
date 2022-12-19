
type ModelConstructor<T> = { new(props?: any): T }

export class Model {

    static new<T>(this: ModelConstructor<T>, props?: any): T {
        const instance: T = new this(props);
        Object.entries<any>(props).map(([key, value]) => {
            instance[key] = value;
        });
        instance["__id"] = null;
        return instance;
    }

    public __id: string | number | null;
}
