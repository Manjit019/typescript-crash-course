// =============================================================
// FILE: type-inference-intro.ts
// TOPIC: How TypeScript infers types automatically
// =============================================================

// * Type inference means TypeScript can figure out the type
// * without you explicitly writing it
// * TypeScript looks at the VALUE and decides the TYPE

// =============================================================
// SECTION 1: Basic Inference
// =============================================================

// * TypeScript infers "string" from the value "hello"
let greeting = "hello";
// greeting = 123; // ! ERROR — Type 'number' is not assignable to type 'string'

// * TypeScript infers "number"
let score = 100;

// * TypeScript infers "boolean"
let isActive = true;

// * Hover over these variables in VS Code to see the inferred types!
// ? Try hovering over greeting, score, isActive in VS Code now

// =============================================================
// SECTION 2: When to Write Explicit Types
// =============================================================

// * Write explicit types when:
// * 1. The variable is declared without a value
let productName: string; // No value yet — need explicit type
productName = "Laptop";

// * 2. The inferred type is too broad or wrong
let userId: string | number = 101; // TypeScript alone might not know this can also be a string

// * 3. Function parameters — TypeScript CANNOT infer these
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// * 4. When you want to be explicit for readability
let maxRetries: number = 3;

// =============================================================
// SECTION 3: Type Inference in Functions
// =============================================================

// * TypeScript can infer RETURN TYPES from the function body
function multiply(x: number, y: number) {
  return x * y; // TypeScript infers the return type is "number"
}

// * Hover over multiply in VS Code — you'll see (x: number, y: number) => number
// ? Is it always safe to rely on inferred return types?
// ! For important functions, write the return type explicitly — it prevents mistakes

function divide(x: number, y: number): number {
  return x / y; // Explicit return type — much safer for important functions
}

// =============================================================
// SECTION 4: Inference with Arrays
// =============================================================

// * TypeScript infers string[] from the array values
let fruits = ["apple", "banana", "mango"];
// fruits.push(42); // ! ERROR — Argument of type 'number' is not assignable to 'string'

// * TypeScript infers number[]
let scores = [95, 87, 72, 100];

// * TypeScript infers (string | number)[] — mixed array
let mixed = ["Alice", 25, "Bob", 30];

// =============================================================
// SECTION 5: Inference with Objects
// =============================================================

// * TypeScript infers the shape of the object
let user = {
  name: "Alice",
  age: 25,
  isAdmin: false,
};

// * Now TypeScript knows the exact shape
// user.name = 123;     // ! ERROR — name should be a string
// user.email = "...";  // ! ERROR — email does not exist on this object

console.log(user.name); // "Alice"

// =============================================================
// SECTION 6: Inference Is Powerful But Has Limits
// =============================================================

// ! TypeScript cannot always infer correctly
// ! When dealing with data from APIs, user input, or complex logic
// ! always use explicit types for safety

// * Rule of thumb:
// * Let TypeScript infer simple values
// * Write explicit types for parameters, return values, and complex shapes


