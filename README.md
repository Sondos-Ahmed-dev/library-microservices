# Library Management System - Microservices Architecture

## Project Overview
This project is a Library Management System built using Microservices Architecture.

The system allows users to:
- Register and login
- Browse books
- Borrow books
- Return books

The system allows librarian to:
- Register and login
- Browse books
- Borrow books
- Return books
- manage books (CRUD)

The system allows admin to:
- Register and login
- Browse books
- Borrow books
- Return books
- manage books (CRUD)
- Manage users and roles
---

## Technologies Used

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- Docker
- Docker Compose
- API Gateway
- React 
- Maven

---

## Microservices

### 1. Auth Service
Responsible for:
- Authentication
- Authorization
- User management
- JWT generation

### 2. Book Service
Responsible for:
- Managing books
- Categories
- Book operations (CRUD)

### 3. Borrow Service
Responsible for:
- Borrowing books
- Returning books
- Borrow records

### 3. Catalog Service
Responsible for:
- Search books
- Filtering books by categoty

### 5. API Gateway
Responsible for routing requests between services.

---

## Project Structure

```bash
library-microservices/
│
├── auth-service
├── book-service
├── borrow-service
├── catalog-service
├── api-gateway
├── docker-compose.yml
├── diagrams
└── documentation
```

---

## Docker Setup

To run the project using Docker:

```bash
docker compose up --build
```

To stop the containers:

```bash
docker compose down
```

---

## API Testing

The APIs can be tested using:
- Postman

---

## Documentation

The repository includes:
- System diagrams
- SRS documentation
- Project report

---

## Team Members

- Sondos Ahmed
- Radwa Meshref
- Mohammed Mansour
- Mostafa Yasser
- Aya Ahmed
- Marawan Mahamoud

---

## Notes

- Each microservice has its own database and configuration.
- The project follows Microservices Architecture principles.
