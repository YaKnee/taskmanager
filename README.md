# Task Manager Backend

This is a backend API for managing tasks. It allows users to create, read, update, and delete tasks, each with attributes like name, due date, priority, and completion status. The API is built with Express and MongoDB, providing a simple way to organize tasks, set deadlines, and track progress. The application supports CRUD operations and includes validation and authentication features to ensure data integrity and security.

## Installation
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

## Docs

### Structure 
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

### Rules for Task Properties
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