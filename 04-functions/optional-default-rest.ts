//? Optional Parameters
//* Add ? to make a parameter optional
//* Optional parameters must come after required ones
//* Optional parameters may have undefined

function createProfile(
  name: string,
  age: number,
  bio?: string,
  website?: string,
): string {
  let profile = `${name}, ${age}`;
  if (bio) profile += ` -${bio}`;
  if (website) profile += `  ${website}`;
  return profile;
}
console.log("--- Optional Parameters ---");
console.log(createProfile("Manjit", 22));
console.log(createProfile("Manjit", 22, "TypeScript dev"));
console.log(createProfile("Manjit", 22, "TypeScript dev", "manjit.dev"));

// ! Optional before required is not allowed
// function wrong(name?: string, age: number): void {} // ERROR

//?  Handling Optional Parameters Safety

function sendEmail(
  to: string,
  subject: string,
  body?: string,
  cc?: string,
): void {
  console.log(`\nTo: ${to}`);
  console.log(`Subject: ${subject}`);

  // * Method 1: if check
  if (body) {
    console.log(`Body: ${body}`);
  }

  // * Method 2: nullish coalescing
  console.log(`CC: ${cc ?? "none"}`);
}
console.log("\n--- Handling Optional Safely ---");
sendEmail("m@example.com", "Hello");
sendEmail("m@example.com", "Hello", "This is the body", "k@example.com");

//? Default Parameters
//* Default parameters provide a fallback value
//* Used when argument is not passed or is undefined
//* Do not need to be last - but it's conventional

function createButton(
  label: string,
  type: "button" | "submit" | "reset" = "button",
  disabled: boolean = false,
  className: string = "btn",
): string {
  return `<button type="${type} class="${className}" ${disabled ? "disabled" : ""} >${label} </button>`;
}
console.log("\n--- Default Parameters ---");
console.log(createButton("Click Me"));
console.log(createButton("Submit", "submit"));
console.log(createButton("Delete", "button", true, "btn-danger"));

//* Note - passing undefined explicitly triggers the default
console.log(createButton("Share", undefined)); // same as not passing

//? Default parameters with complex values
//* Default values can be expressions or function calls

function createId(
  prefix: string = "id",
  timestamp: number = Date.now(),
): string {
  return `${prefix}_${timestamp}`;
}

function initConfig(
  options: {
    timeout?: number;
    retries?: number;
    debug?: boolean;
  } = {}, // default is empty object
): void {
  const { timeout = 5000, retries = 3, debug = false } = options;
  console.log(`Config: timeout=${timeout} retries=${retries} debug=${debug}`);
}

console.log("\n--- Complex Defaults ---");
console.log(createId());
console.log(createId("user"));
initConfig();
initConfig({ timeout: 3000, debug: true });

//? Rest Parameters
//* Rest parameters collect multiple arguments into an array
//* Must be the last parameter
//* Type is always an array

function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

function joinStrings(sep: string, ...parts: string[]): string {
  return parts.join(sep);
}

function logAll(level: "info" | "warn" | "error", ...messages: string[]): void {
  const prefix = `[${level.toUpperCase()}]`;
  messages.forEach((message) => console.log(prefix, message));
}

console.log("\n--- Rest Parameters ---");
console.log("Sum:", sum(1, 2, 3, 4, 5));
console.log("Sum:", sum(10, 20, 30));
console.log("Sum:", sum()); // 0 — empty array

console.log(
  "\nJoin:",
  joinStrings(", ", "TypeScript", "JavaScript", "Node.js"),
);
console.log("Join:", joinStrings(" - ", "A", "B", "C"));

console.log("\nLogs:");
logAll("info", "Server started", "Listening on port 3000");
logAll("warn", "Deprecated API used");
logAll("error", "Connection failed", "Retrying...", "Max retries reached");

//? Rest with other parameter types
//* Rest parameters work alongside required and optional params

function buildUrl(baseUrl: string, ...segments: string[]): string {
  const cleanSegments = segments.map((s) => s.replace(/^\/|\/$/g, ""));
  return [baseUrl.replace(/\/$/, ""), ...cleanSegments].join("/");
}

function formatTable(
  title: string,
  width: number = 40,
  ...rows: string[]
): void {
  const border = "─".repeat(width);
  console.log(`\n┌${border}┐`);
  console.log(`│ ${title.padEnd(width - 1)}│`);
  console.log(`├${border}┤`);
  rows.forEach((row) => {
    console.log(`│ ${row.padEnd(width - 1)}│`);
  });
  console.log(`└${border}┘`);
}

console.log("\n--- Rest with Other Params ---");
console.log(buildUrl("https://api.example.com", "users", "123", "posts"));
console.log(buildUrl("https://api.example.com", "/api/", "/v1/", "data"));

formatTable(
  "TypeScript Types",
  35,
  "string — text values",
  "number — numeric values",
  "boolean — true or false",
  "any — avoid this",
  "unknown — safe alternative",
);

//? Combined All three - Real world example

function createApiRequest(
  method: "GET" | "POST" | "DELETE" | "PATCH",
  endpoint: string,
  body?: Record<string, unknown>,
  timeout: number = 5000,
  ...headers: string[]
): void {
  console.log(`\n${method} ${endpoint}`);
  console.log(`Timeout: ${timeout}ms`);
  if (headers.length > 0) console.log(`Headers: ${headers.join(", ")}`);
  if (body) console.log("Body:", body);
}
console.log("\n--- Combining All Three ---");
createApiRequest("GET", "/api/users");
createApiRequest(
  "POST",
  "/api/users",
  { name: "Manjit" },
  3000,
  "Auth: Bearer xxx",
  "Content-Type: application/json",
);