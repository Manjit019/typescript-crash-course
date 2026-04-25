
# 01 - Basics Notes

## Topics Covered

- Variables — let, const, var
- Primitive types — string, number, boolean, null, undefined, symbol, bigint
- Arrays and Tuples
- Objects
- Functions
- Type Inference

---

## Variables

| Keyword | Scope | Reassignable | Use When |
|---|---|---|---|
| `const` | block | ❌ | value never changes |
| `let` | block | ✅ | value may change |
| `var` | function | ✅ | avoid — legacy only |

Always prefer `const` first. Use `let` only when reassignment is needed.

---

## Primitive Types

| Type | Example | Notes |
|---|---|---|
| `string` | `"hello"` | text values |
| `number` | `42`, `3.14` | all numbers — no int/float split |
| `boolean` | `true`, `false` | conditions and flags |
| `null` | `null` | intentionally empty |
| `undefined` | `undefined` | declared but not assigned |
| `symbol` | `Symbol("id")` | unique keys |
| `bigint` | `9007199254740991n` | very large numbers |

Avoid `any` — use `unknown` when the type is truly not known.

---

## Arrays

```ts
let names: string[] = ["Manjit", "Kumar"];
let scores: Array<number> = [95, 87];
let matrix: number[][] = [[1,2],[3,4]];
const fixed: readonly string[] = ["a", "b"];
```

---

## Tuples

```ts
let person: [string, number, boolean] = ["Manjit", 22, true];
let named: [name: string, age: number] = ["Manjit", 22];
let optional: [number, number, number?] = [10, 20];
```

Use tuples when: fixed structure, mixed types, order matters.

---

## Objects

```ts
const user: { name: string; age: number } = { name: "Manjit", age: 22 };
const opt: { id: number; note?: string } = { id: 1 };
const fixed: { readonly id: number } = { id: 1 };
```

---

## Functions

```ts
function add(a: number, b: number): number { return a + b; }
const multiply = (x: number, y: number): number => x * y;
function greet(name: string, title?: string): string { ... }
function log(msg: string): void { console.log(msg); }
function fail(msg: string): never { throw new Error(msg); }
function sum(...nums: number[]): number { ... }
```

---

## Type Inference Rules

| Situation | Write Type? |
|---|---|
| Variable with value | ❌ inference handles it |
| Variable without value | ✅ must be explicit |
| Function parameters | ✅ always explicit |
| Function return type | optional but recommended |
| Callback arguments | ❌ contextual typing handles it |
| Union types | ✅ be explicit |

---

## Common Mistakes

1. Using `var` instead of `let` or `const`
2. Using `any` to silence errors
3. Not handling `null` and `undefined` properly
4. Forgetting to type function parameters
5. Confusing tuples with arrays
6. Not using `readonly` for data that should not change

---

## Key Takeaways

- `const` by default, `let` when needed, never `var`
- TypeScript has one `number` type — no int or float
- `null` is intentional absence, `undefined` is unassigned
- Tuples are fixed-length typed arrays — order matters
- Functions need typed parameters always
- `void` = no return, `never` = never returns
- Trust inference for simple values, be explicit for complex ones

---

## Practice Challenges

1. Create a const object for a student with name, age, grade
2. Write a function that takes a name and optional greeting and returns a string
3. Create a tuple for an RGB color value
4. Write a function using rest parameters that returns the average of numbers
5. Create a readonly array of country names
6. Declare a variable without a value and assign it later

---

## Run Files

```bash
tsrun 01-basics/variables
tsrun 01-basics/primitive-types
tsrun 01-basics/arrays-tuples
tsrun 01-basics/objects
tsrun 01-basics/functions
tsrun 01-basics/type-inference
```


