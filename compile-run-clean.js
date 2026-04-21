#!/usr/bin/env node


const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ANSI Colors

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",

  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
};

// Helpers

function color(text, ...codes) {
  return codes.join("") + text + c.reset;
}

function divider(char = "─", length = 50) {
  console.log(color(char.repeat(length), c.gray));
}

function step(icon, label, colorCode) {
  console.log(color(`${icon}  ${label}`, colorCode, c.bold));
}

function resolveFile(input) {
  if (!input) return null;

  if (!input.endsWith(".ts")) {
    input += ".ts";
  }

  const fullPath = path.resolve(input);

  if (!fs.existsSync(fullPath)) {
    console.error(color(`\n❌  File not found: ${fullPath}\n`, c.red, c.bold));
    process.exit(1);
  }

  return fullPath;
}

function runCommand(command, verbose = false) {
  try {
    const result = execSync(command, {
      stdio: verbose ? "inherit" : "pipe",
    });
    return result;
  } catch (err) {
    console.error(color("\n❌  Command failed:\n", c.red, c.bold));
    console.log(color(`   ${command}\n`, c.gray));

    if (!verbose) {
      const stderr = err.stderr?.toString().trim();
      const stdout = err.stdout?.toString().trim();

      if (stderr) {
        console.error(color(stderr, c.yellow));
      }
      if (stdout) {
        console.error(color(stdout, c.yellow));
      }
    }

    process.exit(1);
  }
}

function cleanFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(color(`\n🧹  Cleaned: ${path.basename(filePath)}`, c.gray));
  }
}

// Temp tsconfig — CHANGED

// * Instead of passing compiler flags directly on the CLI
// * (which conflicts with your root tsconfig.json),
// * we create a TEMPORARY tsconfig just for this single file.
// * This avoids the TS5112 error completely.

function createTempTsConfig(filePath, outDir) {
  // * Build the temp config content
  const tempConfig = {
    compilerOptions: {
      target: "ES2020",
      module: "CommonJS",
      esModuleInterop: true,
      skipLibCheck: true,
      strict: true,
      outDir: outDir,
    },
    // * Only compile this specific file
    files: [filePath],
  };

  // * Write temp config next to the source file
  // * Using a unique name to avoid collisions
  const tempConfigPath = path.join(
    path.dirname(filePath),
    `tsrun.temp.tsconfig.json`,
  );

  fs.writeFileSync(tempConfigPath, JSON.stringify(tempConfig, null, 2));

  return tempConfigPath;
}

// * Always clean up the temp config file
function deleteTempTsConfig(tempConfigPath) {
  if (fs.existsSync(tempConfigPath)) {
    fs.unlinkSync(tempConfigPath);
  }
}

// TypeScript Checker

function checkTypeScriptInstalled() {
  try {
    execSync("npx tsc --version", { stdio: "pipe" });
  } catch {
    console.error(color("\n❌  TypeScript is not installed.\n", c.red, c.bold));
    console.log(color("   Run: npm install -D typescript\n", c.yellow));
    process.exit(1);
  }
}

function getTypeScriptVersion() {
  try {
    const result = execSync("npx tsc --version", { stdio: "pipe" });
    return result.toString().trim();
  } catch {
    return "unknown";
  }
}

// Timing Helper

function createTimer() {
  const start = Date.now();
  return {
    elapsed: () => {
      const ms = Date.now() - start;
      if (ms < 1000) return `${ms}ms`;
      return `${(ms / 1000).toFixed(2)}s`;
    },
  };
}

// Watch Mode

function runWatchMode(filePath) {
  const fileName = path.basename(filePath);

  console.log(color(`\n👁   Watch mode: ${fileName}\n`, c.cyan, c.bold));
  console.log(
    color("   Watching for changes... Press Ctrl+C to stop\n", c.gray),
  );
  divider();

  // * CHANGED: use --ignoreConfig here since watch mode
  // * is a special case and we want simple behavior
  try {
    execSync(
      `npx tsc "${filePath}" --watch --outDir ./dist --target ES2020 --module CommonJS --esModuleInterop true --skipLibCheck true --ignoreConfig`,
      { stdio: "inherit" },
    );
  } catch {
    console.log(color("\n\n👋  Watch mode stopped\n", c.yellow));
    process.exit(0);
  }
}

// Main Runner — CHANGED

function runTypeScript(fileInput, options = {}) {
  const {
    keep = false,
    verbose = false,
    watch = false,
    outDir = "./dist",
  } = options;

  const filePath = resolveFile(fileInput);
  const fileName = path.basename(filePath, ".ts");
  const relativePath = path.relative(process.cwd(), filePath);

  // * Resolve absolute output folder
  const outputFolder = path.resolve(outDir);

  // * The compiled output file path
  // * tsc mirrors the folder structure inside outDir
  // * So we need to figure out where exactly tsc puts the file
  // * We use a flat outDir so it goes directly inside dist/
  const outputFile = path.join(outputFolder, `${fileName}.js`);

  // * Temp tsconfig path (will be set after creation)
  let tempConfigPath = null;

  checkTypeScriptInstalled();

  // ── Header ──────────────────────────────────────────────────
  divider();
  console.log(color(`\n⚡  tsrun — TypeScript Runner\n`, c.cyan, c.bold));
  console.log(color(`   File    : ${relativePath}`, c.white));
  console.log(color(`   Version : ${getTypeScriptVersion()}`, c.gray));
  console.log(color(`   OutDir  : ${outDir}\n`, c.gray));
  divider();

  // ── Watch Mode ───────────────────────────────────────────────
  if (watch) {
    runWatchMode(filePath);
    return;
  }

  const timer = createTimer();

  try {
    // ── Step 1: Create temp tsconfig ─────────────────────────
    // * CHANGED: We create a temp tsconfig.json for this file
    // * This avoids the TS5112 conflict with your root tsconfig.json
    tempConfigPath = createTempTsConfig(filePath, outputFolder);

    // ── Step 2: Compile ──────────────────────────────────────
    console.log("");
    step("🔧", "Compiling...", c.blue);

    // * CHANGED: Now we compile using the temp tsconfig
    // * npx tsc --project <config> uses the config file
    // * No individual flags needed — everything is in the temp config
    runCommand(`npx tsc --project "${tempConfigPath}"`, verbose);

    const compileTime = timer.elapsed();
    console.log(color(`   ✔  Done in ${compileTime}\n`, c.green));

    // * Verify output was created
    if (!fs.existsSync(outputFile)) {
      console.error(
        color(`\n❌  Compiled file not found: ${outputFile}\n`, c.red),
      );
      console.log(color(`   Expected at: ${outputFile}\n`, c.gray));
      process.exit(1);
    }

    // ── Step 3: Run ──────────────────────────────────────────
    divider();
    step("🚀", `Running: ${fileName}.ts\n`, c.magenta);
    divider();
    console.log("");

    const runTimer = createTimer();

    execSync(`node "${outputFile}"`, { stdio: "inherit" });

    const runTime = runTimer.elapsed();

    // ── Footer ────────────────────────────────────────────────
    console.log("");
    divider();
    console.log(color(`\n✅  Finished in ${runTime}\n`, c.green, c.bold));
  } finally {
    // ── Step 4: Always delete temp tsconfig ──────────────────
    // * CHANGED: Clean up temp config no matter what happens
    // ! This runs even if compilation or execution fails
    if (tempConfigPath) {
      deleteTempTsConfig(tempConfigPath);
    }

    // ── Step 5: Clean compiled output ────────────────────────
    if (!keep) {
      cleanFile(outputFile);

      // * Remove dist folder if it is now empty
      if (
        fs.existsSync(outputFolder) &&
        fs.readdirSync(outputFolder).length === 0
      ) {
        fs.rmdirSync(outputFolder);
      }
    } else {
      console.log(
        color(
          `\n📦  Kept: ${path.relative(process.cwd(), outputFile)}`,
          c.yellow,
        ),
      );
    }
  }
}

// CLI Entry Point

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(
    color(
      `
⚡  tsrun — TypeScript Runner

${color("Usage:", c.bold)}
  tsrun <file> [options]

${color("Examples:", c.bold)}
  tsrun hello
  tsrun hello.ts
  tsrun 01-basics/variables
  tsrun 01-basics/variables.ts
  tsrun 01-basics/variables --keep
  tsrun 01-basics/variables --verbose
  tsrun 01-basics/variables --watch

${color("Options:", c.bold)}
  --keep      Keep the compiled .js file after running
  --verbose   Show full TypeScript compiler output
  --watch     Watch the file and recompile on every save

${color("Notes:", c.bold)}
  • .ts extension is added automatically if omitted
  • Compiled files go to ./dist by default
  • dist folder is cleaned after each run (unless --keep)
  • A temporary tsconfig is created and deleted automatically
`,
      c.white,
    ),
  );
  process.exit(0);
}

const fileArg = args.find((arg) => !arg.startsWith("--"));
const options = {
  keep: args.includes("--keep"),
  verbose: args.includes("--verbose"),
  watch: args.includes("--watch"),
};

if (!fileArg) {
  console.error(color("\n❌  No file specified.\n", c.red, c.bold));
  console.log(color("   Usage: tsrun <file> [options]\n", c.gray));
  process.exit(1);
}

runTypeScript(fileArg, options);
