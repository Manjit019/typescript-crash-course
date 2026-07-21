/*
        ! Abstract Classes : ->
        
        * Abstract classes are base classes that can not be instantiated directly.
        * They define a common structure for subclasses
        * Abstract methods must be implemented by subclasses
        * Non-abstract methods provide shared implementation
        
*/

//? 1.Basic Abstract Class

abstract class Shape {
  constructor(public color: string) {}

  //* Abstract Method - subclasses must implement this
  abstract area(): number;
  abstract perimeter(): number;

  //* Concrete method - shared by all subclasses
  describe(): string {
    return `A ${this.color} shape | Area: ${this.area().toFixed(2)} | Perimeter: ${this.perimeter().toFixed(2)}`;
  }

  // * Another concrete method
  scale(factor: number): string {
    return `Scaled area would be: ${(this.area() * factor * factor).toFixed(2)}`;
  }
}

// ! Cannot instantiate abstract class directly
// const shape = new Shape("red"); // ERROR

// * Must create a concrete subclass
class Circle extends Shape {
  constructor(
    public radius: number,
    color: string,
  ) {
    super(color);
  }

  // * Must implement both abstract methods
  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    public width: number,
    public height: number,
    color: string,
  ) {
    super(color);
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Triangle extends Shape {
  constructor(
    public a: number,
    public b: number,
    public c: number,
    color: string,
  ) {
    super(color);
  }

  area(): number {
    // Heron's formula
    const s = this.perimeter() / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }

  perimeter(): number {
    return this.a + this.b + this.c;
  }
}

console.log("--- Abstract Class ---");
const shapes: Shape[] = [
  new Circle(5, "red"),
  new Rectangle(4, 6, "blue"),
  new Triangle(3, 4, 5, "green"),
];

shapes.forEach((shape) => {
  console.log(shape.describe());
  console.log(shape.scale(2));
});

//? 2. Abstract classes with Constructor Logic

abstract class Repository<T> {
  // * Shared storage for all repositories
  protected items: T[] = [];
  protected nextId: number = 1;

  // * Concrete shared methods
  findAll(): T[] {
    return [...this.items];
  }

  count(): number {
    return this.items.length;
  }

  // * Abstract methods — each repository implements differently
  abstract findById(id: number): T | null;
  abstract save(item: Omit<T, "id">): T;
  abstract delete(id: number): boolean;
  abstract update(id: number, data: Partial<T>): T | null;
}
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

class UserRepository extends Repository<User> {
  findById(id: number): User | null {
    return this.items.find((u) => u.id === id) ?? null;
  }

  save(data: Omit<User, "id">): User {
    const newUser: User = { id: this.nextId++, ...data };
    this.items.push(newUser);
    return newUser;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  update(id: number, data: Partial<User>): User | null {
    const index = this.items.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.items[index] = { ...this.items[index], ...data };
    return this.items[index];
  }
  // * Extra method specific to users
  findByEmail(email: string): User | null {
    return this.items.find((u) => u.email === email) ?? null;
  }
}

console.log("\n--- Abstract Repository ---");
const userRepo = new UserRepository();

const u1 = userRepo.save({ name: "Manjit", email: "m@m.com", role: "admin" });
const u2 = userRepo.save({ name: "Kumar", email: "k@k.com", role: "user" });
const u3 = userRepo.save({ name: "Alice", email: "a@a.com", role: "user" });

console.log(
  "All users:",
  userRepo.findAll().map((u) => u.name),
);
console.log("Count:", userRepo.count());
console.log("Find by ID:", userRepo.findById(1)?.name);
console.log("Find by email:", userRepo.findByEmail("k@k.com")?.name);

userRepo.update(1, { role: "user" });
console.log("After update:", userRepo.findById(1));

userRepo.delete(3);
console.log(
  "After delete:",
  userRepo.findAll().map((u) => u.name),
);

//? 3. Abstract Class vs Interface

/* 
* INTERFACE:
 - Cannot have implementation (only signatures)
 - Cannot have constructor
 - A class can implement multiple interfaces
 - No access modifiers

* ABSTRACT CLASS:
 - CAN have both abstract and implemented methods
 - CAN have constructor
 - A class can only extend ONE abstract class
 - CAN have access modifiers

 * Use INTERFACE when: defining a contract with no shared code
 * Use ABSTRACT CLASS when: sharing common implementation + forcing some methods
*/

abstract class Logger {
  private logs: string[] = [];

  // shared implementation

  protected addLog(msg: string): void {
    const entry = `[${new Date().toISOString()}] ${msg}`;
    this.logs.push(entry);
    this.output(entry);
  }
  getLogs(): string[] {
    return [...this.logs];
  }

  //* Abstract - each logger output diffrently
  abstract output(msg: string): void;

  //* Concrete helpers that use abstract method
  info(msg: string): void {
    this.addLog(`INFO: ${msg}`);
  }
  warn(msg: string): void {
    this.addLog(`WARN: ${msg}`);
  }
  error(msg: string): void {
    this.addLog(`ERROR: ${msg}`);
  }
}

class ConsoleLogger extends Logger {
  output(message: string): void {
    console.log(message);
  }
}

class SilentLogger extends Logger {
  // * Stores but does not output
  output(_message: string): void {
    // * intentionally silent
  }
}

console.log("\n--- Abstract Logger ---");
const logger = new ConsoleLogger();
logger.info("Application started");
logger.warn("High memory usage");
logger.error("Database connection failed");
console.log("Log count:", logger.getLogs().length);

const silent = new SilentLogger();
silent.info("This is silent");
console.log("Silent log count:", silent.getLogs().length);