/*
    ! Function types in TypeScript

    * Functions are first-class citizens in TypeScript, which means they can be assigned to variables, passed as arguments to other functions, and returned from functions. TypeScript allows you to define the types of function parameters and return values, providing better type safety and code clarity.

*/
export {};

//! Basic Function Signatures

//? Named Function - explicit parameter and return types

function add(a: number, b: number): number {
  return a + b;
}

//? Arrow function - same type signature as the named function above

const substract = (a: number, b: number): number => {
  return a - b;
};

//? Single expression arrow - implicit return type

const multiply = (a: number, b: number): number => a * b;

console.log("--- Basic Function Signatures ---");
console.log("Add:", add(5, 3));
console.log("Subtract:", substract(5, 3));
console.log("Multiply:", multiply(5, 3));

//! Typing functions as Variables
//* You can declare the type of a function variable explicitly.
//* Syntax : (name : string) => string;

let greet: (name: string) => string;

greet = (name: string): string => `Hello, ${name}!`;

console.log("--- Typing functions as Variables ---");
console.log(greet("John"));
// ! Wrong signature is rejected
// greet = (name: number) => name; // ERROR

let calculate: (x: number, y: number, op: string) => number;

calculate = (a, b, op) => {
  if (op === "add") return a + b;
  if (op === "subtract") return a - b;
  if (op === "multiply") return a * b;
  if (op === "divide") return a / b;
  throw new Error("Invalid operation");
};

console.log("Calculate : ", calculate(10, 5, "divide"));

//! Type Aliases for Functions

type MathOperation = (a: number, b: number) => number;
type StringTransformer = (input: string) => string;
type Predicate<T> = (value: T) => boolean;
type EventHandler = (event: string, payload: unknown) => void;

const divide: MathOperation = (a, b) => a / b;
const toUpperCase: StringTransformer = (s) => s.toUpperCase();
const isEven: Predicate<number> = (n) => n % 2 === 0;
const handleEvent: EventHandler = (event, payload) => {
  console.log(`Event: ${event}`, payload);
};

console.log("\n--- Type Aliases for Functions ---");
console.log("Divide:", divide(20, 4));
console.log("Upper:", toUpperCase("typescript"));
console.log("Is 4 even:", isEven(4));
console.log("Is 7 even:", isEven(7));
handleEvent("click", { x: 100, y: 200 });

//! Interface for Function types
//* Interfaces can also describe function shape

interface Formatter {
  (value: string, width: number): string;
}
interface Validator {
  (input: string): boolean;
  description: string; // functions can have properties too
}
const padLeft: Formatter = (value, width) => {
  return value.padStart(width, " ");
};
const isEmail: Validator = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};
isEmail.description = "Validates if the input is a valid email address";

console.log("\n--- Interface for Functions ---");
console.log("Padded:", `"${padLeft("hello", 10)}"`);
console.log("Is email:", isEmail("manjit@example.com"));
console.log("Is email:", isEmail("notanemail"));
console.log("Description:", isEmail.description);

//! Functions as parameters (Callbacks)
//* Functions can be passed as parameters to other functions, enabling callbacks and higher-order functions.

type SuccessCallback = (data: string) => void;
type ErrorCallback = (error: string) => void;
type TransformFn = (value: number) => number;

function fetchUser(
  id: number,
  onSuccess: SuccessCallback,
  onError: ErrorCallback,
): void {
  if (id > 0) {
    onSuccess(`User ${id} : Manjit`);
  } else {
    onError("Invalid User ID");
  }
}

function transformArray(numbers: number[], transform: TransformFn): number[] {
  return numbers.map(transform);
}

console.log("--- Functions as parameter (callbacks) ---");
fetchUser(
  1,
  (data) => console.log("Success:", data),
  (err) => console.log("Error:", err),
);

fetchUser(
  -1,
  (data) => console.log("Success:", data),
  (err) => console.log("Error:", err),
);

const doubled =transformArray([1,2,3,4,5],(n)=>n*2);
const squared = transformArray([1,2,3,4,5],(n) => n ** 2);

console.log("Doubled : ",doubled);
console.log("Squared : ",squared);


//! Function as Return Values
//* Functions can return other functions, allowing for function composition and currying.

type Multiplier = (value : number ) => number;

function createMultiplier(factor : number):Multiplier {
    return (value) => value * factor;
}
function createGreeter(greeting:string):(name:string)=>string {
    return (name) => `${greeting},${name}`
}

function createValidator(min:number,max:number):(value:number) => boolean {
    return (value) => value >= min && value <=max;
}

console.log("\n--- Functions as Return Values ---");
const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log("Double 5:", double(5));
console.log("Triple 5:", triple(5));
console.log("Ten times 5:", tenTimes(5));

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
console.log(sayHello("Manjit"));
console.log(sayHi("Kumar"));

const isValidAge = createValidator(0, 120);
const isValidScore = createValidator(0, 100);
console.log("Is 25 valid age:", isValidAge(25));
console.log("Is 150 valid age:", isValidAge(150));
console.log("Is 95 valid score:", isValidScore(95));


//! Method signatures in Objects
//* Objects can have typed methods

interface Calculator {
    value : number;
    setIntialValue : (n : number) => Calculator;
    add : (n : number) => Calculator ; //Chainable
    substract : (n : number) => Calculator ; //Chainable
    multipy : (n:number) => Calculator ; //Chainable
    result : () => number;
}

const calculator:Calculator = {
    value : 0,
    setIntialValue(n){
        this.value = n;
        return this;
    },
    add(n){
        this.value += n;
        return this;
    },
    substract(n){
        this.value -= n;
        return this;
    },
    multipy(n){
        this.value *= n;
        return this;
    },
    result(){
        return this.value;
    }
}

console.log("\n--- Method signature in objects ---");
const result = calculator.setIntialValue(10).add(10).multipy(3).substract(5).result();

console.log("Calculator Result : ",result);
