function chunk(ary, size = 1) {
    if (ary.length < 1) return []
    size = size > 0 ? size : 1
    let res = []
    let l = ary.length
    let resL = (l / size) | 0
    for (let i = 0; i < resL; i++) {
      res[i] = ary.slice(size * i, size * (i + 1))
    }
    if (resL * size < l) {
      res[resL] = ary.slice(resL * size)
    }
    return res
  }
  //将数组中非真的值过滤
  function compact(ary) {
    let res = []
    for (let i = 0; i < ary.length; i++) {
      if (ary[i]) res.push(ary[i])
    }
    return res
  }
  //拼接数组
  function concat(ary, ...args) {
    let res = [...ary]
    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        res.push(...args[i])
      } else {
        res.push(args[i])
      }
    }
    return res
  }
  //过滤数组中与其他数组中值相同的部分
  function difference(ary, ...args) {
    let grounp = concat([], ...args)
    let res = []
    for (let i = 0; i < ary.length; i++) {
      if (grounp.indexOf(ary[i]) == -1) {
        res.push(ary[i])
      }
    }
    return res
  }
  // 待完善
  function differenceBy(ary, ...args) {
    let res = []
    let predicate = args[args.length - 1]
    // 当传入的值为函数时
    args = flattenDeep(args)
    if (typeof predicate == 'function') {
      predicate = args.pop()
      for (let i = 0; i < args.length; i++) {
        args[i] = predicate(args[i])
      }
      for (let i = 0; i < ary.length; i++) {
        if (args.indexOf(predicate(ary[i])) == -1) {
          res.push(ary[i])
        }
      }
    } else if (typeof predicate == 'string') {
      predicate = args.pop()
      console.log(predicate)
      for (let item1 of ary) {
        let flag = true
        for (let item2 of args) {
          if (item1[predicate] == item2[predicate]) {
            flag = false
            break
          }
        }
        if (flag) res.push(item1)
      }
    } else {
      res = difference(ary, ...args)
    }
    return res
  }
  //比较 ary 和 args 中的函数
  function differenceWith(ary, args = [], predicate) {
    let res = []
    /* for (let item of ary) {
      if (typeof item !== "object" && args.indexOf(item) == -1) {
        res.push(item);
      } else {
        let flag = true;
        for (let j = 0; j < args.length; j++) {
          if (DeepComparsion(item, args[j])) {
            flag = false;
            break;
          }
        }
        if (flag) res.push(item);
      }
    } */
    for (let item of ary) {
      let flag = true
      for (let test of args) {
        if (predicate(item, test)) flag = false
      }
      if (flag) res.push(item)
    }
    return res
  }
  // join 数组中的 join
  function join(ary, str) {
    let res = ''
    for (let i = 0; i < ary.length - 1; i++) {
      res = res + ary[i] + str
    }
    res += ary[ary.length - 1]
    return res
  }
  // last 返回数组中的最后一个元素
  function last(ary) {
    if (ary.length < 1) return []
    return ary[ary.length - 1]
  }
  // lastIndexOf
  function lastIndexOf(ary, val, fromIndex = ary.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (ary[i] === val) return i
    }
    return -1
  }
  // drop
  function drop(ary, n = 1) {
    let res = []
    for (let i = n; i < ary.length; i++) {
      res.push(ary[i])
    }
    ary = [...res]
    return ary
  }
  //删除后n个元素
  function dropRight(ary, n = 1) {
    let res = []
    for (let i = 0; i < ary.length - n; i++) {
      res.push(ary[i])
    }
    ary = [...res]
    return ary
  }
  function dropRightWhile(ary, predicate) {
    let i = 0
    if (typeof predicate == 'function') {
      for (; i < ary.length; i++) {
        if (predicate(ary[i], i, ary)) {
          break
        }
      }
    } else if (Array.isArray(predicate)) {
      for (; i < ary.length; i++) {
        if (ary[i][predicate[0]] == predicate[1]) {
          break
        }
      }
    } else if (typeof predicate == 'object') {
      for (; i < ary.length; i++) {
        if (DeepComparsion(ary[i], predicate)) {
          break
        }
      }
    } else if (typeof predicate == 'string') {
      for (; i < ary.length; i++) {
        if (ary[i][predicate] == undefined) {
          break
        }
      }
    }
    return ary.slice(0, i)
  }
  function dropWhile(ary, predicate) {
    let i = 0
    if (typeof predicate == 'function') {
      for (; i < ary.length; i++) {
        if (!predicate(ary[i], i, ary)) {
          break
        }
      }
    } else if (Array.isArray(predicate)) {
      for (; i < ary.length; i++) {
        if (ary[i][predicate[0]] !== predicate[1]) {
          break
        }
      }
    } else if (typeof predicate == 'object') {
      for (; i < ary.length; i++) {
        if (!DeepComparsion(ary[i], predicate)) {
          break
        }
      }
    } else if (typeof predicate == 'string') {
      for (; i < ary.length; i++) {
        if (ary[i][predicate] !== undefined) {
          break
        }
      }
    }
    return ary.slice(i)
  }
  //填充
  function fill(ary, val, start = 0, end = ary.length) {
    for (let i = start; i < end; i++) {
      ary[i] = val
    }
    return ary
  }
  // 查找第一个符合条件的元素的索引值
  function findIndex(ary, predicate, fromIndex = 0) {
    for (let i = fromIndex; i < ary.length; i++) {
      if (ary[i] === predicate) {
        return i
      } else if (typeof predicate === 'function' && predicate(ary[i])) {
        return i
      } else if (
        Array.isArray(predicate) &&
        ary[i][predicate[0]] == predicate[1]
      ) {
        return i
      } else if (
        typeof predicate === 'object' &&
        DeepComparsion(ary[i], predicate)
      ) {
        return i
      } else if (ary[i][predicate]) {
        return i
      }
    }
    return -1
  }
  function findLastIndex(ary, predicate, fromIndex = ary.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (ary[i] === predicate) {
        return i
      } else if (typeof predicate === 'function' && predicate(ary[i])) {
        return i
      } else if (
        Array.isArray(predicate) &&
        ary[i][predicate[0]] == predicate[1]
      ) {
        return i
      } else if (
        typeof predicate === 'object' &&
        DeepComparsion(ary[i], predicate)
      ) {
        return i
      } else if (ary[i][predicate]) {
        return i
      }
    }
    return -1
  }
  function flatten(ary) {
    let res = []
    for (let item of ary) {
      if (Array.isArray(item)) {
        res.push(...item)
      } else {
        res.push(item)
      }
    }
    return res
  }
  function flattenDeep(ary) {
    let res = []
    /* function fd(ary) {
      if (!Array.isArray(ary)) {
        return ary;
      }
      ary.forEach((item) => {
        if (Array.isArray(item)) {
          fd(item);
        } else {
          res.push(item);
        }
      });
    }
    fd(ary); */
    // 改良版
    for (let i = 0; i < ary.length; i++) {
      if (isArray(ary[i])) {
        res.push(...flattenDeep(ary[i]))
      } else {
        res.push(ary[i])
      }
    }
    return res
  }
  function flattenDepth(ary, depth = 1) {
    if (depth === 0) return ary.slice()
    let res = []
    /* ary.forEach((item) => {
      if (Array.isArray(item)) {
        res = res.concat(item);
      } else {
        res.push(item);
      }
    });
    return flattenDepth(res, depth - 1); */
    //改良版
    for (let i = 0; i < ary.length; i++) {
      if (isArray(ary[i])) {
        res.push(...flattenDepth(ary[i], depth - 1))
      } else {
        res.push(ary[i])
      }
    }
    return res
  }
  function fromPairs(ary) {
    let res = {}
    for (let i = 0; i < ary.length; i++) {
      res[ary[i][0]] = ary[i][1]
    }
    return res
  }
  function nth(ary, n = 0) {
    if (n < 0) return ary[ary.length + n]
    return ary[n]
  }
  function head(ary) {
    if (ary.length < 1) return
    return ary[0]
  }
  function indexOf(ary, val, fromIndex = 0) {
    for (let i = fromIndex; i < ary.length; i++) {
      if (ary[i] === val) return i
    }
    return -1
  }
  function initial(ary) {
    if (ary.length < 2) return []
    let res = [...ary]
    res.pop()
    return res
  }
  function reverse(ary) {
    if (ary.length < 2) return ary
    let l = 0
    let right = ary.length - 1
    while (l < right) {
      let temp = ary[l]
      ary[l] = ary[right]
      ary[right] = temp
      l++
      right--
    }
    return ary
  }
  function sortedIndex(ary, val) {
    let l = 0
    let r = ary.length
    while (l < r) {
      let m = Math.floor((r + l) / 2)
      if (ary[m] < val) {
        l = m + 1
      } else {
        r = m
      }
    }
    return r
  }
  function sortedIndexBy(ary, val, predicate) {
    if (typeof predicate == 'function') {
      let aryCopy = ary.map((item) => predicate(item))
      let valCopy = predicate(val)
      return sortedIndex(aryCopy, valCopy)
    }
    if (typeof predicate == 'string') {
      let aryCopy = ary.map((item) => item[predicate])
      let valCopy = val[predicate]
      return sortedIndex(aryCopy, valCopy)
    }
  }
  function sortedIndexOf(ary, val) {
    let l = 0
    let r = ary.length
    while (l < r) {
      let m = Math.floor((r + l) / 2)
      if (ary[m] < val) {
        l = m + 1
      } else {
        r = m
      }
    }
    if (ary[r] === val) {
      return r
    } else {
      return -1
    }
  }
  function sortedLastIndex(ary, val) {
    let l = 0
    let r = ary.length
    while (l < r) {
      let m = Math.floor((r + l) / 2)
      if (ary[m] > val) {
        r = m
      } else {
        l = m + 1
      }
    }
    return r
  }
  function sortedLastIndexBy(ary, val, predicate) {
    if (typeof predicate == 'function') {
      let aryCopy = ary.map((item) => predicate(item))
      let valCopy = predicate(val)
      return sortedLastIndex(aryCopy, valCopy)
    }
    if (typeof predicate == 'string') {
      let aryCopy = ary.map((item) => item[predicate])
      let valCopy = val[predicate]
      return sortedLastIndex(aryCopy, valCopy)
    }
  }
  function sortedLastIndexOf(ary, val) {
    let l = 0
    let r = ary.length
    while (l < r) {
      let m = Math.floor((r + l) / 2)
      if (ary[m] > val) {
        r = m
      } else {
        l = m + 1
      }
    }
    if (r > 0) r--
    if (ary[r] === val) {
      return r
    } else {
      return -1
    }
  }
  function sortedUniq(ary) {
    let map = {}
    let res = []
    for (let item of ary) {
      if (!map[item]) {
        map[item] = 1
        res.push(item)
      }
    }
    return res
  }
  function sortedUniqBy(ary, predicate) {
    let map = {}
    let res = []
    for (let item of ary) {
      let temp = predicate(item)
      if (!map[temp]) {
        map[temp] = 1
        res.push(item)
      }
    }
    return res
  }
  function every(ary, predicate) {
    predicate = iteratee(predicate)
    for (let i = 0; i < ary.length; i++) {
      if (!predicate(ary[i], i, ary)) {
        return false
      }
    }
    return true
  }
  function filter(ary, predicate) {
    predicate = handleFilterIteratee(predicate)
    let res = []
    for (let item of ary) {
      if (predicate(item)) res.push(item)
    }
    return res
  }
  function find(ary, predicate, fromIndex = 0) {
    predicate = handleFilterIteratee(predicate)
    for (let i = fromIndex; i < ary.length; i++) {
      if (predicate(ary[i], i, ary)) return ary[i]
    }
    return
  }
  function findLast(ary, predicate, fromIndex = ary.length - 1) {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(ary[i], i, ary)) return ary[i]
    }
    return
  }
  function flatMap(ary, predicate) {
    let res = []
    for (let i = 0; i < ary.length; i++) {
      res.push(predicate(ary[i], i, ary))
    }
    return flatten(res)
  }
  function flatMapDeep(ary, predicate) {
    let res = []
    for (let i = 0; i < ary.length; i++) {
      res.push(flattenDeep(predicate(ary[i], i, ary)))
    }
    return flatten(res)
  }
  function flatMapDepth(ary, predicate, n) {
    let res = []
    for (let i = 0; i < ary.length; i++) {
      res.push(flattenDepth(predicate(ary[i], i, ary), n))
    }
    return res
  }
  function max(ary) {
    if (ary.length < 1) return undefined
    let max = -Infinity
    for (let item of ary) {
      if (max < item) {
        max = item
      }
    }
    return max
  }
  function maxBy(ary, predicate) {
    if (ary.length < 1) return undefined
    let max = -Infinity
    let res
    if (typeof predicate == 'function') {
      for (let item of ary) {
        if (max < predicate(item)) {
          max = predicate(item)
          res = item
        }
      }
    } else {
      for (let item of ary) {
        if (max < item[predicate]) {
          max = item[predicate]
          res = item
        }
      }
    }

    return res
  }
  function min(ary) {
    if (ary.length < 1) return undefined
    let min = Infinity
    for (let item of ary) {
      if (min > item) {
        min = item
      }
    }
    return min
  }
  function minBy(ary, predicate) {
    if (ary.length < 1) return undefined
    let min = Infinity
    let res
    if (typeof predicate == 'function') {
      for (let item of ary) {
        if (min > predicate(item)) {
          min = predicate(item)
          res = item
        }
      }
    } else {
      for (let item of ary) {
        if (min > item[predicate]) {
          min = item[predicate]
          res = item
        }
      }
    }
    return res
  }
  function sum(ary) {
    let sum = ary.reduce((prev, item) => prev + item, 0)
    return sum
  }
  function sumBy(ary, predicate) {
    let sum = 0
    if (typeof predicate == 'function') {
      for (let item of ary) {
        sum += predicate(item)
      }
    } else {
      for (let item of ary) {
        sum += item[predicate]
      }
    }
    return sum
  }
  function toArray(val) {
    if (typeof val == 'string') {
      return val.split('')
    }
    let res = []
    if (typeof val == 'object') {
      for (let key in val) {
        res.push(val[key])
      }
    }
    return res
  }
  function eq(val, other) {
    if (Number.isNaN(val) && Number.isNaN(other)) {
      return true
    }
    return val === other
  }
  function gt(val, other) {
    return val > other
  }
  function gte(val, other) {
    return val >= other
  }
  function lt(val, other) {
    return val < other
  }
  function lte(val, other) {
    return val <= other
  }
  function castArray(val) {
    if (isArray(val)) return val
    let res = []
    for (let i = 0; i < arguments.length; i++) {
      res.push(arguments[i])
    }
    return res
  }
  function clone(value) {
    return value
  }
  function remove(ary, predicate) {
    for (let i = 0; i < ary.length; i++) {
      if (predicate(ary[i], i, ary)) {
        ary.splice(i, 1)
        i--
      }
    }
    return ary
  }
  function pull(ary, ...vals) {
    remove(ary, (item) => vals.includes(item))
    return ary
  }
  function pullAll(ary, vals) {
    remove(ary, (item) => vals.includes(item))
    return ary
  }
  function pullAllBy(ary, args, predicate) {
    args = args.map((item) => item[predicate])
    remove(ary, (item) => args.includes(item[predicate]))
    return ary
  }
  function pullAllWith(ary, args, predicate) {
    remove(ary, (item) => args.some((jtem) => DeepComparsion(item, jtem)))
    return ary
  }
  function pullAt(ary, ...args) {
    args = flatten(args)
    let res = []
    let d = 0
    for (let i = 0; i < args.length; i++) {
      res.push(...ary.splice(args[i] - d, 1))
      d++
    }
    return res
  }
  function intersection(...args) {
    let res = []
    args.sort((a, b) => b.length - a.length)
    for (let i = 0; i < args[0].length; i++) {
      let flag = true
      for (let j = 1; j < args.length; j++) {
        if (args[j].indexOf(args[0][i]) == -1) {
          flag = false
          break
        }
      }
      if (flag) res.push(args[0][i])
    }
    return res
  }
  function intersectionBy(...args) {
    if (Array.isArray(args[args.length - 1])) {
      let res = []
      for (let i = 0; i < args[0].length; i++) {
        let flag = true
        for (let j = 1; j < args.length; j++) {
          if (args[j].indexOf(args[0][i]) == -1) {
            flag = false
            break
          }
        }
        if (flag) res.push(args[0][i])
      }
      return res
    } else {
      let predicate = args.pop()
      if (typeof predicate == 'function') {
        let res = []
        let temp = args.map((item) => item.map((i) => predicate(i)))
        for (let i = 0; i < args[0].length; i++) {
          let flag = true
          for (let j = 1; j < temp.length; j++) {
            if (temp[j].indexOf(predicate(args[0][i])) == -1) {
              flag = false
              break
            }
          }
          if (flag) res.push(args[0][i])
        }
        return res
      } else if (typeof predicate == 'string') {
        let res = []
        for (let item of args[0]) {
          let curr = item[predicate]
          let flag = []
          for (let i = 1; i < args.length; i++) {
            flag.push(args[i].some((item) => item[predicate] == curr))
          }
          let indi = flag.every((item) => item)
          if (indi) res.push(item)
        }
        return res
      }
    }
  }
  function intersectionWith(...args) {
    let predicate = args[args.length - 1]
    let res = []
    if (typeof predicate == 'function') {
      predicate = args.pop()
      for (let item of args[0]) {
        let flag = []
        for (let i = 1; i < args.length; i++) {
          flag.push(args[i].some((ii) => predicate(item, ii)))
        }
        let indi = flag.every((iii) => iii)
        if (indi) res.push(item)
      }
    }
    return res
  }
  function tail(ary) {
    if (!ary.length) return ary
    return ary.slice(1)
  }
  function take(ary, n = 1) {
    if (!ary.length || !n) return []
    return ary.slice(0, n)
  }
  function takeRight(ary, n = 1) {
    if (!ary.length || !n) return []
    n = ary.length - n > 0 ? ary.length - n : 0
    return ary.slice(n)
  }
  function takeRightWhile(ary, predicate) {
    if (!ary.length) return []
    predicate = iteratee(predicate)
    let i = ary.length - 1
    for (; i >= 0; i--) {
      if (!predicate(ary[i])) break
    }
    return ary.slice(i + 1)
  }
  function takeWhile(ary, predicate) {
    if (!ary.length) return []
    predicate = iteratee(predicate)
    let i = 0
    for (; i < ary.length; i++) {
      if (!predicate(ary[i])) {
        break
      }
    }
    return ary.slice(0, i)
  }
  function union(...args) {
    let set = new Set()
    args.forEach((item) =>
      item.forEach((jtem) => {
        set.add(jtem)
      }),
    )
    return [...set.values()]
  }
  function unionBy(...args) {
    let predicate = args[args.length - 1]
    if (Array.isArray(predicate)) {
      return union(...args)
    } else {
      predicate = iteratee(args.pop())
      let set = new Set()
      let res = []
      args.forEach((item) =>
        item.forEach((jtem) => {
          if (!set.has(predicate(jtem))) {
            set.add(predicate(jtem))
            res.push(jtem)
          }
        }),
      )
      return res
    }
  }
  function unionWith(...args) {
    let predicate = args.pop()
    let res = args[0]
    for (let i = 1; i < args.length; i++) {
      args[i].forEach((item) => {
        let flag = true
        for (let jtem of res) {
          if (predicate(jtem, item)) {
            flag = false
          }
        }
        if (flag) res.push(item)
      })
    }
    return res
  }
  function uniq(ary) {
    let set = new Set()
    ary.forEach((item) => {
      if (!set.has(item)) {
        set.add(item)
      }
    })
    return [...set.values()]
  }
  function uniqBy(ary, predicate) {
    predicate = iteratee(predicate)
    let set = new Set()
    let res = []
    ary.forEach((item) => {
      let temp = predicate(item)
      if (!set.has(temp)) {
        set.add(temp)
        res.push(item)
      }
    })
    return res
  }
  function uniqWith(ary, predicate) {
    if (!ary.length) return []
    let res = [ary[0]]
    for (let i = 1; i < ary.length; i++) {
      let temp = ary[i]
      let flag = true
      for (let item of res) {
        if (predicate(item, temp)) {
          flag = false
          break
        }
      }
      if (flag) res.push(temp)
    }
    return res
  }
  function unzip(ary) {
    let res = []
    for (let i = 0; i < ary[0].length; i++) {
      res.push([])
    }
    for (let i = 0; i < ary.length; i++) {
      for (let j = 0; j < ary[i].length; j++) {
        res[j][i] = ary[i][j]
      }
    }
    return res
  }
  function unzipWith(ary, predicate) {
    ary = unzip(ary)
    let res = ary.map((item) => predicate(...item))
    return res
  }
  function without(ary, ...args) {
    let res = ary.filter((item) => !args.includes(item))
    return res
  }
  function xor(...arys) {
    let map = new Map()
    let res = []
    arys = flatten(arys)
    arys.forEach((item) => {
      if (map.has(item)) {
        map.set(item, map.get(item) + 1)
      } else {
        map.set(item, 1)
      }
    })
    for (let key of map.keys()) {
      if (map.get(key) == 1) {
        res.push(key)
      }
    }
    return res
  }
  function xorBy(...arys) {
    let map = new Map()
    let predicate = iteratee(arys.pop())
    let res = []
    arys = flatten(arys)
    arys.forEach((item) => {
      let temp = predicate(item)
      if (map.has(temp)) {
        map.set(temp, map.get(temp) + 1)
      } else {
        map.set(temp, 1)
      }
    })
    for (let item of arys) {
      let temp = predicate(item)
      if (map.get(temp) == 1) {
        res.push(item)
      }
    }
    return res
  }
  function xorWith(...arys) {
    let predicate = iteratee(arys.pop())
    let res = []
    arys = flatten(arys)
    for (let i = 0; i < arys.length; i++) {
      let flag = true
      for (let j = 0; j < arys.length; j++) {
        if (j !== i && predicate(arys[i], arys[j])) {
          flag = false
          break
        }
      }
      if (flag) res.push(arys[i])
    }
    return res
  }
  function zip(...arys) {
    let res = []
    for (let i = 0; i < arys[0].length; i++) {
      res.push([])
    }
    for (let i = 0; i < arys.length; i++) {
      for (let j = 0; j < arys[i].length; j++) {
        res[j][i] = arys[i][j]
      }
    }
    return res
  }
  function zipObject(props, vals) {
    let res = {}
    for (let i = 0; i < props.length; i++) {
      res[props[i]] = vals[i]
    }
    return res
  }
  function zipWith(...args) {
    let predicate = args.pop()
    args = zip(...args)
    let res = args.map((item) => predicate(...item))
    return res
  }
  function countBy(collection, predicate) {
    predicate = iteratee(predicate)
    let map = {}
    collection.forEach((item) => {
      let temp = predicate(item)
      if (map[temp]) {
        map[temp] += 1
      } else {
        map[temp] = 1
      }
    })
    return map
  }
  function forEach(collection, predicate) {
    if (Array.isArray(collection)) {
      collection.forEach(predicate)
    } else if (typeof collection == 'object') {
      for (let key in collection) {
        let temp = predicate(collection[key], key, collection)
        if (temp == false) breakl
      }
    }
    return collection
  }
  function forEachRight(collection, predicate) {
    for (let i = collection.length - 1; i >= 0; i--) {
      predicate(collection[i], i, collection)
    }
    return collection
  }
  function groupBy(collection, predicate) {
    predicate = iteratee(predicate)
    let map = {}
    for (let item of collection) {
      let temp = predicate(item)
      if (map[temp]) {
        map[temp].push(item)
      } else {
        map[temp] = [item]
      }
    }
    return map
  }
  function includes(collection, value, fromIndex = 0) {
    let start = fromIndex >= 0 ? fromIndex : collection.length + fromIndex
    if (Array.isArray(collection)) {
      if (fromIndex >= 0) {
        for (let i = start; i < collection.length; i++) {
          if (sameValueZero(collection[i], value)) return true
        }
      } else {
        for (let i = start; i >= 0; i--) {
          if (sameValueZero(collection[i], value)) return true
        }
      }
    } else if (typeof collection == 'object') {
      for (let key in collection) {
        if (sameValueZero(collection[key], value)) return true
      }
    } else if (typeof collection == 'string') {
      return collection.includes(value, start)
    }
    return false
  }
  function isArguments(value) {
    if (Array.isArray(value)) return false
    return typeof value == 'object' && 'length' in value
  }
  function isArray(value) {
    return getType(value) == '[object Array]'
  }
  function isArrayBuffer(value) {
    // ArrayBuffer
    return getType(value) == '[object ArrayBuffer]'
  }
  function isArrayLike(value) {
    if (typeof value == 'function') return false
    return value['length'] >= 0 && value['length'] < Number.MAX_SAFE_INTEGER
  }
  function isArrayLikeObject(value) {
    return typeof value == 'object' && isArrayLike(value)
  }
  function isBoolean(value) {
    return getType(value) == '[object Boolean]'
  }
  function isDate(value) {
    return getType(value) == '[object Date]'
  }
  function isElement(value) {
    let regexp = /^\[object HTML\w+\]$/
    return regexp.test(Object.prototype.toString.call(value))
  }
  function isEmpty(value) {
    if (isArray(value)) {
      return value.length == 0
    }
    if (typeof value == 'object') {
      let res = []
      for (let key in value) {
        res.push(key)
      }
      if (res.length > 0) return false
    }
    return true
  }
  function isEqual(value, other) {
    if (value == other) {
      return true
    } else if (Array.isArray(value) && Array.isArray(other)) {
      for (let item in value) {
        let flag = true
        for (let jtem in other) {
          if (
            item == jtem ||
            (typeof item == 'object' && DeepComparsion(item, jtem))
          ) {
            flag = false
          }
        }
        if (flag) return false
      }
      return true
    } else if (
      !Array.isArray(value) &&
      !Array.isArray(other) &&
      typeof value == 'object'
    ) {
      return DeepComparsion(value, other)
    } else {
      return Number.isNaN(value) && Number.isNaN(other)
    }
  }
  function isEqualWith(value, other, customizer) {
    for (let i = 0; i < value.length; i++) {
      if (customizer(value[i], other[i]) === false) {
        return false
      }
    }
    return true
  }
  function isError(value) {
    return typeof value == 'object' && value.constructor == Error
  }
  function isFinite(value) {
    return typeof value == 'number' && value != Infinity && value != -Infinity
  }
  function isFunction(value) {
    if (arguments.length == 0) return true
    if (value == undefined) return false
    return getType(value) == '[object Function]'
  }
  function isInteger(value) {
    return isFinite(value) && Math.floor(value) === value
  }
  function isLength(value) {
    return isInteger(value) && value >= 0
  }
  function isMap(val) {
    return getType(val) == '[object Map]'
  }
  function isMatch(object, source) {
    return hasSameAttr(object, source)
  }
  function isMatchWith(object, source, customizer) {
    for (let key in object) {
      if (customizer(object[key], source[key]) === false) {
        return false
      }
    }
    return true
  }
  function isNaN(val) {
    if (typeof val == 'object') {
      val = val.valueOf()
    }
    return val !== val
  }
  function isNil(val) {
    return val == undefined
  }
  function isNull(val) {
    return getType(val) == '[object Null]'
  }
  function isNumber(val) {
    return getType(val) == '[object Number]'
  }
  function isObject(val) {
    return (
      (val !== null && typeof val === 'object') || typeof val === 'function'
    )
  }
  function isObjectLike(val) {
    return val !== null && typeof val === 'object'
  }
  // 待进一步了解
  function isPlainObject(val) {
    let proto = Object.getPrototypeOf(val)
    return proto === Object.prototype || proto === null
  }
  function isRegExp(val) {
    //[object RegExp]
    return getType(val) == '[object RegExp]'
  }
  function isSafeInteger(val) {
    return (
      isNumber(val) &&
      Math.abs(val) < Number.MAX_SAFE_INTEGER &&
      Math.abs(val) > Number.MIN_VALUE
    )
  }
  function isSet(val) {
    return getType(val) == '[object Set]'
  }
  function isString(val) {
    return getType(val) == '[object String]'
  }
  function isSymbol(val) {
    return getType(val) == '[object Symbol]'
  }
  function isTypedArray(val) {
    //[object Uint8Array]
    return getType(val) == '[object Uint8Array]'
  }
  function isUndefined(val) {
    return getType(val) == '[object Undefined]'
  }
  function isWeakMap(val) {
    return getType(val) == '[object WeakMap]'
  }
  function isWeakSet(val) {
    return getType(val) == '[object WeakSet]'
  }
  function toFinite(val) {
    val = parseFloat(val)
    if (val >= Number.MIN_VALUE && val <= Number.MAX_VALUE) {
      return val
    } else {
      return val > 0 ? Number.MAX_VALUE : -Number.MAX_VALUE
    }
  }
  function toInteger(val) {
    val = toFinite(val)
    if (val > 0 && val < 1) {
      return 0
    } else if (val == Number.MAX_VALUE) {
      return Number.MAX_VALUE
    } else {
      return parseInt(val)
    }
  }
  function parseInt(val, radix = 10) {
    return window.parseInt(val, radix)
  }
  function toLength(val) {
    val = toInteger(val)
    if (val < 0) return 0
    if (val > 4294967295) return 4294967295
    return val
  }
  function toNumber(val) {
    if (typeof val == 'number') return val
    return Number(val)
  }
  function invokeMap(collection, path, ...args) {
    if (isString(path)) {
      return collection.map((item) => item[path](...args))
    } else if (isFunction(path)) {
      return collection.map((item) => path.call(item, ...args))
    }
  }
  function keyBy(collection, predicate) {
    predicate = iteratee(predicate)
    let res = {}
    for (key in collection) {
      let temp = collection[key]
      res[predicate(temp)] = temp
    }
    return res
  }
  function map(collection, predicate) {
    if (typeof predicate == 'string' && predicate.includes('.')) {
      let tempArr = predicate.split('.')
      predicate = function (collection) {
        for (let key of tempArr) {
          collection = collection[key]
        }
        return collection
      }
    }
    predicate = iteratee(predicate)
    if (isArray(collection)) {
      return collection.map((item, index, collection) =>
        predicate(item, index, collection),
      )
    } else {
      let res = []
      for (key in collection) {
        let temp = collection[key]
        res.push(predicate(temp, key, collection))
      }
      return res
    }
  }
  // 未完成
  function orderBy(collection, predicate, orders) {
    let res = []
    predicate = predicate.map((item) => iteratee(item))
  }
  function partition(collection, predicate) {
    let res = [[], []]
    predicate = handleFilterIteratee(predicate)
    for (let item of collection) {
      if (predicate(item)) {
        res[0].push(item)
      } else {
        res[1].push(item)
      }
    }
    return res
  }
  function reduce(collection, predicate, prime) {
    if (prime === undefined) {
      prime = isArray(collection) && collection.length > 0 ? 0 : {}
    }
    if (isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        prime = predicate(prime, collection[i], i, collection)
      }
    } else {
      for (let key in collection) {
        prime = predicate(prime, collection[key], key, collection)
      }
    }
    return prime
  }
  function reduceRight(collection, predicate, prime) {
    if (prime === undefined) {
      prime = isArray(collection) && collection.length > 0 ? 0 : {}
    }
    if (isArray(collection)) {
      for (let i = collection.length - 1; i >= 0; i--) {
        prime = predicate(prime, collection[i], i, collection)
      }
    } else {
      for (let key in collection) {
        prime = predicate(prime, collection[key], key, collection)
      }
    }
    return prime
  }
  function reject(collection, predicate) {
    predicate = handleFilterIteratee(predicate)
    let res = collection.filter((item) => !predicate(item))
    return res
  }
  function sample(collection) {
    let index = (Math.random() * collection.length) | 0
    return collection[index]
  }
  function sampleSize(collection, n = 1) {
    if (n > collection.length) n = collection.length
    let randIndex = []
    let res = []
    for (let i = 0; i < n; i++) {
      let temp = (Math.random() * collection.length) | 0
      while (randIndex.includes(temp)) {
        temp = (Math.random() * collection.length) | 0
      }
      randIndex.push(temp)
    }
    for (let item of randIndex) {
      res.push(collection[item])
    }
    return res
  }
  function shuffle(collection) {
    return sampleSize(collection, collection.length)
  }
  function size(collection) {
    if (getType(collection) === '[object Object]') {
      let count = 0
      for (key in collection) {
        count++
      }
      return count
    } else {
      return collection.length
    }
  }
  function some(collection, predicate) {
    predicate = iteratee(predicate)
    for (let item of collection) {
      if (predicate(item)) {
        return true
      }
    }
    return false
  }
  function defer(func, ...args) {
    let timer = setTimeout(func, 0, ...args)
    return timer - 1
  }
  function delay(func, wait, ...args) {
    let timer = setTimeout(func, wait, ...args)
    return timer - 1
  }
  function conformsTo(object, source) {
    for (key in source) {
      let predicate = source[key]
      if (!predicate(object[key])) {
        return false
      }
    }
    return true
  }
  function toSafeInteger(value) {
    value = toInteger(value)
    if (value > Number.MAX_SAFE_INTEGER) {
      value = Number.MAX_SAFE_INTEGER
    } else if (value < Number.MIN_SAFE_INTEGER) {
      value = Number.MIN_SAFE_INTEGER
    }
    return value
  }
  function add(val1, val2) {
    return val1 + val2
  }
  function divide(val1, val2) {
    return val1 / val2
  }
  function mean(array) {
    let sum = array.reduce((prev, item) => prev + item, 0)
    return sum / array.length
  }
  function meanBy(array, predicate) {
    predicate = iteratee(predicate)
    let sum = array.reduce((prev, item) => prev + predicate(item), 0)
    return sum / array.length
  }
  function multiply(val1, val2) {
    return val1 * val2
  }
  function subtract(val1, val2) {
    return val1 - val2
  }
  function clamp(number, lower, upper) {
    if (number < lower) {
      return lower
    } else if (number > upper) {
      return upper
    }
    return number
  }
  function inRange(number, start, end = 0) {
    if (start > end) {
      ;[start, end] = [end, start]
    }
    if (number >= start && number < end) {
      return true
    }
    return false
  }
  function random(...args) {
    if (args.length === 1) {
      return (Math.random() * args[0]) | 0
    } else {
      if (typeof args[args.length - 1] === 'boolean') {
        let flag = args.pop()
        start = args.length > 1 ? args[0] : 0
        end = args.length > 1 ? args[1] : args[0]
        if (flag) {
          return Math.random() * (end - start)
        } else {
          return (Math.random() * (end - start)) | 0
        }
      } else {
        start = args.length > 1 ? args[0] : 0
        end = args.length > 1 ? args[1] : args[0]
        return (Math.random() * (end - start)) | 0
      }
    }
  }
  function assign(object, ...source) {
    source.forEach((item) => {
      for (let key of Object.keys(item)) {
        object[key] = item[key]
      }
    })
    return object
  }
  function assignIn(object, ...source) {
    source.forEach((item) => {
      for (let key in item) {
        object[key] = item[key]
      }
    })
    return object
  }
  function defaults(object, ...source) {
    source.forEach((item) => {
      for (let key in item) {
        if (!object[key]) object[key] = item[key]
      }
    })
    return object
  }
  function defaultsDeep(object, ...source) {
    source.forEach((item) => {
      for (let key in item) {
        if (isObject(object[key])) {
          defaultsDeep(object[key], item[key])
        } else {
          if (!object[key]) object[key] = item[key]
        }
      }
    })
    return object
  }
  function findKey(object, predicate) {
    predicate = handleFilterIteratee(predicate)
    for (let key of Object.keys(object)) {
      if (predicate(object[key])) return key
    }
    return
  }
  function findLastKey(object, predicate) {
    predicate = handleFilterIteratee(predicate)
    for (let key of Object.keys(object).reverse()) {
      if (predicate(object[key])) return key
    }
    return
  }
  function forIn(object, predicate) {
    for (let key in object) {
      let flag = predicate(object[key], key, object)
      if (flag === false) break
    }
    return object
  }
  function forInRight(object, predicate) {
    let temp = []
    for (let key in object) {
      temp.push(key)
    }
    temp.reverse()
    for (let key of temp) {
      let flag = predicate(object[key], key, object)
      if (flag === false) break
    }
    return object
  }
  function forOwn(object, predicate) {
    for (let key of Object.keys(object)) {
      let flag = predicate(object[key], key, object)
      if (flag === false) break
    }
    return object
  }
  function forOwnRight(object, predicate) {
    for (let key of Object.keys(object).reverse()) {
      let flag = predicate(object[key], key, object)
      if (flag === false) break
    }
    return object
  }
  function functions(object) {
    let keys = Object.keys(object)
    let res = []
    for (let key of keys) {
      if (isFunction(object[key])) {
        res.push(key)
      }
    }
    return res
  }
  function functionsIn(object) {
    let res = []
    for (let key in object) {
      if (isFunction(object[key])) {
        res.push(key)
      }
    }
    return res
  }
  function invert(object) {
    let obj = {}
    let keys = Object.keys(object)
    for (let key of keys) {
      obj[object[key]] = key
    }
    return obj
  }
  function invertBy(object, predicate) {
    let keys = Object.keys(object)
    let obj = {}
    for (let key of keys) {
      let temp = object[key]
      if (predicate) temp = predicate(temp)
      if (obj[temp]) {
        obj[temp].push(key)
      } else {
        obj[temp] = [key]
      }
    }
    return obj
  }
  function keys(object) {
    let keys = Object.keys(object)
    let res = []
    for (let key of keys) {
      res.push(key)
    }
    return res
  }
  function keysIn(object) {
    let res = []
    for (let key in object) {
      res.push(key)
    }
    return res
  }
  function mapKeys(object, predicate) {
    let obj = {}
    let keys = Object.keys(object)
    for (let key of keys) {
      let value = object[key]
      let temp = predicate(value, key, object)
      obj[temp] = value
    }
    return obj
  }
  function mapValues(object, predicate) {
    predicate = iteratee(predicate)
    let obj = {}
    let keys = Object.keys(object)
    for (let key of keys) {
      let value = object[key]
      value = predicate(value, key, object)
      obj[key] = value
    }
    return obj
  }
  function merge(object, ...source) {
    source.forEach((item) => {
      for (let key in item) {
        let value = item[key]
        if (typeof value == 'object') {
          merge(object[key], value)
        } else {
          object[key] = value
        }
      }
    })
    return object
  }
  function mergeWith(object, ...source) {
    if (!isFunction(source[source.length - 1])) return merge(object, ...source)
    let customizer = source.pop()
    source.forEach((item) => {
      for (let key in item) {
        object[key] = customizer(object[key], item[key], key, object, item, [])
      }
    })
    return object
  }
  function omit(object, ...props) {
    props = flattenDeep(props)
    let obj = {}
    for (let key in object) {
      if (!props.includes(key)) {
        obj[key] = object[key]
      }
    }
    return obj
  }
  function omitBy(object, predicate) {
    let obj = {}
    for (let key in object) {
      let value = object[key]
      if (!predicate(value, key)) {
        obj[key] = value
      }
    }
    return obj
  }
  function pick(object, ...props) {
    props = flattenDeep(props)
    let obj = {}
    for (let key of props) {
      let value = object[key]
      if (value) {
        obj[key] = value
      }
    }
    return obj
  }
  function pickBy(object, predicate) {
    let obj = {}
    for (let key in object) {
      let value = object[key]
      if (predicate(value, key)) {
        obj[key] = value
      }
    }
    return obj
  }
  function toPairs(object) {
    if (isSet(object) || isMap(object)) {
      return object.entries()
    } else {
      return Object.keys(object).map((key) => [key, object[key]])
    }
  }
  function toPairsIn(object) {
    if (isSet(object) || isMap(object)) {
      return object.entries()
    }
    let res = []
    for (let key in object) {
      res.push([key, object[key]])
    }
    return res
  }
  function ceil(val, precision = 0) {
    return handlePrecision(val, precision, Math.ceil)
  }
  function floor(val, precision = 0) {
    return handlePrecision(val, precision, Math.floor)
  }
  function round(val, precision = 0) {
    return handlePrecision(val, precision, Math.round)
  }
  function at(object, paths) {
    paths = paths.map((path) => handlePath(path))
    let res = []
    for (let path of paths) {
      let temp = getAttrByPath(object, path)
      res.push(temp)
    }
    return res
  }
  function get(object, path, defaultValue) {
    path = handlePath(path)
    let res = getAttrByPath(object, path)
    return res === undefined ? defaultValue : res
  }
  function has(object, path) {
    path = handlePath(path)
    for (let item of path) {
      if (!object.hasOwnProperty(item)) return false
      object = object[item]
    }
    return true
  }
  function hasIn(object, path) {
    path = handlePath(path)
    let res = getAttrByPath(object, path)
    return res !== undefined
  }
  function invoke(object, path, ...args) {
    path = handlePath(path)
    let meth = path.pop()
    let res = getAttrByPath(object, path)
    return res[meth](...args)
  }
  function result(object, path, defaultValue) {
    path = handlePath(path)
    let res = getAttrByPath(object, path)
    path.pop()
    let prev = getAttrByPath(object, path)
    res = res === undefined ? defaultValue : res
    if (isFunction(res)) {
      return res.call(prev)
    }
    return res
  }
  function set(object, path, value) {
    path = handlePath(path)
    let temp = object
    let i = 0
    for (; i < path.length - 1; i++) {
      if (temp[path[i]] !== undefined) {
        temp = temp[path[i]]
      } else {
        if (path[i + 1] * 1 == path[i + 1]) {
          temp[path[i]] = []
        } else {
          temp[path[i]] = {}
        }
        temp = temp[path[i]]
      }
    }
    temp[path[path.length - 1]] = value
    return object
  }
  function setWith(object, path, value, customizer) {
    if (customizer === undefined) return set(object, path, updater)
    path = handlePath(path)
    let temp = object
    let i = 0
    for (; i < path.length - 1; i++) {
      temp[path[i]] = customizer(temp[path[i]], path[i], temp)
      temp = temp[path[i]]
    }
    temp[path[i]] = customizer(value, path[i], temp)
    return object
  }
  function transform(object, predicate, accumulator) {
    accumulator = arguments.length > 2 ? accumulator : {}
    let keys = Object.keys(object)
    for (let i = 0; i < keys.length; i++) {
      if (predicate(accumulator, object[keys[i]], keys[i], object) === false) {
        break
      }
    }
    return accumulator
  }
  function unset(object, path) {
    path = handlePath(path)
    let temp = object
    for (let i = 0; i < path.length - 1; i++) {
      if (temp[path[i]] === undefined) return false
      temp = temp[path[i]]
    }
    if (temp[path[path.length - 1]] === undefined) return false
    delete temp[path[path.length - 1]]
    return true
  }
  function update(object, path, updater) {
    path = handlePath(path)
    let temp = object
    let i = 0
    for (; i < path.length - 1; i++) {
      if (temp[path[i]] !== undefined) {
        temp = temp[path[i]]
      } else {
        if (path[i + 1] * 1 == path[i + 1]) {
          temp[path[i]] = []
        } else {
          temp[path[i]] = {}
        }
        temp = temp[path[i]]
      }
    }
    temp[path[i]] = updater(temp[path[i]])
    return object
  }
  function updateWith(object, path, updater, customizer) {
    if (customizer === undefined) return update(object, path, updater)
    path = handlePath(path)
    let temp = object
    let i = 0
    for (; i < path.length - 1; i++) {
      temp[path[i]] = customizer(temp[path[i]], path[i], temp)
      temp = temp[path[i]]
    }
    temp[path[i]] = customizer(updater(temp[path[i]]), path[i], temp)
    return object
  }
  function values(object) {
    let res = []
    let keys = Object.keys(object)
    for (let key of keys) {
      res.push(object[key])
    }
    return res
  }
  function valuesIn(object) {
    let res = []
    for (let key in object) {
      res.push(object[key])
    }
    return res
  }
  function camelCase(str = '') {
    return str
      .toLowerCase()
      .replace(/(\s\w)|(_\w)|(-\w)/g, (item) => item.toUpperCase())
      .replace(/[\W|_]/g, '')
      .replace(/^\w/, (item) => item.toLowerCase())
  }
  function capitalize(str = '') {
    return str.toLowerCase().replace(/^\w/, (item) => item.toUpperCase())
  }
  function endsWith(str = '', target, position = str.length) {
    return str[position - 1] == target
  }
  function escape(str = '') {
    return str.replace(/[\&\>\<\"\']/g, (item) => {
      switch (item) {
        case '&':
          return '&amp;'
        case '<':
          return '&lt;'
        case '>':
          return '&gt'
        case '"':
          return '&quot;'
        case "'":
          return '&apos;'
        case '`':
          return '&grave;'
        default:
          return item
      }
    })
  }

  function escapeRegExp(str = '') {
    return str.replace(/[\^\$\.\*\+\?\(\)\[\]\,\|]/g, (item) => `\\${item}`)
  }
  function kebabCase(str = '') {
    let reg = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    return str.match(reg).join('-').toLowerCase()
  }
  function lowerCase(str = '') {
    let reg = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    return str.match(reg).join(' ').toLowerCase()
  }
  function lowerFirst(str = '') {
    return str.replace(/^\w/, (item) => item.toLowerCase())
  }
  function pad(str = '', length = 0, chars = ' ') {
    if (str.length >= length) return str
    let l = ((length - str.length) / chars.length / 2) | 0
    let r = length - str.length - l
    return chars.repeat(l).concat(str).concat(chars.repeat(r)).slice(0, length)
  }
  function padEnd(str = '', length = 0, chars = ' ') {
    if (str.length >= length) return str
    let padLen = Math.ceil((length - str.length) / chars.length)
    return str.concat(chars.repeat(padLen)).slice(0, length)
  }
  function padStart(str = '', length = 0, chars = ' ') {
    if (str.length >= length) return str
    let padLen = Math.ceil((length - str.length) / chars.length)
    let padStr = chars.repeat(padLen).slice(0, length - str.length)
    return padStr + str
  }
  function parseInt(str, radix = 10) {
    return Number.parseInt(str, radix)
  }
  function repeat(str = '', n = 1) {
    let res = ''
    for (let i = 0; i < n; i++) {
      res += str
    }
    return res
  }
  function replace(str = '', pattern, replacement) {
    return str.replace(pattern, replacement)
  }
  function snakeCase(str = '') {
    let reg = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    return str.match(reg).join('_').toLowerCase()
  }
  function split(str = '', separ, limit) {
    return str.split(separ).slice(0, limit)
  }
  function startCase(str = '') {
    let reg = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    return str
      .match(reg)
      .map((item) => item.replace(/^\w/, (item) => item.toUpperCase()))
      .join(' ')
  }
  function startsWith(str = '', target, position = 0) {
    for (let i = 0; i < target.length; i++) {
      if (str[i + position] !== target[i]) {
        return false
      }
    }
    return true
  }
  function toLower(str = '') {
    return str.toLowerCase()
  }
  function toUpper(str = '') {
    return str.toUpperCase()
  }
  function trim(str = '', chars = '\\s') {
    let regStart = new RegExp(`^[${chars}]+`)
    let regEnd = new RegExp(`[${chars}]+$`)
    return str.replace(regStart, '').replace(regEnd, '')
  }

  function trimEnd(str = '', chars = '\\s') {
    let reg = new RegExp(`[${chars}]+$`)
    return str.replace(reg, '')
  }

  function trimStart(str = '', chars = '\\s') {
    let reg = new RegExp(`^[${chars}]+`)
    return str.replace(reg, '')
  }
  function truncate(str = '', options = {}) {
    const LEN = options.length && options.length <= 30 ? options.length : 30
    const OMISS = options.omission || '...'
    let sepa = options.separator
    let olen = OMISS.length
    str = str.slice(0, LEN - olen)
    if (sepa !== undefined) {
      sepa = new RegExp(sepa, 'g')
      let i, temp
      while ((temp = sepa.exec(str))) {
        i = temp.index
      }
      str = str.slice(0, i)
      return str + OMISS
    }
    return str + OMISS
  }
  function unescape(str = '') {
    return str.replace(
      /(&amp;)|(&lt;)|(&gt;)|(&quot;)|(&#39;)|(&#96;)/g,
      (item) => {
        switch (item) {
          case '&amp;':
            return '&'
          case '&lt;':
            return '<'
          case '&gt;':
            return '>'
          case '&quot;':
            return '"'
          case '&#39;':
            return "'"
          case '&#96;':
            return '`'
          default:
            return item
        }
      },
    )
  }
  function upperCase(str = '') {
    let reg = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    return str.match(reg).join(' ').toUpperCase()
  }
  function upperFirst(str = '') {
    return str.replace(/^\w/, (item) => item.toUpperCase())
  }
  function words(str = '', reg = /[a-zA-z]+/g) {
    return str.match(reg)
  }
  function defaultTo(val, defaultValue) {
    if (val !== val || val == undefined) {
      return defaultValue
    } else {
      return val
    }
  }
  function range(start = 0, end, step = 1) {
    if (arguments.length == 0) {
      return []
    } else if (arguments.length == 1) {
      end = start
      start = 0
    }
    let res = []
    if (step === 0) {
      if (end < 0) return res
      for (let i = 1; i < end; i++) {
        res.push(start)
      }
    } else if (end < 0) {
      if (step > 0) step = -step
      for (let i = start; i > end; i += step) {
        res.push(i)
      }
    } else {
      if (step <= 0) return []
      for (let i = start; i < end; i += step) {
        res.push(i)
      }
    }
    return res
  }
  function rangeRight(start = 0, end, step = 1) {
    if (arguments.length == 0) {
      return []
    } else if (arguments.length == 1) {
      end = start
      start = 0
    }
    let res = []
    if (step === 0) {
      if (end < 0) return res
      for (let i = 1; i < end; i++) {
        res.push(start)
      }
    } else if (end < 0) {
      if (step > 0) step = -step
      for (let i = start; i > end; i += step) {
        res.push(i)
      }
    } else {
      if (step <= 0) return []
      for (let i = start; i < end; i += step) {
        res.push(i)
      }
    }
    return res.reverse()
  }
  function times(n, predicate) {
    let res = []
    for (let i = 0; i < n; i++) {
      if (isFunction(predicate)) {
        res.push(predicate(i))
      } else {
        res.push(predicate)
      }
    }
    return res
  }
  function toPath(path) {
    return handlePath(path)
  }
  function uniqueId(prefix = '') {
    return prefix + Date.now()
  }
  function cloneDeep(object) {
    if (getType(object) === '[object RegExp]') {
      return object
    } else if (typeof object == 'object') {
      var res = isArray(object) ? [] : {}
      let keys = Object.keys(object)
      for (let key of keys) {
        if (typeof object[key] != 'object') {
          res[key] = object[key]
        } else {
          res[key] = cloneDeep(object[key])
        }
      }
    } else {
      return object
    }
    return res
  }
  function identity(val) {
    return val
  }
  function ary(func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n))
    }
  }
  function unary(func) {
    return ary(func, 1)
  }
  function negate(predicate) {
    return function (...args) {
      return !predicate(...args)
    }
  }
  function once(func) {
    let self = this
    let flag = false
    let res
    return function () {
      if (!flag) {
        return (res = func.apply(self, arguments))
      }
      return res
    }
  }
  function spread(func, start = 0) {
    return function (ary) {
      return func(...ary.slice(start))
    }
  }
  function curry(func, arity = func.length) {
    return function (...args) {
      if (args.length < arity) {
        return curry(func.bind(null, ...args), arity - args.length)
      } else {
        return func(...args)
      }
    }
  }
  function matches(source) {
    return hasSameAttr.bind(null, source)
  }
  function property(path) {
    return function (obj) {
      return getAttrByPath(obj, path)
    }
  }
  function propertyOf(obj) {
    return getAttrByPath.bind(null, obj)
  }
  function flip(func) {
    return function (...args) {
      return func(...args.reverse())
    }
  }
  function constant(val) {
    return function () {
      return val
    }
  }
  function nthArg(n = 0) {
    return function () {
      if (n < 0) {
        n = n + arguments.length
      }
      return arguments[n]
    }
  }
  function conforms(source) {
    return function (object) {
      let keys = Object.keys(source)
      for (let key of keys) {
        if (!source[key].call(null, object[key])) return false
      }
      return true
    }
  }
  function flow(...func) {
    func = flattenDeep(func)
    return function (...args) {
      let res = args
      for (let item of func) {
        res = [item.call(null, res)]
      }
      return res[0]
    }
  }
  function method(path, ...args) {
    return function (obj) {
      let func = getAttrByPath(obj, path)
      return func.apply(null, args)
    }
  }
  function methodOf(obj, ...args) {
    return function (path) {
      let func = getAttrByPath(obj, path)
      return func.apply(null, args)
    }
  }
  function once(func) {
    let flag = true
    let res = null
    return function (...args) {
      if (flag) {
        res = func(...args)
        flag = false
      }
      return res
    }
  }
  function stringifyJson(obj) {
    if (isFunction(obj) || isRegExp(obj)) return 'undefined'
    if (obj === null) return 'null'
  }
  function parseJson(str) {
    let i = 0
    return parseValue()
    function parseValue() {
      let char = str[i]
      if (char == '{') return parseObject()
      if (char == '[') return parseArray()
      if (char == '"') return parseString()
      if (/t|u|n|f/.test(char)) return parseBUN()
      return parseNumber()
    }
    function parseObject() {
      if (str[i] === '{') {
        i++
        let res = {}
        let flag = false
        while (i < str.length && str[i] !== '}') {
          if (flag) {
            i++
          }
          let key = parseString()
          i++
          let value = parseValue()
          res[key] = value
          flag = true
        }
        i++
        return res
      }
    }
    function parseArray() {
      if (str[i] === '[') {
        i++
        let res = []
        let flag = false
        while (i < str.length && str[i] !== ']') {
          if (flag) {
            i++
          }
          let val = parseValue()
          res.push(val)
          flag = true
        }
        i++
        return res
      }
    }
    function parseString() {
      if (str[i] === '"') {
        i++
        let result = ''
        while (i < str.length && str[i] !== '"') {
          result += str[i]
          i++
        }
        i++
        return result
      }
    }
    function parseNumber() {
      let start = i
      if (str[i] >= '1' && str[i] <= '9') {
        i++
        while (str[i] >= '0' && str[i] <= '9') {
          i++
        }
      }
      if (i > start) {
        return Number(str.slice(start, i))
      }
    }
    function parseBUN() {
      if (str[i] === 't') {
        i += 4
        return true
      } else if (str[i] === 'f') {
        i += 5
        return false
      } else if (str[i] === 'u') {
        i += 9
        return undefined
      } else if (str[i] === 'n') {
        i += 4
        return null
      }
    }
  }
  // 尝试中内容
  function orderBy(collection, predicate, order) {
    predicate = predicate.map((item) => iteratee(item))
    let res = collection
    for (let i = order.length - 1; i >= 0; i--) {
      res = mergeSort(res, predicate[i], order[i])
    }
    return res
  }
  function sortBy(collection, ...predicate) {
    let res = collection
    predicate = flattenDeep(predicate)
    predicate = predicate.map((item) => iteratee(item))
    for (let i = predicate.length - 1; i >= 0; i--) {
      res = mergeSort(res, predicate[i])
    }

    return res
  }
  //工具函数
  function getType(val) {
    return Object.prototype.toString.call(val)
  }
  /**
   * 处理路径字符串，返回一个数组
   * @param {*} str
   * @returns
   */
  function handlePath(path) {
    let arr
    if (isArray(path)) {
      arr = path
    } else {
      arr = path.split('.')
    }
    arr = arr.map((item) => {
      return item.replace(/\]/g, '').split('[')
    })
    arr = aeon_10086.flattenDeep(arr)
    while (arr[0] == '') arr.shift()
    return arr
  }
  function getAttrByPath(object, path) {
    let temp = object
    for (let item of path) {
      temp = temp[item]
      if (temp == undefined) return temp
    }
    return temp
  }
  /**
   * 比较两个对象是否相同
   * @param obj1
   * @param obj2
   * @return Boolean
   */
  function DeepComparsion(obj1, obj2) {
    let key1 = []
    let key2 = []
    for (let key in obj1) {
      key1.push(key)
    }
    for (let key in obj2) {
      key2.push(key)
    }
    if (key1.length !== key2.length) return false
    for (key in obj1) {
      if (typeof obj1[key] != 'object' && typeof obj1[key] != 'object') {
        if (obj1[key] != obj2[key]) return false
      } else {
        if (!DeepComparsion(obj1[key], obj2[key])) return false
      }
    }
    return true
  }
  function hasSameAttr(obj1, obj2) {
    for (key in obj1) {
      if (typeof obj1[key] != 'object' && typeof obj1[key] != 'object') {
        if (key in obj2 && obj1[key] != obj2[key]) return false
      } else {
        if (!hasSameAttr(obj1[key], obj2[key])) return false
      }
    }
    return true
  }
  /**
   * 处理 predicate 根据其类型返回一个函数
   * @param {*} predicate
   * @return Function
   */
  function iteratee(predicate) {
    if (Array.isArray(predicate)) {
      return (item) => item[predicate[0]] == predicate[1]
    } else if (typeof predicate == 'function') {
      return predicate
    } else if (typeof predicate == 'object') {
      return DeepComparsion.bind(null, predicate)
    } else if (typeof predicate == 'string') {
      return (item) => item[predicate]
    }
  }
  function handleFilterIteratee(predicate) {
    if (Array.isArray(predicate)) {
      return (item) => item[predicate[0]] == predicate[1]
    } else if (typeof predicate == 'function') {
      return predicate
    } else if (typeof predicate == 'object') {
      return hasSameAttr.bind(null, predicate)
    } else if (typeof predicate == 'string') {
      return (item) => item[predicate]
    }
  }

  /**
   * 处理数字精度
   * @param {number} val
   * @param {number} percision
   * @param {function} action
   * @returns {number}
   */
  function handlePrecision(val, percision, action) {
    let x = Math.pow(10, percision)
    val *= x
    return action(val) / x
  }
  /**
   * 比较两个值是否相等
   * @param {*} x
   * @param {*} y
   * @return Boolean
   */
  function sameValueZero(x, y) {
    if (x === y) {
      return true
    }
    return (
      (Number.isNaN(x) && Number.isNaN(y)) ||
      (x === undefined ? x == y : false) ||
      (x === null ? x == y : false)
    )
  }
  function mergeSort(ary, predicate = (it) => it, sign = 'asc') {
    if (ary.length < 2) return ary
    let mid = ary.length >> 1
    let leftAry = ary.slice(0, mid)
    let rightAry = ary.slice(mid)
    let leftSort = mergeSort(leftAry, predicate, sign)
    let rightSort = mergeSort(rightAry, predicate, sign)
    let res = [],
      i = 0,
      j = 0
    while (i < leftSort.length && j < rightSort.length) {
      let flag = predicate(leftSort[i]) <= predicate(rightSort[j])
      if (sign !== 'asc') {
        flag = !flag
      }
      if (flag) {
        res.push(leftSort[i++])
      } else {
        res.push(rightSort[j++])
      }
    }
    while (i < leftSort.length) {
      res.push(leftSort[i++])
    }
    while (j < rightSort.length) {
      res.push(rightSort[j++])
    }
    return res
  }
