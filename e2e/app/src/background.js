import { Model } from "../../../lib";

class Player extends Model {
    static __namespace__ = "Player";
    greet() {
        return `Hello, my name is ${this.name}!`;
    }
}
Player.__area__ = chrome.storage.local;

async function greet_001() {
    const x = await Player.create({ name: "otiai10" });
    return {
        ok: true,
        namespace: Player.__ns__(),
        id: x._id,
        greet: (await Player.find(x._id)).greet(),
    };
}

// so that e2e/run.ts can execute script.
self.greet_001 = greet_001;
