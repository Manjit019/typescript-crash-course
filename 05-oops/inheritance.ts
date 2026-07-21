/*
    ! Inheritance in TypeScript :

    * Inheritance is a way to reuse code and create a hierarchy of classes
    * It allows a class (child/subclass) to acquire properties and behavior of another class (parent/superclass)
    * It helps in code reusability and method overriding
    * The child class inherits all public and protected members
    * Use the "extends" keyword
    * Use "super" keyword to access parent class members
*/
export {};

//? 1.Basic Inheritance
class Vehicle {
  constructor(
    public make: string,
    public model: string,
    public year: number,
    protected speed: number = 0,
  ) {}

  accelerate(amount: number): void {
    this.speed += amount;
    console.log(
      `${this.make} ${this.model} accelerating to ${this.speed} km/h`,
    );
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
    console.log(`${this.make} ${this.model} slowing to ${this.speed} km/h`);
  }

  describe(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

// * Car extends Vehicle — inherits all Vehicle members
class Car extends Vehicle {
  constructor(
    make: string,
    model: string,
    year: number,
    public doors: number = 4,
  ) {
    // * Must call super() first in constructor
    super(make, model, year);
  }

  honk(): string {
    return `${this.make} ${this.model}: Beep beep!`;
  }
}

class Truck extends Vehicle {
  constructor(
    make: string,
    model: string,
    year: number,
    public payload: number, // kg
  ) {
    super(make, model, year);
  }

  loadCargo(weight: number): void {
    if (weight > this.payload) {
      throw new Error(`Payload limit exceeded: max ${this.payload}kg`);
    }
    console.log(`Loaded ${weight}kg onto ${this.make} ${this.model}`);
  }
}

console.log("--- Basic Inheritance ---");
const car = new Car("Toyota", "Camry", 2024);
const truck = new Truck("Ford", "F-150", 2024, 1000);

console.log(car.describe());
car.accelerate(60);
console.log(car.honk());

console.log(truck.describe());
truck.accelerate(40);
truck.loadCargo(800);

//? 2. Method Overriding
//* Child classes can override parent class methods
//* Use the same method name
//* Call super.method() to run the parent version too

class Shape {
  constructor(public color: string = "white") {}

  area(): number {
    return 0;
  }

  describe(): string {
    return `A ${this.color} shape with area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(
    public radius: number,
    color: string = "red",
  ) {
    super(color);
  }

  // * Override area() from Shape
  area(): number {
    return Math.PI * this.radius ** 2;
  }

  // * Override describe() and call parent version too
  describe(): string {
    return `${super.describe()} | Circle with radius ${this.radius}`;
  }
}
class Rectangle extends Shape {
  constructor(
    public width: number,
    public height: number,
    color: string = "blue",
  ) {
    super(color);
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  describe(): string {
    return `${super.describe()} | Rectangle ${this.width}x${this.height}`;
  }
}

console.log("\n--- Method Overriding ---");
const shapes: Shape[] = [
  new Circle(5, "green"),
  new Rectangle(4, 6, "blue"),
  new Circle(3),
  new Rectangle(8, 2),
];

shapes.forEach((shape) => {
  console.log(shape.describe());
});

//? 3. Multi-Level Inheritance

class LivingThing {
  protected isAlive: boolean = true;

  breathe(): string {
    return "Breathing...";
  }
}

class AnimalBase extends LivingThing {
  constructor(
    protected name: string,
    protected sound: string,
  ) {
    super();
  }

  makeSound(): string {
    return `${this.name} says: ${this.sound}`;
  }

  eat(food: string): string {
    return `${this.name} is eating ${food}`;
  }
}

class DomesticAnimal extends AnimalBase {
  constructor(
    name: string,
    sound: string,
    public owner: string,
  ) {
    super(name, sound);
  }

  greetOwner(): string {
    return `${this.name} greets ${this.owner}!`;
  }
}

class PoliceDog extends DomesticAnimal {
  constructor(
    name: string,
    owner: string,
    public badgeNumber: string,
  ) {
    super(name, "Woof", owner);
  }

  patrol(): string {
    return `Officer ${this.name} (Badge: ${this.badgeNumber}) on patrol`;
  }

  // * Overriding from grandparent
  makeSound(): string {
    return `${super.makeSound()} (Police dog bark!)`;
  }
}

console.log("\n--- Multi-level Inheritance ---");
const policeDog = new PoliceDog("Rex", "Officer Smith", "K9-001");
console.log(policeDog.breathe()); // from LivingThing
console.log(policeDog.eat("kibble")); // from AnimalBase
console.log(policeDog.greetOwner()); // from DomesticAnimal
console.log(policeDog.makeSound()); // overridden
console.log(policeDog.patrol()); // own method

//? 4. instanceof and Type Narrowing
//* instanceof checks if an object is an instance of a class
//* Works across the inheritane chain

console.log("\n--- instanceof ---");
const shapes2: Shape[] = [new Circle(5), new Rectangle(4, 6), new Circle(3)];

shapes2.forEach((shape) => {
  if (shape instanceof Circle) {
    //  TypeScript knows it is Circle here
    console.log(`Circle — radius: ${shape.radius}`);
  } else if (shape instanceof Rectangle) {
    //  TypeScript knows it is Rectangle here
    console.log(`Rectangle — ${shape.width}x${shape.height}`);
  }
});

// * instanceof works up the chain
console.log("policeDog instanceof PoliceDog:", policeDog instanceof PoliceDog);
console.log(
  "policeDog instanceof DomesticAnimal:",
  policeDog instanceof DomesticAnimal,
);
console.log(
  "policeDog instanceof AnimalBase:",
  policeDog instanceof AnimalBase,
);
console.log(
  "policeDog instanceof LivingThing:",
  policeDog instanceof LivingThing,
);

//? 5. Polymorphism
//* Polymorphism means "many forms" - same method, diffrent behavior per class
//* The correct method is called based on the actual object type

class Notification {
  constructor(
    protected title: string,
    protected message: string,
  ) {}

  send(): string {
    return `[NOTIFICATION] ${this.title}: ${this.message}`;
  }
}

class EmailNotification extends Notification {
  constructor(
    title: string,
    message: string,
    private email: string,
  ) {
    super(title, message);
  }

  send(): string {
    return `[EMAIL → ${this.email}] ${this.title}: ${this.message}`;
  }
}

class SMSNotification extends Notification {
  constructor(
    title: string,
    message: string,
    private phone: string,
  ) {
    super(title, message);
  }

  send(): string {
    return `[SMS → ${this.phone}] ${this.title}: ${this.message}`;
  }
}

class PushNotification extends Notification {
  send(): string {
    return `[PUSH] 🔔 ${this.title}: ${this.message}`;
  }
}

console.log("\n--- Polymorphism ---");
const notifications: Notification[] = [
  new EmailNotification("Welcome", "Thanks for signing up!", "m@m.com"),
  new SMSNotification("OTP", "Your code is 123456", "+91-9999999999"),
  new PushNotification("Sale", "50% off today only!"),
];

// * TypeScript calls the correct send() for each type
notifications.forEach((n) => console.log(n.send()));