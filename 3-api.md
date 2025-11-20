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
