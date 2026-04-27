/*
 * This is one of the most common TypeScript questions
 * Both can describe object shapes
 * But they have important differences
 */
export {};

// ! They Look Similar for Objects

// ? Using interface
interface UserInterface {
  name: string;
  age: number;
  email: string;
}

// ? Using type alias
type UserType = {
  name: string;
  age: number;
  email: string;
};

// * Both work identically for basic object typing
const user1: UserInterface = { name: "Manjit", age: 22, email: "m@m.com" };
const user2: UserType = { name: "Kumar", age: 25, email: "k@k.com" };

console.log("--- Both Work for Objects ---");
console.log(user1, user2);

// ! Diffrence 1 - union types
// * Interfaces can not describe union types
// * Interface StringOrNumber = string | number; // ERROR

// ? Type aliases CAN describe union types
type StringOrNumber = string | number;
type Status = "active" | "inactive" | "pending";
type ID = string | number;

console.log("\n--- Union Types (type only) ---");
let id: ID = 101;
id = "usr_101";
console.log(id);

// ! Difference 2 - Primitive Alias
// * Interfaces can not alias primitive types
// * interface MyString = string; // ERROR

// ? Type aliases can
type Username = string;
type Score = number;
type IsAdmin = boolean;

const username: Username = "Manjit";
const score: Score = 95;

console.log("\n--- Primitive Aliases (type only) ---");
console.log(username, score);

// ! Difference 3 - Declaring Merging in interfaces
// * Interfaces support declaration merging
// * Declare the same interface twice - TypeScript will merge them

interface Config {
  apiUrl: string;
  timeout: number;
}

// Same interface declared again — adds to it
interface Config {
  debug: boolean;
  version: number;
}
//  Now Config has ALL four properties
const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  debug: false,
  version: 1,
};

console.log("\n--- Declaration Merging (interface only) ---");
console.log(config);

// ! Type aliases CANNOT be declared twice
// type Config = { apiUrl: string }; // ERROR — Duplicate identifier 'Config'

// * Useful for: extending third-party library types, module augmentation

// ! Difference 4 - extending Syntax
// * Both support extension but with different syntax

// ? Interface uses "extends"
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// ? Type uses "&" intersection
type AnimalType = {
  name: string;
};

type DogType = AnimalType & {
  breed: string;
};

const dog1: Dog = { name: "Rex", breed: "Labrador" };
const dog2: DogType = { name: "Max", breed: "Poodle" };

console.log("\n--- Extension Syntax ---");
console.log(dog1, dog2);

// * interface extends gives better error messages
// * type intersection is more flexible — can combine with unions

// ! Difference 5 - Computed Properties
// * Type aliases support computed property names
// * Interfaces can not do this

type Keys = "name" | "age" | "email";

//  Map literal union to a type — Mapped Type
type UserFields = {
  [K in Keys]: string;
};

// ! Interfaces cannot use mapped types directly
// interface UserFieldsInterface {
//   [K in Keys]: string; // SYNTAX ERROR
// }

console.log("\n--- Computed Properties (type only) ---");
const fields: UserFields = {
  name: "Manjit",
  age: "22",
  email: "m@m.com",
};
console.log(fields);

// ! Difference 6 - Implements in classes
// * Both can be used with 'implements' in classes
// * This is one area where they are truely interchangeable

interface Printable {
  print: () => void;
}

type Saveable = {
  save: () => boolean;
};

class Report implements Printable, Saveable {
  print(): void {
    console.log("Printing report...");
  }
  save(): boolean {
    console.log("Saving report...");
    return true;
  }
}

console.log("\n--- implements works with both ---");
const report = new Report();
report.print();
report.save();


// ! Decision Guide 

//? USE interface when:
// * 1. Defining object shapes for classes
// * 2. You need declaration merging
// * 3. Working with OOP patterns
// * 4. Public API surface of a library

// ? USE type when:
// * 1. Defining union types
// * 2. Aliasing primitives
// * 3. Using computed/mapped types
// * 4. Complex type compositions
// * 5. Function types (personal preference)

// ? GENERAL RULE most teams follow:
// * - interface for objects and classes
// * - type for everything else