function _getIterator(instance) {
  return instance[Symbol.iterator]();
}

function* _getWhereIterator(iterator, condition) {
  let next;
  while (!(next = iterator.next()).done) {
    if (condition(next.value)) {
      yield next.value;
    }
  }
}

function* _getSelectIterator(iterator, projection) {
  let next;
  while (!(next = iterator.next()).done) {
    yield projection(next.value);
  }
}

function _getTakeIterator(iterator, param1) {
  if (typeof param1 === "function") {
    return _getTakeWhileIterator(iterator, param1);
  }

  if (typeof param1 === "number") {
    return _getTakeWhileIterator(iterator, () => --param1 > 0);
  }

  return _getTakeWhileIterator(iterator, i => i !== param1);
}

function _getSkipIterator(iterator, param1) {
  if (typeof param1 === "function") {
    return _getSkipWhileIterator(iterator, param1);
  }

  if (typeof param1 === "number") {
    return _getSkipWhileIterator(iterator, () => --param1 > 0);
  }

  return _getSkipWhileIterator(iterator, i => i !== param1);
}

function* _getSkipWhileIterator(iterator, predicate) {
  let next;
  while (!(next = iterator.next()).done && predicate(next.value)) {
    // eslint-disable-next-line no-empty
  }

  while (!(next = iterator.next()).done) {
    yield next.value;
  }
}

function* _getTakeWhileIterator(iterator, predicate) {
  let next;
  while (!(next = iterator.next()).done && predicate(next.value)) {
    yield next.value;
  }
}

function _getTakeUnitIterator(iterator, unitIndex, unitSize) {
  return _getTakeIterator(
    _getSkipIterator(iterator, unitIndex * unitSize),
    unitSize
  );
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

function toArray(iterator, getValueFunc) {
  let result = [];
  let next;
  getValueFunc =
    getValueFunc ||
    function(value) {
      return value;
    };

  while (!(next = iterator.next()).done) {
    result.push(getValueFunc(next.value));
  }

  return result;
}

function toKeyValue(iterator, getKeyFunc, getValueFunc) {
  let result = {};
  let next;

  while (!(next = iterator.next()).done) {
    result[getKeyFunc(next.value)] = getValueFunc(next.value);
  }

  return result;
}

function _iterate(iterator) {
  return {
    // Fitler and map
    where: condition => _iterate(_getWhereIterator(iterator, condition)),

    select: projection => _iterate(_getSelectIterator(iterator, projection)),

    skip: () =>
      _iterate(_getSkipIterator.apply(null, [iterator, ...arguments])),

    take: () =>
      _iterate(_getTakeIterator.apply(null, [iterator, ...arguments])),

    takeUnit: (unitIndex, unitSize) =>
      _iterate(_getTakeUnitIterator(iterator, unitIndex, unitSize)),

    concat: secondArray =>
      _iterate(concatIterator(iterator, _getIterator(secondArray))),

    distinct: () => _iterate(distinctIterator(iterator)),

    // Conclusion functions, which doesn't return iterator
    first: condition => firstWhere(iterator, condition),

    last: condition => lastWhere(iterator, condition),

    all: condition => allWhere(iterator, condition),

    any: condition => anyWhere(iterator, condition),

    aggregate: (resultNextFunc, seed) =>
      aggregate(iterator, resultNextFunc, seed),

    count: condition => countWhere(iterator, condition),

    contains: item => anyWhere(iterator, i => i === item),

    elementAt: index => firstWhere(iterator, () => index-- <= 0),

    toKeyValue: (keyFunc, valueFunc) =>
      toKeyValue(iterator, keyFunc, valueFunc),

    toArray: valueFunc => toArray(iterator, valueFunc)

    // not implemented yet

    // why not yet?
    // contains
    // average
    // sum

    // not so complex
    // single

    // Filters by type number, string, object.
    // ofType: valueType => { throw "ofType is not implemented. Params " + valueType; },

    // No idea how to implement
    // orderBy: getValueFunc => { throw "orderBy is not implemented. Params " + getValueFunc; },
    // thenBy: getValueFunc => { throw "thenBy is not implemented. Params " + getValueFunc; },

    // possible but gemorno
    // groupBy: getValueFunc => { throw "thenBy is not implemented. Params " + getValueFunc; },

    // no idea yet
    // join,
    // groupJoin

    // need to check comparing bases in JS, check SameValue comparing
    // distinct
    // except
    // intersect
  };
}

Array.prototype.asEnumerable = function() {
  return _iterate(_getIterator(this));
};
