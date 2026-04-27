/*  
    ! Extending Interfaces :

    * Interfaces can extend other interfaces
    * The child interface inherits all properties from parent
    * The child can add new properties on top
    * Use the "extends" keyword
*/
export {};

// ! Basic Interface Extension

interface BaseEntity {
    id : number;
    createdAt : string;
    updatedAt : string;
}

// User extends BaseEntity - gets id,createdAt and updatedAt for free
interface User extends BaseEntity {
    name : string;
    email : string;
    age : number;
}

// Must provide all the properties from User and BaseEntity
const user:User = {
    id : 1,
    createdAt : "2026-04-21",
    updatedAt : "2026-04-31",
    name : "Manjit",
    email : "manjit@k.com",
    age : 22
}
console.log("\n====== Basic Extension =========");
console.log(user);


// ! Multi-Level Extension
// * Interfaces can form an inheritance chain

interface Vehicle{
    make : string;
    model : string;
    year : number;
    fuelType : string;
}

interface Car extends Vehicle {
    doors : number;
    trunkCapacity : number;
}

interface ElectricCar extends Car {
    batteryCapacity : number;
    chargeTime : number;
    range : number;
}


const electricCar : ElectricCar = {
    make : "Tesla",
    model : "Model S",
    year : 2022,
    fuelType : "Electric",
    doors : 4,
    trunkCapacity : 500,
    batteryCapacity : 100,
    chargeTime : 5,
    range : 500
}
console.log("\n====== Multi-Level Extension =========");
console.log(electricCar);
console.log(`${electricCar.make} ${electricCar.model} - Range : ${electricCar.range}km`);




// ! Extending Multiple Interfaces
// * An interface can extend multiple interfaces at once

interface HasTimestamps {
    createdAt : string;
    updatedAt : string;
}

interface HasSoftDelete {
    deletedAt : string;
    isDeleted : boolean;
}

interface HasAudit {
    createdBy : string;
    updatedBy : string;
}

interface BlogPost extends HasTimestamps,HasSoftDelete,HasAudit{
    id : number;
    title : string;
    content : string;
    tags : string[];
    published : boolean;
}

const post : BlogPost = {
    id : 1,
    title : "My First Post",
    content : "This is my first post",
    tags : ["typescript","javascript","python"],
    published : true,
    createdAt : "2026-04-21",
    updatedAt : "2026-04-21",
    deletedAt : "2026-04-21",
    isDeleted : false,
    createdBy : "Manjit",
    updatedBy : "Manjit"
}

console.log("\n=========== Multiple Extension ===========");
console.log("Title : ",post.title);
console.log("Tags : ",post.tags);
console.log("Deleted : ",post.isDeleted);
console.log("Created by : ",post.createdBy);
console.log("Last Upadated : ",post.updatedAt);


// ! Overriding properties in extension
// * Child interface can override a parent property
// * But only to a more specific(narrow) type

interface Shape {
    color : string;
    area : () => number;
}

interface Circle extends Shape {
    // Narrowing string to a specific union
    color : "red" | "blue" | "green";
    radius : number;
    area : () => number;
}

const circle : Circle = {
    color : 'blue',
    radius : 10,
    area : () => Math.PI * circle.radius * circle.radius
}

console.log("\n======= Overriding  in Extension  ===========");
console.log("Circle area : ",circle.area().toFixed(2));
console.log("Color : ",circle.color);



// ! Extending with additional methods 

interface Repository<T> {
    findById : (id : number) => T | null;
    findAll : () => T[];
    save : (entity : T) => T;
    delete : (id : number ) => boolean;
}

interface UserRepository extends Repository<User> {
    // Extra methods specific to users
    findByEmail : (email : string) => User | null;
    findByRole : (role : string) => User[];
}

const userRepo : UserRepository = {
    findById : (id ) => (id === 1 ? user : null),
    findAll : () => [user],
    save : (u) => u,
    delete : (id) => {
        console.log("Deleted user : ",id);
        return true;
    },
    findByEmail : (email ) => (email === user.email ? user : null),
    findByRole : (role ) => (role === "admin" ? [user] : [])
}
console.log("\n========= Extended with methods =========");
console.log("Find by Id : ", userRepo.findById(1)?.name);
console.log("Find by email : ",userRepo.findByEmail("manjit@k.com")?.name);
console.log("All users : ",userRepo.findAll().length);


// ! Interface extension vs type Intersection
// * Both achieve similar results but different syntax

// using interface extends
interface BaseA {
    x : number;
}
interface ExtendedA extends BaseA {
    y : number;
}

// using type intersection
type BaseB = {
    x : number;
}
type ExtendedB = BaseB & {
    y : number;
}

const objA:ExtendedA = { x : 1, y : 2 };
const objB:ExtendedB = { x : 1, y : 2 };

console.log("\n========= Extension vs Intersection =========");
console.log("Interface extends : ",objA);
console.log("Type Intersection : ",objB);

// ? Key differences:
// * interface extends — gives better error messages
// * type intersection — more flexible, works with unions too
// * For object shapes, both work well