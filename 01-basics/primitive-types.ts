
/*
    ! TypeScript Primitive Types : ->

    * There are 7 primitive types in TypeScript:
        * string
        * number
        * boolean
        * null
        * undefined
        * symbol
        * bigint
    - These are the most basic building blocks af any TypeScript program

*/

export {};

// ! string
// * Represents text values
// * Can use single quotes, double quotes, or backticks (template literals)

let firstName: string = "Manjit";
let lastName: string = 'Kumar';
let fullName: string = `${firstName} ${lastName}`; // * template literal

console.log("--- string ---");
console.log(fullName);
console.log("Length:", fullName.length);
console.log("Uppercase:", fullName.toUpperCase());

// ! number
// * TypeScript has ONE number type for all numeric values
// * Integers, floats, negative numbers — all use number
// * No separate int or float like other languages

let age: number = 22;
let price: number = 99.99;
let temperature: number = -5;
let hex: number = 0xff;       // hexadecimal
let binary: number = 0b1010;  // binary
let octal: number = 0o744;    // octal

console.log("\n--- number ---");
console.log(age, price, temperature);
console.log("Hex:", hex);
console.log("Binary:", binary);
console.log("Octal:", octal);

// * Useful number operations
console.log("Max safe integer:", Number.MAX_SAFE_INTEGER);
console.log("Is integer:", Number.isInteger(age));
console.log("Parsed float:", parseFloat("3.14"));


// ! boolean 
// * Represents true or false only
// * Used for conditions, flags, toggles

let isLoggedIn: boolean = true;
let isAdmin: boolean = false;
let hasPermission: boolean = isLoggedIn && isAdmin;

console.log("\n--- boolean ---");
console.log("Logged in:", isLoggedIn);
console.log("Is admin:", isAdmin);
console.log("Has permission:", hasPermission);


// ! null
// * null means a value is intentionally empty or absent
// * You must explicitly type it as null or use a union type

let selectedUser: string | null = null; // * no user selected yet
console.log("\n--- null ---");
console.log("Selected user:", selectedUser);

selectedUser = "Manjit"; // now assigned
console.log("Selected user after assignment:", selectedUser);

// ? Without union type, null cannot be assigned to a string
// let name: string = null; // ERROR with strictNullChecks

// ! undefined
// * undefined means a variable has been declared but not yet assigned
// * Different from null — null is intentional, undefined is accidental

let middleName: string | undefined = undefined;
console.log("\n--- undefined ---");
console.log("Middle name:", middleName); // undefined

// * Common pattern — optional values
function getUser(id: number): string | undefined {
  if (id === 1) return "Manjit";
  return undefined; // * user not found
}

console.log(getUser(1));  // "Manjit"
console.log(getUser(99)); // undefined

// ! symbol
// * symbol creates a completely unique value every time
// * Useful for object keys that must never conflict

const id1: symbol = Symbol("id");
const id2: symbol = Symbol("id");

console.log("\n--- symbol ---");
console.log("id1 === id2:", id1 === id2); // false — always unique
console.log("id1:", id1.toString());


//! bigint
// * bigint handles numbers larger than Number.MAX_SAFE_INTEGER
// * Use the n suffix to declare a bigint

const bigNumber: bigint = 9007199254740991n;
const anotherBig: bigint = BigInt("12345678901234567890");

console.log("\n--- bigint ---");
console.log("Big number:", bigNumber);
console.log("Another big:", anotherBig);

// ? Cannot mix number and bigint in operations
// const mixed = bigNumber + 1; // ERROR — use 1n instead
const mixed = bigNumber + 1n;
console.log("Mixed:", mixed);


// ! any (avoid this)
// * any completely disables type checking for that variable
// * It defeats the entire purpose of TypeScript
// * Only use it as a last resort when dealing with truly unknown data

let anything: any = "hello";
anything = 42;        // allowed
anything = true;      // allowed
anything = null;      // allowed

// ? When you absolutely cannot avoid it, use unknown instead
// ? unknown is safer than any — it forces you to check the type first

let unknownValue: unknown = "hello";
// unknownValue.toUpperCase(); // ! ERROR — must check type first

if (typeof unknownValue === "string") {
  console.log("\n--- unknown ---");
  console.log(unknownValue.toUpperCase()); // safe now
}


// * Type Summary
console.log("\n--- Type Summary ---");

const summary = {
  string: typeof firstName,
  number: typeof age,
  boolean: typeof isLoggedIn,
  null: typeof null, // * "object" — this is a known JS quirk
  undefined: typeof undefined,
  symbol: typeof id1,
  bigint: typeof bigNumber,
};

console.log(summary);
// ? Notice typeof null returns "object" — this is a JavaScript quirk
// ? TypeScript knows null is null — but typeof still returns "object"