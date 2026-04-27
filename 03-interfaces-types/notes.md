
# 03 - Interfaces and Types Notes

## Topics Covered

- Interfaces — defining object shapes
- Extending Interfaces
- Readonly and Optional modifiers
- type alias vs interface
- Declaration Merging
- Structural Typing

---

## Interfaces

Define the shape an object must have.

```ts
interface User {
  id: number;
  name: string;
  email?: string;       // optional
  readonly createdAt: string;  // readonly
}
```

Interfaces can define:
- Properties
- Methods
- Index signatures
- Function shapes
- Class contracts (implements)

---

## Extending Interfaces

```ts
interface Animal { name: string }

// Single extension
interface Dog extends Animal { breed: string }

// Multiple extension
interface AdminUser extends User, HasTimestamps, HasPermissions { ... }
```

---

## Readonly and Optional

| Modifier | Syntax | Effect |
|---|---|---|
| Optional | `prop?: string` | Property may be undefined |
| Readonly | `readonly prop: string` | Cannot reassign after creation |
| Readonly all | `Readonly<T>` | All properties become readonly |
| Required all | `Required<T>` | All optional become required |
| Optional all | `Partial<T>` | All properties become optional |

```ts
interface Product {
  readonly id: number;
  name: string;
  description?: string;
}
```

---

## type vs interface

| Feature | type | interface |
|---|---|---|
| Object shapes | ✅ | ✅ |
| Union types | ✅ | ❌ |
| Intersection | ✅ (&) | ✅ (extends) |
| Primitive aliases | ✅ | ❌ |
| Declaration merging | ❌ | ✅ |
| Mapped types | ✅ | ❌ |
| implements in class | ✅ | ✅ |
| extends | ✅ (&) | ✅ (extends) |

### Decision Rule
- **interface** → object shapes, classes, OOP, public APIs
- **type** → unions, primitives, computed types, complex compositions

---

## Declaration Merging

Only interfaces support this.

```ts
interface Config { apiUrl: string }
interface Config { timeout: number }

// Result: Config has both apiUrl and timeout
```

Real world use: extending third-party library types.

---

## Structural Typing

TypeScript checks SHAPE not NAME.

```ts
interface Point { x: number; y: number }

const coords = { x: 10, y: 20, label: "origin" };

function plot(p: Point) { ... }
plot(coords); // Works — coords has x and y
```

Rules:
- Extra properties are OK when assigned via variable
- Extra properties are NOT OK in direct object literals
- A type with MORE properties satisfies a type with FEWER properties

---

## Utility Types Covered

| Utility | What It Does |
|---|---|
| `Readonly<T>` | Makes all properties readonly |
| `Partial<T>` | Makes all properties optional |
| `Required<T>` | Makes all optional properties required |

More utility types in → 07-advanced-types

---

## Common Mistakes

1. Using interface for union types — use type instead
2. Forgetting to handle optional properties — always check for undefined
3. Confusing readonly with const — readonly is for properties, const for variables
4. Not knowing about declaration merging — causes confusion when extending libs
5. Assuming TypeScript checks type names — it checks structure

---

## Key Takeaways

- Interfaces define object shapes — use them for classes and OOP
- type aliases are more flexible — unions, primitives, mapped types
- Optional (?) and readonly are essential modifiers
- Declaration merging is unique to interfaces
- TypeScript is structural — shape matters, not name
- Partial, Readonly, Required are commonly used utility types

---

## Practice Challenges

1. Create an interface for a Product with required and optional fields
2. Extend a BaseEntity interface with id and timestamps into a User interface
3. Create an interface with a method signature and implement it
4. Show the difference between type and interface for the same object
5. Use Partial<T> to write an update function
6. Create two structurally identical interfaces and show they are compatible

---

## Run Files

```powershell
tsrun 03-interfaces-types/interfaces
tsrun 03-interfaces-types/extending-interfaces
tsrun 03-interfaces-types/readonly-optional
tsrun 03-interfaces-types/type-vs-interface
tsrun 03-interfaces-types/declaration-merging
tsrun 03-interfaces-types/structural-typing
```

---
