/*
    ! Basic typed functions =>
    
    * Parameters and return types should be explicitly typed
    * TypeScript will catch mismatched before you run the code
*/
export {};

function add(a: number, b: number): number {
  return a + b;
}
console.log("======== Basic Function =========");
console.log("Sum : ",add(10,20));

// ! Wrong argument type
// add("5", 10); // ERROR — Argument of type 'string' is not assignable to 'number'

/*
    ! Arrow Functions =>

    * Arrow function work exactly the same as regular functions
    * Arrow functions are more concise and easier to read
    * just different syntax
*/

const multiply = (x: number, y: number): number =>{
    return x * y;
}
const square = (x: number): number => x * x; 

console.log("======== Arrow Function =========");
console.log("Product : ",multiply(10,20));
console.log("Square : ",square(25));

/*
    ! Optional parameters =>

    * Add ? to make a parameter optional
    * Optional parameters must come after required ones
*/

function greet(name : string,greeting?:string):string{
    return `${greeting ?? "Hello"}, ${name}!`;
}
console.log("\n======= Optional Parameters ==========");
console.log(greet("Manjit"));
console.log(greet("Manjit","Hii"));


/*
    ! Default parameters =>

     * Default parmeters provide a fallback value
     * They are used when the argument si not passed or is undefined
*/

function createUser(name : string,role : string = "viewer"):string{
    return `${name} is a ${role}`;
}
console.log("\n======= Default Parameters ==========");
console.log(createUser("Manjit"));
console.log(createUser("Manjit","admin"));


/*
    ! Rest parameters =>

    * Rest parameters are used to collect multiple arguments into an array
    * Must be the last parameter in a function
    * Type is always an array
*/

function sumAll(...numbers : number[]):number{
    return numbers.reduce((total,num)=> total + num,0);
}
console.log("\n======= Rest Parameters ===========");
console.log("Sum : ",sumAll(1,2,3,4,5,6,7));
console.log("Sum : ",sumAll(10,20));


/*
    ! Void return type =>

    * void means the function doesn't return a value
    * used for functions that only produce side effects
*/

function logMessage(message : string):void{
    console.log(`[LOG] : ${message}`);
}
console.log("\n======= Void Return Type ===========");
logMessage("Hello! TS is great");


/*
    ! Never return type =>

    * never means the function NEVER returns
    * used for functions that always throw or run forever
*/

function throwError(message : string):never{
    throw new Error(message);
}
// * never is also used in exhaustive checks (covered in advanced types)

console.log("\n======= Never Return Type ===========");
try {
    throwError("Something went wrong");
} catch (err) {
    console.log("Caught : ",(err as Error).message);
}


/*
    ! Function Types ->

    * You can type a variable to hold a specific function signature
    * Userful for callbacks and higher order functions
*/

type MathOperation = (x: number, y: number) => number;

const divide : MathOperation = (x,y) => x / y;
const substract : MathOperation = (x,y) => x - y;
console.log("=========== Function types ==========");
console.log("Divide : ",divide(10,2));
console.log("Substract : ",substract(10,4));

// passing functions as arguments 
function calculate(x : number,y : number,operation : MathOperation):number{
    return operation(x,y);
}
console.log("=========== Passing functions as arguments ==========");
console.log("Divide : ",calculate(10,2,divide));
console.log("Substract : ",calculate(10,4,substract));


/*
    ! Callbacks -->

    * Callbacks are functions that are passed as arguments to other functions
*/

function fetchData(
    url :string,
    onSuccess : (data : string) => void,
    onError : (error : string) => void
):void{
    // simulating a fetch
    if(url.startsWith("https://")){
        onSuccess(`Data from ${url}`);
    }
    else{
        onError("Invalid URL - must start with https://");
    }
}
console.log("\n========== Callbacks ===========");
fetchData(
    "api.example.com",
    (data) => console.log("Success : ",data),
    (error) => console.log("Error : ",error)
);
fetchData(
    "https://api.example.com",
    (data) => console.log("Success : ",data),
    (error) => console.log("Error : ",error)
);


/*
    ! Anonymous functions =>

    * TypeScript can infer the types inside callbacks automatically
    * this is called contextual typing
    
*/
const numbers = [1,2,3,4,5];

// typescript konws n is a number because numbers is number[]
const doubled = numbers.map((x) => x * 2);

console.log("\n========== Anonymous functions ===========");
console.log("Doubled : ",doubled);


