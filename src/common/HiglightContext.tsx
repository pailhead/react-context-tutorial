import { createContext } from 'react'

export type HighlightContextValue = { active: boolean }

export const HighlightContext = createContext<HighlightContextValue>({
  active: true,
})
