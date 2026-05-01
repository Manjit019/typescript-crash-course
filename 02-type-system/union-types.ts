/*
    ! Union Types in TypeScript
    * A union type allows a variable to hold values of multiple types.
    * Use the pipe (|) operator to combine types.
    * This of it as : "This or That".
*/
export {};

//? Basic Union Types

// A variable can be string OR number
let id: string | number = 101;
console.log("--- Basic Union ---");
console.log("ID as number:", id);

id = "usr_101"; // reassign to string — both are valid
console.log("ID as string:", id);

// ! Only allowed types
// id = true; // ERROR — boolean is not in the union

//? Union in Function Parameters

// * Functions can accept multiple types for a parameter

function formatId(id: string | number): string {
  //  We must NARROW the type before using type-specific methods
  if (typeof id === "string") {
    return id.toUpperCase(); //  safe — id is string here
  }
  return id.toString(); //  safe — id is number here
}

console.log("\n--- Union in Functions ---");
console.log(formatId("usr_001")); // "USR_001"
console.log(formatId(42)); // "42"

//? Union with literal types
// * Combine literal types with unions for specific allowed values

type Status = "active" | "inactive" | "pending" | "banned";
type Direction = "up" | "down" | "left" | "right";
type Theme = "light" | "dark" | "system";

let userStatus: Status = "active";
let move: Direction = "up";
let appTheme: Theme = "dark";

console.log("\n--- Literal Unions ---");
console.log(userStatus, move, appTheme);

// ! Only allowed values
// userStatus = "deleted"; // ERROR

//? Union with Arrays
// * An array can hold union types

let mixed: (string | number)[] = ["hello", 42, "world", 100];
console.log("\n--- Union Arrays ---");
console.log(mixed);

//  The whole array can be one type or another
let stringOrNumberArray: string[] | number[] = [1, 2, 3];
stringOrNumberArray = ["a", "b", "c"]; // * switch to string[]
console.log(stringOrNumberArray);

//? Union with Objects
// *Different object shapes can be represented with unions

type Circle = {
  kind: "circle";
  radius: number;
};
type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};
type Triangle = {
  kind: "triangle";
  base: number;
  height: number;
};

type Shape = Circle | Rectangle | Triangle; // shape can be any of these three

//  Use the "kind" property to tell them apart
//  This pattern is called a DISCRIMINATED UNION
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return 0.5 * shape.base * shape.height;
  }
}
console.log("\n--- Union with Objects ---");
const circle: Circle = { kind: "circle", radius: 5 };
const rect: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const tri: Triangle = { kind: "triangle", base: 3, height: 8 };

console.log("Circle area:", getArea(circle).toFixed(2));
console.log("Rectangle area:", getArea(rect));
console.log("Triangle area:", getArea(tri));

//? Handling null and undefined with unions
//* null and undefined are often added to unions
//* This is how optional values are represented

type MaybeString = string | null;
type MaybeNumber = number | undefined;

function findUser(id: number): string | null {
  const users: Record<number, string> = {
    1: "Manjit",
    2: "Kumar",
  };
  return users[id] ?? null; // return null if user not found
}

console.log("\n--- Nullable Unions ---");
console.log(findUser(1)); // "Manjit"
console.log(findUser(99)); // null

//  Always check before using nullable values
const found = findUser(1);
if (found !== null) {
  console.log("Found:", found.toUpperCase()); // safe
}

//? Union type Narrowing
// * Before using type-specific methods, narrow the union

function processInput(input: string | number | boolean): string {
  // typeof narrowing
  if (typeof input === "string") {
    return `String: ${input.toUpperCase()}`;
  }

  if (typeof input === "number") {
    return `Number: ${input.toFixed(2)}`;
  }

  // At this point TypeScript knows input is boolean
  return `Boolean: ${input ? "yes" : "no"}`;
}

console.log("\n--- Narrowing Unions ---");
console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(processInput(true));


//? Union vs any
// * any completely removes type safety
// * union keeps type safety — only specific types allowed

// BAD — any
function badProcess(input: any): void {
  input.toUpperCase(); // no error — but crashes if input is a number
}

//  GOOD — union
function goodProcess(input: string | number): void {
  if (typeof input === "string") {
    input.toUpperCase(); // safe
  } else {
    input.toFixed(2); // safe
  }
}

console.log("\n--- Union vs Any ---");
goodProcess("hello");
goodProcess(42);