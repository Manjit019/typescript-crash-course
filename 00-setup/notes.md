# 00 - Setup Notes

## What is TypeScript?

TypeScript is a superset of JavaScript developed by Microsoft.
It adds static typing to JavaScript.

Every valid JavaScript file is also valid TypeScript.
TypeScript code compiles down to plain JavaScript.
The browser and Node.js only ever run JavaScript.

---

## Why TypeScript?

| Problem in JavaScript      | How TypeScript Solves It            |
|----------------------------|-------------------------------------|
| No type checking           | Types checked at compile time       |
| Silent bugs at runtime     | Errors caught before running        |
| Poor IDE support           | Rich IntelliSense and autocomplete  |
| Hard to refactor           | TypeScript knows your code shape    |
| Bad for teams              | Types act as living documentation   |

---

## How TypeScript Works

`ourfile.ts` → tsc (compiler) → `yourfile.js` → Node / Browser runs it


TypeScript is only used during **development**.  
Types are stripped out in the final JavaScript output.

---

## Key Concepts Covered

### Type Inference
- TypeScript can figure out types from values automatically
- Hover over variables in VS Code to see inferred types
- Write explicit types for: parameters, return values, complex shapes
- Let inference handle: simple assignments, array values, object shapes

### Compilation
- `npx tsc` — compile all .ts files
- `npx tsc --watch` — auto-compile on save
- `npx ts-node file.ts` — run directly without compiling
- VS Code shows errors in real time with red underlines
- View all errors: Ctrl + Shift + M

### tsconfig.json — Important Options

| Option               | What It Does                            |
|----------------------|-----------------------------------------|
| strict               | Enables all strict checks               |
| noImplicitAny        | No silent any types allowed             |
| strictNullChecks     | null and undefined must be handled      |
| noUnusedLocals       | Error if variable declared but unused   |
| noImplicitReturns    | All function paths must return a value  |
| outDir               | Where compiled JS files go              |
| target               | JavaScript version to compile to        |
| esModuleInterop      | Better module import compatibility      |

---

## Tools Installed

| Tool          | Purpose                                     |
|---------------|---------------------------------------------|
| typescript    | The TypeScript compiler                     |
| ts-node       | Run .ts files directly in Node              |
| @types/node   | Type definitions for Node.js built-ins      |

---

## VS Code Extensions Installed

| Extension          | Purpose                                  |
|--------------------|------------------------------------------|
| Better Comments    | Color-coded comment markers              |
| Error Lens         | Shows errors inline in code              |
| ESLint             | Linting and code quality                 |
| Prettier           | Code formatting                          |
| GitLens            | Advanced Git integration                 |
| Path Intellisense  | Autocomplete for file paths              |

---
