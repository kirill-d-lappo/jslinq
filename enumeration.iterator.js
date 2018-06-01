"use strict";

function log(value){
  console.log(value);
}


function iterator(array){
  var index = -1;
  return {
    moveNext : function(){
      return index < array.length
        ? ++index < array.length
        : false;
    },
    current : function(){
      return index >= 0 && index < array.length
        ? array[index]
        : null;
    }
  }
}

function whereIterator(iterator, whereFunc){
  return {
    moveNext : function(){
      var wasMoved = true;
      while((wasMoved = iterator.moveNext()) && !whereFunc(iterator.current())){}
      return wasMoved;
    },
    current : function(){
      return iterator.current();
    }
  }
}

function selectIterator(iterator, predicate){
  return {
    moveNext : function(){
      return iterator.moveNext();
    },
    current : function(){
      return predicate(iterator.current());
    }
  }
}

function skipIterator(iterator, count){
   return {
    moveNext : function(){
      var lastMoved = true;
      while((lastMoved = iterator.moveNext()) && count > 0){
        count--;
      }
      return lastMoved;
    },
    current : function(){
      return iterator.current();
    }
  }
}

function takeIterator(iterator, count){
   return {
    moveNext : function(){
      if (count <= 0){
        return false;
      }

      count--;
      return iterator.moveNext();
    },
    current : function(){
      return iterator.current();
    }
  }
}

function toArray(iterator){
  var array = [];
  while(iterator.moveNext()){
    array.push(iterator.current());
  }

  return array;
}

function sum(iterator){
  var result;
  while(iterator.moveNext()){
    result += iterator.current();
  }

  return result;
}

function firstWhere(iterator, condition){
  while ( iterator.moveNext() ){
    var current = iterator.current();
    if (condition(current)){
      return current;
    }
  }

  return null;
}

function first(iterator){
  iterator.moveNext()
  return iterator.current()
}


function _iterate(iterator){
  return {
    where         : (condition) => _iterate(whereIterator(iterator, condition)),
    select        : (predicate) => _iterate(selectIterator(iterator, predicate)),
    skip          : (count)     => _iterate(skipIterator(iterator, count)),
    take          : (count)     => _iterate(takeIterator(iterator, count)),
    sum           : ()          => sum(iterator), // type problems, not working
    first         : ()          => first(iterator),
    firstWhere    : (condition) => firstWhere(iterator, condition),
    toArray       : () => toArray(iterator)
  };
}

module.exports = {
  iterate : (array) => _iterate(iterator(array))
}

