module.exports = (name1 = '', name2 = '', match = 0.8) => {
  // Took it from StackOverflow:
  // https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
  const editDistance = (s1, s2) => {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()

    const costs = new Array()
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i
      for (let j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j
        else {
          if (j > 0) {
            var newValue = costs[j - 1]
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
            costs[j - 1] = lastValue
            lastValue = newValue
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue
    }
    return costs[s2.length]
  }

  const similarity = (s1, s2) => {
    let longer = s1
    let shorter = s2
    if (s1.length < s2.length) {
      longer = s2
      shorter = s1
    }
    let longerLength = longer.length
    if (longerLength == 0) {
      return 1.0
    }
    return (
      (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    )
  }

  return similarity(name1, name2) >= match
}
