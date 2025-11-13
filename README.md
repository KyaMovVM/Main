# Main Project Documentation

## 1. Project Overview

This project is a lightweight API service demonstrating the operation of Gitea, Act Runner, and Docker containers. The repository includes:

*   `.gitea/workflows/` – CI/CD configurations.
*   `ssh scripts/` – PowerShell / Bash scripts for managing SSH keys.
*   `Test‑VRChat.sh` – An example test harness.
*   `README.md` – This document.

## 2. Build and Testing

```bash
# Run local CI
act

# Pull NGINX image
docker pull nginx

# Run tests
./Test‑VRChat.sh
```

## 3. API Reference

All endpoints are located under the `/api` prefix.

### 3.1. API Endpoints Examples

| Request                    | Description                                            |
| :------------------------- | :----------------------------------------------------- |
| `GET /api/getUserProfile`  | Get user profile                                       |
| `GET /api/getUserSettings` | Get user settings                                      |
| `POST /api/updateUser`     | Update user data (invalidates cache for `['user']`) |

### 3.2. State Management

The client uses **Tanstack Query / SWR**. Cache keys look like: `['user']`.

#### Key Principles:

*   **Invalidation** – When data changes, the client automatically re-fetches all queries with the `['user']` key.
*   **Mutations** – POST/PUT operations update the cache via `invalidateCache('user')`.
*   **Optimistic Updates** – The UI updates immediately, and the server confirms the change.
*   **Retries** – Requests are automatically retried on errors.

### 3.3. HTTP Protocol

#### Request Structure Example:

```http
POST /login HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Content-Length: 26

login=user&password=qwerty
```

#### HTTP Methods:

*   `GET` – Retrieve a resource.
*   `POST` – Submit data to a specified resource.
*   `PUT` – Update an existing resource (idempotent).
*   `PATCH` – Partially update an existing resource (not idempotent).
*   `DELETE` – Delete a specified resource.

### 3.4. Server Response

```http
HTTP/1.1 200 OK
```

#### HTTP Status Codes:

| Code | Description   |
| :--- | :------------ |
| 1xx  | Informational |
| 2xx  | Success       |
| 3xx  | Redirection   |
| 4xx  | Client Error  |
| 5xx  | Server Error  |

### 3.5. API Example: Weather Service

Communication occurs via API.

**Method and URL:** `GET /weather`

**Query Parameters:**
*   `date-string`
*   `city-string`

**Response Body:**
```json
{
    "weather": [
        {
            "time": "string",
            "temperature": "string",
            "rainfall": "boolean"
        }
    ]
}
```

## 4. REST API Architecture

A set of rules for designing networked applications.

1.  **Client-Server:** Separation of concerns.
2.  **Stateless:** Each request from client to server must contain all the information needed to understand the request.
3.  **Cacheable:** Responses must explicitly or implicitly define themselves as cacheable or non-cacheable.
4.  **Layered System:** A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary.
5.  **Uniform Interface:**
    *   **Resource Identification in Requests:** Resources are identified by URIs.
    *   **Resource Manipulation through Representations:** Clients manipulate resources using representations.
    *   **Self-descriptive Messages:** Each message includes enough information to describe how to process the message.
    *   **Hypermedia as the Engine of Application State (HATEOAS):** Clients interact with the application entirely through hypermedia provided dynamically by server.

### 4.1. CRUD Operations

*   **C**reate: `POST` (e.g., `POST /products` to add a new product)
*   **R**ead: `GET` (e.g., `GET /products` to get all products, `GET /products/{id}` to get a specific product)
*   **U**pdate: `PUT` (idempotent) or `PATCH` (not idempotent)
*   **D**elete: `DELETE` (e.g., `DELETE /products/{id}` to delete a product)

### 4.2. Idempotency

*   `PUT` is idempotent.
*   `PATCH`, `POST` are not idempotent.

### 4.3. Caching

`GET` and `POST` requests can be cached.

### 4.4. Data Formats

Commonly uses JSON and XML formats.

### 4.5. Versioning

Example: `api/v2/user` (using URI versioning)

### 4.6. Documentation

OpenAPI and Swagger are commonly used for API documentation.

## 5. Other API Protocols

### 5.1. SOAP

**S**imple **O**bject **A**ccess **P**rotocol is a messaging protocol specification for exchanging structured information in the implementation of web services.

*   **WSDL** (Web Services Description Language) is an XML-based interface description language that is used for describing the functionality offered by a web service.

**Structure:**
*   Envelope
    *   Header
    *   Body

### 5.2. GraphQL

A query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.

## 6. Browser Architecture

### 6.1. High-Level Overview

```
+-----------------+
|  User Interface |
+--------+--------+
         |
+--------v--------+
| Browser Engine  |
+--------+--------+
         |
+--------v--------+
| Rendering Engine|
+---+----+---+----+
|   |    |   |
| Networking | JS Interpreter | UI Backend |
|   |    |   |
+---+----+---+----+
```

*   **User Interface:** The part of the browser you interact with (address bar, back/forward buttons, etc.).
*   **Browser Engine:** Marshals actions between the UI and the rendering engine.
*   **Rendering Engine:** Responsible for displaying the requested content. Examples: WebKit (Chrome, Safari), Gecko (Firefox).
*   **Networking:** Handles network calls (HTTP requests, etc.).
*   **JS Interpreter:** Parses and executes JavaScript code (e.g., V8 in Chrome).
*   **UI Backend:** Used for drawing basic widgets like combo boxes and windows.

### 6.2. WebKit Rendering Engine Architecture

![[Pasted image 20251113064148.png]]

### 6.3. Firefox Browser Architecture

![[Pasted image 20251113064305.png]]

## 7. Event Loop

The Event Loop is not part of JavaScript itself, but rather a part of the browser (or Node.js) runtime environment.

### 7.1. Call Stack (V8)

The call stack is a mechanism for an interpreter (like the JavaScript interpreter in a web browser) to keep track of its place in a script that calls multiple functions.

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
A "stack overflow" occurs when the call stack exceeds its maximum size, typically due to excessive recursion without a proper base case.

### 7.2. Event Loop Example

```javascript
function log(value) {
    console.log(value);
}

log('start');

setTimeout(() => {
    log('timeout');
}, 3000);

log('end');
```

**Execution Steps:**

1.  `log('start')` is pushed to the call stack, executed, and 'start' is logged.
2.  `setTimeout` is pushed to the call stack. It registers the callback function (`() => { log('timeout') }`) with the Web APIs (or Node.js APIs) and is then popped from the stack. The timer starts.
3.  `log('end')` is pushed to the call stack, executed, and 'end' is logged.
4.  The call stack becomes empty.
5.  After 3000 milliseconds, the `setTimeout` callback is moved from the Web APIs to the Task Queue.
6.  The Event Loop continuously checks if the call stack is empty. When it is, it takes the first function from the Task Queue and pushes it onto the call stack.
7.  `() => { log('timeout') }` is pushed to the call stack, `log('timeout')` is executed, and 'timeout' is logged.
8.  The callback is popped from the stack.

**Output:**

1.  `start`
2.  `end`
3.  `timeout` (after ~3 seconds)

### 7.3. Task Queue

Tasks from the queue are executed only after all functions in the call stack have completed.

### 7.4. How tasks enter the queue

![[Pasted image 20251113104527.png]]