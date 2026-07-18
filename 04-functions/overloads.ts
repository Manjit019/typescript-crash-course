/*
    ! Function Overloading
    * Function overloading allows one function to have multiple different call signatures.
    * TypeScript picks the right signature based on the arguments
    * The implementation handles all cases
*/
export {};

//? 1. Basic Overloads

//* Step 1 : Write the overload signatures (no body)
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

//* Step 2 : Write implementation signatures (handle all Cases)
//* The implementation signature is not visible to callers

function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value ? "yes" : "no";
}
console.log("--- Basic Overloads ---");
console.log(format("hello")); // "hello"
console.log(format(3.14159)); // 3.14
console.log(format(true));

//? 2. Overload with different return types
//* Overloads can have different return types per signature

function getProperty(obj: { name: string; age: number }, key: "name"): string;
function getProperty(obj: { name: string; age: number }, key: "age"): number;
function getProperty(
  obj: { name: string; age: number },
  key: "name" | "age",
): string | number {
  return obj[key];
}

console.log("\n--- Different Return Types ---");
const user = { name: "Manjit", age: 22 };
const name = getProperty(user, "name"); // TypeScript knows this is string
const age = getProperty(user, "age"); // TypeScript knows this is number
console.log("Name:", name.toUpperCase()); // string method — safe
console.log("Age:", age.toFixed(0));

//? 3. Overload for optional Behavior
//* Overloads clearly communicate what combinations are valid

function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "input"): HTMLInputElement;
function createElement(tag: string): HTMLElement;
function createElement(tag: string): HTMLElement {
  // * Simulated — normally this would use document.createElement
  console.log(`Creating <${tag}> element`);
  return {} as HTMLElement;
}

console.log("\n--- Tag-based Overloads ---");
createElement("div");
createElement("a");
createElement("input");

//? 4. Real world overloads

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
}
const users: User[] = [
  { id: 1, name: "Manjit", email: "m@m.com", role: "admin" },
  { id: 2, name: "Kumar", email: "k@k.com", role: "user" },
  { id: 3, name: "Alice", email: "a@a.com", role: "moderator" },
];

// Find by ID returns one user or null
function findUser(id: number): User | null;
// Find by role returns an array of users
function findUser(role: "admin" | "user" | "moderator"): User[];
// * Implementation
function findUser(
  idOrRole: number | "admin" | "user" | "moderator",
): User | null | User[] {
  if (typeof idOrRole === "number") {
    return users.find((u) => u.id === idOrRole) ?? null;
  }
  return users.filter((u) => u.role === idOrRole);
}

console.log("\n--- Real World findUser Overloads ---");
const found = findUser(1);
console.log("By ID:", found?.name);

const admins = findUser("admin");
console.log(
  "Admins:",
  admins.map((u) => u.name),
);

//? 5. Overload with objects

interface TextConfig {
  text: string;
  fontSize?: number;
  color?: string;
}
// Create with string
function createLabel(text: string): TextConfig;
// Create with config object
function createLabel(config: TextConfig): TextConfig;
// * Implementation
function createLabel(input: string | TextConfig): TextConfig {
  if (typeof input === "string") {
    return { text: input, fontSize: 16, color: "black" };
  }
  return {
    fontSize: 16,
    color: "black",
    ...input, // spread config — overrides defaults
  };
}

console.log("\n--- Object Overloads ---");
console.log(createLabel("Hello"));
console.log(createLabel({ text: "World", fontSize: 24, color: "blue" }));
console.log(createLabel({ text: "TypeScript" })); // uses defaults

//? 6. Method overloads in classes

class EventEmitter {
  private listeners: Map<string, ((...args: unknown[]) => void)[]> = new Map();

  // Add listener — returns void
  on(event: string, listener: (...args: unknown[]) => void): void;
  // Add one-time listener — returns void
  on(event: string, listener: (...args: unknown[]) => void, once: true): void;
  // * Implementation
  on(
    event: string,
    listener: (...args: unknown[]) => void,
    _once?: boolean,
  ): void {
    const existing = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...existing, listener]);
  }

  emit(event: string, ...args: unknown[]): void {
    const eventListeners = this.listeners.get(event) ?? [];
    eventListeners.forEach((listener) => listener(...args));
  }
}

console.log("\n--- Method Overloads in Class ---");
const emitter = new EventEmitter();
emitter.on("data", (payload) => console.log("Received:", payload));
emitter.on("error", (err) => console.log("Error:", err), true);
emitter.emit("data", { id: 1, name: "Manjit" });
emitter.emit("error", "Connection failed");


//? 7. When to Use Overloads

// * USE overloads when:
// * 1. Same function name but different argument types
// * 2. Return type depends on argument type
// * 3. Some argument combinations are valid, others are not
// * 4. You want clear documentation of valid call patterns

// * DO NOT overuse overloads for simple union types
// * This is fine without overloads:
function processId(id: string | number): string {
  return id.toString();
}

// * Overloads are for when the BEHAVIOR or RETURN TYPE changes
console.log("\n--- When to Use Overloads ---");
console.log(processId("usr_001"));
console.log(processId(42));