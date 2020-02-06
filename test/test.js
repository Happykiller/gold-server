var assert = require('assert')

describe( "Test", () => {
    it("Test should be true", () => {
        var recieve = true
        var waiting = true
        assert.equal(recieve, waiting)
    });
});