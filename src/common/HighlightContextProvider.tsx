import { PropsWithChildren, useMemo } from 'react'
import { HighlightContext } from './HiglightContext'

export const HighlightContextProvider = (
  props: PropsWithChildren<{ active: boolean }>,
) => {
  const value = useMemo(() => ({ active: props.active }), [props.active])
  return (
    <HighlightContext.Provider value={value}>
      {props.children}
    </HighlightContext.Provider>
  )
}
