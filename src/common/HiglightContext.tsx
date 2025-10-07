import { createContext, useContext } from 'react'

export type HighlightContextValue = { active: boolean }

export const HighlightContext = createContext<HighlightContextValue>({
  active: true,
})

export const useHighlight = () => useContext(HighlightContext)
