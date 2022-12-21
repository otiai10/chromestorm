/// <reference path="../node_modules/@types/chrome/index.d.ts" />

import { Model } from "../src";

function sleep(ms = 0) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}

describe("Model", () => {

    beforeEach(async () => {
        await chrome.storage.local.clear();
    });

    describe("new", () => {
        it("constructs new instance of model without saving", () => {
            class Player extends Model {
                public name: string;
            }
            const otiai10 = Player.new({ name: "otiai10" });
            expect(otiai10).toBeInstanceOf(Player);
            expect(otiai10.name).toBe("otiai10");
            expect(otiai10.__id).toBe(null);
        });
    });

    describe("save", () => {
        it("saves the instance to your storage area", async () => {
            class Player extends Model {
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
                static override __namespace__ = "Player";
                public name: string;
            }
            const otiai20 = await Player.create({ name: "otiai20" });
            expect(otiai20).toBeInstanceOf(Player);
            expect(otiai20.name).toBe("otiai20");
            expect(otiai20.__id).not.toBe(null);
        });
    });

    describe("list", () => {
        it("shold list all records as an array of Model instance", async () => {
            class Player extends Model {
                public name: string;
                greet(): string {
                    return `Hello, this is ${this.name}!`;
                }
            }
            await Player.create({ name: "otiai2001" });
            await sleep(10);
            await Player.create({ name: "otiai2002" });
            await sleep(10);
            await Player.create({ name: "otiai2003" });
            await sleep(10);
            const list = await Player.list();
            expect(list.length).toBe(3);
            expect(list[0]).toBeInstanceOf(Player);
            expect(list[0].greet()).toBe(`Hello, this is otiai2001!`);
        });
    });

    describe("delete", () => {
        it("should delete the instance specifically", async () => {
            class Player extends Model {
                public name: string;
                static override __nextID__ = Model.sequentialID;
            }
            await Player.create({ name: "otiai3001" });
            await sleep(10);
            const p = await Player.create({ name: "otiai3002" });
            await sleep(10);
            await Player.create({ name: "otiai3003" });
            await sleep(10);
            const q = await Player.find(p.__id!);
            expect(q?.__id).toEqual(p.__id);
            const d = await q!.delete();
            expect(d.__id).toBeUndefined();
            const list = await Player.list();
            expect(list.length).toBe(2);
            expect(list.some(p => p.name == "otiai3002")).toBeFalsy();
        });
    });
});