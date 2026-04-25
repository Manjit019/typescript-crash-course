/*
    ! Type Inference ->

    * TypeScript figures out the type automatically
    * You don't always need to write the type explicitly
    * TypeScript uses the value or context to determine the type

*/
export {};

//! Variable Inference ->

let name = "John"; // inferred as string
let age = 25; // inferred as number
let isStudent = true; // inferred as boolean

console.log("------ Variable Inference ------");
console.log(name, age, isStudent);

// ? Once inferred, the type is locked
// name = 42; // ERROR — Type 'number' is not assignable to type 'string'


// ! Function Return Type Inference ->
// * TypeScript infers the return type from the return statement

function getFullName(firstName : string,lastName : string){
    return `${firstName} ${lastName}` // * inferred return type as string
}
function getAge(age : number){
    return age; // * inferred return type as number
}
console.log("\n========= Return Type Inference =========");
console.log(getFullName("Manjit","Kumar"));


// ! Array Inference ->
// * TypeScript infers array types form the initial values

let fruits = ["apple", "banana", "mango"]; // * inferred as string[]
let scores = [95, 87, 72, 100]; // * inferred as number[]
let mixed = ["hello",42,true]; // * inferred as (string | number | boolean)[]

console.log("\n========= Array Inference =========");
console.log(fruits,scores,mixed);

// ? Type is locked after inference
// fruits.push(42); // ERROR

// ! Object Inference ->
// * TypeScript infers the full shape of an object

const user = {
    name : "Manjit",
    age : 22,
    isAdmin : true
}
// * typescript knows the exact shape now
// user.name = 123 // ERROR - name must be string
// user.email = "..." // ERROR - email does not exist on this object

console.log("\n========= Object Inference =========");
console.log(user);
console.log("Name : ",user.name);


// ! Contextual Typing ->
// * TypeScript infers types from context - not just values
// * Very powerful in callbacks and event handlers

const numbers = [1,2,3,4,5];

// * TypeScript knows n is a number because numbers is number[]

numbers.forEach(n => {
    console.log(n.toFixed(2)); // n is number - toFixed is available
});

// * TypeScript knows the event type from context
// document.addEventListener("click", (event) => {
//   event.clientX; // TypeScript knows event is MouseEvent
// });


// ! When to write Explicit types -->

// ? Case 1 : Declaring without assigning
let productName : string; 
productName = "Laptop Pro";

// ? Case 2 : Function parameters - typescript can't infer these
function greet(name : string) : string {
    return `Hello, ${name}!`;
}

// ? Case 3 : Union types that inference can not figure out
let id : string | number = 101; 

// ? Case 4 : Important functions - be explicit for clarity
function calculateTax(price : number,rate : number ):number {
    return price * rate;
}

// ? Case 5 : When inference is too broad
let value = [1,"two",true] // inferred as (number | string | boolean)[]
// If you only want numbers ,be explicit
let onlyNumbers : number[] = [1,2,3];

console.log("====== Explicit Types ========");
console.log(productName);
console.log(greet("Manjit"));
console.log(calculateTax(1000,0.18));

// ! Type widening ->
// * TypeScript sometimes widens types when not using const

let status = "active"; // inferred as string (wide)
const role = "admin"; // inferred as "admin" (narrow literal type)

// ? Why the difference : ->
// -> let can be reassigned to any string
// -> const can never change - TypeScript infers the exact literal "admin"

console.log("\n ========== Type Widening ============");
console.log(status,role);


// ? force narrow tyep with const assertion 
let direction = "north" as const; // inferred as "north" not string
// direction = "east"; // ERROR

console.log("\n ========== Type Narrowing ============");
console.log(direction);
