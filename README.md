# SalesBlink Assignment


## Installation
1) Frontend code is present in reactclient folder and backend code is present in server folder
2) You should have node installed on your device
3) Clone the repo and go in the respective folder and type "npm install" to install the dependencies
4) To run reactclient , type "npm start". To run server , type "npm start or node index.js"
5) Provided .env file for credentials (for reference purpose)
6) ReactClient is running on port http://localhost:3000 and server on port http://localhost:5000 

## Features
 - Used React-flow library and TailwindCSS
 - Implemented drag and drop node feature
 - Save, Create and Retreive sequence History feature
 - Indivial nodes editing feature
 - Execution Engine with Nodemailer library for sending Mails
 - Password storing using Bcrypt library
 - DFS Algorithm for finding execution path
-  Used Cookies for authentication storing tokens and data

## Screenshots


## API Documentation
- Below are the API's , Use Postman or Insomnia for using the queries

### POST Register User
- **Endpoint:** `http://localhost:5000/api/user/register`
- **Body (JSON):**

```json
{
  "name":"James Bond",
  "email":"James@gmail.com"
  "password":"James",
}
```
### POST Login User
- **Endpoint:** `http://localhost:5000/api/user/login`
- **Body (JSON):**

```json
{
  "email" : "James@gmail.com"
  "password": "James"
}
```
### POST Save Sequence
- **Endpoint:** `http://localhost:5000/api/sequence/save`

### GET GetAll Sequence
- **Endpoint:** `http://localhost:5000/api/sequence/:userId`

### POST Execute Sequence
- **Endpoint:** `http://localhost:5000/api/execution`

## Contact
If you have any questions or suggestions, feel free to contact me at +91 8329702408 piyush20001024@gmail.com 
