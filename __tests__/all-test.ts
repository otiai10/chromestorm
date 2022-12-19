import { Model } from "../src";

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
