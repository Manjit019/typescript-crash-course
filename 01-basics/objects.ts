
/*
    ! Basic object type ->

    * Object hold key-value pairs
    * TypeScript checks the shape - property names and their types
*/
export {};

const user: {name : string,age :number,isAdmin : boolean} = {
    name : "Manjit",
    age : 22,
    isAdmin : true
}

console.log("========= Basic Object ===========");
console.log(user);
console.log("Name : ",user.name);

// ! Extra properties are not allowed
// const user2 = { name: "Kumar", age: 25, email: "k@k.com" }; // ERROR if typed strictly


/*
    ! Optional properties ->

    * Add ? to make a property optional
    * Optional means the property may or may not exists
*/

const product : {
    id : number;
    name:string;
    description ?: string //optional
    price : number;
} = {
    id : 1,
    name : "MacBook Pro",
    price : 2499
}

console.log("\n ============ Optional properties ==========");
console.log(product);
console.log("Description : ",product.description); // undefined


/*
    ! Readonly properties ->
    
    * readonly prevents a property form being changed after creation
    * Good for IDs, creation dates, fixed config values
*/

const config : {
    readonly apiUrl : string;
    readonly version : number;
    timeout : number;
} = {
    apiUrl : "https://api.example.com",
    version : 1.0,
    timeout : 5000
}
console.log("======= Readonly Properties ==========");
console.log(config);;

config.timeout = 3000 // allowed 
// config.apiUrl = "https://api.example.com/v2" // not allowed


/*
    ! Nested Objects =>

    * Objects can be nested inside other objects
*/

const student : {
    name : string;
    age : number;
    address : {
        city : string;
        country : string;
        pincode : number;
    }
} = {
    name : "Manjit",
    age : 22,
    address : {
        city : "Bihar",
        country : "India",
        pincode : 844508
    }
}

console.log("\n========== Nested Objects =========");
console.log(student);
console.log("city : ",student.address.city);


/*
    ! Object as function parameter ->
     
    * Funcitons can accept objects as parameters
    * TypeScript checks the shape of the passed object
*/

function displayUser(user : {name : string; age : number}):void{
    console.log(`Name : ${user.name} , Age : ${user.name}`);
}
console.log("========= Object as Parameter =========");
// displayUser({name : "Manjit", age : 22});
displayUser({age : 22, name : "Manjit"});
// ! Wrong shape causes error
// displayUser({ name: "Kumar" }); // ERROR — age is missing


/*
    ! Returning objects from functions =>
        * functions can return typed objects
*/

function createProduct(id:number,name : string,price : number):{id : number,name : string,price : number}{
    return {
        id,
        name,
        price
    }
}
console.log("\n========== Returning Objects ============");
const laptop = createProduct(1,"MacBook Pro",2499);
console.log(laptop);

/*
    ! Dynamic property access =>
    * Accessing properties dynamically with bracket notation
*/
const person = {
    name : "Manjit",
    age : 22,
    city : "Bihar"
}
const key = "name";
console.log("\n========== Dynamic Property Access ============");
console.log(person[key as keyof typeof person]); // "Manjit"

/*
    ? keyof - gets all keys of an object type as union
    ? typeof - gets the type of the person object
    * covered in depth inthe generics and advanced types topics
*/


/*
    ! Spreading Objects =>

    * Spread operator (...) can be used to copy properties from one object to another
*/

const baseUser = {name : "Manjit",age : 22};
const extendedUser = {...baseUser,role : "admin",isActive : true};

console.log("\n======= Object Spread =========");
console.log(extendedUser);

// ? Overriding properties with spread
const updatedUser = { ...baseUser,age : 20}; // age is overridden
console.log("Update age : ",updatedUser.age);


/*
    ! Destructuring Objects =>
    * Pull properties from an object and assign them to variables
*/

const {name,age} = person;
console.log("\n======= Object Destructuring =========");
console.log(name,age);

// Rename while destructuring
const {name : userName,age : userAge} = person;
console.log(userName,userAge);

// Default values while destructuring
const {description = "No description provided"} = product;
console.log("Description : ",description);
