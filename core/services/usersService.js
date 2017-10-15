'use strict';

class User {
    constructor(userData) {
        this.id = userData.id;
        this.first_name = userData.first_name;
        this.last_name = userData.last_name;
        this.password = userData.password;
        this.role_id = userData.role_id;
        this.photo = userData.photo;
        this.sex = userData.sex;
        this.screen_name = userData.screen_name;
    }
}

var users = [
];

var service = {
    getUserObject(userData) {
        return new User(userData);
    },
    getUsers() {
        return Promise.resolve(users);
    },
    getUser(userId) {
        return Promise.resolve(users[0]);
    },
    getUserById(email) {
        return Promise.resolve(users[0]);
    },
    insertUser(user) {
        user.id = users.length + 1;
        users.push(user);
        return Promise.resolve(user.id);
    }
};

module.exports = service;