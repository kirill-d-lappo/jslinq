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
|`.asEnumerable()`|Special function, which returns linq object. Entrypoint for all other functions, which are described here.|Iterable object
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
|`.first()`|Returns first item from sequence|Item
|`.first(function)`|Returns first item from sequence, when `function` returns `true`|Item
|`.last()`|Returns last item from sequence|Item
|`.last(function)`|Returns last item from sequence, when `function` returns `true`|Item
|`.all(function)`|Returns `true` when `function` returns `true` for all items in a sequence, `false` otherwise.|boolean
|`.any()`|Returns `true` when sequence has at least one element, `false` otherwise.|boolean
|`.any(function)`|Returns `true` when `function` returns `true` for at least one item in a sequence, `false` otherwise.|boolean
|`.aggregate(function, object)`|Similar to popular `reduce` function. Returns aggregated value, which is constructed with sequence items, `function(currentResult, nextItem)` and initial value `object`.|Object
|`.count()`|Returns amount of elements in a sequence.|number
|`.count(function)`|Returns amount of elements in a sequence for which `function(item)` returns `true`.|number
|`.contains(object)`|Returns `true` when sequence contains `object`, `false` otherwise.|boolean
|`.elementAt(index)`|Returns `index`th object in a sequence.|Object
|`.toKeyValue(keyFunction, valueFunction)`|Converts a sequence in to a key-value object using `keyFunction(item)` and `valueFunction(item)`.|Object
|`.toArray()`|Converts a sequence into an array.|Array
|`.toArray(function)`|Converts a sequence into an array using a value function `function(item)`.|Array
