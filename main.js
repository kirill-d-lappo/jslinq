"use strict";

const enumerate = require("./enumeration").enumerate;
const iterate = require("./enumeration.iterator").iterate;
const iterateY = require("./enumeration.yield").iterate;
const now = require("performance-now");
const fs = require('fs');


var s = 4;

function readNumber() {
  s += 3;
  return s;
}

function alert(value) {
  console.log(value);
}

var tenSource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];


var result = iterateY(tenSource)
  // .skip(6)
  // .take(7)
  // .where(i => i % 2 == 0)
  // .select(i => "" + i + i*3)
  // .distinct()
  // .elementAt(3);
  // .last(i => i == 56)
  // .distinct()
  // .toKeyValue(i => i *2 + 1, i => i + 1)
  // .toArray()
  // .skip(40)
  .aggregate((sum, next) => sum + next, 0)
  ;

console.log(result);