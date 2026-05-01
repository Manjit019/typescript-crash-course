/*
    ! Intersection Types ->
    * An intersection type combines multiple types into one.
    * The resulting type has all the properties of the combined types.
    * Use the ampersand (&) operator to create an intersection type.
    * This of it as : "This AND That".
*/
export {};

//? Basic Intersection Types

type HasName = {
  name: string;
};

type HasAge = {
  age: number;
};

type HasEmail = {
  email: string;
};

//  Person must have ALL properties from all three types
type Person = HasName & HasAge & HasEmail;

const person: Person = {
  name: "Manjit",
  age: 22,
  email: "manjit@example.com",
};

console.log("--- Basic Intersection ---");
console.log(person);

// ! Missing any property causes an error
// const invalid: Person = { name: "Kumar", age: 25 }; // ERROR — email missing

//? Intersection for Role-Based Types
//* Very useful for building role-based user systems

type BaseUser = {
  id: number;
  name: string;
  email: string;
};

type AdminPrivileges = {
  canDeleteUsers: boolean;
  canEditContent: boolean;
  permissions: string[];
};

type ModeratorPrivileges = {
  canBanUsers: boolean;
  canRemovePosts: boolean;
};

//  Admin has everything from BaseUser AND AdminPrivileges
type Admin = BaseUser & AdminPrivileges;

// Moderator has everything from BaseUser AND ModeratorPrivileges
type Moderator = BaseUser & ModeratorPrivileges;

//  SuperAdmin has ALL three
type SuperAdmin = BaseUser & AdminPrivileges & ModeratorPrivileges;

const admin: Admin = {
  id: 1,
  name: "Manjit",
  email: "admin@example.com",
  canDeleteUsers: true,
  canEditContent: true,
  permissions: ["read", "write", "delete"],
};

const superAdmin: SuperAdmin = {
  id: 2,
  name: "Kumar",
  email: "super@example.com",
  canDeleteUsers: true,
  canEditContent: true,
  permissions: ["all"],
  canBanUsers: true,
  canRemovePosts: true,
};

console.log("\n--- Role-Based Intersection ---");
console.log("Admin:", admin);
console.log("SuperAdmin:", superAdmin);

//? Intersection with functions
//* Types with methods can also be intersected

type Serializable = {
  serialize: () => string;
};
type Loggable = {
  log: () => void;
};
type DataProcessor = Serializable &
  Loggable & {
    data: string;
    process: () => void;
  };

const processor: DataProcessor = {
  data: "raw data",
  serialize: () => JSON.stringify({ data: "raw data" }),
  log: () => console.log("Processing : ", "raw data"),
  process: () => "raw data".toUpperCase(),
};
console.log("\n--- Intersection with Methods ---");
console.log("Serialized:", processor.serialize());
processor.log();
console.log("Processed:", processor.process());

//? Intersection in Function Parameters
// * Intersect types directly in function signatures

type WithTimestamp = {
  createdAt: string;
  updatedAt: string;
};

type WithID = {
  id: number;
};
// Parameter must have ALL properties from both types
function saveRecord(record: BaseUser & WithTimestamp & WithID): void {
  console.log(`Saving record ID:${record.id} — ${record.name}`);
  console.log(`Created: ${record.createdAt}`);
}

console.log("\n--- Intersection in Parameters ---");
saveRecord({
  id: 1,
  name: "Manjit",
  email: "m@example.com",
  createdAt: "2025-01-01",
  updatedAt: "2025-06-01",
});

//? Intersection vs Union 
//* Union (|) -> Must satisfy one of the types
//* Intersection (&) -> Must satisfy all types

type A = { x: number };
type B = { y: number };

// Union — needs x OR y (or both)
type AorB = A | B;
const aorb1: AorB = { x: 1 }; // valid
const aorb2: AorB = { y: 2 }; // valid
const aorb3: AorB = { x: 1, y: 2 }; // valid

// Intersection — needs x AND y
type AandB = A & B;
const aandb: AandB = { x: 1, y: 2 }; // must have BOTH

console.log("\n--- Union vs Intersection ---");
console.log("Union examples:", aorb1, aorb2, aorb3);
console.log("Intersection:", aandb);

//? Conflict in Intersections types
// ! What happens when intersected types have same property with different types?

type TypeX = {value: string};
type TypeY = {value: number};

//  The result type for "value" becomes string & number = never
//  This means you can NEVER create a valid object of this type
type Conflicted = TypeX & TypeY;

// ! This will always error — value cannot be both string and number
// const conflict: Conflicted = { value: "hello" }; // ERROR
// const conflict: Conflicted = { value: 42 };       // ERROR

// * Avoid intersecting types with conflicting same-named properties
console.log("\n--- Conflict Warning ---");
console.log("Conflicting intersections result in 'never' type — avoid this");