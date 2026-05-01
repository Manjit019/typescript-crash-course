
# 02 - Type System Notes

## Topics Covered

- Type Aliases
- Union Types
- Intersection Types
- Literal Types
- Enums
- Type Narrowing Introduction

---

## Type Aliases

Give a name to any type for reuse and readability.

```ts
type User = { name: string; age: number };
type ID = string | number;
type Status = "active" | "inactive";
type Operation = (a: number, b: number) => number;
```

Use type aliases to:
- Avoid repeating complex types
- Give meaning to primitive types
- Name union and intersection types
- Name function signatures

---

## Union Types ( | )

A value can be ONE of several types.

```ts
let id: string | number = 101;
type Status = "active" | "inactive" | "pending";
function format(val: string | number): string { ... }
```

Always narrow before using type-specific methods:

```ts
if (typeof val === "string") {
  val.toUpperCase(); // safe
}
```

---

## Intersection Types ( & )

A value must satisfy ALL combined types.

```ts
type Admin = BaseUser & AdminPrivileges;
type FullRecord = WithID & WithTimestamp & WithData;
```

- Union = OR
- Intersection = AND
- Avoid intersecting types with conflicting same-named properties

---

## Literal Types

Restrict a value to exact specific values.

```ts
type Direction = "up" | "down" | "left" | "right";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type AlwaysTrue = true;
```

Use `as const` to lock inferred types as literals:

```ts
const config = { env: "production", version: 3 } as const;
```

Template literal types:

```ts
type EventKey = `${ElementType}_${EventName}`;
```

---

## Enums

Named constants grouped together.

```ts
enum Direction { Up, Down, Left, Right }            // numeric
enum Role { Admin = "ADMIN", Viewer = "VIEWER" }    // string
const enum Season { Spring = "SPRING" }             // const — inlined
```

| Feature | Numeric Enum | String Enum | Const Enum |
|---|---|---|---|
| Default values | 0, 1, 2... | must set manually | must set manually |
| Reverse mapping | ✅ | ❌ | ❌ |
| Runtime object | ✅ | ✅ | ❌ inlined |
| Readable logs | ❌ | ✅ | ✅ |

Prefer string enums or union literals over numeric enums.

---

## Type Narrowing

Making TypeScript understand a more specific type within a union.

| Technique | Example |
|---|---|
| typeof | `if (typeof val === "string")` |
| truthiness | `if (value)` |
| equality | `if (val === "active")` |
| in operator | `if ("meow" in animal)` |
| instanceof | `if (error instanceof ApiError)` |
| discriminated union | `switch (state.status)` |

---

## type vs interface — Quick Preview

| Feature | type | interface |
|---|---|---|
| Object shapes | ✅ | ✅ |
| Union types | ✅ | ❌ |
| Intersection | ✅ (&) | ✅ (extends) |
| Primitives | ✅ | ❌ |
| Function types | ✅ | ✅ |
| Declaration merging | ❌ | ✅ |

Covered fully in → 03-interfaces-and-types

---

## Common Mistakes

1. Forgetting to narrow union types before using type-specific methods
2. Using numeric enums in logs — they show numbers not names
3. Conflicting properties in intersection types — results in never
4. Using string type instead of literal union — loses safety
5. Not using as const for config objects

---

## Key Takeaways

- Type aliases make complex types reusable
- Union = OR, Intersection = AND
- Literal types restrict to exact values
- Enums group related constants — prefer string enums
- Always narrow union types before using specific methods
- Discriminated unions are the cleanest narrowing pattern
- as const locks inferred types as literals

---

## Practice Challenges

1. Create a type alias for a Blog Post with title, content, tags, and optional image
2. Write a function that accepts string or number and returns a formatted string
3. Create an intersection type combining User and Timestamps
4. Build a discriminated union for a payment state — pending, success, failed
5. Create an enum for HTTP methods — GET, POST, PUT, DELETE, PATCH
6. Use as const on a config object and derive a type from its values

---

## Run Files

```powershell
tsrun 02-type-system/type-aliases
tsrun 02-type-system/union-types
tsrun 02-type-system/intersection-types
tsrun 02-type-system/literal-types
tsrun 02-type-system/enums
tsrun 02-type-system/type-narrowing-intro
```
