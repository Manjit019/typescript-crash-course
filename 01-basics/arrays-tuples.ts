/*
    ! Basic Arrays : ->

    * Arrays hold multiple values of the same type
    * Arrays are zero-indexed
    * Arrays are mutable
    
    ? Syntax : 
     1. type[]
     2. Array<type> <- generic syntax
  
*/
export {};

//syntax 1 : type[]

let fruits: string[] = ["apple", "banana", "mango"];

//syntax 2 : Array<type>
let scores:Array<number> = [95, 87, 72, 100];

//mixed array
let mixed: Array<string | number> = ["Alice", 25, "Bob", 30];

console.log("======== Basic Arrays ========");
console.log(fruits);
console.log(scores);
console.log(mixed);


/*
   ! Array Methods ->
*/

// * push - add to end
fruits.push("kiwi");
console.log("======= Array Methods ===========");
console.log("After push : ",fruits);

// * pop - remove from end
fruits.pop();
console.log("After pop : ",fruits);

// * map - transform each element
const upperFruit = fruits.map((fruit) => fruit.toUpperCase());
console.log("Mapped : ",upperFruit);


// * filter - keep elements that match condition
const highScore = scores.filter((score) => score >= 90);
console.log("High Scores : ", highScore);

// * find - get first match
const firstHighScore = scores.find((score) => score >= 90);
console.log("First High Score : ",firstHighScore);

// * reduce - accumulate values
const totalScore = scores.reduce((acc,score) => acc + score, 0);
console.log("Total Score : ",totalScore);

// * includes - check if value exists
console.log("Has apple : ",fruits.includes("apple"));

// * indexOf - get position of value
console.log("Index of apple : ",fruits.indexOf("apple"));

// * sort - sort elements
scores.sort((a,b) => a - b);
console.log("Sorted Scores : ",scores);

// * Arrays can hold Objects too - TypeScript check the shape of the object

const users : {name : string,age : number}[] = [
    {name : "Alice", age : 25},
    {name : "Bob", age : 30},
]

console.log("\n ============= Array of Objects ============");
users.forEach((user)=>{
    console.log(`${user.name} is ${user.age} years old.`);
});

// ! Wrong shape is caught immediately
// users.push({ name: "Bob" }); // ERROR — age is missing

/*
    ! Readonly Arrays ->

    * readonly prevents modifying the array after creation
    * Good for data that should never changed
*/

const colors: readonly string[] = ["red", "green", "blue"];
// colors.push("yellow"); // ! ERROR
// colors[0] = "yellow"; // ! ERROR
console.log("\n ============= Readonly Arrays ============");
console.log(colors);


/*
    ! Multi-dimensional Arrays ->

    * Arrays can contain other arrays

*/

const matrix : number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  console.log("\n======== Multi-dimensional Arrays =========");
  console.log(matrix);
  console.log("Row 0 : ",matrix[0]);
  console.log("Element [1][2] : ",matrix[1][2]);
  


/*
  ! Tuples ->

  * Tuples are arrays with  a fixed number of elements
  * Each element have a specific type
  * Order matters

*/
let person : [string,number,boolean] = ["Manjit", 25, true];
console.log("========= Tuples =========");
console.log(person);
console.log("Name : ",person[0]);
console.log("Age : ",person[1]);
console.log("Active : ,",person[2]);

// ! Type at each position is enforced
// person[0] = 42;    // ERROR — position 0 must be string
// person[1] = "22";  // ERROR — position 1 must be number

/*
  ! Named Tuples ->

  * Named tuples make the meaning of each position clear
  * Much more readable than unnamed tuples
*/

let employee : [name : string,role : string,salary : number] = [
    "Manjit", "Developer", 75000
]
console.log("\n ============ Named tuples =========");
console.log(employee);

// ! tuple with optional element

let coordinate : [number,number,number?] = [10,20]; // ? coordinate[2] is optional

console.log("\n ============ Optional tuple element =========");
console.log("2D coordinate : ",coordinate);

coordinate = [10,20,30];
console.log("3D coordinate : ",coordinate);

/*
    ! Tuple vs Arrays =>

    * Array - same type,any length
    * tuple - mixed types , fixed length, fixed order
    
    ? Use arrays when : all items are the same type and count varies
    ? Use tuples when : you have a fixed structure like [id,name,active]

*/

console.log("\n ========== tuple vs array =========");
const rgb : [number,number,number] = [255,120,0] // fixed 3 numbers
console.log("RGB : ",rgb);

const tags:string[] = ['typescript','javascript','python']; // variable length
console.log("Tags : ",tags);