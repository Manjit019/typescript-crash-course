
# 05 - Objects, Classes, OOP Notes

## Topics Covered

- Object Types — index signatures, Record, spread, destructure
- Classes — basic, constructors, getters/setters
- Access Modifiers — public, private, protected, readonly
- Inheritance — extends, super, method overriding, polymorphism
- Abstract Classes — abstract methods, shared implementation
- Interfaces with Classes — implements, dependency injection
- Static Members — static properties, methods, singleton, factory

---

## Class Anatomy

```ts
class MyClass extends ParentClass implements Interface1, Interface2 {
  // Static members
  static count: number = 0;

  // Instance properties
  public name: string;
  private secret: string;
  protected role: string;
  readonly id: number;

  // Constructor shorthand
  constructor(
    public username: string,
    private password: string,
    protected level: number = 1
  ) {
    super(); // must call super first if extending
    this.name = username;
    this.secret = password;
    this.role = "user";
    this.id = ++MyClass.count;
  }

  // Getter
  get info(): string { return this.name; }

  // Setter
  set info(value: string) { this.name = value; }

  // Abstract (if class is abstract)
  abstract doSomething(): void;

  // Static method
  static create(): MyClass { return new MyClass("default", "pass"); }
}
```

---

## Access Modifiers

| Modifier | Class | Subclass | Outside |
|---|---|---|---|
| `public` | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |
| `readonly` | ✅ (set once) | ✅ (read) | ✅ (read) |

---

## Inheritance

```ts
class Animal {
  constructor(protected name: string) {}
  speak(): string { return "..."; }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // call parent constructor
  }

  speak(): string {
    return `${super.speak()} Woof!`; // call parent method
  }
}
```

Rules:
- `super()` must be called first in child constructor
- `super.method()` calls parent method
- Child can override any public/protected parent method

---

## Abstract Classes

```ts
abstract class Shape {
  abstract area(): number;  // must implement

  describe(): string {      // shared — no need to implement
    return `Area: ${this.area()}`;
  }
}

class Circle extends Shape {
  constructor(public radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}
```

- Cannot be instantiated directly
- Abstract methods have no body — must be implemented
- Non-abstract methods are shared

---

## Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---|---|---|
| Instantiate | ❌ | ❌ |
| Implementation | ❌ | ✅ |
| Multiple inherit | ✅ | ❌ |
| Constructor | ❌ | ✅ |
| Access modifiers | ❌ | ✅ |

Use interface: pure contract, multiple inheritance
Use abstract class: shared code + forced implementation

---

## Static Members

```ts
class Counter {
  private static count = 0;

  static increment(): void { Counter.count++; }
  static getCount(): number { return Counter.count; }
}

Counter.increment();
console.log(Counter.getCount()); // 1
```

Patterns:
- Utility class (MathUtils, StringUtils)
- Singleton pattern
- Factory methods (Color.fromHex, Color.fromRGB)
- Constants (AppConfig.MAX_RETRIES)

---

## Key Patterns

### Singleton
```ts
class DB {
  private static instance: DB;
  private constructor() {}
  static getInstance(): DB {
    if (!DB.instance) DB.instance = new DB();
    return DB.instance;
  }
}
```

### Dependency Injection
```ts
interface Logger { log(msg: string): void; }

class Service {
  constructor(private logger: Logger) {}
}

// Swap implementations easily
new Service(new ConsoleLogger());
new Service(new FileLogger());
```

---

## Common Mistakes

1. Forgetting to call super() in child constructor
2. Accessing private members from subclasses
3. Instantiating abstract classes directly
4. Confusing static and instance members
5. Not using interfaces for dependency injection

---

## Key Takeaways

- Classes are blueprints — instances are objects
- Use parameter properties for clean constructors
- Getters and setters allow controlled property access
- Access modifiers enforce encapsulation
- Inheritance reuses code — override to specialize
- Abstract classes share code and force implementation
- Interfaces define contracts — use for dependency injection
- Static members belong to the class — not instances

---

## Practice Challenges

1. Create a Shape abstract class with Circle, Rectangle, Triangle
2. Build a BankAccount with private balance and public deposit/withdraw
3. Create a Singleton Logger class
4. Implement a Repository pattern with an abstract base class
5. Use dependency injection — inject a Logger into a Service class
6. Create a Color class with static factory methods fromRGB and fromHex

---

## Run Files

```bash
tsrun 05-oops/object-types
tsrun 05-oops/classes
tsrun 05-oops/access-modifiers
tsrun 05-oops/inheritance
tsrun 05-oops/abstract-classes
tsrun 05-oops/interfaces-with-classes
tsrun 05-oops/static-members
```
