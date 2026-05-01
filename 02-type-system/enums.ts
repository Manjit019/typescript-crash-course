/*
    ! Enums in TypeScript -->

    * Enums define a set of named constants.
    * Make intent clear and prevent magic strings/numbers
    * TypeScript has numberic, string, and const enums.

*/

export {};

// ?1. Numeric Enums (default)
//* By default, enums are numbers starting from 0

enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}
console.log("--- Numberic Enums ---");
console.log(Direction.Up); // 0
console.log(Direction.Down); // 1
console.log(Direction.Left); // 2
console.log(Direction.Right); // 3

// * You can use the enum like a type
let playerDirection: Direction = Direction.Up;
console.log("Player direction:", playerDirection);

// * Reverse mapping — number to name
console.log("Name for 0:", Direction[0]); // "Up"
console.log("Name for 2:", Direction[2]); // "Left"

//? 2. Custom Numeric Values
//* You can set custom starting values or specific values

enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500,
}

console.log("\n--- Custom Numeric Enum ---");
console.log("OK:", StatusCode.OK);
console.log("Not Found:", StatusCode.NotFound);
console.log("Server Error:", StatusCode.ServerError);

function handleStatus(code: StatusCode): string {
  switch (code) {
    case StatusCode.OK:
      return "Request successful";
    case StatusCode.Created:
      return "Resource created";
    case StatusCode.NotFound:
      return "Resource not found";
    case StatusCode.ServerError:
      return "Internal server error";
    default:
      return "Unknown status";
  }
}

console.log(handleStatus(StatusCode.OK));
console.log(handleStatus(StatusCode.NotFound));

//? 3. String Enums
//* String enums have string values instead of numbers
//* More readable in logs and debugging
//* No reverse mapping

enum Role {
  Admin = "ADMIN",
  Moderator = "MODERATOR",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}

enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}
console.log("\n--- String Enum ---");
console.log("Admin role:", Role.Admin); // "ADMIN"
console.log("Dark theme:", Theme.Dark); // "dark"

let userRole: Role = Role.Admin;
let appTheme: Theme = Theme.Dark;

console.log("User role:", userRole);
console.log("App theme:", appTheme);

//  String enums are better for debugging than numeric enums
//  You see "ADMIN" instead of 0 in logs

//? 4. Using enums in Functions

enum Permission {
  Read = "READ",
  Write = "WRITE",
  Delete = "DELETE",
  Admin = "ADMIN",
}

function canPerformAction(
  userPermission: Permission,
  required: Permission,
): boolean{
    if (userPermission === Permission.Admin) return true;
    return userPermission === required;
};
console.log("\n--- Enums in Functions ---");
console.log(canPerformAction(Permission.Admin, Permission.Delete)); // true
console.log(canPerformAction(Permission.Read, Permission.Delete));  // false
console.log(canPerformAction(Permission.Write, Permission.Write));  // true


//? 5. Const Enums
//* Const enums are completely removed during compilation
//* They are inlined as values - better performance
//* Cannot be used with reverse mapping

const enum Season {
    Sping = "SPRING",
    Summer = "SUMMER",
    Autumn = "AUTUMN",
    Winter = "WINTER",
}
console.log("\n--- Const Enum ---");
const currentSeason: Season = Season.Summer;
console.log("Season:", currentSeason); // "SUMMER"

//  In compiled JS, Season.Summer becomes "SUMMER" directly
//  No enum object is created in the output


//? 6. Enum vs Union Type Literals

// * Both enums and union literals restrict values
// * When to use which?

// UNION LITERALS — simpler, no runtime object
type StatusLiteral = "active" | "inactive" | "pending";

// ENUM — has a runtime object, reverse mapping, group of constants
enum StatusEnum {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

// * Prefer union literals for simple string constants
// * Prefer enums for grouped constants that need a name

console.log("\n--- Enum vs Union ---");
const literalStatus: StatusLiteral = "active";
const enumStatus: StatusEnum = StatusEnum.Active;
console.log(literalStatus, enumStatus);


//? 7. Iterating Over Enums

// * Numeric enums can be iterated (string enums too with Object.values)

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

console.log("\n--- Iterating Enums ---");

// * Get all keys
console.log("Keys:", Object.keys(Color));

// * Get all values
console.log("Values:", Object.values(Color));

// * Iterate
Object.values(Color).forEach((color) => {
  console.log("Color:", color);
});