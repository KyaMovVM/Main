// Загружаем HTTP модуль
const http = require("http");

// Use 0.0.0.0 in container environments so the server is reachable from the host
const hostname = "0.0.0.0";
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