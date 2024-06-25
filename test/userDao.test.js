import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";
import Assert from "assert";
// import { describe, it } from "mocha";

const connection = mongoose.connect(
    `mongodb+srv://Cluster1:Qwerty123@cluster0.cewleq6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

const assert = Assert.strict;

describe("AdoptMe user DAO test", async function () {
    this.timeout(5000);

    before(async function () {
        this.userDao = new Users();
    });

    beforeEach(async function () {
        await mongoose.connection
            .collection("users")
            .deleteMany({ email: "homeroS@test.com" });
    });

    it("DAO must return an array of user when GET method is called", async function () {
        const result = await this.userDao.get();

        assert.strictEqual(Array.isArray(result), true);
    });

    it("DAO, save method must save an user", async function () {
        const testUser = {
            first_name: "Homero",
            last_name: "Simpson",
            email: "homeroS@test.com",
            password: "123",
        };

        const result = await this.userDao.save(testUser);

        assert.ok(result._id);
        assert.ok(result.first_name);
        assert.equal(result.first_name, "Homero");
        assert.strictEqual(result.first_name, testUser.first_name);
    });
});
