var chai = require('chai');
const expect = chai.expect;
const enumerate = require('./../enumeration');

// Arrange
var tenSource = [1,2,3,4,5,6,7,8,9,10];

// Defines a Mocha test suite to group tests of similar kind together
describe("Enumeration Tests", function() {

  it("where() positive test", function() {
    // Act
    var result = enumerate.from(tenSource)
        .where(i => i == 5)
        .toArray();

    // Assert
    expect(1).to.equal(result.length);
    expect(5).to.equal(result[0]);
  });
});