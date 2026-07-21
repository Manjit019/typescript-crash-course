/*
    ! Classes in TypeScript

    * Classes are blueprint for creating objects
    * TypeScript adds types, access modifiers, and more to JS classes
    * Classes support OOP concept : encapsulation, inheritance, polymorphism,abstraction.
*/
export {};

//? 1. Basic class

class Person {
  //* Properties - must be declared at the top in TypeScript
  name: string;
  age: number;
  email: string;

  //* Constructor - runs when creating an instance
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  //* Methods -
  greet(): string {
    return `Hi, I am ${this.name} and I'm ${this.age} years old`;
  }
  getInfo(): string {
    return `${this.name} (${this.email})`;
  }
}

//* Create instance using 'new'
const person1 = new Person("Manjit", 22, "manjitkumar1725@gmail.com");
const person2 = new Person("Kumar", 24, "kumar@gmail.com");

console.log("--- Basic Class ---");
console.log(person1.greet());
console.log(person2.getInfo());
console.log("Name:", person1.name);

//? 2. Shorthand Constructor (Parameter Properties)
//* TypeScript shorthand - declare and assign in constructor params
//* Add access modifier (public,private, etc) before the parameter

class Product {
  // No need to declare properties separately
  // No need to write this.name = name etc.

  constructor(
    public id: number,
    public name: string,
    public price: number,
    public readonly createdAt: string = new Date().toISOString(),
  ) {}

  getLabel(): string {
    return `[${this.id} ${this.name} - $${this.price}]`;
  }
  applyDiscount(percent: number): void {
    this.price = this.price * (1 - percent / 100);
  }
}
const laptop = new Product(1, "MacBook Pro", 2499);
const phone = new Product(2, "iPhone 15", 999);

console.log("\n--- Shorthand Constructor ---");
console.log(laptop.getLabel());
laptop.applyDiscount(10);
console.log("After 10% discount:", laptop.getLabel());
console.log("Created at:", laptop.createdAt);

//? 3. Getters and Setters
//* Getters and setters allow controlled access to properties
//* Use get and set keywords

class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  //* Getter - access like a property :temp.celsius
  get celsius(): number {
    return this._celsius;
  }

  //* Setter - with validation
  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero is not possible");
    }
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  get kelvin(): number {
    return this._celsius + 273.15;
  }
}

console.log("\n--- Getters and Setters ---");
const temp = new Temperature(36);
console.log("Celsius:", temp.celsius);
console.log("Fahrenheit:", temp.fahrenheit);
console.log("Kelvin:", temp.kelvin);

temp.celsius = 0;
console.log("After reset — Celsius:", temp.celsius);
console.log("After reset — Fahrenheit:", temp.fahrenheit);

try {
  temp.celsius = -300; // ERROR — below absolute zero
} catch (err) {
  console.log("Error:", (err as Error).message);
}

//? 4. Class with Interface

interface Describable {
  describe(): string;
}
interface Comparable<T> {
  compareTo(other: T): string;
}

class Student implements Describable, Comparable<Student> {
  constructor(
    public name: string,
    public grade: number,
    public gpa: number,
  ) {}

  describe(): string {
    return `Student: ${this.name}, Grade: ${this.grade}, GPA: ${this.gpa}`;
  }

  compareTo(other: Student): string {
    if (this.gpa < other.gpa)
      return `${other.name} has more higher GPA than ${this.gpa}`;
    if (this.gpa > other.gpa)
      return `${this.name} has more higher GPA than ${other.name}`;
    return `Both have same gpa!`;
  }
}

const student1 = new Student("Manjit", 12, 3.8);
const student2 = new Student("Kumar", 11, 3.5);

console.log("\n--- Class with Interface ---");
console.log(student1.describe());
console.log("Comparison:", student1.compareTo(student2));

//? 5. Class Expression
//* Classes can be anonymous expressions too

const Circle = class {
  constructor(public radius: number) {}

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  circumference(): number {
    return 2 * Math.PI * this.radius;
  }
};

console.log("\n--- Class Expression ---");
const circle = new Circle(5);
console.log("Area:", circle.area().toFixed(2));
console.log("Circumference:", circle.circumference().toFixed(2));

//? 6. toString and valueOf

class Money {
  constructor(
    public amount: number,
    public currency: string = "USD",
  ) {}

  // * Called when object is converted to string
  toString(): string {
    return `${this.currency} ${this.amount.toFixed(2)}`;
  }

  // * Called when object is used in arithmetic
  valueOf(): number {
    return this.amount;
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("Cannot add different currencies");
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}

console.log("\n--- toString and valueOf ---");
const price = new Money(99.99);
const tax = new Money(8.99);
console.log("Price:", price.toString());
console.log("Total:", price.add(tax).toString());
console.log("Numeric value:", +price); // valueOf called