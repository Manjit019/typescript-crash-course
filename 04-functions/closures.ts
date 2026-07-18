/* 
    ! Closures in TypeScript :

    * A closure is a function that "remembers" variables from its surrounding scope
    * TypeScript types closures the same as regular functions
    * 

*/

//? 1. Basic Closure

function createCounter(start: number = 0) {
  let count = start; // count is captured in the closure

  return {
    increment: (): number => ++count,
    decrement: (): number => --count,
    reset: (): number => {
      count = start;
      return count;
    },
    value: (): number => count,
  };
}

console.log("--- Basic Closure ---");
const counter = createCounter(10);
console.log("Value:", counter.value()); // 10
console.log("Increment:", counter.increment()); // 11
console.log("Increment:", counter.increment()); // 12
console.log("Decrement:", counter.decrement()); // 11
console.log("Reset:", counter.reset());

// * Each call to createCounter creates its OWN closure
const counterA = createCounter(0);
const counterB = createCounter(100);

counterA.increment();
counterA.increment();
counterB.increment();

console.log("Counter A:", counterA.value()); // 2
console.log("Counter B:", counterB.value()); // 101

//? 2. Closures for private state
//* Closures simultate private variable in typescript

function createBankAccount(initialBalance: number) {
  // balance is private — not accessible from outside
  let balance: number = initialBalance;
  const transactions: { type: string; amount: number }[] = [];

  return {
    deposit(amount: number): void {
      if (amount <= 0) throw new Error("Deposit must be positive");
      balance += amount;
      transactions.push({ type: "deposit", amount });
      console.log(`Deposited: $${amount} | Balance: $${balance}`);
    },

    withdraw(amount: number): void {
      if (amount <= 0) throw new Error("Withdrawal must be positive");
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      transactions.push({ type: "withdrawal", amount });
      console.log(`Withdrew: $${amount} | Balance: $${balance}`);
    },

    getBalance(): number {
      return balance;
    },

    getHistory(): typeof transactions {
      return [...transactions]; // * return a copy — protect original
    },
  };
}

console.log("\n--- Private State with Closure ---");
const account = createBankAccount(1000);
account.deposit(500);
account.withdraw(200);
account.deposit(100);
console.log("Final balance:", account.getBalance());
console.log("History:", account.getHistory());

//? 3. Closures for configuration
//* Create pre-configured function variants

function createLogger(
  prefix: string,
  level: "info" | "warn" | "error" = "info",
) {
  const timestamp = (): string => new Date().toISOString();

  return {
    log: (message: string): void => {
      console.log(
        `[${timestamp()}] [${level.toUpperCase()}] [${prefix}] ${message}`,
      );
    },
    child: (childPrefix: string) => {
      return createLogger(`${prefix}:${childPrefix}`, level);
    },
  };
}

console.log("\n--- Closure for Configuration ---");
const appLogger = createLogger("APP");
const dbLogger = createLogger("DB", "info");
const errorLogger = createLogger("APP", "error");

appLogger.log("Server started");
dbLogger.log("Connected to database");
errorLogger.log("Something went wrong");

const authLogger = appLogger.child("AUTH");
authLogger.log("User logged in");

//? 4. Closure with generics
//* Closures work perfectly with generic types

function createStack<T>() {
  const items: T[] = [];

  return {
    push: (item: T): void => {
      items.push(item);
    },
    pop: (): T | undefined => {
      return items.pop();
    },
    peek: (): T | undefined => {
      return items[items.length - 1];
    },
    size: (): number => items.length,
    isEmpty: (): boolean => items.length === 0,
    toArray: (): T[] => [...items],
  };
}

console.log("\n--- Generic Closure ---");
const numberStack = createStack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log("Peek:", numberStack.peek());
console.log("Pop:", numberStack.pop());
console.log("Size:", numberStack.size());
console.log("Array:", numberStack.toArray());

const stringStack = createStack<string>();
stringStack.push("TypeScript");
stringStack.push("JavaScript");
console.log("String stack:", stringStack.toArray());