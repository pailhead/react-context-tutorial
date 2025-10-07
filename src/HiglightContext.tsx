import React, { PropsWithChildren, useMemo } from 'react'
export const HighlightContext = React.createContext({
  active: true,
})
export const HighlightContextProvider = (
  props: PropsWithChildren<{ active: boolean }>,
) => {
  const value = useMemo(
    () => ({
      active: props.active,
    }),
    [props.active],
  )
  return (
    <HighlightContext.Provider value={value}>
      {props.children}
    </HighlightContext.Provider>
  )
}
export const useHighlightContext = () => React.useContext(HighlightContext)
