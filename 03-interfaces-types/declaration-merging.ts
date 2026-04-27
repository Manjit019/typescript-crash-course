/*
    ! Declaration Merging : ->

    * Declaration merging is when TypeScript combines two declarations
    * with the same name into a single defination
    * Only works with interfaces - not type aliases
*/
export {};

//! Basic Declaration Merging

// * First declaration
interface Window {
  title: string;
}

// * Second declaration — merged with the first
interface Window {
  width: number;
  height: number;
}

// * Result: Window has all three properties
const appWindow: Window = {
  title: "TypeScript App",
  width: 1920,
  height: 1080,
};

console.log("--- Basic Merging ---");
console.log(appWindow);

//! Merging across Multiple Declarations

interface Plugin {
  name: string;
  version: string;
}

interface Plugin {
  install: () => void;
}

interface Plugin {
  uninstall: () => void;
  isActive: boolean;
}

// * All three declarations merged — Plugin has all fields
const plugin: Plugin = {
  name: "TypeScript Plugin",
  version: "1.0.0",
  install: () => console.log("Installing plugin..."),
  uninstall: () => console.log("Uninstalling plugin..."),
  isActive: true,
};

console.log("\n--- Multi-Declaration Merging ---");
plugin.install();
console.log("Active:", plugin.isActive);

//! Real world use - Extending Third-party Library Types
// * The most common real-world use of declaration merging
// * Adding custom properties to existing library types

// ? Example: Extending Express Request type in a real project
interface Request {
  url: string;
  method: string;
}

//  Extend with custom fields — common pattern in Express apps
interface Request {
  user?: {
    id: number;
    name: string;
    role: string;
  };
  requestId?: string;
  startTime?: number;
}

// * Now Request has both the original and custom fields
const request: Request = {
  url: "/api/users",
  method: "GET",
  user: {
    id: 1,
    name: "Manjit",
    role: "admin",
  },
  requestId: "req_abc123",
  startTime: Date.now(),
};

console.log("\n--- Extending Third-Party Types ---");
console.log("URL:", request.url);
console.log("User:", request.user?.name);
console.log("Request ID:", request.requestId);

//! Merging with optional properties
interface AppSettings {
  theme: "light" | "dark";
  language: string;
}

interface AppSettings {
  notifications?: boolean;
  autoSave?: boolean;
}

interface AppSettings {
  fontSize?: number;
  fontFamily?: string;
}

const settings: AppSettings = {
  theme: "dark",
  language: "en",
  notifications: true,
  fontSize: 16,
};

console.log("\n--- Merging Optional Properties ---");
console.log(settings);

//! Why type aliases cannot merge

// ! This would cause an error:
// type Widget = { name: string };
// type Widget = { version: string }; // ERROR — Duplicate identifier 'Widget'

// * With type aliases, you must use intersection instead
type WidgetBase = { name: string };
type WidgetExtended = WidgetBase & { version: string };

const widget: WidgetExtended = {
  name: "Button",
  version: "2.0",
};

console.log("\n--- Type Alias Alternative ---");
console.log(widget);

//! Merging Rules
// * RULE 1: All members of each declaration must be non-conflicting
// * RULE 2: If a function member is defined in multiple interfaces,
// *         each one becomes an overload — later declarations have higher priority

interface Converter {
  convert(value: string): number;
}

interface Converter {
  convert(value: number): string;
}

// * Both overloads are available
const converter: Converter = {
  convert(value: any): any {
    if (typeof value === "string") return parseInt(value);
    return value.toString();
  },
};

console.log("\n--- Merged Function Overloads ---");
console.log("String to number:", converter.convert("42"));
console.log("Number to string:", converter.convert(42));