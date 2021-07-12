var jinchangyi = function() {
  function chunk(array, size) {
    let arr = [], result = []
    for (let i = 0; i < array.length; i++) {
      arr.push(array[i])
      if (arr.length === size) {
        result.push(arr)
        arr = []
      }
    }
    if (arr.length !== 0) {
      result.push(arr)
    }
    return result
  }
}