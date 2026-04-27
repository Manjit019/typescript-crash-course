/*
    ! Readonly and Optional Properties ->

    * These are two very important modifiers in TypeScript interfaces
    ? readonly - property can not be changed after creation
    ? optional(?) - property may or may not exist
*/
export {};

// ! Optional properties
// * Add ? after the property name to make it optional
//* Optional means the value may be undefined

interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio?: string; // optional
  avatar?: string; //  optional
  website?: string; //  optional
  phoneNumber?: string; //  optional
}

//  Minimum required fields only
const minimalProfile: UserProfile = {
  id: 1,
  username: "manjit",
  email: "manjit@example.com",
};

//  Full profile with optional fields
const fullProfile: UserProfile = {
  id: 2,
  username: "kumar",
  email: "kumar@example.com",
  bio: "TypeScript developer",
  avatar: "https://avatar.example.com/kumar.jpg",
  website: "https://kumar.dev",
};

console.log("--- Optional Properties ---");
console.log("Minimal:", minimalProfile);
console.log("Full:", fullProfile);

//  Accessing optional properties safely
console.log("Bio:", minimalProfile.bio); // undefined
console.log("Bio:", fullProfile.bio); // "TypeScript developer"

//  Use optional chaining for nested optional values
console.log("Website length:", fullProfile.website?.length);

// ? Working with Optional Properties
// Always handle the undefined case for optional properties

function displayProfile(profile: UserProfile): void {
  console.log(`\nUser: ${profile.username}`);
  console.log(`Email: ${profile.email}`);

  // * Method 1: if check
  if (profile.bio) {
    console.log(`Bio: ${profile.bio}`);
  }

  // * Method 2: nullish coalescing
  console.log(`Website: ${profile.website ?? "Not provided"}`);

  // * Method 3: optional chaining + nullish coalescing
  console.log(`Phone: ${profile.phoneNumber ?? "Not provided"}`);
}

console.log("\n--- Handling Optional Properties ---");
displayProfile(minimalProfile);
displayProfile(fullProfile);

// ! Readonly Properties
// * readonly prevents a property from being reassinged
// * Great for IDs, creation dates , config values

interface DatabaseRecord {
  readonly id: number; // never change after creation
  readonly createdAt: string; // never modified
  name: string; // can be modified
  updatedAt: string; // will be updated
}

const record: DatabaseRecord = {
  id: 1,
  createdAt: "2025-01-01",
  name: "Original Name",
  updatedAt: "2025-01-01",
};

console.log("\n--- Readonly Properties ---");
console.log("Before:", record);

//  Can update non-readonly properties
record.name = "Updated Name";
record.updatedAt = "2025-06-01";
console.log("After update:", record);

// ! Cannot change readonly properties
// record.id = 99;          // ERROR — id is readonly
// record.createdAt = "..."; // ERROR — createdAt is readonly

// ! Readonly Objects
// * Readonly<T> makes all the properties of T readonly at once
// * very useful utility type

interface AppConfig {
  apiUrl: string;
  apiKey: string;
  timeout: number;
  maxRetries: number;
  debug: boolean;
}

const config: Readonly<AppConfig> = {
  apiUrl: "https://api.example.com",
  apiKey: "my-api-key",
  timeout: 5000,
  maxRetries: 3,
  debug: true,
};
console.log("\n---- Readonly<T> Utility ----");
console.log(config);

// ! None of these are allowed
//// config.apiUrl = "...";    // ERROR
//// config.debug = true;      // ERROR
//// config.timeout = 3000;    // ERROR

// ! Conbining Readonly and Optional

interface Product {
  readonly id: number; //  set once
  readonly sku: string; // set once
  name: string; //  updatable
  price: number; //  updatable
  description?: string; // optional and updatable
  readonly createdAt: string; //  set once
  updatedAt: string; //  updatable
  discountPrice?: number; //  optional and updatable
}

const product: Product = {
  id: 1,
  sku: "LAPTOP-001",
  name: "MacBook Pro",
  price: 2499,
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
};

console.log("\n--- Combined Readonly and Optional ---");
console.log(product);

//  Can update allowed fields
product.name = "MacBook Pro M3";
product.price = 2299;
product.discountPrice = 1999;
product.updatedAt = "2025-06-01";

console.log("Updated:", product);


// ! Requred<T> Utility type -Opposite of optional
// * Required<T> makes all optional properties required
// * opposite of Partial<T>

interface DraftPost{
    title : string;
    content?: string;
    tags ?: string[];
    published ?:boolean;
}

//  Required makes all fields mandatory
type PublishedPost = Required<DraftPost>;

const draft: DraftPost = {
  title: "My Post",
  //  content, tags, published are optional in draft
};

const published: PublishedPost = {
  title: "My Post",
  content: "Full content here...",
  tags: ["typescript"],
  published: true,
  // ? all fields required now
};

console.log("\n--- Required<T> Utility ---");
console.log("Draft:", draft);
console.log("Published:", published);

// ! Partial<T> - All Optional
// * Partial<T> makes all properties optional
// * opposite of Required<T>
// * Very useful for update/patch operations

interface FullUser{
    id : number;
    name : string;
    email : string;
    age : number;
    role : string;
}

//  For updates — you might only change some fields
type UpdateUserData = Partial<FullUser>;

function updateUser(id : number, updates : UpdateUserData):void{
    console.log(`Updating user ${id} with : `,updates);
}

//  Only pass the fields you want to update
updateUser(1, { name: "Manjit Kumar" });
updateUser(2, { email: "new@example.com", age: 25 });
updateUser(3, { role: "admin" });