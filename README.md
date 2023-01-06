# chromestorm

[![version](https://img.shields.io/npm/v/chromestorm)](https://www.npmjs.com/package/chromestorm)
[![downloads](https://img.shields.io/npm/dt/chromestorm)](https://www.npmjs.com/package/chromestorm)
[![Node.js CI](https://github.com/otiai10/chromestorm/actions/workflows/node.yml/badge.svg)](https://github.com/otiai10/chromestorm/actions/workflows/node.yml)
[![Chrome E2E Test](https://github.com/otiai10/chromestorm/actions/workflows/chrome-test.yml/badge.svg)](https://github.com/otiai10/chromestorm/actions/workflows/chrome-test.yml)
[![codecov](https://codecov.io/github/otiai10/chromestorm/branch/main/graph/badge.svg?token=z3Nzs6xVGF)](https://codecov.io/github/otiai10/chromestorm)
[![Maintainability](https://api.codeclimate.com/v1/badges/df8271f73cd0791369f6/maintainability)](https://codeclimate.com/github/otiai10/chromestorm/maintainability)

ORM-like API provider for `chrome.storage`.

Note: If you want it for `window.localStorage`, check [localstorm](https://github.com/otiai10/localstorm).

# Example Usage

```typescript
// In your background.{ts|js}

import { Model } from "chromestrom";

// Define your model,
class Player extends Model {
    public name: string;
    public age: number;
    greet(): string {
        return `Hello, my name is ${this.name}!`;
    }
}

// and use it.
(async () => {
    // Save records to chrome.storage.
    const x = await Player.create({ name: "otiai10", age: 17 });
    const y = await Player.create({ name: "hiromu", age: 32 });

    // Retrieve records from chrome.storage.
    console.log(await Player.list()); // 2
    console.log(await Player.find(x._id)); // Player {name:"otiai10", age: 17}
})();
```

# Basic APIs

## Defining your model class

```typescript
import { Model } from "chromestorm";

class Player extends Model {
    // You can define your own members of your model.
    public name: string;
    public age: number;

    // Optional: If you'd like to minify/mangle your JS,
    // you'd better set the namespace of this mode explicitly.
    static override __namespace__ = "Player";
}
```

That's all to get started. Let's enjoy.

## new

To construct new model object:

```typescript
const john = Player.new({name: "John", age: 17});
console.log(john._id); // null
```

NOTE: `new` does NOT save constructed object yet. Please use `save` to make it persistent.

## save

To save unsaved obejct to `chrome.storage`:

```typescript
await john.save();
console.log(john._id); // 1672363730924
```

Now `_id` is generated because it's saved on `chrome.storage`.

## create

Just a short-hand of `new` and `save`:

```typescript
const paul = await Player.create({name: "Paul", age: 16});
console.log(paul._id); // 1672968746499
```

## list

To list up all entities saved on this namespace:

```typescript
const all = await Player.list();
console.log(all.length);  // 2
console.log(all[0].name); // John
```

## dict

To get all entities saved on this namespace as a dict:

```typescript
const dict = await Player.dict();
console.log(Object.entries(dict));
// [[1672363730924, Player], [1672968746499, Player]]
```

## find

To find specific object saved on this namespace:

```typescript
const found = await Player.find("1672968746499");
console.log(found?.name); // Paul
```

## filter

To find objects which should match a specific criteria:

```typescript
const criteria = (p: Player): bool => (Player.age > 16);
const filtered = await Player.filter(criteria);
console.log(filtered.length); // 1
```

## update

// TODO:

## delete

To delete a specific object:

```typescript
await john.delete();
const found = await Player.find(john._id);
console.log(found); // null
```

## drop

To delete all objects saved on this namespace:

```typescript
await Player.drop();
const list = await Player.list();
console.log(list.length); // 0
```

# Advanced properties

## schema

// TODO:

# Issues

- https://github.com/otiai10/chromestorm/issues
