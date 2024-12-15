# Task Manager Backend

This is a backend API for managing tasks. It allows users to create, read, update, and delete tasks, each with attributes like name, due date, priority, and completion status. The API is built with Express and MongoDB, providing a simple way to organize tasks, set deadlines, and track progress. The application supports CRUD operations and includes validation and authentication features to ensure data integrity and security.

# Installation
_Requires Node.js and your own MongoDB server and credentials. Instructions can be found here on how to setup your own: [Getting Started with MongoDB Atlas](https://www.youtube.com/watch?v=bBA9rUdqmgY)._

Go to the directory where you want to store this repository, then:
1. Clone the repository or download and unzip the ZIP: `git clone https://github.com/YaKnee/taskmanager.git`
2. Open the project with your favourite IDE and install dependencies: `npm install`
3. Create a __.env__ file in the project folder with the following:
    - MongoDB server credentials: `MONGODB_URI = mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/<database_name>`
    - JSON Web Token secret (should be a strong, randomly generated key): `JWT_SECRET=<secret_key>`
    - Port number (optional): `PORT = 3000`

    _Replace values between __<>__ with your actual values._

4. Reset/Populate the database with default tasks: `node scripts/resetDB.js`
5. Start the project: `npm start`. This will use _nodemon_ for automatic updates and _morgan_ for logging during development.

# Docs

Only __admin__ users can `POST`, `PUT`, and `DELETE`, while all authenticated users (__regular__ and __admin__) can do `GET` requests. 

## Structure 
Each task must be structured as a JSON object in the following format:
``` 
{
    "name": "some name",
    "dueDate": "YYYY-MM-DD",
    "completed": false,
    "priority": "Medium"
}
```
An "__id__" property will be automatically generated and appended to the object.

## Rules for Task Properties
1. __Required Property__:
    - The only required property in `POST`/`PUT` requests is the "__name__" property.
2. __Default Values__:
    - "__completed__": Defaults to __false__ if not specified.
    - "__priority__": Defaults to "__Low__" if not specified.
3. __Allowed Values__:
    - "__priority__" must be one of the following:
        - "__None__",
        - "__Low__",
        - "__Medium__",
        - "__High__"
4. __Due Date Constraints__:
    - When submitting a task with a "__dueDate__", it must be a date __greater than the current date__. Tasks with past dates will not be accepted.
5. __Priority Rules__:
    - If a task's "__completed__" property is set to __true__, its "__priority__" will automatically be changed to "__None__".

## Example Requests

Below are sample requests to interact with the backend API. These examples demonstrate how to perform __CRUD operations__ using the `/tasks` endpoint.

### Authentication

Before making any task-related requests, ensure you have a valid token. Use the `/auth/login` endpoint with valid credentials to get a token.

__Register a User__:
```
POST http://localhost:3000/auth/register
Content-Type: application/json

{
    "username": "some_name",
    "password": "some_password",
    "role": "admin"
}
```
_**password** must be atleast 8 characters in length. Will be hashed with **bcrypt** before sending to database._

__Login as Admin__:
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
    "username": "some_name",
    "password": "some_password"
}
```

__Login Response Example__:
```
{
    "token": "<adminToken>"
}
```
_See (JWT Introduction)[https://jwt.io/introduction] for how the token is generated._

### Create a New Task
To create a task, use a valid admin token in the `Authorization` header.
__Request__:
```
POST http://localhost:3000/tasks
Content-Type: application/json
Authorization: Bearer <adminToken>

{
    "name": "highly important task",
    "dueDate": "2024-12-31",
    "priority": "High"
}
```

### Read Tasks
__Get All Tasks__:
```
GET http://localhost:3000/tasks
Authorization: Bearer <token>
```

__Get Tasks by Priority__:
```
GET http://localhost:3000/tasks?priority=high
Authorization: Bearer <token>
```

__Get Tasks by ID__:
```
GET http://localhost:3000/tasks/1
Authorization: Bearer <token>
```

__Response__:
```
{
    "id": 1,
    "name": "highly important task",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "completed": false,
    "priority": "High"
}
```

### Update a Task

__Mark Task as Completed__:
When a task is marked as __completed__, its priority is automatically updated to "__None__":
```
PUT http://localhost:3000/tasks/1
Content-Type: application/json
Authorization: Bearer <adminToken>

{
    "name": "highly important task (done)",
    "completed": true
}
```

__Response__:
```
{
    "id": 1,
    "name": "highly important task (done)",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "completed": true,
    "priority": "None"
}
```

### Delete Task
__Delete by ID__:
```
DELETE http://localhost:3000/tasks/1
Authorization: Bearer <adminToken>
```

__Response__:
```
HTTP/1.1 204 No Content
```


## Libraries

Full list of libaries used for this project are:
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.dotenv.org/docs/)
- [express](https://expressjs.com/en/4x/api.html)
- [joi](https://joi.dev/api/?v=17.13.3)
- [jsonwebtoken](https://jwt.io/introduction)
- [mongoose](https://mongoosejs.com/docs/index.html)
- [morgan](https://github.com/expressjs/morgan#readme)
- [nodemon](https://github.com/remy/nodemon)