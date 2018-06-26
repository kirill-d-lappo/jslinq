"use strict";


function Iterator(array) {
  var index = -1;
  this.moveNext = function () {
    return index < array.length
      ? ++index < array.length
      : false;
  };

  this.current = function () {
    return index >= 0 && index < array.length
      ? array[index]
      : undefined;
  };
}


function whereIterator(iterator, whereFunc) {
  return {
    moveNext: function () {
      var wasMoved = true;
      while ((wasMoved = iterator.moveNext()) && !whereFunc(iterator.current())) {
      }

      return wasMoved;
    },
    current: function () {
      return iterator.current();
    }
  };
}

function selectIterator(iterator, predicate) {
  return {
    moveNext: function () {
      return iterator.moveNext();
    },
    current: function () {
      return predicate(iterator.current());
    }
  };
}

function distinctIterator(iterator) {
  var buffer = [];
  return {
    moveNext: function () {
      while(iterator.moveNext()) {
        var current = iterator.current();
        if (!buffer.includes(current)) {
          buffer.push(current);
          return true;
        }
      }

      return false;
    },
    current: function () {
      return iterator.current();
    }
  };
}

function skipIterator(iterator, count) {
  return {
    moveNext: function () {
      var lastMoved = true;
      while ((lastMoved = iterator.moveNext()) && count > 0) {
        count--;
      }
      return lastMoved;
    },
    current: function () {
      return iterator.current();
    }
  };
}

function takeIterator(iterator, count) {
  return {
    moveNext: function () {
      if (count <= 0) {
        return false;
      }

      count--;
      return iterator.moveNext();
    },
    current: function () {
      return iterator.current();
    }
  };
}

function reverseIterator(iterator) {
  var buffer = toArray(iterator).reverse();
  return new Iterator(buffer);
}

function toArray(iterator) {
  var array = [];
  while (iterator.moveNext()) {
    array.push(iterator.current());
  }

  return array;
}

function toKeyValue(iterator, keyFunc, valueFunc) {
  var keyValues = {};
  while (iterator.moveNext()) {
    var current = iterator.current();
    keyValues[keyFunc(current)] = valueFunc(current);
  }

  return keyValues;
}

function sum(iterator) {
  if (!iterator.moveNext()) {
    return null;
  }

  var result = iterator.current();
  while (iterator.moveNext()) {
    result += iterator.current();
  }

  return result;
}

function firstWhere(iterator, condition) {
  while (iterator.moveNext()) {
    var current = iterator.current();
    if (!condition || condition(current)) {
      return current;
    }
  }

  return undefined;
}

function allWhere(iterator, condition) {
  while (iterator.moveNext()) {
    var current = iterator.current();
    if (!condition(current)) {
      return false;
    }
  }

  return true;
}

function anyWhere(iterator, condition) {
  if (!condition) {
    return iterator.moveNext();
  }

  while (iterator.moveNext()) {
    var current = iterator.current();
    if (condition(current)) {
      return true;
    }
  }

  return false;
}

function concatIterator(firstIterator, secondIterator) {
  var currentIterator = firstIterator;
  return {
    moveNext: function () {
      var isMovedNext = currentIterator.moveNext();
      if (!isMovedNext && currentIterator !== secondIterator) {
        currentIterator = secondIterator;
        isMovedNext = currentIterator.moveNext();
      }

      return isMovedNext;
    },
    current: function () {
      return currentIterator.current();
    }
  };
}

function containsItem(iterator, item) {
  return !!firstWhere(iterator, i => i === item);
}

function countWhere(iterator, condition) {
  var count = 0;
  while (iterator.moveNext()) {
    if (!condition || condition(iterator.current())) {
      count++;
    }
  }

  return count;
}

function elementAt(iterator, index) {
  while (iterator.moveNext() && index-- > 0) {
  }

  return index > 0 ? undefined : iterator.current();
}

function lastWhere(iterator, condition) {

  var lastItem;
  while (iterator.moveNext()) {
    var current = iterator.current();
    if (!condition || condition(current)) {
      lastItem = current;
    }
  }

  return lastItem;
}

function _iterate(iterator) {
  return {
    where: (condition) => _iterate(whereIterator(iterator, condition)),
    select: (predicate) => _iterate(selectIterator(iterator, predicate)),
    skip: (count) => _iterate(skipIterator(iterator, count)),
    skipWhile: (condition) => { },
    take: (count) => _iterate(takeIterator(iterator, count)),
    takeWhile: (condition) => { },
    sum: () => sum(iterator), // type problems, not working
    first: (condition) => firstWhere(iterator, condition),
    all: (condition) => allWhere(iterator, condition),
    any: (condition) => anyWhere(iterator, condition),
    concat: (secondArray) => _iterate(concatIterator(iterator, new Iterator(secondArray))),
    contains: (item) => containsItem(iterator, item),
    count: (condition) => countWhere(iterator, condition),
    distinct: () => _iterate(distinctIterator(iterator)),
    elementAt: (index) => elementAt(iterator, index),
    last: (condition) => lastWhere(iterator, condition),
    reverse: () => _iterate(reverseIterator(iterator)),
    toKeyValue: (keyFunc, valueFunc) => toKeyValue(iterator, keyFunc, valueFunc),
    toArray: () => toArray(iterator)
  };
}

module.exports = {
  iterate: (array) => _iterate(new Iterator(array))
}

