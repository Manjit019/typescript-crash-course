/*
    ! Type Aliases in TypeScript

    * A type alias give a name to any type.
    * Makes complex types reusable and readable.
    * Use the "type" keyword to create a type alias.

*/
export {};

// ? Basic Type Aliases
// * Instead of repeating {name : string,age : number } everywhere, give it a name and reuse it.

type User = {
  name: string;
  age: number;
  isActive: boolean;
};
// now use it like any other type
const user1: User = { name: "Manjit", age: 22, isActive: true };
const user2: User = { name: "Kumar", age: 25, isActive: false };

console.log("--- Basic Type Aliases ---");
console.log(user1);
console.log(user2);

// ! Wrong shape is caught
// const user3: User = { name: "Alice" }; // ERROR — age and isActive missing

//? Aliases for primitives
// * You can alias primitive types too
// * Useful for giving meaning to raw types

type UserID = string;
type Age = number;
type IsActive = boolean;

const userId: UserID = "usr_001";
const userAge: Age = 22;
const active: IsActive = true;

console.log("\n--- Primitive Aliases ---");
console.log(userId, userAge, active);

// * These are just aliases — not new types
// * UserID and string are interchangeable

// ? Aliases for Union types

// * Alias a union type so you don't repeat it

type StringOrNumber = string | number;
type Status = "active" | "inactive" | "pending";
type Direction = "north" | "south" | "east" | "west";

let id: StringOrNumber = 101;
id = "usr_101"; //  both are valid

let accountStatus: Status = "active";
let heading: Direction = "north";

console.log("\n--- Union Aliases ---");
console.log(id, accountStatus, heading);

// ! Only allowed values
// accountStatus = "deleted"; // ERROR — not in the union

// ? Aliases for Function Types
// * Give function signatures a name

type MathOperation = (a: number, b: number) => number;
type StringTransformer = (input: string) => string;
type Logger = (message: string) => void;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const toUpper: StringTransformer = (s) => s.toUpperCase();
const log: Logger = (msg) => console.log(`[LOG]: ${msg}`);

console.log("\n--- Function Type Aliases ---");
console.log("Add:", add(5, 3));
console.log("Subtract:", subtract(10, 4));
console.log("Upper:", toUpper("hello"));
log("TypeScript is powerful");

//? Aliases for Arrays and Tuples
type StringArray = string[];
type NumberArray = number[];
type Coordinate = [number, number];
type RGB = [number, number, number];

const tags: StringArray = ["typescript", "javascript", "node"];
const scores: NumberArray = [95, 87, 72];
const point: Coordinate = [10, 20];
const red: RGB = [255, 0, 0];

console.log("\n--- Array and Tuple Aliases ---");
console.log(tags, scores, point, red);

// ? Optional and Readonly in Type Aliases

type Product = {
  readonly id: number; // cannot be changed after creation
  name: string;
  price: number;
  description?: string; // optional
};

const laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 2499,
};

console.log("\n--- Optional and Readonly ---");
console.log(laptop);

// ! Cannot change readonly
// laptop.id = 2; // ERROR

// * Optional properties may be undefined
console.log("Description:", laptop.description); // undefined

//? Extending Type Aliases
//* Type aliases can be extended using intersection (&)
// * This allows you to combine multiple types into one

type BaseEntity = {
  id: number;
  createdAt: string;
};

type AdminUser = User &
  BaseEntity & {
    permissions: string[];
  };

const admin: AdminUser = {
  name: "Manjit",
  age: 22,
  isActive: true,
  id: 1,
  createdAt: "2026-06-01",
  permissions: ["read", "write", "delete"],
};
console.log("\n--- Extended Type Aliases ---");
console.log(admin);

//? Nested Type Aliases

type Address = {
  street: string;
  city: string;
  country: string;
};

type Contact = {
  email: string;
  phone?: string;
};

type FullUser = {
  id: number;
  name: string;
  address: Address; //reusing Address type
  contact: Contact; //reusing Contact type
};

const fullUser: FullUser = {
  id: 1,
  name: "Manjit Kumar",
  address: {
    street: "123 Main St",
    city: "New Delhi",
    country: "India",
  },
  contact: {
    email: "manjit@example.com",
  },
};

console.log("\n--- Nested Type Aliases ---");
console.log(fullUser);
console.log("City:", fullUser.address.city);
console.log("Email:", fullUser.contact.email);