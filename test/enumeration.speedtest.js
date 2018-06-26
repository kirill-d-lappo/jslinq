"use strict";

const enumerate = require("./enumeration").enumerate;
const iterate = require("./enumeration.iterator").iterate;
const now = require("performance-now");
const fs = require('fs');

function alert(value){
  console.log(value);
}



function measureTime(array){
  fs.appendFile("C:/Games/results.csv", "number,enumerate,iterate\n");
  for (let i = 0; i < 100; i++) {
    var iteration = i;
    var length = 0;
    var res = [];
    for (let j = 1; j < arguments.length; j++) {
      var func = arguments[j];
      var startTime = now();

      var value = func(array)
        .where(u => u.age > 30)
        .select(u => u.surname)
        .firstWhere(n => n.length > 5);

      var endTime = now();
      length = endTime - startTime;
      res.push(length);
    }
    fs.appendFile("C:/Games/results.csv", "" + iteration + "," + res[0] + "," + res[1] + "\n", ()=>{});
  }

}

var users = [
      {
        "age": 21,
        "name": "Douglas",
        "surname": "Fuller"
      },
      {
        "age": 36,
        "name": "Sykes",
        "surname": "Norman"
      },
      {
        "age": 35,
        "name": "Rachel",
        "surname": "Hale"
      },
      {
        "age": 27,
        "name": "Burns",
        "surname": "Clark"
      },
      {
        "age": 35,
        "name": "Deanne",
        "surname": "Crawford"
      },
      {
        "age": 27,
        "name": "Roberts",
        "surname": "Casey"
      },
      {
        "age": 23,
        "name": "Andrea",
        "surname": "Chan"
      },
      {
        "age": 39,
        "name": "Daugherty",
        "surname": "Becker"
      },
      {
        "age": 22,
        "name": "Gena",
        "surname": "Wilkinson"
      },
      {
        "age": 26,
        "name": "Rosales",
        "surname": "Sloan"
      },
      {
        "age": 25,
        "name": "Love",
        "surname": "Conley"
      },
      {
        "age": 35,
        "name": "Cline",
        "surname": "Madden"
      },
      {
        "age": 24,
        "name": "Tracy",
        "surname": "Mooney"
      },
      {
        "age": 23,
        "name": "Billie",
        "surname": "Vargas"
      },
      {
        "age": 25,
        "name": "Bobbie",
        "surname": "Nielsen"
      },
      {
        "age": 20,
        "name": "Mcclure",
        "surname": "Barber"
      },
      {
        "age": 35,
        "name": "Harrell",
        "surname": "Monroe"
      },
      {
        "age": 27,
        "name": "Crystal",
        "surname": "Guzman"
      },
      {
        "age": 28,
        "name": "Romero",
        "surname": "English"
      },
      {
        "age": 35,
        "name": "Lowery",
        "surname": "Malone"
      },
      {
        "age": 27,
        "name": "Elsie",
        "surname": "Meyers"
      },
      {
        "age": 23,
        "name": "Christy",
        "surname": "Skinner"
      },
      {
        "age": 32,
        "name": "Adele",
        "surname": "Parrish"
      },
      {
        "age": 32,
        "name": "Tracey",
        "surname": "Carney"
      },
      {
        "age": 22,
        "name": "Kennedy",
        "surname": "Riddle"
      },
      {
        "age": 34,
        "name": "Alma",
        "surname": "Ortega"
      },
      {
        "age": 34,
        "name": "Haley",
        "surname": "Dale"
      },
      {
        "age": 24,
        "name": "Antonia",
        "surname": "Swanson"
      },
      {
        "age": 21,
        "name": "Cheryl",
        "surname": "Walton"
      },
      {
        "age": 38,
        "name": "Ellison",
        "surname": "Kinney"
      },
      {
        "age": 20,
        "name": "Jeanette",
        "surname": "Hill"
      },
      {
        "age": 33,
        "name": "Ruth",
        "surname": "Levy"
      },
      {
        "age": 33,
        "name": "Durham",
        "surname": "Riggs"
      },
      {
        "age": 20,
        "name": "Moody",
        "surname": "Goff"
      },
      {
        "age": 29,
        "name": "Lorrie",
        "surname": "Wynn"
      },
      {
        "age": 24,
        "name": "Finley",
        "surname": "Richards"
      },
      {
        "age": 29,
        "name": "Brandie",
        "surname": "Nelson"
      },
      {
        "age": 40,
        "name": "Ewing",
        "surname": "Blevins"
      },
      {
        "age": 40,
        "name": "Alberta",
        "surname": "Yates"
      },
      {
        "age": 32,
        "name": "Nieves",
        "surname": "Gamble"
      },
      {
        "age": 30,
        "name": "Jeri",
        "surname": "Soto"
      },
      {
        "age": 32,
        "name": "Tammi",
        "surname": "Aguirre"
      },
      {
        "age": 26,
        "name": "Velez",
        "surname": "Mccarthy"
      },
      {
        "age": 25,
        "name": "Beatriz",
        "surname": "Walter"
      },
      {
        "age": 30,
        "name": "Keisha",
        "surname": "Shelton"
      },
      {
        "age": 33,
        "name": "Mcintyre",
        "surname": "Day"
      },
      {
        "age": 31,
        "name": "Welch",
        "surname": "Juarez"
      },
      {
        "age": 20,
        "name": "Whitehead",
        "surname": "Booth"
      },
      {
        "age": 21,
        "name": "Dale",
        "surname": "Tyson"
      },
      {
        "age": 28,
        "name": "Lane",
        "surname": "Boyle"
      },
      {
        "age": 22,
        "name": "Kemp",
        "surname": "Mcgee"
      },
      {
        "age": 23,
        "name": "Riggs",
        "surname": "Mcclain"
      },
      {
        "age": 36,
        "name": "Cora",
        "surname": "Mann"
      },
      {
        "age": 37,
        "name": "Marjorie",
        "surname": "Tate"
      },
      {
        "age": 20,
        "name": "Nina",
        "surname": "Zimmerman"
      },
      {
        "age": 25,
        "name": "Allen",
        "surname": "Molina"
      },
      {
        "age": 23,
        "name": "Melissa",
        "surname": "Le"
      },
      {
        "age": 36,
        "name": "Deanna",
        "surname": "Kramer"
      },
      {
        "age": 36,
        "name": "Kimberly",
        "surname": "Best"
      },
      {
        "age": 20,
        "name": "Palmer",
        "surname": "Mercer"
      },
      {
        "age": 26,
        "name": "Freeman",
        "surname": "Lester"
      },
      {
        "age": 33,
        "name": "David",
        "surname": "Daniel"
      },
      {
        "age": 22,
        "name": "Katherine",
        "surname": "Richmond"
      },
      {
        "age": 34,
        "name": "Lorna",
        "surname": "Hendrix"
      },
      {
        "age": 36,
        "name": "Randall",
        "surname": "Macias"
      },
      {
        "age": 21,
        "name": "Madge",
        "surname": "Kirk"
      },
      {
        "age": 23,
        "name": "Sanchez",
        "surname": "Hansen"
      },
      {
        "age": 31,
        "name": "Carr",
        "surname": "Fulton"
      },
      {
        "age": 24,
        "name": "Murray",
        "surname": "Summers"
      },
      {
        "age": 26,
        "name": "Harrison",
        "surname": "Franklin"
      },
      {
        "age": 37,
        "name": "Gordon",
        "surname": "Duke"
      },
      {
        "age": 36,
        "name": "Solomon",
        "surname": "Price"
      },
      {
        "age": 30,
        "name": "Ortiz",
        "surname": "Waller"
      },
      {
        "age": 32,
        "name": "Ellen",
        "surname": "Giles"
      },
      {
        "age": 33,
        "name": "Consuelo",
        "surname": "Benjamin"
      },
      {
        "age": 37,
        "name": "Cohen",
        "surname": "Stanton"
      },
      {
        "age": 23,
        "name": "Mitchell",
        "surname": "Goodman"
      },
      {
        "age": 26,
        "name": "Gabriela",
        "surname": "Morales"
      },
      {
        "age": 37,
        "name": "Melba",
        "surname": "Webster"
      },
      {
        "age": 22,
        "name": "Natasha",
        "surname": "Padilla"
      },
      {
        "age": 26,
        "name": "Althea",
        "surname": "Robertson"
      },
      {
        "age": 22,
        "name": "Stephenson",
        "surname": "Humphrey"
      },
      {
        "age": 20,
        "name": "Mcgee",
        "surname": "Meyer"
      },
      {
        "age": 34,
        "name": "Isabel",
        "surname": "Noel"
      },
      {
        "age": 34,
        "name": "Benjamin",
        "surname": "Dotson"
      },
      {
        "age": 32,
        "name": "Bush",
        "surname": "Ewing"
      },
      {
        "age": 38,
        "name": "Terry",
        "surname": "Chen"
      },
      {
        "age": 22,
        "name": "Evans",
        "surname": "Schneider"
      },
      {
        "age": 30,
        "name": "Church",
        "surname": "Vincent"
      },
      {
        "age": 21,
        "name": "Estelle",
        "surname": "Contreras"
      },
      {
        "age": 28,
        "name": "Hannah",
        "surname": "Wheeler"
      },
      {
        "age": 22,
        "name": "Julie",
        "surname": "Watson"
      },
      {
        "age": 29,
        "name": "Leach",
        "surname": "Vinson"
      },
      {
        "age": 35,
        "name": "Essie",
        "surname": "Solomon"
      },
      {
        "age": 36,
        "name": "Stacey",
        "surname": "Wilder"
      },
      {
        "age": 29,
        "name": "Rice",
        "surname": "Sykes"
      },
      {
        "age": 37,
        "name": "Richardson",
        "surname": "Montgomery"
      },
      {
        "age": 32,
        "name": "Sharp",
        "surname": "Crane"
      },
      {
        "age": 31,
        "name": "Trisha",
        "surname": "Robbins"
      },
      {
        "age": 21,
        "name": "Rene",
        "surname": "Washington"
      }
    ];

    measureTime(users, enumerate, iterate)