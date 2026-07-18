
/*
    ! Three Special types that often confuse begginers : ->
    * void - a function that does not return a value
    * never - a function that never returns
    * unknown - value exists but type is not known yet
*/
export {};

//? 1: void
// * void means the function completes but returns no value
// * Used for functions with side effects only

function logMessage(message: string): void {
  console.log(`[LOG]: ${message}`);
  // * No return statement needed
  // * Returning undefined is technically allowed
}

function updateUserInPlace(user: { name: string }, newName: string): void {
  user.name = newName;
  // * Modifies in place — no return value needed
}

// * void in callbacks
function processItems(items: string[], callback: (item: string) => void): void {
  items.forEach(callback);
}

console.log("--- void ---");
logMessage("Application started");

const user = { name: "Manjit" };
updateUserInPlace(user, "Kumar");
console.log("Updated user:", user.name);

processItems(["a", "b", "c"], (item) => console.log("Item:", item));

// * void vs undefined
//  void — function does not care about the return value
//  undefined — function explicitly returns undefined

function returnsVoid(): void {
  // * nothing returned
}

function returnsUndefined(): undefined {
  return undefined; // * must explicitly return undefined
}


//? 2: never
// * never means the function NEVER completes normally
// * Either it always throws OR runs forever
// * never is a subtype of every type — it can go anywhere

// * Case 1: Function that always throws
function throwError(message: string): never {
  throw new Error(message);
}

// * Case 2: Function with infinite loop
function runForever(): never {
  while (true) {
    // runs indefinitely — never returns
  }
}

// * Case 3: Exhaustive checks — most practical use
type Shape = "circle" | "square" | "triangle";

function getShapeArea(shape: Shape, size: number): number {
  switch (shape) {
    case "circle":
      return Math.PI * size ** 2;
    case "square":
      return size ** 2;
    case "triangle":
      return 0.5 * size ** 2;
    default:
      // * If you add a new shape to the union but forget to handle it here
      // * TypeScript will error — because shape becomes never
      // * This is an EXHAUSTIVENESS CHECK
      const _exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${_exhaustiveCheck}`);
  }
}

console.log("\n--- never ---");
try {
  throwError("Something went wrong!");
} catch (err) {
  console.log("Caught error:", (err as Error).message);
}

console.log("Circle area:", getShapeArea("circle", 5).toFixed(2));
console.log("Square area:", getShapeArea("square", 4));
console.log("Triangle area:", getShapeArea("triangle", 6));

// * never also appears when a type is impossible
type StringAndNumber = string & number; // This is never — cannot be both


//? 3: unknown
// * unknown is the type-safe alternative to any
// * A value of type unknown CAN hold any value
// * BUT you MUST narrow it before using it

// * Comparing any vs unknown:

// ! any — dangerous, no checks required
function processAny(value: any): void {
  value.toUpperCase(); // no error — but crashes if value is a number!
  value.nonExistentMethod(); // no error — TypeScript just trusts you
}

// * unknown — safe, must check type first
function processUnknown(value: unknown): string {
  // ! Cannot use value directly
  // value.toUpperCase(); // ERROR — Object is of type 'unknown'

  // * Must narrow first
  if (typeof value === "string") {
    return value.toUpperCase(); // safe — value is string here
  }

  if (typeof value === "number") {
    return value.toFixed(2); // safe — value is number here
  }

  if (Array.isArray(value)) {
    return value.join(", "); // safe — value is array here
  }

  return String(value);
}

console.log("\n--- unknown ---");
console.log(processUnknown("hello"));
console.log(processUnknown(3.14159));
console.log(processUnknown([1, 2, 3]));
console.log(processUnknown(true));


//? 4: unknown in Error Handling
// * In TypeScript 4.0+, catch clause variables are unknown by default
// * (with useUnknownInCatchVariables in tsconfig)

function riskyOperation(input: number): number {
  if (input < 0) throw new Error("Negative input not allowed");
  if (input === 0) throw "Cannot be zero"; // * string thrown — not recommended
  return Math.sqrt(input);
}

function safeOperation(input: number): string {
  try {
    const result = riskyOperation(input);
    return `Result: ${result.toFixed(4)}`;
  } catch (error: unknown) {
    // * error is unknown — must check before using
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    if (typeof error === "string") {
      return `Error: ${error}`;
    }
    return "Unknown error occurred";
  }
}

console.log("\n--- unknown in Error Handling ---");
console.log(safeOperation(16));
console.log(safeOperation(-1));
console.log(safeOperation(0));


//? 5: Combining never, void, unknown
// * Real-world example using all three

type ApiResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function parseApiResponse(raw: unknown): ApiResult<string> {
  // * unknown input — must validate
  if (typeof raw !== "object" || raw === null) {
    return { status: "error", message: "Invalid response format" };
  }

  if ("data" in raw && typeof (raw as any).data === "string") {
    return { status: "success", data: (raw as any).data };
  }

  return { status: "error", message: "Missing data field" };
}

function handleResult(result: ApiResult<string>): void {
  switch (result.status) {
    case "success":
      console.log("Data:", result.data);
      return;
    case "error":
      console.log("Error:", result.message);
      return;
    default:
      const _check: never = result;
      throwError(`Unhandled result: ${_check}`);
  }
}

console.log("\n--- Combining never, void, unknown ---");
handleResult(parseApiResponse({ data: "User loaded" }));
handleResult(parseApiResponse("invalid"));
handleResult(parseApiResponse(null));
