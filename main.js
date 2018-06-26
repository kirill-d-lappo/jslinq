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

function Calculator(){
  var functions = {};
  functions["+"] = (left, right) => left + right;

  this.calculate = (mathExpression) => {
    var expressionParts = mathExpression.split(" ");// скипанем валидацию
    var operator =  expressionParts[1];
    if (operator == undefined){
      throw "Operation is not supported: " + operator;
    }
    return functions[operator](+expressionParts[0], +expressionParts[2]);
  };

  this.addMethod = (operator, func) => {
    functions[operator] = func;
  }
}

var calc = new Calculator;

var powerCalc = new Calculator;
powerCalc.addMethod("*", function(a, b) {
  return a * b;
});
powerCalc.addMethod("/", function(a, b) {
  return a / b;
});
powerCalc.addMethod("**", function(a, b) {
  return Math.pow(a, b);
});

var result = powerCalc.calculate("2 ** 3");
alert( result ); // 8