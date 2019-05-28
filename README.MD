# jslinq

## Description

Yet another LINQ adaptation on JS. Created for arrays only and bases on js iterators.

Very early and unfinished; do I have much time to complete it?...

## Usage

```javascript
require("jslinq");

let array = [1, 2, 3, 4, 5, 6];
let filteredValues = array.asEnumerable() // ["x2", "x4", "x6"]
    .where(r => !(r % 2))  // just iterator
    .select(r => `x${r}`) // just iterator
    .toArray(); // result array is created only at that step

array = [1, 2, 3, 4, 5, 6];
let areInFirstTenth = array.asEnumerable() // true, all are < 10
    .all(i => i < 10);

let a = [1, 2, 3];
let b = [4, 5, 6];
let aAndB = a.asEnumerable() // ["1", "2", "3", "4", "5", "6"]
    .concat(b) // concat iterator here
    .toArray(i => i.toString()); // result array is created only here
```
