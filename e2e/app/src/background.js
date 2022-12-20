import { Model } from "../lib";

async function greet_001() {
    class Player extends Model {
        greet() {
            return `Hello, my name is ${this.name}!`;
        }
    }
    Player.__area__ = chrome.storage.local;
    await Player.create({ name: "otiai10" });
    const list = await Player.list();
    return {
        ok: true,
        namespace: Player.__name__(),
        list,
        class: list[0] instanceof Player,
        greet: list[0].greet(),
    };
}

// so that e2e/run.ts can execute script.
self.greet_001 = greet_001;
