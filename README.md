# Main

Gitea и Act Runner работает хорошо.
.gitea\worklows\

Мы можем сделать автоматизацию тестирования и Docker контейнеров.

Скачать NGINX Docker и настроить.

Скачать Image.

API Endpoints

1. api это интерфейс. Обычно url endpoints.

## State Managment:
Локальный
Глобальный
Модульный

Локальный и серверный

Клиент делает запрос за данными на сервер.
ЮАЙ рисуется на основе этих данных.
Данные кэшируются на клиенте.

Инструменты для работы с данными: Tanstack and SWR.

Обновление данных
    инвалидация - перезапрос данных с сервера
    мутация (post, put запросы) - обновление кеша

Инвалидация данных по ключам
Умеют перезапрашивать данные по таймеру (поллинг)
декларативные
optimistic update
retry в случае ошибок

3 запроса
getUserProfile
getUserSettings
GetUSerUnknown
Key:['user']

mutation updateUser - invalidateCache('user')

После инвалидации все запросы с key=user перезапрашиваются

## HTTP Сетевой протокол прикладного уровня Гипертекстовый транспортнвц протокол
OSI - TCP IP

Структура

Стартовая строка:
Метод: POST
URL: /loginHTTP/
Version: 1.0

Header:
Host: examle.com
Content-Type: application/x-www-form-urlnencoded; charset=utf-8
Content-Lenght: 26

body:
{
    login=user
    password=qwerty
}

Методы:
GET Получение ресурса
POST Передача данных
PUT Обновление ресурса
PATCH обновление фрагмента ресурсов
DELETE удаление ресурса

