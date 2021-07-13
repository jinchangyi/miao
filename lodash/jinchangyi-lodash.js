var jinchangyi = (function () {
  //将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
  function chunk(array, size) {
    let arr = [],
      result = [];
    for (let i = 0; i < array.length; i++) {
      arr.push(array[i]);
      if (arr.length === size) {
        result.push(arr);
        arr = [];
      }
    }
    if (arr.length !== 0) {
      result.push(arr);
    }
    return result;
  }

  //创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "", undefined, 和 NaN 都是被认为是“假值”。
  function compact(array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        arr.push(array[i]);
      }
    }
    return arr;
  }

  //创建一个新数组，将array与任何数组 或 值连接在一起。
  function concat(array, a) {
    for (let i = 1; i < arguments.length; i++) {
      if (Array.isArray(arguments[i])) {
        array.push(...arguments[i]);
      } else {
        array.push(arguments[i]);
      }
    }
    return array;
  }

  //反转array，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推。
  function reverse(array) {
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
    return array;
  }

  /* 压缩 collection（集合）为一个值，通过 iteratee（迭代函数）遍历 collection（集合）中的每个元素，
   每次返回的值会作为下一次迭代使用(注：作为iteratee（迭代函数）的第一个参数使用)。
   如果没有提供 accumulator，则 collection（集合）中的第一个元素作为初始值 */
  function reduce(collection, reducer, initial) {
    let result = initial;
    for (let i = 0; i < collection.length; i++) {
      result = reducer(result, collection[i]);
    }
    return result;
  }

  //这个方法类似_.reduce ，除了它是从右到左遍历collection（集合）中的元素的。
  function reduceRight(collection, reduceRighter, initial) {
    let result = initial;
    for (let i = collection.length - 1; i >= 0; i--) {
      result = reduceRighter(result, collection[i]);
    }
    return result;
  }

  //创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。
  function map(collection, mapper) {
    let result = [];
    for (let i = 0; i < collection.length; i++) {
      result.push(mapper(collection[i], i));
    }
    return result;
  }

  /*调用 iteratee 遍历 collection(集合) 中的每个元素， iteratee 调用3个参数： (value, index|key, collection)。
  如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。*/
  function forEach(collection, iteratee) {
    for (let i = 0; i < collection.length; i++) {
      iteratee(collection[i], i);
    }
  }

  //遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。
  function filter(collection, predicate) {
    let result = [];
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) {
        result.push(collection[i]);
      }
    }
    return result;
  }

  //使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
  function fill(array, value, start, end) {
    for (let i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  }
  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    reverse: reverse,
    reduce: reduce,
    reduceRight: reduceRight,
    map: map,
    forEach: forEach,
    filter: filter,
    fill: fill,
  };
})();
