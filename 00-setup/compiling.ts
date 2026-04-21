// =============================================================
// FILE: compiling.ts
// TOPIC: How TypeScript compilation works
// =============================================================

// * TypeScript must be compiled into JavaScript before it can run
// * The TypeScript Compiler is called "tsc"
// * ts-node allows running .ts files directly without manual compilation

// =============================================================
// SECTION 1: Compilation Commands Reference
// =============================================================

// * COMMAND: npx tsc
// * Compiles ALL .ts files in the project (based on tsconfig.json)
// * Output goes to the folder specified in "outDir" in tsconfig.json

// * COMMAND: npx tsc filename.ts
// * Compiles a SINGLE file
// * Creates a .js file next to the .ts file

// * COMMAND: npx tsc --watch
// * Watches for file changes and recompiles automatically
// * Very useful during development — keep this running in a terminal

// * COMMAND: npx ts-node filename.ts
// * Runs a .ts file DIRECTLY without creating a .js file
// * Best for learning and quick testing

// =============================================================
// SECTION 2: What Happens During Compilation
// =============================================================

// * STEP 1: You write TypeScript code (.ts file)
// * STEP 2: TypeScript Compiler reads your code
// * STEP 3: TypeScript checks all types — reports errors if found
// * STEP 4: TypeScript STRIPS all type annotations
// * STEP 5: Outputs plain JavaScript (.js file)

// * Example of what gets compiled:

// YOUR TypeScript code:
function welcomeUser(name: string, age: number): string {
  return `Welcome ${name}, you are ${age} years old`;
}

// COMPILED JavaScript output (types are removed):
// function welcomeUser(name, age) {
//   return `Welcome ${name}, you are ${age} years old`;
// }

// * Notice: Types are completely removed in the output
// * JavaScript has no types — TypeScript types only exist during development

// =============================================================
// SECTION 3: Watching for Errors in VS Code
// =============================================================

// * VS Code shows TypeScript errors without running any command
// * Red underlines = TypeScript errors
// * You can also see errors in the PROBLEMS panel:
//   View → Problems  OR  Ctrl + Shift + M

// ! Try writing this intentional error and see VS Code highlight it:
// let count: number = "hello"; // ERROR visible immediately in VS Code

// =============================================================
// SECTION 4: ts-node vs tsc
// =============================================================

// * ts-node:
// * - Runs TypeScript directly in Node.js
// * - No compiled .js files created
// * - Best for: learning, scripts, development
// * - Run: npx ts-node yourfile.ts

// * tsc:
// * - Compiles TypeScript to JavaScript files
// * - Creates .js files in /dist
// * - Best for: production builds, deployment
// * - Run: npx tsc

// =============================================================
// SECTION 5: A Simple Working Example
// =============================================================

// * This entire file can be run with:
// * npx ts-node 00-setup/compiling.ts

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 2499,
  inStock: true,
};

function displayProduct(product: Product): void {
  console.log("=== Product Details ===");
  console.log(`ID: ${product.id}`);
  console.log(`Name: ${product.name}`);
  console.log(`Price: $${product.price}`);
  console.log(`In Stock: ${product.inStock ? "Yes" : "No"}`);
}

displayProduct(laptop);

// * After running, you should see the product details printed
// * If you add a wrong type, TypeScript will catch it before running

