/*
    ! Static members in TypeScript :

    * Static members are members that are shared by all instances of a class
    * They are defined using the "static" keyword
    * Static members are accessible without creating an instance of the class
    * Access with ClassName.memberName not instance.memberName
*/

//? 1.Static Properties

class AppConfig {
  //* Static properties - shared by all
  static readonly APP_NAME: string = "TS App";
  static readonly VERSION: string = "1.0.0";
  static readonly MAX_CONNECTIONS: number = 100;
  private static instaceCount: number = 0;

  constructor() {
    AppConfig.instaceCount++;
  }

  static getInstanceCount(): number {
    return this.instaceCount;
  }
}

console.log("--- Static Properties ---");
console.log("App:", AppConfig.APP_NAME);
console.log("Version:", AppConfig.VERSION);
console.log("Max connections:", AppConfig.MAX_CONNECTIONS);

new AppConfig();
new AppConfig();
new AppConfig();
console.log("Instances created:", AppConfig.getInstanceCount());

//? 2.Static Methods

class MathUtils {
  //* All methods are static - no instance needed
  static add(a: number, b: number): number {
    return a + b;
  }
  static subtract(a: number, b: number): number {
    return a - b;
  }
  static multiply(a: number, b: number): number {
    return a * b;
  }
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
  static average(...numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
  }

  static isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i < n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
}

console.log("\n--- Static Methods ---");
console.log("Add:", MathUtils.add(5, 3));
console.log("Divide:", MathUtils.divide(10, 4));
console.log("Clamp:", MathUtils.clamp(150, 0, 100));
console.log("Average:", MathUtils.average(10, 20, 30, 40, 50));
console.log("Is 17 prime:", MathUtils.isPrime(17));
console.log("Is 20 prime:", MathUtils.isPrime(20));

//? 3.Singleton Pattern
//* Static properties are perfect for the singleton pattern
//* Ensure only one instance of class exists

class Database {
  private static instance: Database | null = null;
  private connectionCount: number = 0;
  private isConnected: boolean = false;

  // * Private constructor — prevents direct instantiation
  private constructor(private readonly url: string) {}

  // * Static factory method — the only way to get an instance
  static getInstance(url: string = "mongodb://localhost:27017"): Database {
    if (!Database.instance) {
      Database.instance = new Database(url);
      console.log("Creating new Database instance");
    } else {
      console.log("Returning existing Database instance");
    }
    return Database.instance;
  }

  connect(): void {
    if (!this.isConnected) {
      this.isConnected = true;
      this.connectionCount++;
      console.log(
        `Connected to ${this.url} (connection #${this.connectionCount})`,
      );
    } else {
      console.log("Already connected");
    }
  }

  disconnect(): void {
    this.isConnected = false;
    console.log("Disconnected from database");
  }

  static resetInstance(): void {
    Database.instance = null;
  }
}

console.log("\n--- Singleton Pattern ---");
const db1 = Database.getInstance();
const db2 = Database.getInstance();
const db3 = Database.getInstance();

console.log("Same instance:", db1 === db2 && db2 === db3); // true
db1.connect();
db2.connect(); // Already connected — same instance
db3.connect(); // Already connected — same instance

//? 4.Static Factory Methods
//* Static metods that create instances - factories

class Color {
  private constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number,
    public readonly a: number = 1,
  ) {}

  // * Factory methods — named constructors
  static fromRGB(r: number, g: number, b: number): Color {
    return new Color(r, g, b);
  }

  static fromHex(hex: string): Color {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return new Color(r, g, b);
  }

  static fromRGBA(r: number, g: number, b: number, a: number): Color {
    return new Color(r, g, b, a);
  }

  // * Preset colors as static properties
  static readonly RED = new Color(255, 0, 0);
  static readonly GREEN = new Color(0, 255, 0);
  static readonly BLUE = new Color(0, 0, 255);
  static readonly WHITE = new Color(255, 255, 255);
  static readonly BLACK = new Color(0, 0, 0);

  toString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  toHex(): string {
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
  }
}

const red = Color.fromRGB(255, 0, 0);
const fromHex = Color.fromHex("#1e90ff");
const transparent = Color.fromRGBA(0, 0, 0, 0.5);

console.log("Red:", red.toString());
console.log("From hex:", fromHex.toString());
console.log("Transparent:", transparent.toString());
console.log("Preset RED:", Color.RED.toHex());
console.log("Preset BLUE:", Color.BLUE.toHex());