function _getIterator(instance) {
  return instance[Symbol.iterator]();
}

function* whereIterator(iterator, condition) {
  let next;
  while (!(next = iterator.next()).done) {
    if (condition(next.value)) {
      yield next.value;
    }
  }
}

function* selectIterator(iterator, projection) {
  let next;
  while (!(next = iterator.next()).done) {
    yield projection(next.value);
  }
}

function* skipIterator(iterator, count) {
  var innerIterator = skipWhileIterator(iterator, () => --count > 0);
  let next;
  while (!(next = innerIterator.next()).done) {
    yield next.value;
  }
}

function* skipWhileIterator(iterator, predicate) {
  let next;
  while (!(next = iterator.next()).done && predicate(next.value)) {
    // eslint-disable-next-line no-empty
  }

  while (!(next = iterator.next()).done) {
    yield next.value;
  }
}

function* takeIterator(iterator, count) {
  let innerIterator = takeWhileIterator(iterator, () => count-- > 0);
  let next;
  while (!(next = innerIterator.next()).done) {
    yield next.value;
  }
}

function* takeWhileIterator(iterator, predicate) {
  let next;
  while (!(next = iterator.next()).done && predicate(next.value)) {
    yield next.value;
  }
}

function takeUnitIterator(iterator, unitIndex, unitSize) {
  return takeIterator(skipIterator(iterator, unitIndex * unitSize), unitSize);
}

function* concatIterator(iterator, secondIterator) {
  let next;
  while (!(next = iterator.next()).done) {
    yield next.value;
  }

  while (!(next = secondIterator.next()).done) {
    yield next.value;
  }
}

function* distinctIterator(iterator) {
  let next;
  let map = [];
  while (!(next = iterator.next()).done) {
    if (!map.includes(next.value)) {
      map.push(next.value);
      yield next.value;
    }
  }
}

function firstWhere(iterator, predicate) {
  let next;
  while (!(next = iterator.next()).done) {
    if (!predicate || predicate(next.value)) {
      return next.value;
    }
  }
}

function lastWhere(iterator, predicate) {
  let next;
  let last;
  while (!(next = iterator.next()).done) {
    if (!predicate || predicate(next.value)) {
      last = next.value;
    }
  }

  return last;
}

function allWhere(iterator, predicate) {
  let next;
  while (!(next = iterator.next()).done) {
    if (!predicate(next.value)) {
      return false;
    }
  }

  return true;
}

function anyWhere(iterator, predicate) {
  let next;
  while (!(next = iterator.next()).done) {
    if (!predicate || predicate(next.value)) {
      return true;
    }
  }

  return false;
}

function countWhere(iterator, predicate) {
  let next;
  let count = 0;
  while (!(next = iterator.next()).done) {
    if (!predicate || predicate(next.value)) {
      count++;
    }
  }

  return count;
}

function aggregate(iterator, updateResult, initValue) {
  let result = initValue;
  let next;
  while (!(next = iterator.next()).done) {
    result = updateResult(result, next.value);
  }

  return result;
}

function toArray(iterator, valueFunc) {
  let result = [];
  let next;
  let currentValue;

  while (!(next = iterator.next()).done) {
    currentValue = valueFunc ? valueFunc(next.value) : next.value;

    result.push(currentValue);
  }

  return result;
}

function toKeyValue(iterator, keyFunc, valueFunc) {
  let result = {};
  let next;
  while (!(next = iterator.next()).done) {
    result[keyFunc(next.value)] = valueFunc(next.value);
  }

  return result;
}

function _iterate(iterator) {
  return {
    where: condition => _iterate(whereIterator(iterator, condition)),
    select: projection => _iterate(selectIterator(iterator, projection)),

    skip: count => _iterate(skipIterator(iterator, count)),
    skipWhile: condition => _iterate(skipWhileIterator(iterator, condition)),
    take: count => _iterate(takeIterator(iterator, count)),
    takeWhile: condition => _iterate(takeWhileIterator(iterator, condition)),
    takeUnit: (unitIndex, unitSize) =>
      _iterate(takeUnitIterator(iterator, unitIndex, unitSize)),

    first: condition => firstWhere(iterator, condition),
    last: condition => lastWhere(iterator, condition),

    all: condition => allWhere(iterator, condition),
    any: condition => anyWhere(iterator, condition),
    concat: secondArray =>
      _iterate(concatIterator(iterator, _getIterator(secondArray))),
    distinct: () => _iterate(distinctIterator(iterator)),

    // Conclusion functions, which doesn't return iterator
    aggregate: (resultNextFunc, seed) =>
      aggregate(iterator, resultNextFunc, seed),
    count: condition => countWhere(iterator, condition),
    contains: item => anyWhere(iterator, i => i === item),
    elementAt: index => firstWhere(iterator, () => index-- <= 0),
    toKeyValue: (keyFunc, valueFunc) =>
      toKeyValue(iterator, keyFunc, valueFunc),
    toArray: valueFunc => toArray(iterator, valueFunc)
  };
}

Array.prototype.asEnumerable = function() {
  return _iterate(_getIterator(this));
};
