import { Model } from "../../../lib";
import sampledata from "../kcwidget/localstorage.json";

class Player extends Model {
    static __namespace__ = "Player";
    greet() {
        return `Hello, my name is ${this.name}!`;
    }
}
Player.__area__ = chrome.storage.local;

/**
 * Because chomex.Model encodes everything into JSON.string,
 * when we migrate it into chromestorm, we need to JSON.parse
 * and storage.{local|sync}.set.
 */
self.setup_data = async function() {
    const obj = Object.keys(sampledata).reduce((ctx, namespace) => {
        ctx[namespace] = JSON.parse(sampledata[namespace]);
        return ctx;
    }, {});
    await chrome.storage.local.set(obj);
}

self.example_001 = async function() {
    const x = await Player.create({ name: "otiai10" });
    return {
        ok: true,
        namespace: Player.__ns__(),
        id: x._id,
        greet: (await Player.find(x._id)).greet(),
    };
}

self.example_002 = async function() {
    class Frame extends Model {
        static __namespace__ = "Frame";
    }
    return {
        ok: true,
        list: await Frame.list(),
    }
}