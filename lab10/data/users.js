const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 16;



async function createUser(username, password) {

    if (!username || !password) {
        throw 'Input should be supplied for username and password';
    }

    if (typeof (username) != 'string') {
        throw 'username should be a string';
    }

    if (typeof (password) != 'string') {
        throw 'password should be a string';
    }

    if (username.length === 0) {
        throw 'username cannot be a empty string';
    }
    if (password.length === 0) {
        throw 'password cannot be a empty string';
    }

    if (username.trim().length === 0) {
        throw 'username cannot be just empty spaces';
    }

    if (password.trim().length === 0) {
        throw 'password cannot be just empty spaces';
    }

    if (username.length < 4) {
        throw 'username should contain at least 4 characters';
    }

    if (/\s/.test(username)) {
        throw 'username has white spaces';
    }

    if (password.length < 6) {
        throw 'password should contain at least 6 characters';
    }

    if (/\s/.test(password)) {
        throw 'password has white spaces';
    }

   // let pattern = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    //if (!username.match(pattern)) {
      //  throw 'username should contain only alphanumeric characters';
    //}

    let pattern = /^[a-zA-Z0-9_]*$/;
    if (!username.match(pattern)) {
        throw 'username should contain only alphanumeric characters';
    }

    const usersCollection = await users();

    let findAny = [];

    const userList = await usersCollection.find({}).toArray();
    for (let found of userList) {
        if (found.username === username.toLowerCase()) {
            findAny.push(found);
        }
    }

    if (findAny.length != 0) {
        throw "There is already a user with that username";
    }

    let newUser = {
        username: username.toLowerCase(),
        password: await bcrypt.hash(password, saltRounds),
    };
    let insertData = await usersCollection.insertOne(newUser);
    if (insertData.insertedCount == 0) throw "Could not insert user";
    return { userInserted: true };

}


async function checkUser(username, password) {

    if (!username || !password) {
        throw 'Input should be supplied for username and password';
    }

    if (typeof (username) != 'string') {
        throw 'username should be a string';
    }

    if (typeof (password) != 'string') {
        throw 'password should be a string';
    }

    if (username.length === 0) {
        throw 'username cannot be a empty string';
    }
    if (password.length === 0) {
        throw 'password cannot be a empty string';
    }

    if (username.trim().length === 0) {
        throw 'username cannot be just empty spaces';
    }

    if (password.trim().length === 0) {
        throw 'password cannot be just empty spaces';
    }

    if (username.length < 4) {
        throw 'username should contain at least 4 characters';
    }

    if (/\s/.test(username)) {
        throw 'username has white spaces';
    }

    if (password.length < 6) {
        throw 'password should contain at least 6 characters';
    }

    if (/\s/.test(password)) {
        throw 'password has white spaces';
    }

    //let pattern = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    //if (!username.match(pattern)) {
      //  throw 'username should contain only alphanumeric characters';
    //}
    let pattern = /^[a-zA-Z0-9_]*$/;
    if (!username.match(pattern)) {
        throw 'username should contain only alphanumeric characters';
    }
    const usersCollection = await users();

    let retrivedPass;
    let findAny = [];

    const userList = await usersCollection.find({}).toArray();

    for (let found of userList) {
        if (found.username === username.toLowerCase()) {
            findAny.push(found);
        }
    }

    if (findAny.length === 0) {
        throw "Either the username or password is invalid";
    }

    retrivedPass = findAny[0].password;

    let compareToHash = false;
    compareToHash = await bcrypt.compare(password, retrivedPass);

    if (compareToHash) {
        return { authenticated: true };
    } else {
        throw "Either the username or password is invalid";
    }

}


module.exports = {
    createUser,
    checkUser
};