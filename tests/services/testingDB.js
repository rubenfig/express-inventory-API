import {ObjectID} from "mongodb";

// DB to preload for testing
module.exports = {
  "categories": [
    {
      "name": "Ferretería"
    },
    {
      "_id": new ObjectID("5d1e6bd38d220f701983b945"),
      "name": "Motos"
    },
    {
      "name": "Electricidad"
    }
  ],
  "metrics": [
    {
      "name": "Kilogramos",
      "abreviation": "Kg"
    },
    {
      "_id": new ObjectID("5d1e6707f180df68e6544d95"),
      "name": "Metros",
      "abreviation": "m"
    }
  ],
  "products": [
    {
      "_id": new ObjectID("5d1e6bcd8d220f701983b936"),
      "quantity": 10,
      "code": "CAFER1",
      "originalPrice": 40000,
      "currentPrice": 50000,
      "name": "Cable",
      "metric": new ObjectID("5d1e6707f180df68e6544d95"),
      "category": new ObjectID("5d1e6bd38d220f701983b945")
    },
    {
      "_id": new ObjectID("5d1e6bcd8d220f701983b949"),
      "quantity": 5,
      "code": "CINT1",
      "originalPrice": 5000,
      "currentPrice": 10000,
      "name": "Cinta",
      "metric": new ObjectID("5d1e6707f180df68e6544d95"),
      "category": new ObjectID("5d1e6bd38d220f701983b945"),
      "reserved": [
        {
          "_id": new ObjectID("5d1e64756dea8866123962fd"),
          "quantity": 2,
          "price": 100
        },
      ]
    },
  ],
  "users": [
    {
      "_id": new ObjectID("5d1e64756dea8866123962fd"),
      "name": "rubenfig",
      "password": "$2a$08$eoC/vYpe0DEwwRtIAqYiueDlRKa14E2DBlbYZWOtJpKy3fv1T7Fry",
      "username": "rubenfig",
      "email": "shishi9tail@hotmail.com"
    }
  ],
  "carts": [
    {
      "_id": new ObjectID("5d6442120545eaac50556415"),
      "status": "active",
      "user": new ObjectID("5d1e64756dea8866123962fd"),
      "products": [{
        "product": new ObjectID("5d1e6bcd8d220f701983b949"),
        "quantity": 2,
        "price": 1000
      }],
      "client": "cliente 3",
    }
  ]
};
