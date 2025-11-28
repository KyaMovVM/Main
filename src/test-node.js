// Загружаем HTTP модуль
const http = require("http");

const hostname = "94.41.87.98";
const port = 3010;

// Создаём HTTP-сервер
const server = http.createServer((req, res) => {
  // Устанавливаем HTTP-заголовок ответа с HTTP статусом и Content type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Отсылаем тело ответа "Hello World"
  res.end("Hello World\n");
});

// Выводим лог как только сервер будет запущен
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});