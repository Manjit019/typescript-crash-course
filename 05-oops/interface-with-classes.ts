/*
    ! Interfaces with Classes

    * Interfaces define contracts that classes must follow
    * A class can implement multiple interfaces
    * This is how TypeScript achieve multiple inheritance like behavior
*/

export {};

//? 1. Implementing a single interface

interface Printable {
  print(): void;
  getContent(): string;
}

class Invoice implements Printable {
  constructor(
    private id: number,
    private amount: number,
    private customer: string,
  ) {}

  print(): void {
    console.log("=".repeat(30));
    console.log(`INVOICE #${this.id}`);
    console.log(`Customer: ${this.customer}`);
    console.log(`Amount: $${this.amount.toFixed(2)}`);
    console.log("=".repeat(30));
  }

  getContent(): string {
    return `Invoice #${this.id} for ${this.customer}: $${this.amount}`;
  }
}

console.log("--- Single Interface ---");
const invoice = new Invoice(1001, 299.99, "Manjit Kumar");
invoice.print();

//? 2. Implementing multiple interfaces

interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Validatable {
  validate(): boolean;
  getErrors(): string[];
}

interface Auditable {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  touch(): void;
}

class UserModel implements Serializable, Validatable, Auditable {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  private errors: string[] = [];

  constructor(
    public name: string,
    public email: string,
    public age: number,
    createdBy: string = "system",
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.createdBy = createdBy;
  }

  // * Serializable
  serialize(): string {
    return JSON.stringify({
      name: this.name,
      email: this.email,
      age: this.age,
    });
  }

  deserialize(data: string): void {
    const parsed = JSON.parse(data);
    this.name = parsed.name;
    this.email = parsed.email;
    this.age = parsed.age;
  }

  // * Validatable
  validate(): boolean {
    this.errors = [];

    if (!this.name || this.name.trim().length < 2) {
      this.errors.push("Name must be at least 2 characters");
    }

    if (!this.email.includes("@")) {
      this.errors.push("Email must be valid");
    }

    if (this.age < 0 || this.age > 150) {
      this.errors.push("Age must be between 0 and 150");
    }

    return this.errors.length === 0;
  }

  getErrors(): string[] {
    return [...this.errors];
  }

  // * Auditable
  touch(): void {
    this.updatedAt = new Date();
  }
}

console.log("\n--- Multiple Interfaces ---");
const userModel = new UserModel("Manjit", "manjit@example.com", 22, "admin");

console.log("Serialized:", userModel.serialize());
console.log("Valid:", userModel.validate());
console.log("Errors:", userModel.getErrors());

const invalid = new UserModel("M", "notanemail", -5);
console.log("\nInvalid user:");
console.log("Valid:", invalid.validate());
console.log("Errors:", invalid.getErrors());

//? 3. Interface as Type for Class Instances
//* Use the interface as the type - not the class name
//* This allows swapping implementations easily

interface DataStore {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  delete(key: string): boolean;
  has(key: string): boolean;
  clear(): void;
}

class MemoryStore implements DataStore {
  private store = new Map<string, unknown>();

  get(key: string): unknown {
    return this.store.get(key);
  }

  set(key: string, value: unknown): void {
    this.store.set(key, value);
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  clear(): void {
    this.store.clear();
  }
}

class LocalStorageStore implements DataStore {
  // Simulated localStorage (in real app this would use window.localStorage)
  private storage: Record<string, string> = {};

  get(key: string): unknown {
    const val = this.storage[key];
    return val ? JSON.parse(val) : undefined;
  }

  set(key: string, value: unknown): void {
    this.storage[key] = JSON.stringify(value);
  }

  delete(key: string): boolean {
    if (key in this.storage) {
      delete this.storage[key];
      return true;
    }
    return false;
  }

  has(key: string): boolean {
    return key in this.storage;
  }

  clear(): void {
    this.storage = {};
  }
}

// * Type is DataStore interface — works with ANY implementation
function useStore(store: DataStore): void {
  store.set("user", { name: "Manjit", age: 22 });
  store.set("theme", "dark");
  console.log("Has user:", store.has("user"));
  console.log("User:", store.get("user"));
  store.delete("theme");
  console.log("Has theme after delete:", store.has("theme"));
}

console.log("\n--- Interface as Type ---");
console.log("Memory Store:");
useStore(new MemoryStore());

console.log("\nLocalStorage Store:");
useStore(new LocalStorageStore());

//? 4. Dependency Injection Pattern
//* Use interfaces to decouple classes from implementations
//* Makes code testable and flexible

interface EmailService {
  sendEmail(to: string, subject: string, body: string): Promise<boolean>;
}

interface Logger {
  log(message: string): void;
  error(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
  error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}

class MockEmailService implements EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
    return true;
  }
}

// * UserService depends on interfaces — not concrete classes
class UserService {
  constructor(
    private emailService: EmailService,
    private logger: Logger,
  ) {}

  async registerUser(name: string, email: string): Promise<void> {
    this.logger.log(`Registering user: ${name}`);

    const sent = await this.emailService.sendEmail(
      email,
      "Welcome!",
      `Hello ${name}, welcome to our app!`,
    );

    if (sent) {
      this.logger.log(`Welcome email sent to ${email}`);
    } else {
      this.logger.error(`Failed to send email to ${email}`);
    }
  }
}

console.log("\n--- Dependency Injection ---");
const userService = new UserService(
  new MockEmailService(),
  new ConsoleLogger(),
);

userService.registerUser("Manjit", "manjit@example.com");