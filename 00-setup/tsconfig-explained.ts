// =============================================================
// FILE: tsconfig-explained.ts
// TOPIC: Understanding tsconfig.json options
// =============================================================

// * tsconfig.json is the configuration file for TypeScript
// * It tells the TypeScript compiler HOW to compile your project
// * It is created by running: npx tsc --init

// * You don't memorize all options
// * You just need to understand the important ones

// =============================================================
// SECTION 1: The Most Important Options Explained
// =============================================================

// "target": "ES2020"
// * Tells TypeScript what JavaScript version to output
// * ES2020 supports modern features like optional chaining (?.)
// * Use ES5 for very old browser support
// * For Node.js projects, ES2020 or higher is fine

// "module": "CommonJS"
// * Tells TypeScript what module system to use in the output
// * CommonJS = Node.js style (require / module.exports)
// * Use "ESNext" or "ES2020" for modern frontend projects

// "strict": true
// * Turns on ALL strict type-checking options at once
// * This is the recommended setting for TypeScript
// * Without strict mode, TypeScript is very permissive — almost like JavaScript

// "noImplicitAny": true
// * Prevents TypeScript from silently using "any" type
// * Forces you to be explicit when TypeScript cannot infer a type
// ! "any" disables type checking for that variable — avoid it

// "strictNullChecks": true
// * Makes TypeScript treat null and undefined as separate types
// * Without this, any variable can be null — very dangerous

// "outDir": "./dist"
// * All compiled JavaScript files go into the /dist folder
// * Keeps your .ts source files separate from the .js output

// "rootDir": "./"
// * Tells TypeScript where your source .ts files are located
// * Helps TypeScript mirror the folder structure in /dist

// "esModuleInterop": true
// * Allows better compatibility between CommonJS and ES modules
// * Required for importing some libraries like: import fs from 'fs'

// "skipLibCheck": true
// * Skips type checking on .d.ts declaration files (library files)
// * Makes compilation faster — usually safe to enable

// "noUnusedLocals": true
// * Reports an error if you declare a variable but never use it
// * Good practice — keeps code clean

// "noUnusedParameters": true
// * Reports an error if a function parameter is never used
// * Encourages you to clean up unused code

// "noImplicitReturns": true
// * Reports an error if a function has a code path that doesn't return a value
// * Prevents silent undefined returns from functions

// =============================================================
// SECTION 2: Demonstrating strict mode effects
// =============================================================

// * Without strictNullChecks — this would be allowed:
// let name: string = null; // Allowed without strictNullChecks

// * With strictNullChecks (strict: true) — this causes an ERROR:
// let name: string = null; // ! ERROR — null is not assignable to type 'string'

// * Correct way to handle possibly null values:
let userName: string | null = null; // Explicitly allow null
userName = "Alice"; // Then assign a real value

// =============================================================
// SECTION 3: Demonstrating noImplicitAny
// =============================================================

// * Without noImplicitAny — this would be allowed:
// function process(data) { ... } // data is implicitly "any"

// * With noImplicitAny — TypeScript forces you to type it:
function processData(data: string): string {
  return data.trim();
}

// =============================================================
// SECTION 4: Demonstrating noImplicitReturns
// =============================================================

// ! This would cause an error with noImplicitReturns: true
// function checkAge(age: number): string {
//   if (age >= 18) {
//     return "Adult";
//   }
//   // ERROR: Not all code paths return a value
// }

// * Correct — all code paths return:
function checkAge(age: number): string {
  if (age >= 18) {
    return "Adult";
  }
  return "Minor"; // * All paths covered
}

// =============================================================
// SECTION 5: Quick Reference Card
// =============================================================

// OPTION                   | DEFAULT | RECOMMENDED | PURPOSE
// -------------------------|---------|-------------|---------------------------
// strict                   | false   | true        | Enable all strict checks
// noImplicitAny            | false   | true        | No silent any types
// strictNullChecks         | false   | true        | Handle null safely
// noUnusedLocals           | false   | true        | No unused variables
// noUnusedParameters       | false   | true        | No unused parameters
// noImplicitReturns        | false   | true        | All paths must return
// esModuleInterop          | false   | true        | Better module imports
// skipLibCheck             | false   | true        | Faster compilation
// target                   | ES3     | ES2020      | Modern JS output
// outDir                   | -       | ./dist      | Compiled output folder

console.log("tsconfig.json is your TypeScript control panel");
console.log("Strict mode is your best friend");
console.log(checkAge(20)); // "Adult"
console.log(checkAge(15)); // "Minor"
console.log(processData("  hello  ")); // "hello"

