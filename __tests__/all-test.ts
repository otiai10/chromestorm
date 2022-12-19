import { Model } from "../src";

// TODO: jest-chrome is not following the latest @types/chrome.
//       It requires @types/chrome@0.0.193.
import { chrome } from "jest-chrome";

describe("new", () => {
    it("constructs new instance of model without saving", () => {
        class Player extends Model {
            public name: string;
        }
        const otiai10 = Player.new({name: "otiai10"});
        expect(otiai10).toBeInstanceOf(Player);
        expect(otiai10.name).toBe("otiai10");
        expect(otiai10.__id).toBe(null);
    });
});

describe("save", () => {
    it("saves the instance to your storage area", async () => {
        class Player extends Model {
            static override __area__ = chrome.storage.local;
            public name: string;
        }
        const otiai10 = Player.new({ name: "otiai10" });
        expect(otiai10).toBeInstanceOf(Player);
        expect(otiai10.name).toBe("otiai10");
        expect(otiai10.__id).toBe(null);
        await otiai10.save();
        expect(otiai10.__id).not.toBe(null);
    });
});

describe("create", () => {
    it("is just a shorthand of new().save()", async () => {
        class Player extends Model {
            static override __area__ = chrome.storage.local;
            public name: string;
        }
        const otiai20 = await Player.create({ name: "otiai20" });
        expect(otiai20).toBeInstanceOf(Player);
        expect(otiai20.name).toBe("otiai20");
        expect(otiai20.__id).not.toBe(null);
    });
});
