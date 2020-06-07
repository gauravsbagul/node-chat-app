/** @format */

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users = [...this.users, user];
        return user;
    }

    removeUser(id) {
        // return user that was removed
        var user = this.getUser(id);
        if (user) {
            var newUsers = this.users.filter((user) => user.id !== id);
            this.users = [...newUsers];
        }
        return user;
    }

    getUser(id) {
        // return user
        var user = this.users.filter((user) => user.id === id);
        return user;
    }

    getUserList(room) {
        //returns the list of users
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = { Users };