
# 04 - Functions Deep Dive Notes

## Topics Covered

- Function Types
- Optional, Default, and Rest Parameters
- Function Overloads
- never, void, unknown
- Higher Order Functions
- Closures

---

## Function Types

```ts
// Named function
function add(a: number, b: number): number { return a + b; }

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Type alias for function
type Operation = (a: number, b: number) => number;

// Interface for function
interface Formatter { (value: string): string; }

// Function variable
let greet: (name: string) => string;
```

---

## Parameters

```ts
// Optional — must come after required
function greet(name: string, title?: string): string { ... }

// Default — used when arg is undefined or not passed
function greet(name: string, greeting: string = "Hello"): string { ... }

// Rest — must be last — collects into array
function sum(...numbers: number[]): number { ... }

// Default object — common pattern
function init(options: { timeout?: number } = {}): void { ... }
```

---

## Function Overloads

```ts
// Overload signatures (no body)
function format(value: string): string;
function format(value: number): string;

// Implementation (handles all cases)
function format(value: string | number): string {
  if (typeof value === "string") return value;
  return value.toFixed(2);
}
```

Use overloads when:
- Return type depends on argument type
- Different argument combinations produce different behavior
- You want clear documentation of valid call patterns

---

## void vs never vs unknown

| Type | Meaning | Example |
|---|---|---|
| `void` | Returns nothing | Side-effect functions |
| `never` | Never returns | Always throws or infinite loop |
| `unknown` | Type unknown — must narrow | API responses, catch blocks |
| `any` | Avoid — no type checking | Legacy code only |

```ts
function log(msg: string): void { console.log(msg); }
function fail(msg: string): never { throw new Error(msg); }

function process(val: unknown): string {
  if (typeof val === "string") return val.toUpperCase();
  return String(val);
}
```

---

## Higher Order Functions

Functions that take or return functions.

```ts
// Takes a function
function filter<T>(arr: T[], pred: (v: T) => boolean): T[]

// Returns a function
function createMultiplier(n: number): (v: number) => number

// Currying
function curry<A,B,C>(fn: (a:A, b:B) => C): (a:A) => (b:B) => C

// Composition
const process = pipe(trim, toLower, addPrefix);
```

---

## Closures

Functions that remember their outer scope.
```ts
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    value: () => count,
  };
}

const counter = createCounter();
counter.increment(); // count is remembered
```

Uses:
- Private state (encapsulation)
- Pre-configured function variants
- Factories (createLogger, createStack)

---

## Common Mistakes

1. Optional parameters before required ones
2. Using any instead of unknown in catch blocks
3. Forgetting that never functions still need a throw
4. Not typing callback parameters in higher-order functions
5. Overusing overloads for simple union types

---

## Key Takeaways

- Functions can be typed as variables, parameters, and return values
- Optional params use ?, default params use =, rest params use ...
- Overloads provide multiple call signatures for one function
- void = no return, never = cannot return, unknown = safe any
- Higher-order functions are the foundation of functional patterns
- Closures capture outer scope — powerful for encapsulation

---

## Practice Challenges

1. Write a function that accepts a string or number and returns a formatted string using overloads
2. Create a memoize function that caches results
3. Build a createValidator function that returns a typed validator
4. Write a pipe function that composes transformations
5. Create a closure-based stack with push, pop, peek, and size
6. Write a function with rest params that logs with a prefix and level

---

## Run Files

```bash
tsrun 04-functions-deep-dive/function-types
tsrun 04-functions-deep-dive/optional-default-rest
tsrun 04-functions-deep-dive/overloads
tsrun 04-functions-deep-dive/never-void-unknown
tsrun 04-functions-deep-dive/higher-order-functions
tsrun 04-functions-deep-dive/closures
```

