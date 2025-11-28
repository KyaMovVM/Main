# Main Project Documentation

## Оглавление

[KyaMovVM/Main/wiki](http://192.168.0.104:3000/KyaMovVM/Main/wiki)

<!-- - [1. Project Overview](1-overview.md)
- [2. Build and Testing](2-build.md)
- [3. API Reference](3-api.md)
- [4. REST API Architecture](4-rest.md)
- [5. Other API Protocols](5-protocols.md)
- [6. Browser Architecture](6-browser.md)
- [7. Event Loop](7-event-loop.md)
- [8. Render](8-render.md)
- [9. Node.js](9-node.md)
- [10. Markdown](10-markdown.md)
- [11. ООП](11-oop.md)
- [12. Тестирование](12-testing.md) -->

## 1. Project Overview

This project is a lightweight API service demonstrating the operation of Gitea,
Act Runner, and Docker containers. The repository includes:

- `.gitea/workflows/` – CI/CD configurations.
- `ssh scripts/` – PowerShell / Bash scripts for managing SSH keys.
- `Test‑VRChat.sh` – An example test harness.
- `README.md` – This document.

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

| Request                    | Description                                         |
| :------------------------- | :-------------------------------------------------- |
| `GET /api/getUserProfile`  | Get user profile                                    |
| `GET /api/getUserSettings` | Get user settings                                   |
| `POST /api/updateUser`     | Update user data (invalidates cache for `['user']`) |

### 3.2. State Management

The client uses **Tanstack Query / SWR**. Cache keys look like: `['user']`.

#### Key Principles

- **Invalidation** – When data changes, the client automatically re-fetches
  all queries with the `['user']` key.
- **Mutations** – POST/PUT operations update the cache via
  `invalidateCache('user')`.
- **Optimistic Updates** – The UI updates immediately, and the server confirms
  the change.
- **Retries** – Requests are automatically retried on errors.

### 3.3. HTTP Protocol

#### Request Structure Example

```http
POST /login HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Content-Length: 26

login=user&password=qwerty
```

#### HTTP Methods

- `GET` – Retrieve a resource.
- `POST` – Submit data to a specified resource.
- `PUT` – Update an existing resource
  (idempotent).
- `PATCH` – Partially update an existing resource (not idempotent).
- `DELETE` – Delete a specified resource.

### 3.4. Server Response

```http
HTTP/1.1 200 OK
```

#### HTTP Status Codes

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

- `date-string`
- `city-string`

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

1. **Client-Server:** Separation of concerns.
2. **Stateless:** Each request from client to server must contain all the
   information needed to understand the request.
3. **Cacheable:** Responses must explicitly or implicitly define themselves as
   cacheable or non-cacheable.
4. **Layered System:** A client cannot ordinarily tell whether it is
   connected directly to the end server, or to an intermediary.
5. **Uniform Interface:**
   - **Resource Identification in Requests:** Resources are identified by URIs.
   - **Resource Manipulation through Representations:** Clients manipulate
     resources using representations.
   - **Self-descriptive Messages:** Each message includes enough
     information to describe how to process the message.
   - **Hypermedia as the Engine of Application State (HATEOAS):** Clients
     interact with the application entirely through hypermedia provided
     dynamically by server.

### 4.1. CRUD Operations

- **C**reate: `POST` (e.g., `POST /products` to add a new product)
- **R**ead: `GET` (e.g., `GET /products` to get all products,
  `GET /products/{id}` to get a specific product)
- **U**pdate: `PUT` (idempotent) or `PATCH` (not idempotent)
- **D**elete: `DELETE` (e.g., `DELETE /products/{id}` to delete a product)

### 4.2. Idempotency

- `PUT` is idempotent.
- `PATCH`, `POST` are not idempotent.

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

**S**imple **O**bject **A**ccess **P**rotocol is a messaging protocol
specification for exchanging structured information in the implementation of
web services.

- **WSDL** (Web Services Description Language) is an XML-based interface
  description language that is used for describing the functionality offered
  by a web service.

**Structure:**

- Envelope
  - Header
  - Body

### 5.2. GraphQL

A query language for your API, and a server-side runtime for executing
queries by using a type system you define for your data.

## 6. Browser Architecture

### 6.1. High-Level Overview

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

## 7. Event Loop

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

## 8. Render

DOM → CSSOM → Render tree

**Style calculation**
Применение селекторов к элементам. Чем проще селектор — тем лучше.

**Layout**
Вычисляет размеры и позиции элементов.

**Paint**
Рисует пиксели на слоях.

**Compositing**
Собирает слои для финального отображения.

Render — дорогостоящая операция. Рендер вызывается при:

- изменении окна
- изменении шрифта
- изменении контента
- добавлении/удалении классов или стилей
- манипуляции с DOM
- изменении ориентации
- изменении размеров или позиции элементов
- перерасчёте размеров/позиций

### Node JS

V8 JS -> Машинный код
Libuv - Cross I/O, Event loop

Классический блокирующий ввод\вывод

```javascript
let user = { name: "Ivan", secondName: "Petrov" };
let count = 0;
count += 1;
user.count = count;
database.save(user);
return user;
```

Многопоточность.
Минусы:

- Уходят ресурсы
- Сложность управления
- datelocks

Серверная часть
Поток 1 Обработка запросов Обработка запросов
Поток 2 Обработка запросов
Поток 3 Обработка запросов

nginx - неблокирующий ввод\вывод
Apache - классический многопоточный вебсервер

Не блокирующий ввод\вывод
Главный поток
Обработка запросов
Обработка запросов
Обработка запросов
Системные вызовы немедленно возвращают управление, не ожидая выполнения чтения или записи данных.
При этом поток не блокируется.

NodeJS однопоточный
Libuv - многопоточный (4 потока) С
V8 C++

Thread scheduler

worker_threads Можно управлять потоками

### Демультиплексор событий

Приложение
Запрос I/O
Передача демультиплексору
Очередь
События - Обработчик
Event loop
Обработка

Интерфейс уведомлениё о событиях. Сборка и постановка в очередь событий ввода и вывода. Блокировка новых событий.

Event Loop

Очередь событий (Событие, обработчик) (Функция callback Node JS)

Демультиплексор событий
Linux epoll
windows IOCP I/O Completion Port
macOS Kqueue

Event Loop Node JS
![[LoopImage.png]]

(Promises)
Tаймеры
I/O
Ожидание и подготовка
Опрос
Проверка
Коллбэки "close"

Шаблон reactor

Бэкенд
API Gateway
Балансировка NGINX
S3 Хранилище данных
Аналитика (ClickHouse)
NoSQL Mongo DB
RabbitMQ (Брокер сообщений)
Планировщик задач
Elastick Search
Kubernetes
Hadoop, hdfs

Фронтенд
Монорепозиторий сервисов одного продукта
Пакеты
UI Kits
Модули
Конфигурации
Stdlib
Frameworks:
React
Vue
Angular
Svelte

Сборка
Webpack
Vite

Управление состоянием:
Redux
MobX
VueX
Effector

Server-side rendering:
Nuxt
NextJS
NodeJS

## 10. Markdown

```bash
# Install tools
npm install -g prettier       # Install prettier globally
npm install -g markdownlint-cli  # Install markdownlint-cli globally

# Run lint across markdown files
markdownlint "**/*.md"

# Format files (example)
prettier --write "**/*.md"
```

### Links

- V8 source: <https://chromium.googlesource.com/v8/v8.git>
- libuv: <https://libuv.org/>

## 11. ООП

### Процедурный подход

Данные - Программа - Функция - Результат

``` ts
const widht = 5;
const height = 10;

function calcReactArea(width, height) {
  return width * height;
}

calcRectArea(widht, height);
```

### Объектно-ориентированный подход

Класс - Человек
  Свойства:
  Имя
  Фамилия
  Возраст
  Вес
  Рост
  Методы:
  Ходить
  Писать код
  Рисовать
  Говорить

Объект - Вася
  Имя: "Вася"
  Фамилия: "Пупкин"
  27
  70
  180

### Инкапсуляция

``` ts
class Rectangle {
  width; // Ширина
  height; // Высота

  constructor(width, height) {
    this.width = w;
    this.height = h;
  }

  calcArea() { // Метод подсчета площади
    return this.width * this.height; // This объект метода
  }
}

const rect = new Rectangle(5, 10);
const rect = new Rectangle(52, 102);
const rect = new Rectangle(10, 102);
rect.calcArea();
```

Модификаторы доступа

public
protected
private

``` ts
class Rectangle {
  private width;
  private height;

  constructor(width, height) {
    this.width = w;
    this.height = h;
  }

  calcArea() { // Метод подсчета площади
    return this.width * this.height; // This объект метода
  }

  public get width() {
    return this._width;
  }

  public set width(value) {
    if (value <= 0) {
      this._width = 1;
    } else {
      this._width = value;
    }
  }
}

const rect = new Rectangle(5, 10);
const rect = new Rectangle(52, 102);
const rect = new Rectangle(10, 102);
rect.calcArea();
rect.width = 10;
console.log(rect)
```

``` ts
class User {
  private username;
  private password;
  private _id;

  constructor(username, password) {
    this.username = username;
    this.password = password;
    this._id = generateRandomId();
  }

  public get username() {
    return this._username;
  }

  public set username(value) {
    this._username = value;
  }

  public get password() {
    return this._password;
  }

  public set password(value) {
    this._password = value;
  }

  public get id() {
    return this._id;
  }
}

const user = new User('Ulbi', 'Timur')
user.id = 5;
```

``` ts
class Database{
  private _url;
  private _port;
  private _username;
  private _password;
  private _tables;

  constructor(url, port, username, password) {
    this._url = url;
    this._port = port;
    this._username = username;
    this._password = password;
    this._tables = [];
  }

  public createTable(tableName) {
    this._tables.push(tableName);
  }

  public get url() {
    return this._url;
  }

  public set url(value) {
    this._url = value;
  }

  public get port() {
    return this._port;
  }

  public set port(value) {
    this._port = value;
  }

  public get username() {
    return this._username;
  }

  public set username(value) {
    this._username = value;
  }

  public get password() {
    return this._password;
  }

  public set password(value) {
    this._password = value;
  }

  public get tables() {
    return this._tables;
  }

  public set tables(value) {
    this._tables = value;
  }
}

const db = new Database('localhost', 5432, 'postgres', '4')
db.createNewTable({name: 'roles'});
db.createNewTable({name: 'users'});
db.clearTable({name: 'roles'});
```

### Наследование

Класс человек -> Класс - Работник -> Класс - Программист

``` ts
class Person{
  private firstName;
  private lastName;
  private age;

  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  public greeting() {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
  }

  public get firstName() {
    return this._firstName;
  }

  public set firstName(value) {
    this._firstName = value;
  }

  public get lastName() {
    return this._lastName;
  }

  public set lastName(value) {
    this._lastName = value;
  }

  public get age() {
    if (value < 0){
      this._age = 0;
    } else {
      this._age = value;
    }
  }

  public set age(value) {
    this._age = value;
  
}

  public get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Employee extends Person{
  private inn;
  private number;
  private snils

  constructor(firstName, lastName, age, inn, number, snils) {
    super(firstName, lastName, age);
    this.inn = inn;
    this.number = number;
    this.snils = snils;
  }

  greeting() {
    conslole.log('Hello, I am employee ${this.firstName} ${this.lastName}')
  }
}
const = new Employee('Ivan', 'Ivanov', 30);
console.log(employee);

class Developer extends Employee{
  private level;

  constructor(firstName, lastName, age, inn, number, snils, level) {
    super(firstName, lastName, age, inn, number, snils);
    this.level = level;
  }

  greeting() {
    conslole.log('Hello, I am developer ${this.firstName} ${this.lastName}')
  }
}

const = new Developer('Ivan', 'Ivanov', 30, 123456789, 123456789, 123456789, 'Junior');
console.log(developer);

const person = new Person('Ivan', 'Ivanov', 30);
person.greeting();

ulbiTV.greeting();
employee.greeting();
developer.greeting();

const personList = [person, ulbiTV, employee, developer];

function massGreeting(person: Person[]){
  for (let i = 0; i < personList.length; i++){
    const person = persons[i];
    person.greeting()
  }
}
```

### Полиморфизм

Параметрический (Истинный)
ad-hoc (Мнимый)

### Взаимодействие классов
Композиция

Класс автомобиль
  Двигатель
  Колеса 4

Агрегация

-> Ёлочка освежитель
Класс автомобиль
  Двигатель
  Колеса 4

``` ts
class Engine{
  drive(){
    console.log('Двигатель работает')
  }
}

class Wheel{
  drive(){
    console.log('Колеса едут')
  }
}

class Car {
  engine: Engine;
  wheels: Wheel[];
  freshener: Freshener;


  constructor(freshener) {
    // Agregation
    this.freshener = freshener;

    // composition
    this.engine = new engine;
    this.wheels = [];
    this.wheels.push(new Whell());
    this.wheels.push(new Whell());
    this.wheels.push(new Whell());
    this.wheels.push(new Whell());
  }

  // delegation
  drive(){
    this.engine.drive();
    for (let i = 0; i < this.wheels.length; i++){
      this.wheels[i].drive();
    }
  
  }
}

class Freshener {

}

class Flat {
  freshener: Freshener;

  constructor(freshener) {
    this.freshener = freshener;
  }

}
```

### Интерфейсы и абстрактные классы

``` ts
interface Client{
  connect(url: string): void;
  read(): string;
  write(data: string): void;
  disconnect(): void;
}

abstract class Client{
  connect(url: string): void;
  abstract read(): string;
  abstract write(data: string): void;
  abstract disconnect():
}

interface Reader {
  read(url);
}

interface Writer {
  write(dara);
}

// Имплементация интерфейса

class FileClient implements Reader, Writer {
  read(url){
    // ...
  }

  write(data){
    // ...
  
  }
}


interface Repository<T>{
  create: (obj: T) => void;
  get: () => T;
  update: (obj: T) => void;
  delete: (obj: T) => void;
}

const UserRepo implements Repository{
  create: (User): User => void{
    return database.query(INSERT...')
  }

  read: () => void{
    // ...
  }

  update: () => void{
    // ...
  }

  delete: () => void{
    // ...
  }
}

class User {
  username: string;
  age: number;
}
```

## 12 Тестирование

Пирамида

E2E
Integration
Screenshots
Unit

Jest - Unit tests
React-testing-library (react-router-dom + redux)
WebdriverIO (cypress, puppeteer, hermione...)
Storybook + Chromatic

#### Функциональное
Модульное
Интеграционное
End-2-end (e2e)

#### Нефункциональное

### Unit

``` ts
conts square = (number) => {
  if(number === 1){
    return 1;
  }
  return Math.pow(number, 2)
}

const valodateValue = (value) => {
  if(value < 0 || value > 100){
    return false;
  }
  return true;
}

const mapArrToString = (arr) => {
  return arr
    .filter(item => Number.isInteger(item))
    .map(String);
}

class HTMLParser {
  method1(){
    // ...
  }

  method2(){
    // ...
  }

  method3(){
    // ...
  }
}
```

### Integration Tests
Тесты модулей в связке, которые проверяют взаимодействие нескольких
компонентов и функций.  В этом разделе описывается, как устроены
интеграционные тесты и какие именно функции они проверяют.

**Функции, которые участвуют в интеграционных тестах**
* `square()` – проверяет корректность вычисления квадрата числа.
* `convertDate()` – преобразует строку‑дата в объект `Date` и
  проверяет правильность формата.
* `validate()` – валидирует входные данные (число должно быть в
  диапазоне 0–100).

**Пример JSX‑структуры**
```tsx
<Component>
  <OtherComponent id={1} />
  <OtherComponent id={2} />
</Component>
```
В этом примере родительский компонент `Component` рендерит два
дочерних `OtherComponent`.  Интеграционные тесты проверяют, что
данные, передаваемые родителем, корректно передаются и обрабатываются
дочерними компонентами.

**Разница между unit‑ и integration‑тестами**
* **Unit‑тесты** проверяют отдельные функции или методы в изоляции.
* **Интеграционные тесты** проверяют взаимодействие между несколькими
  модулями/компонентами, гарантируя, что они работают совместно.
  Это важно для обнаружения ошибок, которые не видны в unit‑тестах.

### E2E
Важный функционал. Нажатия и тд.

Квадрат тестирования

1 1.1
0 1

``` ts
const validateValue = (value) => {
  if(value < 0 || value > 100) {
    return false;
  }
  return true;
}

```

Установка Jest
``` js
npm init
npm i -D jest
```
src/validateValue/validateValue.js
``` js
const validateValue = (value) => {
  if(value < 0 || value > 100) {
    return false;
  }
  return truel
}

module.exports = validateValue;
```

validateValue.test.js

``` js
const validateValue = require('./validateValue');

test('Валидное значение, ' () => {
  expect(validateValue(50)).toBe(true);
})

npm run test validateValue.test.js

describe('validateValue', () => {
    test('Валидное значение, ' () => {
      expect(validateValue(50)).toBe(true);
    })

    test('значение2, ' () => {
      expect(validateValue(-1)).toBe(false);
    })

    test('значение4, ' () => {
      expect(validateValue(101)).toBe(false);
    })

    test('значение5, ' () => {
      expect(validateValue(0)).toBe(true);
    })

    test('значение6, ' () => {
      expect(validateValue(100)).toBe(true);
    })
})
```

## Сводка содержимого README.md

Раздел	Краткое содержание
1. Project Overview	Описание проекта как лёгкого API‑сервиса, использующего Gitea, Act Runner и Docker. Перечислены ключевые папки (workflows, ssh scripts/, Test‑VRChat.sh).
2. Build and Testing	Команды для запуска CI (act), скачивания NGINX‑образа и запуска тестов (Test‑VRChat.sh).
3. API Reference	Перечень API‑эндпоинтов (/api/getUserProfile, /api/getUserSettings, /api/updateUser). Описаны принципы работы клиента (Tanstack Query / SWR), HTTP‑методы, статус‑коды и пример ответа от сервиса погоды.
4. REST API Architecture	Обзор принципов REST: клиент‑сервер, безсостояние, кэширование, CRUD‑операции, идемпотентность, версии API и документация (OpenAPI/Swagger).
5. Other API Protocols	Кратко о SOAP (WSDL, структура Envelope) и GraphQL.
6. Browser Architecture	Структура браузера: UI → Browser Engine → Rendering Engine (WebKit/Gecko), сетевые, JS‑интерпретатор, UI‑backend. Включены схемы WebKit и Firefox.
7. Event Loop	Пояснение стека вызовов, примеры factorial (stack overflow) и setTimeout. Описаны Task Queue, как задачи попадают в очередь, и схема Event Loop.
8. Render	Пошаговый процесс рендеринга: DOM → CSSOM → Render tree → Layout → Paint → Composite. Перечислены события, вызывающие рендер.
9. Node.js	Обзор V8, libuv, блокирующего/неблокирующего ввода/вывода, многопоточности, worker_threads, демультиплексор событий (epoll, IOCP, kqueue).
10. Markdown	Инструкции по lint‑у и форматированию Markdown (prettier, markdownlint).
11. ООП	Примеры процедурного и объектно‑ориентированного подходов, инкапсуляции, модификаторов доступа, наследования, полиморфизма, композиции/агрегации, интерфейсов и абстрактных классов.
12. Тестирование	Пирамида тестов (Unit, Integration, E2E). Инструменты: Jest, React‑testing‑library, WebdriverIO, Storybook + Chromatic. Примеры unit‑тестов (square, validateValue, mapArrToString) и интеграционных тестов (square, convertDate, validate).
Дополнительно	В конце файла приведён пример установки Jest, тестовый файл validateValue.test.js и его содержимое.

## Проверка библиотек например на размер и скорость
https://bundlephobia.com/

## Мемоизация и оптимизации
https://www.youtube.com/watch?v=VNNLNC5h7ZI
https://habr.com/ru/companies/ruvds/articles/332384/

## Функциональное программирование
https://www.youtube.com/watch?v=ScgmlDb5ed4

# Runner

# Gitea Runner для Node.js приложения

Этот руннер предназначен для запуска Node.js приложения `test-node.js` в Docker-контейнере на 15 минут.

## Как использовать

1. Убедитесь, что у вас есть доступ к Gitea и настроен runner.
2. Запустите руннер, и он автоматически соберёт и запустит приложение.
3. Через 15 минут приложение будет остановлено и удалено.

## Файлы

- `Dockerfile` — Docker-образ для приложения.
- `runner.sh` — скрипт для запуска и остановки приложения.
- `runner.yml` — конфигурация руннера.
- `config.yml` — дополнительные настройки для руннера.

## Примечания

- Приложение будет доступно по адресу `http://94.41.87.98:3010`.
- Время выполнения ограничено 15 минутами.
- Все изменения в коде будут автоматически пересобраны и перезапущены.