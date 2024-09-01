// init-mongo.js
db = db.getSiblingDB('local');  //instanciate db

// Drop existing users collection if it exists
db.users.drop();

// Insert the initial data
db.users.insertMany([
    {
        userId: 'admina',
        password: 'pass1234',
        isAdmin: true
    },
    {
        userId: 'normalo',
        password: 'pass1234',
        isAdmin: false
    }
]);
