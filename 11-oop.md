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
