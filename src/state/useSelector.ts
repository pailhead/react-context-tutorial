import { useEffect, useRef, useState } from 'react'
import { store } from './store2'
import { State } from '../types'

export const useSelector = <T>(
  selector: (state: State) => T,
  eqFn?: (a: T, b: T) => boolean,
): T => {
  const [value, setValue] = useState<T>(selector(store.getState()))
  const prevValueRef = useRef(value)

  const stableRef = useRef({ selector, eqFn })
  stableRef.current.selector = selector
  stableRef.current.eqFn = eqFn

  useEffect(() => {
    const selector = stableRef.current.selector
    const eqFn = stableRef.current.eqFn

    const onStateChanged = (state: State) => {
      const prevValue = prevValueRef.current
      const newValue = selector(state)
      if (eqFn?.(newValue, prevValue) ?? newValue === prevValue) return
      setValue(newValue)
      prevValueRef.current = newValue
    }

    store.on('stateChanged', onStateChanged)

    return () => {
      store.off('stateChanged', onStateChanged)
    }
  }, [])
  return value
}
