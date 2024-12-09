# Task Manager Backend

This is a backend API for managing tasks. It allows users to create, read, update, and delete tasks, each with attributes like name, due date, priority, and completion status. The API is built with Express and MongoDB, providing a simple way to organize tasks, set deadlines, and track progress. The application supports CRUD operations and includes validation and authentication features to ensure data integrity and security.

## Installation
*requires Node.js and your own MongoDB server and credentials. Instructions can be found here on how to setup your own: [Getting Started with MongoDB Atlas](https://www.youtube.com/watch?v=bBA9rUdqmgY).

Go to the directory where you want to store this repository, then use: `git clone https://github.com/YaKnee/taskmanager.git` in CLI (or download the ZIP folder and unzip).
Next, open this project up with your favourite IDE and install the dependency packages by using `npm install` in the terminal. 

Then create a __.env__ file to the project folder with:
- Server credentials, for example: `MONGODB_URI = mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/<database_name>`,
- Json web token secret, for example: `JWT_SECRET=<secret_key>`,
- Port number, for example: `PORT=2000` (_not strictly necessary as code will use 3000 as default if not added, but good for customizability_)

__Replace values between <> with your actual values.__

Use `node scripts/resetDB.js` in terminal to reset and populate the database.

Finally, use `npm start` which should start the project with nodemon for automatic updates and morgan for logging during development.


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