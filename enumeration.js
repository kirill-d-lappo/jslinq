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

  for (let i = array.length; i >= 0; i++) {
    const element = array[i];
    if (condition(element)){
      return element;
    }
  }

  return null;
}


function enumerateOrderBy(array, fieldName){
  array.sort((a, b) =>
    a[fieldName] > b[fieldName]
      ? 1
      : a[fieldName] < b[fieldName]
        ? -1
        : 0
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

function createEnumeration(array){
  return {
    where  : (condition) => createEnumeration(enumerateWhere(array, condition)),
    select : (predicate) => createEnumeration(enumerateSelect(array, predicate)),
    skip : (count) => createEnumeration(enumerateSkip(array, count)),
    take : (count) => createEnumeration(enumerateTake(array, count)),
    first : () => createEnumeration(enumerateFirst(array)),
    firstWhere : (predicate) => enumerateFirstWhere(array, predicate),
    last : () => createEnumeration(enumerateLast(array)),
    lastWhere : (predicate) => enumerateLastWhere(array, predicate),
    orderBy : (fieldName) => createEnumeration(enumerateOrderBy(array, fieldName)),
    sort : () => createEnumeration(enumerateSort(array)),
    count : () => enumerateCount(array),
    sum : () => enumerateSum(array),
    toArray: () => array
  };
}

module.exports = {
  from : (array) => createEnumeration(array)
};