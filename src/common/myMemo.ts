import { memo } from 'react'

export const myMemo = <T>(
  Component: React.ComponentType<T>,
  memoize?: boolean,
) => {
  // if (memoize) {
  //   return memo(Component)
  // }
  return Component
}
