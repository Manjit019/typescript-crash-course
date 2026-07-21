/*
    ! Object Types
    * Objects are the most common data structure in TypeScript
    * 
    ? This file covers advanced object typing patterns
*/

export {};

//? 1.Object Type Annotations

//* Inline object type
const point: { x: number; y: number } = { x: 10, y: 20 };

//* Type alias - preferred for reuse
type Point = { x: number; y: number };
type Point3D = Point & { z: number };

const origin: Point = { x: 0, y: 0 };
const space: Point3D = { x: 1, y: 2, z: 3 };

console.log("--- Object Type Annotations ---");
console.log(point, origin, space);

//? 2.Index Signature
//* When object keys are dynamic but values have a known type

type StringMap = { [key: string]: string };
type NumberMap = { [key: string]: number };
type FlexibleMap = { [key: string]: string | number | boolean };

const headers: StringMap = {
  "Content-Type": "application/json",
  Authorization: "Bearer token123",
  Accept: "application/json",
};
const scores: NumberMap = {
  math: 95,
  science: 88,
  english: 91,
};

console.log("\n--- Index Signatures ---");
console.log(headers["Content-Type"]);
console.log(scores["math"]);

// * Adding entries dynamically
headers["X-Request-ID"] = "req_001";
scores["history"] = 78;
console.log("Added header:", headers["X-Request-ID"]);

// * Index signature with known fixed properties
type ConfigMap = {
  [key: string]: unknown;
  version: number; // * known fixed property
  name: string; // * known fixed property
};

const config: ConfigMap = {
  version: 1,
  name: "MyApp",
  debug: true, // * dynamic
  timeout: 5000, // * dynamic
};

console.log("\n--- Mixed Index + Fixed ---");
console.log(config);

//? 3. Record Type
//* Record<K, T> is a built-in type that maps keys of type K to values of type T
//* It is the cleaner alternative to index signature
//* Keys can be a union of string literals

type Role = "admin" | "user" | "moderator";
type Permission = "read" | "write" | "delete";

// Each role maps to an array of permissions
type RolePermissions = Record<Role, Permission[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read"],
  moderator: ["read", "write"],
};

console.log("\n--- Record Type ---");
console.log("Admin permissions:", permissions.admin);
console.log("User permissions:", permissions.user);

// Record with string keys
type CountryCode = Record<string, string>;

const countryCodes: CountryCode = {
  IN: "India",
  US: "United States",
  UK: "United Kingdom",
  DE: "Germany",
};
console.log("Country:", countryCodes["IN"]);

//? 4. Nested Objects and Deep Readonly

type Address = {
  street: string;
  city: string;
  country: string;
};

type UserProfile = {
  id: number;
  name: string;
  address: Address;
  preferences: {
    theme: "light" | "dark";
    language: string;
    notifications: boolean;
  };
};
const profile: UserProfile = {
  id: 1,
  name: "Manjit Kumar",
  address: {
    street: "123 Main St",
    city: "New Delhi",
    country: "India",
  },
  preferences: {
    theme: "dark",
    language: "en",
    notifications: true,
  },
};

console.log("\n--- Nested Objects ---");
console.log("Name:", profile.name);
console.log("City:", profile.address.city);
console.log("Theme:", profile.preferences.theme);

//? 5. Object Destructuring with types
// * Destructure with type annotations

const {
  name,
  address: { city },
} = profile;
console.log("Name:", name);
console.log("City:", city);

// * Rename while destructuring
const { name: userName, id: userId } = profile;
console.log("User:", userName, "ID:", userId);

//* Default values in destructuring
type Settings = {
  theme?: string;
  fontSize?: number;
  debug?: boolean;
};
const userSettings: Settings = { theme: "dark" };
const { theme = "light", fontSize = 16, debug = false } = userSettings;
console.log("\n--- Destructure with Defaults ---");
console.log(theme, fontSize, debug);

//? 6. Spread and Object Composition

type BaseConfig = {
  host: string;
  port: number;
};

type DatabaseConfig = BaseConfig & {
  database: string;
  username: string;
  password: string;
};

const defaultConfig: BaseConfig = {
  host: "localhost",
  port: 5432,
};
//* build up config with spread
const dbConfig: DatabaseConfig = {
  ...defaultConfig,
  database: "myapp",
  username: "admin",
  password: "password",
};
console.log("\n--- Spread and Composition ---");
console.log(dbConfig);

//Override specific fields
const productionConfig: DatabaseConfig = {
  ...dbConfig,
  host: "prod.db.com",
  password: "secret",
};
console.log("Production host:", productionConfig.host);

//? 7.Object Utility Functions
//* Working with objects in a typed way

function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

console.log("\n--- Object Utilities ---");
const picked = pick(profile, ["id", "name"]);
console.log("Picked:", picked);

const withoutAddress = omit(profile, ["address"]);
console.log("Without address:", withoutAddress);