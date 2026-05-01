/*
    ! Introduction to Type Narrowing in TypeScript ->

    * Type narrowing = making TypeScript understand a more specific type
    * When you have a union type, you must narrow it before using type-specific properties or methods.
    * TypeScript watches your conditions and narrows automatically

*/

export {};

//? 1. typeof Narrowing

// * typeof checks the JavaScript runtime type
// * Works for: string, number, boolean, undefined, symbol, bigint, function

function describe(value: string | number | boolean): string {
  if (typeof value === "string") {
    //TypeScript knows value is string here
    return `String of length ${value.length}: "${value}"`;
  }

  if (typeof value === "number") {
    //TypeScript knows value is number here
    return `Number: ${value.toFixed(2)}`;
  }

  //TypeScript knows value is boolean here
  return `Boolean: ${value ? "yes" : "no"}`;
}

console.log("--- typeof Narrowing ---");
console.log(describe("TypeScript"));
console.log(describe(3.14159));
console.log(describe(true));

//? 2. Truthiness Narrowing
// * Check for null/undefined using truthiness

function printLength(value: string | null | undefined): void {
  if (value) {
    // value is string here — null and undefined are falsy
    console.log(`Length: ${value.length}`);
  } else {
    console.log("No value provided");
  }
}

console.log("\n--- Truthiness Narrowing ---");
printLength("Manjit"); // Length: 6
printLength(null); // No value provided
printLength(undefined); // No value provided
printLength(""); // No value provided (empty string is falsy)

//? 3. Equality Narrowing
// * Narrow using === and !==

type Padding = number | string;

function applyPadding(padding: Padding): string {
  if (padding === 0) {
    return "No padding";
  }

  if (typeof padding === "number") {
    return `${padding}px`;
  }

  // string here
  return padding;
}

console.log("\n--- Equality Narrowing ---");
console.log(applyPadding(0));
console.log(applyPadding(16));
console.log(applyPadding("1rem"));

//? 4. in Operator Narrowing
// * "in" checks if a property exists on an object
// * Useful for discriminating between object types

type Cat = {
  kind: "cat";
  meow: () => string;
};

type Dog = {
  kind: "dog";
  bark: () => string;
};

type Animal = Cat | Dog;

function makeSound(animal: Animal): string {
  // Check if "meow" exists — if yes, it is a Cat
  if ("meow" in animal) {
    return animal.meow(); // safe — Cat
  }
  return animal.bark(); // safe — Dog
}

console.log("\n--- in Operator Narrowing ---");
const cat: Cat = { kind: "cat", meow: () => "Meow!" };
const dog: Dog = { kind: "dog", bark: () => "Woof!" };
console.log(makeSound(cat));
console.log(makeSound(dog));

//? 5. instanceof Narrowing
// * instanceof checks if an object is an instance of a class

class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NetworkError extends Error {
  retryAfter: number;
  constructor(message: string, retryAfter: number) {
    super(message);
    this.retryAfter = retryAfter;
  }
}

function handleError(error: ApiError | NetworkError): string {
  if (error instanceof ApiError) {
    // TypeScript knows it is ApiError here
    return `API Error ${error.statusCode}: ${error.message}`;
  }
  // TypeScript knows it is NetworkError here
  return `Network Error — retry after ${error.retryAfter}s`;
}

console.log("\n--- instanceof Narrowing ---");
console.log(handleError(new ApiError("Not Found", 404)));
console.log(handleError(new NetworkError("Timeout", 30)));

//? 6. Discriminated Union Narrowing
// * The cleanest narrowing pattern
// * Use a shared "kind" or "type" literal field to discriminate

type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string };
type ErrorState = { status: "error"; message: string };

type AppState = LoadingState | SuccessState | ErrorState;

function renderState(state: AppState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Data: ${state.data}`; // TypeScript knows data exists
    case "error":
      return `Error: ${state.message}`; // TypeScript knows message exists
  }
}

console.log("\n--- Discriminated Union ---");
console.log(renderState({ status: "loading" }));
console.log(renderState({ status: "success", data: "Users loaded" }));
console.log(renderState({ status: "error", message: "Network failed" }));