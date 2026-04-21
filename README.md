
# TypeScript Crash Course

A complete TypeScript learning journey from basic to advanced.
Organized by topic folders with notes, examples, and inline comments.

---

## 🛠️ tsrun — Custom TypeScript CLI

This project includes a custom CLI tool called **`tsrun`** that replaces `ts-node`.

It compiles, runs, and cleans TypeScript files automatically with colored terminal output.

### How It Works

```
yourfile.ts  →  temp tsconfig  →  tsc compile  →  node runs output  →  cleanup
```

### Installation (first time only)

```bash
npm install
npm link
```

### Usage

```bash
tsrun <file> [options]
```

### Examples

```bash
# Run a file (no extension needed)
tsrun 00-setup/what-is-typescript

# Run with .ts extension
tsrun 00-setup/what-is-typescript.ts

# Keep the compiled .js file after running
tsrun 00-setup/compiling --keep

# Show full TypeScript compiler output
tsrun 00-setup/compiling --verbose

# Watch mode — recompile on every save
tsrun 00-setup/compiling --watch

# Show help
tsrun
```

### Options

| Option | Description |
|---|---|
| `--keep` | Keep the compiled `.js` file after running |
| `--verbose` | Show full TypeScript compiler output |
| `--watch` | Watch the file and recompile on every save |

### How tsrun Solves the tsconfig Conflict

Running `tsc file.ts` with individual flags causes a `TS5112` error
when a `tsconfig.json` already exists in the project root.

`tsrun` solves this by:

1. Creating a **temporary tsconfig** scoped to the single file
2. Compiling using `tsc --project <temp-config>`
3. **Deleting the temp config** automatically after compilation
4. Cleaning the compiled `.js` output after running

No conflicts. No leftover files.

### Output Example

```
──────────────────────────────────────────────────

⚡  tsrun — TypeScript Runner

   File    : 00-setup\compiling.ts
   Version : Version 6.0.3
   OutDir  : ./dist

──────────────────────────────────────────────────

🔧  Compiling...
   ✔  Done in 921ms

──────────────────────────────────────────────────
🚀  Running: compiling.ts

──────────────────────────────────────────────────

=== Product Details ===
ID: 1
Name: MacBook Pro
Price: $2499
In Stock: Yes

──────────────────────────────────────────────────

✅  Finished in 87ms

🧹  Cleaned: compiling.js
```

---

## 📁 Structure

Each folder = one related topic

Each folder contains:
- `notes.md` — theory and key concepts
- `.ts` files — practical examples with inline comments

```
typescript-crash-course/
│
├── 00-setup/
│   ├── notes.md
│   ├── what-is-typescript.ts
│   ├── type-inference-intro.ts
│   ├── compiling.ts
│   └── tsconfig-explained.ts
│
├── 01-basics/
├── 02-type-system/
├── 03-interfaces-and-types/
├── 04-functions-deep-dive/
├── 05-objects-classes-oop/
├── 06-generics/
├── 07-advanced-types/
├── 08-modules-and-project-structure/
├── 09-async-and-ts/
├── 10-dom-and-browser-ts/
├── 11-ts-with-node/
├── 12-real-world-patterns/
├── 13-testing-and-tooling/
├── 14-best-practices/
├── 15-mini-projects/
│
├── compile-run-clean.js     
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## ⚙️ Commands

```bash
# Compile and run a single file
tsrun <file>

# Compile all TypeScript files
npx tsc

# Watch mode — auto compile on save
npx tsc --watch

# Check TypeScript version
npx tsc --version
```

---

## 🔧 Tech Stack

| Tool | Purpose |
|---|---|
| TypeScript | Main language |
| Node.js | Runtime |
| tsrun | Custom compile + run + clean CLI |

---



## 🤝 Contributions

Contributions are welcome. You can:

* Improve existing examples
* Add new practice programs
* Fix issues or optimize code

---

## 📜 License

This project is open-source and intended for educational purposes.

---

## ⭐ Support

If you find this helpful, consider starring the repository ⭐

## Author

Manjit Kumar 


[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://manjitsportfolio.dev/)  
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github)](https://github.com/manjit019)  
[![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/manjit.tsx)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/manjit019)
