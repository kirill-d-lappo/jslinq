# jslinq

## Description

Yet another LINQ adaptation on JS. Created for arrays only and bases on js iterators.

Very early and unfinished; do I have much time to complete it?...

**NOTE**: All equality operations are done with `===` operator, SameValue equality is not used.

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

## Functions

|Function|Description|Returns
|-|-|-|
|`.asEnumerable()`|Special function, which returns linq object|Iterable object
| `.select(function)`|Similar to `array.map` function, reflects array into another array using `function`|Iterable object
|`.where(function)`|Similar to `filter` functions, it filters items in aray using `function`|Iterable object
|`.skip(number)`|Skips first `number` items in array|Iterable object
|`.skip(function)`|Skips first items in array untill `function` returns true|Iterable object
|`.skip(object)`|Skips first items in array untill items are not equal to `object`|Iterable object
|`.take(number)`|Takes first `number` items in array|Iterable object
|`.take(function)`|Takes first items in array untill `function` returns false|Iterable object
|`.take(object)`|Skips first items in array untill items are not equal to `object`|Iterable object
|`.takeUnit(unitIndex, unitSize)`|Takes sub-array. Original arrays is splited by `unitSize` groups of items and `unitIndex`th group is returned|Iterable object
|`.concat(array)`|Continues original array with `array`|Iterable object
|`.distinct(array)`|Returns sequences with unique items|Iterable object
||
|`.first(array)`|Returns sequences with unique items|Iterable object
