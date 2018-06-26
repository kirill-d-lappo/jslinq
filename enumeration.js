"use strict";

function enumerateWhere(array, condition){
  var subset = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (condition(element)){
      subset.push(element);
    }
  }
  return subset;
}

function enumerateSelect(array, predicate){
  var projection = [];
  for (let i = 0; i < array.length; i++) {
    projection.push(predicate(array[i]));
  }

  return projection;
}

function enumerateCount(array){
  return array.length;
}

function enumerateSkip(array, count){
  if (count > array.length){
    return [];
  }

  var subset = [];
  for (let i = count; i < array.length; i++) {
    subset.push(array[i]);
  }

  return subset;
}

function enumerateTake(array, count){
  if (count <= 0){
    return [];
  }

  if (count >= array.length){
    return array;
  }

  var subset = [];
  for (let i = 0; i < count; i++) {
    subset.push(array[i]);
  }

  return subset;
}

function enumerateFirst(array){
  return enumerateFirstWhere(array, (e) => true);
}

function enumerateFirstWhere(array, condition){
  if (array.length <= 0){
    return null;
  }

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (condition(element)){
      return element;
    }
  }

  return null;
}


function enumerateLast(array){
  return enumerateLastWhere(array, (e) => true);
}

function enumerateLastWhere(array, condition){
  if (array.length <= 0){
    return null;
  }

  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    if (condition(element)){
      return element;
    }
  }

  return null;
}

function enumerateOrderBy(array, fieldFunc){
  array.sort((a, b) => {
    let fieldA = fieldFunc(a);
    let fieldB = fieldFunc(b);
    return fieldA > fieldB
      ? 1
      : fieldA < fieldB
        ? -1
        : 0
    }
  );

  return array;
}

function enumerateSort(array){
  array.sort();
  return array;
}

function enumerateSum(array){
  var sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }

  return sum;
}

function enumerateAggregation(array, initial, stepFunc){
    if (array.length <= 0){
        return initial;
    }

    var result = initial;
    array.forEach(element => {
        result = stepFunc(result, element);
    });

    return result;
}

  /**
 * Condition callback
 *
 * @param {array} array Array to _enumerate.
 * @return {enumeration} Enumeration with methods for enumeration
 */
function _enumerate(array){
  return {

    aggreate : (initial, stepFunc) => enumerateAggregation(array, initial, stepFunc),
    where  : (condition) => _enumerate(enumerateWhere(array, condition)),
    select : (predicate) => _enumerate(enumerateSelect(array, predicate)),
    skip : (count) => _enumerate(enumerateSkip(array, count)),
    take : (count) => _enumerate(enumerateTake(array, count)),
    first : () => enumerateFirst(array),
    firstWhere : (predicate) => enumerateFirstWhere(array, predicate),
    last : () => enumerateLast(array),
    lastWhere : (predicate) => enumerateLastWhere(array, predicate),
    orderBy : (fieldFunc) => _enumerate(enumerateOrderBy(array, fieldFunc)),
    sort : () => _enumerate(enumerateSort(array)),
    count : () => enumerateCount(array),
    sum : () => enumerateSum(array),
    toArray: () => array
  };
}

module.exports = {
  enumerate : (array) => _enumerate(array)
};

