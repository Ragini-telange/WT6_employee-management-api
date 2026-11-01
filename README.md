# Employee Management RESTful CRUD API

A beginner-friendly REST API built with Node.js, Express.js and MongoDB (using Mongoose). It supports creating, viewing, updating and deleting employee records.

## 1. Requirements

- Node.js 18 or newer
- npm (installed with Node.js)
- MongoDB running locally, or a MongoDB Atlas connection string
- Postman (for API testing)

## 2. Install and run locally

1. Extract the ZIP file and open this project folder in VS Code or a terminal.
2. Install packages:

   ```bash
   npm install
   ```

3. Create a file named `.env` in the project root by copying `.env.example`.
4. Set `MONGODB_URI` in `.env`:
   - Local MongoDB: `mongodb://127.0.0.1:27017/employee_management`
   - MongoDB Atlas: paste your own Atlas connection string. Keep credentials private and never upload `.env`.
5. Start the server:

   ```bash
   npm start
   ```

6. Open `http://localhost:3000/health`. A successful response is:

   ```json
   { "success": true, "message": "API is healthy" }
   ```

For development with automatic restart, run `npm run dev`.

## 3. Employee fields

| Field | Type | Required | Notes |
|---|---|---|---|
| name | String | Yes | At least 2 characters |
| email | String | Yes | Valid email; must be unique |
| department | String | Yes | For example, IT or HR |
| position | String | Yes | For example, Developer |
| salary | Number | Yes | Must be zero or greater |

MongoDB automatically creates a unique `_id` for each employee.

## 4. API endpoint table

Use `http://localhost:3000` as the local base URL.

| Method | Endpoint | Purpose | Success status |
|---|---|---|---|
| POST | `/api/employees` | Create an employee | 201 |
| GET | `/api/employees` | Get all employees | 200 |
| GET | `/api/employees/:id` | Get one employee by ID | 200 |
| PUT | `/api/employees/:id` | Update an employee | 200 |
| DELETE | `/api/employees/:id` | Delete an employee | 200 |

## 5. Example Postman requests

### Create employee

- Method: `POST`
- URL: `http://localhost:3000/api/employees`
- Body → raw → JSON:

  ```json
  {
    "name": "Aarav Patil",
    "email": "aarav.patil@example.com",
    "department": "IT",
    "position": "Software Developer",
    "salary": 45000
  }
  ```

Copy the `_id` from the response for the by-ID, update and delete requests.

### Get all employees

- Method: `GET`
- URL: `http://localhost:3000/api/employees`

### Get one employee

- Method: `GET`
- URL: `http://localhost:3000/api/employees/EMPLOYEE_ID`

Replace `EMPLOYEE_ID` with an actual `_id` returned by MongoDB.

### Update employee

- Method: `PUT`
- URL: `http://localhost:3000/api/employees/EMPLOYEE_ID`
- Body → raw → JSON:

  ```json
  {
    "position": "Senior Software Developer",
    "salary": 55000
  }
  ```

### Delete employee

- Method: `DELETE`
- URL: `http://localhost:3000/api/employees/EMPLOYEE_ID`

## 6. Error/status codes

- `200 OK`: Request completed successfully.
- `201 Created`: Employee created successfully.
- `400 Bad Request`: Invalid ID, missing/invalid fields, or duplicate email.
- `404 Not Found`: Employee or route does not exist.
- `500 Internal Server Error`: Unexpected server-side error.

Try a POST request with a missing `name` or an invalid email to test validation. Try GET with a valid-looking but nonexistent MongoDB ID to test the 404 response. A malformed ID returns 400.

## 7. Postman collection

Import `postman/Employee_Management_API.postman_collection.json` into Postman. The collection uses a `baseUrl` variable set to `http://localhost:3000` and an `employeeId` variable. After creating an employee, copy its `_id` from the response and set the collection variable `employeeId` to that value before testing the by-ID, update and delete requests.

## 8. Deploy to Render (overview)

1. Push the project to your own GitHub repository. Do not commit `.env` or database credentials.
2. Create a new **Web Service** on Render and connect the repository.
3. Set the build command to `npm install` and the start command to `npm start`.
4. In Render environment variables, add `MONGODB_URI` with your MongoDB Atlas connection string and set `NODE_ENV` to `production`.
5. Deploy. Your public base URL will be provided by Render. Test `<your-render-url>/health` and update the Postman collection's `baseUrl` variable to the deployed URL.

Deployment requires your own hosting and database accounts. This project ZIP does not contain credentials or a live deployed URL.

## 9. Project structure

```text
employee-management-api/
├── postman/
│   └── Employee_Management_API.postman_collection.json
├── src/
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   └── employeeRoutes.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 10. Important submission checklist

- Add your own screenshots from Postman for POST, both GET requests, PUT, DELETE and invalid requests.
- Add your actual deployed base URL to your report after deployment.
- Keep `.env` private. Submit `.env.example` only.
- Do not include `node_modules` in the ZIP. Run `npm install` after extracting it.
- Read and understand the code so you can explain each route during your viva.
