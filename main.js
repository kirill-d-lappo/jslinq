"use strict";

const enumerate = require("./enumeration");

function alert(value){
  console.log(value);
}

/* .. ваш код для filter, inBetween, inArray */
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

var users = [{
  name: "Вася",
  surname: 'Иванов',
  age: 20
}, {
  name: "Петя",
  surname: "Чапаев",
  age: 25
}, {
  name: "Маша",
  surname: "Медведева",
  age: 18
}];

var result = enumerate.from(users)
  .where(u => u.age > 18)
  .select(u => u.age)
  .sum();

alert( result); // 5,6,7