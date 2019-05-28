
function* whereIterator(iterator, condition) {
  let next;
  while(!(next = iterator.next()).done){
    if (condition(next.value)){
      yield next.value;
    }
  }
}

function* selectIterator(iterator, projection) {
  let next;
  while(!(next = iterator.next()).done){
    yield projection(next.value);
  }
}

function* skipIterator(iterator, count) {
  var innerIterator =  skipWhileIterator(iterator, () => --count > 0);
  let next;
  while(!(next = innerIterator.next()).done){
    yield next.value;
  }
}

function* skipWhileIterator(iterator, predicate) {
  let next;
  while(!(next = iterator.next()).done && predicate(next.value))
  {
  }

  while(!(next = iterator.next()).done){
    yield next.value;
  }
}

function* takeIterator(iterator, count) {
  let innerIterator = takeWhileIterator(iterator, () => count-- > 0);
  let next;
  while(!(next = innerIterator.next()).done){
    yield next.value;
  }
}

function* takeWhileIterator(iterator, predicate) {
  let next;
  while(!(next = iterator.next()).done && predicate(next.value)){
    yield next.value;
  }
}

function* concatIterator(iterator, secondIterator) {
  let next;
  while(!(next = iterator.next()).done){
    yield next.value;
  }

  while(!(next = secondIterator.next()).done){
    yield next.value;
  }
}

function* distinctIterator(iterator) {
  let next;
  let map = [];
  while(!(next = iterator.next()).done){
    if (!map.includes(next.value)){
      map.push(next.value);
      yield next.value;
    }
  }
}

function firstWhere(iterator, predicate) {
  let next;
  while(!(next = iterator.next()).done){
    if (!predicate || predicate(next.value)){
      return next.value;
    }
  }
}

function lastWhere(iterator, predicate) {
  let next;
  let last;
  while(!(next = iterator.next()).done){
    if (!predicate || predicate(next.value)){
      last = next.value;
    }
  }

  return last;
}

function allWhere(iterator, predicate) {
  let next;
  while(!(next = iterator.next()).done){
    if (!predicate(next.value)){
      return false;
    }
  }

  return true;
}

function anyWhere(iterator, predicate) {
  let next;
  while(!(next = iterator.next()).done){
    if (predicate(next.value)){
      return true;
    }
  }

  return false;
}

function countWhere(iterator, predicate) {
  let next;
  let count = 0;
  while(!(next = iterator.next()).done){
    if (!predicate || predicate(next.value)){
      count++;
    }
  }

  return count;
}

function aggregate(iterator, resultNextFunc, seed){
  let result = seed;
  let next;
  while(!(next = iterator.next()).done){
    result = resultNextFunc(result, next.value);
  }

  return result;
}


function toArray(iterator){
  let result = [];
  let next;
  while(!(next = iterator.next()).done){
    result.push(next.value);
  }

  return result;
}

function toKeyValue(iterator, keyFunc, valueFunc){
  let result = {};
  let next;
  while(!(next = iterator.next()).done){
    result[keyFunc(next.value)] = valueFunc(next.value);
  }

  return result;
}

function _iterate(iterator) {
  return {
    where: (condition) => _iterate(whereIterator(iterator, condition)),
    select: (predicate) => _iterate(selectIterator(iterator, predicate)),
    skip: (count) => _iterate(skipIterator(iterator, count)),
    skipWhile: (condition) => _iterate(skipWhileIterator(iterator, condition)),
    take: (count) => _iterate(takeIterator(iterator, count)),
    takeWhile: (condition) => _iterate(takeWhileIterator(iterator, condition)),
    aggregate: (resultNextFunc, seed) => aggregate(iterator, resultNextFunc, seed),
    first: (condition) => firstWhere(iterator, condition),
    firstWhere: (condition) => firstWhere(iterator, condition),
    all: (condition) => allWhere(iterator, condition),
    any: (condition) => anyWhere(iterator, condition),
    concat: (secondArray) => _iterate(concatIterator(iterator, secondArray[Symbol.iterator]())),
    contains: (item) => anyWhere(iterator, i => i === item),
    count: (condition) => countWhere(iterator, condition),
    distinct: () => _iterate(distinctIterator(iterator)),
    elementAt: (index) => firstWhere(iterator, () => index-- <= 0),
    last: (condition) => lastWhere(iterator, condition),
    // reverse: () => _iterate(reverseIterator(iterator)),
    toKeyValue: (keyFunc, valueFunc) => toKeyValue(iterator, keyFunc, valueFunc),
    toArray: () => toArray(iterator)
  };
}

module.exports = {
  iterate: (array) => _iterate(array[Symbol.iterator]())
};
