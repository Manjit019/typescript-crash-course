// =============================================================
// FILE: what-is-typescript.ts
// TOPIC: What is TypeScript and why it exists
// =============================================================

// * TypeScript is a superset of JavaScript
// * That means every valid JavaScript file is also a valid TypeScript file
// * TypeScript adds STATIC TYPING on top of JavaScript

// * JavaScript is dynamically typed — types are checked at RUNTIME
// * TypeScript is statically typed — types are checked at COMPILE TIME (before running)

// =============================================================
// SECTION 1: The Problem TypeScript Solves
// =============================================================

// ! This is JavaScript behavior — it allows bugs to happen silently
// function add(a, b) {
//   return a + b;
// }
// add(5, "10") // returns "510" instead of 15 — JavaScript just concatenates!

// * TypeScript catches this before you even run the code
function add(a: number, b: number): number {
  return a + b;
}

// ! This line would cause a TypeScript ERROR immediately in VS Code
// add(5, "10"); // Argument of type 'string' is not assignable to parameter of type 'number'

// * This line is correct
const result = add(5, 10);
console.log("Result:", result); // 15

// =============================================================
// SECTION 2: How TypeScript Works
// =============================================================

// * TypeScript files use the .ts extension
// * TypeScript is COMPILED into JavaScript before running
// * The browser or Node.js only ever runs the compiled JavaScript

// * The compilation process:
//   your-file.ts  →  TypeScript Compiler (tsc)  →  your-file.js

// * You can compile with:
//   npx tsc                      → compiles all .ts files
//   npx tsc filename.ts          → compiles a single file
//   npx tsc --watch              → auto-compiles on every save
//   npx ts-node filename.ts      → runs .ts files directly (no manual compile)

// =============================================================
// SECTION 3: TypeScript vs JavaScript Side by Side
// =============================================================

// JavaScript version:
// let username = "Alice";
// let age = 25;

// * TypeScript version — with explicit types
let username: string = "Alice";
let age: number = 25;
let isLoggedIn: boolean = true;

// * TypeScript can also INFER types (you don't always need to write them)
let city = "New York"; // TypeScript infers this is a string automatically
// city = 123;         // ! ERROR — TypeScript knows city should be a string

console.log(username, age, isLoggedIn, city);

// =============================================================
// SECTION 4: Benefits of TypeScript
// =============================================================

// * 1. Catch errors early — before running code
// * 2. Better VS Code support — autocomplete, IntelliSense, hints
// * 3. Code is more readable and self-documenting
// * 4. Easier to refactor large codebases
// * 5. Better team collaboration — types act as documentation
// * 6. Used by most major companies and frameworks (React, Angular, Node.js)

// =============================================================
// SECTION 5: TypeScript Is Optional Everywhere
// =============================================================

// * You can gradually add types to an existing JavaScript project
// * You can use "any" type to opt out of type checking (not recommended)
// * TypeScript never forces you — it guides you

