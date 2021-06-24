import { inputTimeout } from '../constants'

const timedOutFetch = (fetchFn, name, token) => {
  const timeoutId = setTimeout(() => fetchFn({ name, token }), inputTimeout)
  return () => clearTimeout(timeoutId)
}

export default timedOutFetch
