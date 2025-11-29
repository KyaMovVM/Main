# Базовый лёгкий образ Node.js (≈30 МБ)
FROM node:20-alpine AS builder

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем только нужный файл (можно скопировать весь проект, если хотите)
COPY .C:/kyaserver/Main/src/test-node.js /app/test-node.js

# Открываем порт, на котором будет слушать сервер
EXPOSE 3010

# Команда, которая выполнится при старте контейнера
CMD ["node", "test-node.js"]