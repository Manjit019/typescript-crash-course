/*
    ! Interface in TypeScript

    * An interface defines the shape of an object
    * It describes what properties and methods an object must have
    * Interfaces are purely a typescript concept - removed at compile time
    * Use the "interface" keyword to create an interface

*/

export {};

//!Basic

interface User{
    name : string;
    age : number;
    email : string;
    isActive : boolean;
}

const user1:User = {
    name : "Manjit",
    age : 22,
    email : "manjit@k.com",
    isActive : true
}

console.log("========== Basic Interface ==========");
console.log(user1);

// ! Missing properties cause errors
// const user2: User = { name: "Kumar", age: 25 }; // ERROR — email and isActive missing

// ! Extra properties cause errors when directly assigned
// const user3: User = { name: "Alice", age: 30, email: "a@a.com", isActive: true, role: "admin" }; // ERROR


// ? Interface with Methods
// * Interfaces can define methods that an object must implement

interface Animal {
    name : string;
    age : number;
    makeSound : () => string;  // method with no parameter
    move : (distance : number) => void; // method with parameter
    describe() : string; // Alternative method syntax
}

const dog: Animal = {
    name : "Rex",
    age : 3,
    makeSound : () => "Woof Woof",
    move : (distance : number) => console.log(`Moved ${distance} meters`),
    describe() {
        return `My name is ${this.name} and I am ${this.age} years old`;
    },
}

console.log("========= Interface with Methods ===========");
console.log(dog.makeSound());
dog.move(10);
console.log(dog.describe());

// ! Interface with function types
// * Interface can describe the shape of a function

interface MathOperation {
    (a:number,b:number ) : number;
}
interface StringFormatter {
    (input : string,prefix : string) : string;
}

const add:MathOperation = (a,b) => a + b;
const multiply:MathOperation = (a,b) => a * b;
const format: StringFormatter = (input,prefix) => `${prefix} ${input}`;

console.log("========= Interface with function types ===========");
console.log(add(2,3));
console.log(multiply(2,3));
console.log(format("Hello","Hi"));


// ! Interface for classes
/*
    * Interfaces are very commonly used with classes
    * A class "implements" an interface - must provide all members
*/
interface Printable {
    print : () => void;
    getContent : () => string;
}
interface Saveable {
    save : () => boolean;
    load : (id : number) => boolean;
}

// A class can implements multiple interfaces
class Document implements Printable,Saveable {
    private content : string;

    constructor(content : string){
        this.content = content;
    }
    print(): void {
        console.log("Printing : ",this.content);
    }
    getContent() : string{
        return this.content;
    }
    save() : boolean{
        console.log("Saving document...");
        return true;
    }
    load(id : number):boolean{
        console.log(`Loading document ${id}....`);
        return true;
    }
}

console.log("\n=========== Interface with classes ==========");
const doc = new Document("Hello World");
doc.print();
console.log("Content : ",doc.getContent());
console.log("Saved : ",doc.save());
console.log("Loaded : ",doc.load(1));


// ! Nested Interfaces
// * Interfaces can reference other interfaces

interface Address {
    street : string;
    city : string;
    country : string;
    postalCode : string;
}
interface ContactInfo{
    email : string;
    phone? : string;
    address : Address; // nested interface
}

interface Employee{
    id : number;
    name : string;
    role : string;
    contact : ContactInfo; // nested interface
}

const employee: Employee = {
    id : 1,
    name : "Manjit",
    role : "Developer",
    contact : {
        email : "manjit@k.com",
        address : {
            street : "123 Main St",
            city : "Bihar",
            country : "India",
            postalCode : "844508"
        }
    }
}

console.log("\n============ Nested Interfaces ===========");
console.log(employee);
console.log("City : ",employee.contact.address.city);

// ! Indexable Interfaces
// * Interfaces can describe objects with dynamic keys
// * Called index signature

interface StringDictionary {
    [key : string] : string; // any string key maps to a string value
}
interface NumberMap{
    [key : string] : number;
}

const translations : StringDictionary = {
    hello : "namaste",
    goodbye : "alwida",
    thanks : "shukriya",
}

const scores:NumberMap = {
    maths : 95,
    science : 87,
    english : 72
}

console.log("\n========= Indexable Interfaces =========");
console.log(translations["hello"]);
console.log(scores["maths"]);

// add new keys dynamically
translations["sorry"] = "maffi";
console.log("Added : ",translations["sorry"]);


// ! Interface as function parameter

interface CreateUserOptions {
    name : string;
    email : string;
    role?: string;
    sendWelcomeEmail? : boolean;
}

function createUser(options : CreateUserOptions):User{
    const {email,name,role ="viewer",sendWelcomeEmail = true} = options;

    if (sendWelcomeEmail){
        console.log(`Sending welcome email to ${email}`);
    }

    return {
        name,
        email,
        age : 0 ,
        isActive : true
    }

}
console.log("\n========== Interface as Parameter ========");
const newUser = createUser({
    name : "Manjit",
    email : "manjit@k.com",
    role : "admin",
});
console.log("Created : ",newUser);


