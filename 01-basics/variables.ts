/*
    ! Variables in TypeScript : -> 

    * Variables are containers for storing data values.
    
    ? There are three main types of variables in TypeScript:

    1. let: This keyword is used to declare a variable that can be modified later.
    2. const: This keyword is used to declare a variable that cannot be modified after initialization.
    3. var: This keyword is used to declare a variable that can be modified later.
*/

/*
  ! let keyword : ->

  * let keyword is used to declare a variable that can be modified later.
  * let declares a block scoped variable.
  * Block scoped means it only exists inside {} it was declared in.
  
  ? Syntax : 
    let variableName : dataType = value;
*/

export {};

//Exmaple:
let name: string = "John";
let age: number = 25;
let isStudent: boolean = true;

console.log("---- let -----");
console.log(name,age,isStudent);

//Reassignment:
name = "Alice";
age = 30;
console.log("Reassigned : ", name,age);

//? Note : You can not reassign with a different type

// name = 123; // ! ERROR — Type 'number' is not assignable to type 'string'



/*
  ! const keyword : ->

  * const keyword is used to declare a  blocked scoped variable that cannot be modified after initialization.\
  * Always prefer const unless you know the value will change.
  * const does not mean the value is deeply immutable(for objects/array)
  
  ? Syntax : 
    const variableName : dataType = value;
*/

//Example

const PI:number = 3.14159;
const APP_VERSION:string = "1.0.0";
console.log("---- const -----");
console.log(PI,APP_VERSION);
// PI = 3.14; // ! ERROR — Cannot assign to 'PI' because it is a constant or a read-only property

// const with objects

const user = {
  name: "Alice",
  age: 25,
  isAdmin: false,
};
console.log("---- const with objects -----");
console.log(user);

// This is allowed - we are changing the property, not the reference
user.name = "Bob";
user.age = 30;
console.log("Mutated object : ", user);

// This is not allowed - reassigning the whole reference
// user = {name : "John", age : 35, isAdmin : true}; // ! ERROR 


/*
  ! var keyword : ->

  * var is function-scoped , not blocked-scoped
  * It can cause unexpected bugs
  * In TypeScript and modern JavaScript, use let or const instead.
  
  ? Syntax :
    var variableName : dataType = value;
*/

//Example

// this is why var is dangerous
function demostrateVar(){
    if(true){
        var x = 10; //? var leaks outside the if block
        let y = 20; //? let stays inside the if block
    }
    console.log(x); //?Works - var leaked out of the if block
    // console.log(y);//! Error - y is not defined here
    
    
}
console.log("----- var ------");

demostrateVar();


/*
  ! Type Inference : ->

  * TypeScript can infer types automatically from the assigned value
  * You do not always need to write the type explicitly

*/

let city = "Delhi" // inferred as string
let score = 100 // inferred as number
let isActive = true // inferred as boolean

console.log("------ Type Inference ------");
console.log(city,score,isActive);

// ! Note : Inference still prevents wrong assignments
// city = 123; // ! ERROR


/*
  ! Declaring without a value : ->

  * When you declare without a value , always add a explicit type.
  * Otherwise TypeScript assigns "any" which defeats the purpose of typescript.

*/

let productName : string;
let productPrice : number;
productName = "Pen";
productPrice = 5;
console.log("------ Declaring without a value ------");
console.log(productName,productPrice);

// ! Note - using before assignment causes an error
// console.log(productName,productPrice); // ! ERROR


/*
  ! Naming Conventions : ->

  * Use camelCase for variable names.
  * Use snake_case for function names.
  * Use PascalCase for class names, interfaces, and types.
*/

//? Example
// camelCase
let firstName = "John";
let lastName = "Doe";


// snake_case

function add_numbers(a: number, b: number) {
  return a + b;
}

// UPPER_SNAKE_CASE - for constants that truly fixed values
const MAX_RETRIES = 3;
const BASE_URL = "https://example.com";

// PascalCase

class User {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

console.log("-------- Naming convension --------- ");
console.log(firstName,lastName);
console.log(add_numbers(1,2));
console.log(MAX_RETRIES,BASE_URL);
console.log(new User("John","Doe"));
