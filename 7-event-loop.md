7. Event Loop

The Event Loop is not part of JavaScript itself, but rather a part of the
browser (or Node.js) runtime environment.

### 7.1. Call Stack (V8)

The call stack is a mechanism for an interpreter (like the JavaScript
interpreter in a web browser) to keep track of its place in a script that
calls multiple functions.

```javascript
function first() {
  // ...
}

function second() {
  // ...
}

function third() {
  // ...
}
```

**Stack Overflow Example:**

```javascript
function factorial(n) {
  if (n < 2) {
    return 1;
  }
  return n * factorial(n - 1); // Recursive call
}

factorial(500000000); // This would likely cause a stack overflow
```

A "stack overflow" occurs when the call stack exceeds its maximum size,
typically due to excessive recursion without a proper base case.

### 7.2. Event Loop Example

```javascript
function log(value) {
  console.log(value);
}

log("start");

setTimeout(() => {
  log("timeout");
}, 3000);

log("end");
```

**Execution Steps:**

1. `log('start')` is pushed to the call stack, executed, and 'start' is logged.
2. `setTimeout` is pushed to the call stack. It registers the callback
   function (`() => { log('timeout') }`) with the Web APIs (or Node.js APIs)
   and is then popped from the stack. The timer starts.
3. `log('end')` is pushed to the call stack, executed, and 'end' is logged.
4. The call stack becomes empty.
5. After 3000 milliseconds, the `setTimeout` callback is moved from the Web
   APIs to the Task Queue.
6. The Event Loop continuously checks if the call stack is empty. When it
   is, it takes the first function from the Task Queue and pushes it onto the
   call stack.
7. `() => { log('timeout') }` is pushed to the call stack,
   `log('timeout')` is executed, and 'timeout' is logged.
8. The callback is popped from the stack.

**Output:**

1. `start`
2. `end`
3. `timeout` (after ~3 seconds)

### 7.3. Task Queue

Tasks from the queue are executed only after all functions in the call stack
have completed.

### 7.4. How tasks enter the queue

![[Loop2.png]]
