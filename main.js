"use strict";

const enumerate = require("./enumeration").enumerate;
const iterate = require("./enumeration.iterator").iterate;
const now = require("performance-now");
const fs = require('fs');


var s = 4;

function readNumber(){
  s += 3;
  return s;
}

function alert(value){
  console.log(value);
}

var tenSource = [1,2,3,4,5,6,7,8,9,10];


var result = iterate(tenSource)
  .count();

alert( result );