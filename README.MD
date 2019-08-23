# jsSequence

## Description

Yet another Enumerable adaptation on JS. Created for arrays only and bases on js iterators.

Very early and unfinished; do I have much time to complete it?...

**NOTE**: All equality operations are done with `===` operator, SameValue equality is not used.

## Examples

```javascript
require("jssequence");

let users = [
    {id:1, name:"Rick",  type:"grandpa", age:55, isActive:true},
    {id:2, name:"Morty", type:"boy", age:15, isActive:true},
    {id:2, name:"Jerry", type:undefined, age:28, isActive:false},
];

// Filtering and reflection
let activeUserIds = array
    // accessing to linq-like functions
    .seq()
    // It doesn't create a new array at this point
    // It just keeps info about sorting
    .where(u => u.isActive)
    // Just keeping info about selection, no new array here
    .select(u => u.id)
    // New array is created here, [1, 2]
    .toArray();

// Lets find an age of the first user which has 5 letters in his name
// Yeah, I'm a pervert
let fiveLetterUserAge = users.seq()
    .first(u => u.name.length === 5)
    .age;

// Combine user names, who is old enough ( >= 18)
let adultSwimUsers = users.seq()
    .where(u => u.age >= 18)
    .aggregate(
        (result, nextUser) => result + nextUser.name,
        "");

// Any granda here
let hasAnyGrandpaCharacter = users.seq()
    .where(u => u.type === "grandpa")
    .any()

// Or the expression could be shorter
hasAnyGrandpaCharacter = users.seq()
    .any(u => u.type === "grandpa")
```

## Functions

Function|Description|Returns
-|-|-
`.seq()`|Special function, which returns sequence object. Entrypoint for ll other functions, which are described here.|Sequence Object
 `.select(function)`|Similar to `array.map` function, reflects sequence nto another sequence using `function`|Sequence Object
`.where(function)`|Similar to `filter` functions, it filters items in a equence using `function`|Sequence Object
`.skip(number)`|Skips first `number` items in a sequence.|Sequence Object
`.skip(function)`|Skips first items in a sequence untill `function` returns true|Sequence Object
`.skip(object)`|Skips first items in a sequence untill items are not qual to `object`|Sequence Object
`.take(number)`|Takes first `number` items in a sequence|Sequence Object
`.take(function)`|Takes first items in a sequence untill `function` returns false|Sequence Object
`.take(object)`|Skips first items in a sequence untill items are not qual to `object`|Sequence Object
`.takeUnit(unitIndex, unitSize)`|Takes sub-sequence. Original sequence s splited by `unitSize` groups of items and `unitIndex`th group is eturned|Sequence Object
`.concat(array)`|Continues original sequence with array|Sequence Object
`.distinct(array)`|Returns sequence with unique items|Sequence Object
||
`.first()`|Returns first item from a sequence|Item
`.first(function)`|Returns first item from sequence, when `function` returns `true`|Item
`.last()`|Returns last item from sequence|Item
`.last(function)`|Returns last item from sequence, when `function` returns `true`|Item
`.single(function)`|Returns the only item from sequence, which makes `function` return `true`|Item
`.all(function)`|Returns `true` when `function` returns `true` for all tems in a sequence, `false` otherwise.|boolean
`.any()`|Returns `true` when sequence has at least one element, `false` therwise.|boolean
`.any(function)`|Returns `true` when `function` returns `true` for at east one item in a sequence, `false` otherwise.|boolean
`.aggregate(function, object)`|Similar to popular `reduce` function. Returns aggregated value, which is constructed with sequence items, `function(currentResult, nextItem)` and initial value `object`.|Object
`.count()`|Returns amount of elements in a sequence.|number
`.count(function)`|Returns amount of elements in a sequence for which `function(item)` returns `true`.|number
`.contains(object)`|Returns `true` when sequence contains `object`, `false` otherwise.|boolean
`.elementAt(index)`|Returns `index`th object in a sequence.|Object
`.toKeyValue(keyFunction, valueFunction)`|Converts a sequence in to a ey-value object using `keyFunction(item)` and `valueFunction(item)`.|bject
`.toArray()`|Converts a sequence into an array.|Array
`.toArray(function)`|Converts a sequence into an array using a value unction `function(item)`.|Array
