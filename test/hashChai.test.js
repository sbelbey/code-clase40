import chai from "chai";
import { createHash, passwordValidation } from "../src/utils/index.js";

const expect = chai.expect;

describe("Hash functions test", () => {
    it("Should check that the password is hashed corretly", async () => {
        const password = "12321";
        const result = await createHash(password);

        expect(result.substring(0, 4)).to.be.equal("$2b$");
        expect(result).not.to.be.equal("Qwerty123!");
    });

    it("Should check that the password is validated correctly", async () => {
        const password = "12321";
        const userTest = { password: await createHash(password) };

        const result = await passwordValidation(userTest, password);

        expect(result).to.be.eq(false);
        expect(result).to.be.true;
    });
});
