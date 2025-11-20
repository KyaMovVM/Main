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