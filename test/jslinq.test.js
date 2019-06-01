require("../jslinq");
const chai = require("chai");

const expect = chai.expect;

describe("Array element integration", () => {
  const array = [1, 2, 3];
  it("array has seq() function", () => {
    expect(array.seq).to.not.equal(undefined);
    expect(typeof array.seq).to.equal("function");
  });
});

describe("Positive Flow", () => {
  // Arrange
  const tenSource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("where() : array has subset for condition : correct subset is returned", function() {
    var result = tenSource
      .seq()
      .where(i => i == 5)
      .toArray();

    expect(1).to.equal(result.length);
    expect(5).to.equal(result[0]);
  });

  it("count() : array not empty : correct value is returned", function() {
    var result = tenSource.seq().count();

    expect(10).to.equal(result);
  });

  it("count(condition) : array has subset for condition : correct value is returned", function() {
    var result = tenSource.seq().count(i => i % 2);

    expect(5).to.equal(result);
  });

  it("any() : array is not empty : true is returned", function() {
    var result = tenSource.seq().any();

    expect(true).to.equal(result);
  });

  it("any() : array is empty : false is returned", function() {
    var result = [].seq().any();

    expect(false).to.equal(result);
  });

  it("all(condition) : all items are correct : true is returned", function() {
    var result = tenSource.seq().all(i => i > 0);

    expect(true).to.equal(result);
  });

  it("concat(secondArray) : items are concatenated", function() {
    var secondArray = [42, 3.14, 88];
    var result = tenSource
      .seq()
      .concat(secondArray)
      .toArray();

    expect(secondArray.length + tenSource.length).to.equal(result.length);
  });

  it("contains(item) : array contains item : true is returned", function() {
    var result = tenSource.seq().contains(5);

    expect(true).to.equal(result);
  });

  it("elementAt(index) : array contains item : correct value is returned", function() {
    var result = tenSource.seq().elementAt(5);

    expect(6).to.equal(result);
  });

  it("toKeyValue(index) : array is converted correctly", function() {
    var result = tenSource.seq().toKeyValue(i => "i" + i, i => (i * 3) / 2);

    expect(result["i1"]).to.equal((1 * 3) / 2);
    expect(result["i2"]).to.equal((2 * 3) / 2);
    expect(result["i3"]).to.equal((3 * 3) / 2);
    expect(result["i4"]).to.equal((4 * 3) / 2);
  });

  it("distinct() : unique elements remained only", function() {
    var result = [2, 3, 2, 3, 2, 4]
      .seq()
      .distinct()
      .toArray();

    expect(3).to.equal(result.length);
    expect(true).to.equal(result.includes(2));
    expect(true).to.equal(result.includes(3));
    expect(true).to.equal(result.includes(4));
  });
});
