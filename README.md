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
    console.log(await Player.find(x.__id)); // Player {name:"otiai10", age: 17}
})();
```

# Issues

- https://github.com/otiai10/chromestorm/issues
