/** @format */

const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
    it("should add new user", () => {
        var users = new Users();

        var user = {
            id: 123,
            name: "gaurav",
            room: "my room",
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        console.log("TCL:: resUser", resUser);

        expect(users.users).toEqual([user]);
    });
});