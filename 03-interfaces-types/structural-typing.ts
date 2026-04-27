/*
    ! Structural typing ->

    * TypeScript uses structural typing (also called duck typing)
    * It does not care about the type name
    * It only cares about the shape - the properties and their types
    * If it has the right properties , it is compatible
*/
export {};

//! Basic structural typing

interface Point {
  x: number;
  y: number;
}

// * This object is not explicitly typed as Point
// * But it has the same shape — TypeScript accepts it
const coordinates = { x: 10, y: 20 };

function printPoint(point: Point): void {
  console.log(`Point: (${point.x}, ${point.y})`);
}

console.log("--- Basic Structural Typing ---");
printPoint(coordinates); // * Works — shape matches Point
printPoint({ x: 5, y: 15 }); // * Works — inline object matches

// ! Extra properties are allowed (in variables)
// * When assigning to a variable, extra properties are allowed
// * As long as the required properties are present

interface Named {
  name: string;
}

//  This has more properties than Named requires
const person = {
  name: "Manjit",
  age: 22,
  email: "m@m.com",
};

//  Works — person has "name" which is all Named requires
function greet(named: Named): void {
  console.log(`Hello, ${named.name}!`);
}

console.log("\n--- Extra Properties (via variable) ---");
greet(person); // * Works

// ! But extra properties are NOT allowed in direct object literals
// greet({ name: "Manjit", age: 22 }); // ERROR — excess property check

// ! Structural Compatability
// * Two completely different types are compatible if they have the same shape

interface Cat {
  name: string;
  age: number;
}

interface Dog {
  name: string;
  age: number;
}

// * Cat and Dog are structurally identical
// * TypeScript treats them as compatible

const myCat: Cat = { name: "Whiskers", age: 3 };
const myDog: Dog = myCat; // * Works — same structure

console.log("\n--- Structural Compatibility ---");
console.log("Dog from Cat:", myDog);

//! Assignablity - Subsets
// * A type with more properties is assignable to a type with fewer properties but not the other way around

interface Basic {
    id : number;
    name : string;
}
interface Detailed {
    id : number;
    name : string;
    email : string;
    role  : string;
}

function processBasic(entity: Basic): void {
  console.log(`Processing: ${entity.id} — ${entity.name}`);
}

const detailed: Detailed = {
  id: 1,
  name: "Manjit",
  email: "m@m.com",
  role: "admin",
};

console.log("\n--- Assignability ---");
// * Detailed has more properties — it satisfies Basic
processBasic(detailed); // * Works

// * The reverse does NOT work
const basic: Basic = { id: 2, name: "Kumar" };
// processDetailed(basic); // Would ERROR if processDetailed required Detailed

// ! Structural Typing with Classes
// * Class instances are also checked structurally - not by name

class Rectangle {
    constructor(
      public width: number,
      public height: number
    ) {}
  
    area(): number {
      return this.width * this.height;
    }
  }
  
  class Box {
    constructor(
      public width: number,
      public height: number
    ) {}
  
    area(): number {
      return this.width * this.height;
    }
  }
  
  function printArea(shape: { width: number; height: number; area: () => number }): void {
    console.log(`Area: ${shape.area()}`);
  }
  
  const rect = new Rectangle(4, 6);
  const box = new Box(3, 8);
  
  console.log("\n--- Structural with Classes ---");
  printArea(rect); // Works — Rectangle matches the shape
  printArea(box);  // Works — Box matches the shape too

//! Practical Example — Flexible APIs  
  // * Structural typing makes TypeScript very flexible
  // * Functions accept anything with the right shape
  
  interface Loggable {
    log: () => string;
  }
  
  class Server {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
    log(): string {
      return `[SERVER] ${this.name} is running`;
    }
  }
  
  class Database {
    private host: string;
    constructor(host: string) {
      this.host = host;
    }
    log(): string {
      return `[DB] Connected to ${this.host}`;
    }
  }
  
  // * Plain object also works — just needs the right shape
  const cache = {
    log: () => "[CACHE] Cache initialized",
  };
  
  function logAll(items: Loggable[]): void {
    items.forEach((item) => console.log(item.log()));
  }
  
  console.log("\n--- Flexible APIs ---");
  logAll([
    new Server("Main Server"),
    new Database("localhost:5432"),
    cache,
  ]);