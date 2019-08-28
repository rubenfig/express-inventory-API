# Express.js Inventory Demo API

Demo REST API made with Express.js and MongoDB with JWT based authentication.

**Note:** This project is for demonstration and learning purposes only.

## Features

* [Mongoose](https://mongoosejs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) 
* [mongo-unit](https://github.com/mikhail-angelov/mongo-unit) 


## Prerequisites

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads).


## Getting started

1. Clone this repo, `git clone https://github.com/rubenfig/inventoryDemoAPI <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder,  `rm -rf .git`
4. Open `package.json` and change the `name` property with your project name
5. Create a file named `.env` in the project's root with the following:
    
        MONGO_URL={YOUR_MONGDB_ADDRESS}
        JWT_KEY={YOUR_JWT_PASSWORD}
        PORT={YOUR_DEPLOYMENT_PORT}
    
6. Start the server with `npm start` 


## Interacting with the services

Use [Postman](https://www.getpostman.com) or [cURL](https://curl.haxx.se/) to directly interact with the API. 

### Some examples

Login (Returns an authentication token):

```
curl -X POST \
  http://localhost:{YOUR_PORT}/user/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"rubenfig", "password":"admin"}'
```

Creating a product (with existing metric and category):

```
curl -X POST \
  http://localhost:{YOUR_PORT}/category/ \
  -H 'Authorization: Bearer {TOKEN}' \
  -H 'Content-Type: application/json' \
  -d '{ \
      quantity:5, \
      code:"CINT2", \
      originalPrice:5000, \
      currentPrice:10000, \
      name:"Cobre", \
      metric: {METRIC_ID}, \
      category:"{CATEGORY_ID}" \
    }'
```

Adding a product to cart:

```
curl -X POST \
  http://localhost:{YOUR_PORT}/cart/addItem \
  -H 'Authorization: Bearer {TOKEN}' \
  -H 'Content-Type: application/json' \
  -d '{ "product": {PRODUCT_ID}}, "quantity": 2, "price": 1000}'
```


## Command line scripts
  - `npm start`: Start the server on the port defined by the `.env` file.
  - `npm test`: Run unit tests.

## Built With

* MongoDB - [Official Website](http://mongodb.org/).
* Express - [Official Website](http://expressjs.com/).
* Node.js - [Official Website](http://nodejs.org/).

