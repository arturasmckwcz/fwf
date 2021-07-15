import { inputTimeout } from '../../constants'

export const timedOutFetch = (fetchFn, obj) => {
  const timeoutId = setTimeout(() => fetchFn(obj), inputTimeout)
  return () => clearTimeout(timeoutId)
}
