/*
 * Access modifiers control the visibility of class members
 * TypeScript has : public, private, protected, readonly
 * These are compile-time only - removed from JS output
 */

export {};

//? 1. public (default)
//* public - accessible from anywhere
//* This is the default - no need to write it explicitly

class PublicExample {
  public name: string; // explicit public
  age: number; // implicit public

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public greet(): string {
    // explicit public method
    return `Hello, I am ${this.name}`;
  }
}

const pub = new PublicExample("Manjit", 22);
console.log("--- public ---");
console.log(pub.name); // accessible
console.log(pub.age); // accessible
console.log(pub.greet()); // accessible

//? 2. private
// * private - only accessible within the class itself
//* Cannot be accessed from outside or subclasses

class BankAccount {
  private balance: number; // * private — only accessible inside
  private pin: string; // * private — sensitive data
  public owner: string;

  constructor(owner: string, initialBalance: number, pin: string) {
    this.owner = owner;
    this.balance = initialBalance;
    this.pin = pin;
  }

  // * Public methods that safely expose private data
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }

  withdraw(amount: number, pin: string): void {
    if (pin !== this.pin) throw new Error("Invalid PIN");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
    console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
  }

  getBalance(pin: string): number {
    if (pin !== this.pin) throw new Error("Invalid PIN");
    return this.balance;
  }

  private validatePin(pin: string): boolean {
    return pin === this.pin;
  }
}

console.log("\n--- private ---");
const account = new BankAccount("Manjit", 1000, "1234");
account.deposit(500);
account.withdraw(200, "1234");
console.log("Balance:", account.getBalance("1234"));

// ! These would cause TypeScript errors:
// console.log(account.balance);  // ERROR — private
// console.log(account.pin);      // ERROR — private
// account.validatePin("1234");   // ERROR — private method

//? 3. protected
//* protected - accessible within the class and its subclasses
//* Cannot be accessed from outside the class hierarchy

class Animal {
  protected name: string;
  protected age: number;
  private id: number;

  constructor(name: string, age: number, id: number) {
    this.name = name;
    this.age = age;
    this.id = id;
  }

  protected makeSound(): string {
    return "...";
  }

  describe(): string {
    return `${this.name} (${this.age} years old)`;
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, id: number, breed: string) {
    super(name, age, id); // * pass to parent constructor
    this.breed = breed;
  }

  // * Can access protected members from parent
  bark(): string {
    return `${this.name} says: Woof!`; // * this.name — protected in Animal
  }

  info(): string {
    // * Can access protected name and age from Animal
    return `Dog: ${this.name}, ${this.age} years, Breed: ${this.breed}`;
  }
}

console.log("\n--- protected ---");
const dog = new Dog("Rex", 3, 1, "Labrador");
console.log(dog.describe()); // public — accessible
console.log(dog.bark()); // public method using protected field
console.log(dog.info());
// ! These would cause errors:
// console.log(dog.name);  // ERROR — protected (outside class hierarchy)
// console.log(dog.id);    // ERROR — private (not even in subclass)

//? 4. readonly
//* readonly - cannot be changed after initialization
//* readonly - can only be set in constructor

class Config {
  readonly appName: string;
  readonly version: string;
  readonly environment: "development" | "staging" | "production";
  private _debug: boolean;

  constructor(
    appName: string,
    version: string,
    environment: "development" | "staging" | "production",
  ) {
    this.appName = appName;
    this.version = version;
    this.environment = environment;
    this._debug = environment === "development";
  }
  get debug(): boolean {
    return this._debug;
  }

  toString(): string {
    return `${this.appName} v${this.version} [${this.environment}]`;
  }
}
console.log("\n--- readonly ---");
const appConfig = new Config("MyApp", "1.0.0", "production");
console.log(appConfig.toString());
console.log("Debug:", appConfig.debug);
// ! Cannot change readonly:
// appConfig.appName = "OtherApp";  // ERROR
// appConfig.version = "2.0.0";     // ERROR

//? 5. Parameter Properties (shorthand)
//* Combine access modifiers with constructor parameters
//* TypeScript automatically creates and assigns properties

class UserService {
  constructor(
    private readonly dbUrl: string,
    private readonly apiKey: string,
    protected maxRetries: number = 3,
    public serviceName: string = "UserService",
  ) {}
  connect(): string {
    return `Connecting to ${this.dbUrl} with key ${this.apiKey.slice(0, 4)}...`;
  }

  getConfig(): object {
    return {
      service: this.serviceName,
      maxRetries: this.maxRetries,
      // dbUrl and apiKey are private — not exposed
    };
  }
}
console.log("\n--- Parameter Properties ---");
const service = new UserService(
  "mongodb://localhost:27017",
  "secret-api-key-123",
);
console.log(service.connect());
console.log(service.getConfig());
console.log("Service name:", service.serviceName);
