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