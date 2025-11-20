6.1. High-Level Overview

```text
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

- **User Interface:** The part of the browser you interact with (address
  bar, back/forward buttons, etc.).
- **Browser Engine:** Marshals actions between the UI and the rendering engine.
- **Rendering Engine:** Responsible for displaying the requested content.
  Examples: WebKit (Chrome, Safari), Gecko (Firefox).
- **Networking:** Handles network calls (HTTP requests, etc.).
- **JS Interpreter:** Parses and executes JavaScript code (e.g., V8 in Chrome).
- **UI Backend:** Used for drawing basic widgets like combo boxes and windows.

### 6.2. WebKit Rendering Engine Architecture

![[image2.png]]

### 6.3. Firefox Browser Architecture

![[image3.png]]
