/*
    ! High Order Functions in TypeScript
    * A high-order function is a function that : 
        * 1. Takes a function as an argument, or 
        * 2. Returns a function as its result
    
    * TypeScript types all of these precisely
*/

export {};

//? 1. Function that take functions
//* The classic built-in high-order functions

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//* map - transforms each element
const doubled: number[] = numbers.map((n): number => n * 2);

// * filter — keeps matching elements
const evens: number[] = numbers.filter((n): boolean => n % 2 === 0);

// * reduce — accumulates a result
const total: number = numbers.reduce((acc, n): number => acc + n, 0);

// * find — returns first match
const firstOver5: number | undefined = numbers.find((n) => n > 5);

// * every / some
const allPositive: boolean = numbers.every((n) => n > 0);
const hasEven: boolean = numbers.some((n) => n % 2 === 0);

console.log("--- Built-in Higher Order Functions ---");
console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Total:", total);
console.log("First over 5:", firstOver5);
console.log("All positive:", allPositive);
console.log("Has even:", hasEven);

//? 2. Custom Higher Order Functions

type Predicate<T> = (value: T) => boolean;
type Transformer<T, R> = (value: T) => R;
type Reducer<T, R> = (accumulator: R, current: T) => R;

//* Custom filter
function myFilter<T>(array: T[], predicate: Predicate<T>): T[] {
  const result: T[] = [];
  for (const item of array) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

// * Custom map
function myMap<T, R>(array: T[], transform: Transformer<T, R>): R[] {
  const result: R[] = [];
  for (const item of array) {
    result.push(transform(item));
  }
  return result;
}

// * Custom reduce
function myReduce<T, R>(
  array: T[],
  reducer: Reducer<T, R>,
  initialValue: R,
): R {
  let accumulator = initialValue;
  for (const item of array) {
    accumulator = reducer(accumulator, item);
  }
  return accumulator;
}
console.log("\n--- Custom Higher Order Functions ---");
const users = [
  { name: "Manjit", age: 22, role: "admin" },
  { name: "Kumar", age: 17, role: "user" },
  { name: "Alice", age: 30, role: "admin" },
  { name: "Bob", age: 15, role: "user" },
];

const adults = myFilter(users, (u) => u.age >= 18);
const names = myMap(users, (u) => u.name);
const totalAge = myReduce(users, (acc, u) => acc + u.age, 0);

console.log(
  "Adults:",
  adults.map((u) => u.name),
);
console.log("Names:", names);
console.log("Total age:", totalAge);

//? 3. Function Composition
//* Combine multiple functions into one pipeline

type UnaryFn<T> = (value: T) => T;

function compose<T>(...fns: UnaryFn<T>[]): UnaryFn<T> {
  // * Apply functions RIGHT to LEFT
  return (value: T) => fns.reduceRight((acc, fn) => fn(acc), value);
}

function pipe<T>(...fns: UnaryFn<T>[]): UnaryFn<T> {
  // * Apply functions LEFT to RIGHT
  return (value: T) => fns.reduce((acc, fn) => fn(acc), value);
}

const trim = (s: string): string => s.trim();
const toLower = (s: string): string => s.toLowerCase();
const removeSpaces = (s: string): string => s.replace(/\s+/g, "-");
const addPrefix = (s: string): string => `post-${s}`;

const createSlug = pipe(trim, toLower, removeSpaces, addPrefix);
const createSlugReverse = compose(addPrefix, removeSpaces, toLower, trim);

console.log("\n--- Function Composition ---");
console.log(createSlug("  Hello World TypeScript  "));
console.log(createSlugReverse("  Hello World TypeScript  "));

//? 4. Currying
//* Convert a function that takes multiple arguments into a series of functions that each take a single argument

// Non-curried
function addThreeArgs(a: number, b: number, c: number): number {
  return a + b + c;
}
// Curried
function curriedAdd(a: number) {
  return (b: number) => {
    return (c: number): number => {
      return a + b + c;
    };
  };
}
// * Typed curry helper
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => fn(a, b);
}
const multiply = (a: number, b: number): number => a * b;
const curriedMultiply = curry(multiply);

const double = curriedMultiply(2); // pre-applied first arg
const triple = curriedMultiply(3);
const tenTimes = curriedMultiply(10);

console.log("\n--- Currying ---");
console.log("Curried add:", curriedAdd(1)(2)(3));
console.log("Double 5:", double(5));
console.log("Triple 5:", triple(5));
console.log("Ten times 5:", tenTimes(5));

// * Practical currying
const greetWith = curry(
  (greeting: string, name: string) => `${greeting}, ${name}!`,
);

const sayHello = greetWith("Hello");
const sayHi = greetWith("Hi");
const sayGoodMorning = greetWith("Good Morning");

console.log(sayHello("Manjit"));
console.log(sayHi("Kumar"));
console.log(sayGoodMorning("Alice"));

//? 5. Momoization
//* Momoization caches function results
//* Same arguments = return cached result instead of recomputing

function memoize<Args extends unknown[], Return >(
    fn : (...args:Args) => Return
):(...args:Args)=>Return{
    const cache = new Map<string,Return>();
    return (...args: Args): Return => {
      const key = JSON.stringify(args);

      if (cache.has(key)) {
        console.log(`  Cache hit for: ${key}`);
        return cache.get(key)!;
      }

      const result = fn(...args);
      cache.set(key, result);
      console.log(`  Computed for: ${key}`);
      return result;
    };
}

function expensiveCalculation(n: number): number {
    // * Simulating expensive work
    let result = 0;
    for (let i = 0; i <= n; i++) result += i;
    return result;
  }
  
  const memoizedCalc = memoize(expensiveCalculation);
  
  console.log("\n--- Memoization ---");
  console.log("Result:", memoizedCalc(100));  // computed
  console.log("Result:", memoizedCalc(100));  // cache hit
  console.log("Result:", memoizedCalc(200));  // computed
  console.log("Result:", memoizedCalc(200));  // cache hit