/*
    ! Literal Types in TypeScript ->

    * Literal types restrict a variable to an exact value.
    * Instead of "any string", you must be "this specific string".
    * Makes code much safer and self-documenting.

*/
export {};

//? String Literal Types

// * Without literal type — accepts any string
let anyStatus: string = "active";
anyStatus = "anything goes here"; // no error

//* With literal type - only this exact value
let exactStatus: "active" = "active";
// exactStatus = "inactive" // Error - only "active" is allowed

console.log("--- String Literals ---");
console.log(exactStatus);

// * Most useful as unions of literal values
type Status = "active" | "inactive" | "pending" | "banned";

let userStatus: Status = "active";
userStatus = "pending"; // valid
// userStatus = "deleted"; // ! ERROR

console.log("Status:", userStatus);

//? Number Literal Types

//* Exact number as types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type HttpSuccessCode = 200 | 201 | 204;
type HttpErrorCode = 400 | 401 | 403 | 404 | 500;

let roll: DiceRoll = 5;
let sucessCode: HttpSuccessCode = 200;
let errorCode: HttpErrorCode = 404;

console.log("\n--- Number Literals ---");
console.log("Dice Roll : ", roll);
console.log("Success code : ", sucessCode);
console.log("Error code : ", errorCode);
// ! Only valid dice values
// roll = 7; // ERROR

//? Boolean Literal Types
//* Sometimes useful to restrict to exactly true or false

type AlwaysTrue = true;
type AlwaysFalse = false;

let mustBeTrue: AlwaysTrue = true;
// let mustBeTrue : AlwaysTrue = false; // Error

console.log("\n--- Boolean Literals ---");
console.log("Must be true:", mustBeTrue);

//? Literal types in functions
// * Functions that only accept  specific values

type Direction = "up" | "down" | "left" | "right";
type Alignment = "left" | "center" | "right";
type FontSize = "sm" | "md" | "lg" | "xl";

function move(direction: Direction, steps: number): string {
  return `Moving ${direction} by ${steps} steps`;
}

function alignText(text: string, alignment: Alignment): string {
  return `[${alignment.toUpperCase()}] ${text}`;
}

function setFontSize(size: FontSize): string {
  const sizeMap = { sm: 12, md: 16, lg: 20, xl: 24 };
  return `Font size: ${sizeMap[size]}px`;
}

console.log("\n--- Literals in Functions ---");
console.log(move("up", 3));
console.log(move("left", 5));
console.log(alignText("Hello TypeScript", "center"));
console.log(setFontSize("lg"));

// ! Invalid values caught at compile time
// move("diagonal", 1); // ERROR
// alignText("text", "justify"); // ERROR

//? Literal types in objects
//* Objects can use literal types for discriminating between variants/shapes
//* This is the foucndation for discriminated unions

type SuccessResponse = {
  status: "success"; // Literal type
  data: string;
  code: 200 | 201 | 204;
};
type ErrorResponse = {
  status: "error"; // Literal type
  message: string;
  code: 400 | 401 | 403 | 404 | 500;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse): void {
  // Typescript narrows based on the literal 'status' field
  if (response.status === "success") {
    console.log("Data : ", response.data);
    console.log("Code : ", response.code);
  } else {
    console.log("Error : ", response.message);
    console.log("Code : ", response.code);
  }
}
console.log("\n--- Literals in Objects ---");
handleResponse({ status: "success", data: "User loaded", code: 200 });
handleResponse({ status: "error", message: "Not found", code: 404 });

//? Const Assertions
//* const assertion narrow inference to the most specific literal type
//* use "as const" to lock values as literals

const config = {
    env : "production",
    version : "1.0.0",
    debug : false
} as const;

// * Without as const:
//  env would be inferred as string
//  version would be inferred as number

// * With as const:
//  env is inferred as "production" (literal)
//  version is inferred as 3 (literal)
//  All properties become readonly

console.log("\n--- const Assertion ---");
console.log(config);
// config.env = "development"; // ! ERROR — readonly with as const

// * Very useful for config objects, and lookup talbes
const ROUTES = {
    home : "/",
    about : "/about",
    dashboard : "/dashboard",
    settings : "/settings"
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES]
// Route is not "/" ,"/about","/dashboard","/settings"

console.log("Routes : ",ROUTES);


//? Template Literal Types 
//* You can combine sting literals to creaete new types
//* Powerful for creating consistent naming paterns

type EventName = "click" | "focus" | "blur";
type ElementType = "button" | "input" | "form";

// Creates all combinations: "button_click" | "button_focus" etc.
type Eventkey = `${ElementType}_${EventName}`;

let eventKey: Eventkey = "button_click";
// let eventKey2: EventKey = "div_click"; // ! ERROR — div not in ElementType

console.log("\n--- Template Literal Types ---");
console.log("Event key:", eventKey);

// * Common use case — CSS class names, event names, API endpoints
type CSSProperty = "margin" | "padding";
type CSSDirection = "top" | "right" | "bottom" | "left";
type CSSClass = `${CSSProperty}-${CSSDirection}`;

let cssClass: CSSClass = "margin-top";
console.log("CSS class:", cssClass);