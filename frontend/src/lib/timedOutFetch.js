import { inputTimeout } from '../constants'

const timedOutFetch = (fetchFn, obj) => {
  const timeoutId = setTimeout(() => fetchFn(obj), inputTimeout)
  return () => clearTimeout(timeoutId)
}

export default timedOutFetch
