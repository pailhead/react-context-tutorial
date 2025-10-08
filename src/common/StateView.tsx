import { Box } from '@chakra-ui/react'
import { State } from '../types'
import { PropsWithChildren, useLayoutEffect, useMemo, useRef } from 'react'
import React from 'react'
import { keyframes } from '@emotion/react'

const fadeOut = keyframes`
  from { color: red;  background: rgba(255,0,0,0.03); }
  to   { color: white; background: transparent;  }
`

export const StateViewer = (props: { state: State }) => {
  return (
    <Box
      maxH="100%"
      display="inline-block"
      overflow="auto"
      p="4"
      onMouseDown={(e) => e.stopPropagation()}
      scrollbarWidth="none"
    >
      <ObjectViewer
        obj={props.state}
        maxDepth={props.state.debug.stateViewMaxDepth}
      />
    </Box>
  )
}

const Highlight = (props: PropsWithChildren) => {
  const context = React.useContext(ObjectContext)
  return (
    <Box
      key={Date.now()}
      animation={
        context.skipHighlight ? null : `${fadeOut} 2s ease-out forwards`
      }
    >
      {props.children}
    </Box>
  )
}

const useIsDeletion = (isArray: boolean, obj: unknown) => {
  const prevLenRef = useRef<number>(isArray ? (obj as any[]).length : 0)
  const curLen = isArray ? (obj as any[]).length : 0
  const isDeletion = isArray && curLen < prevLenRef.current
  useLayoutEffect(() => {
    if (isArray) prevLenRef.current = curLen
  }, [isArray, curLen])
  return isDeletion
}

const ObjectViewerNotMemoized = (props: {
  objKey?: string
  obj: unknown
  maxDepth?: number
}) => {
  const maxDepth = props.maxDepth ?? Infinity
  const context = React.useContext(ObjectContext)
  const isCollapsed = context.depth > maxDepth
  const isArray = Array.isArray(props.obj)
  const isObject =
    typeof props.obj === 'object' && props.obj != null && !isArray
  const brackets = isArray ? '[]' : isObject ? '{}' : null

  const isDeletion = useIsDeletion(isArray, props.obj)

  if (!brackets) {
    return (
      <Highlight>
        {props.objKey ? props.objKey + ': ' : ''}
        {String(props.obj) + ','}
      </Highlight>
    )
  }

  if (isCollapsed) {
    return <Highlight>{props.objKey}, </Highlight>
  }

  return (
    <Box fontFamily="monospace">
      <Highlight>
        {props.objKey ? props.objKey + ': ' : ''} {brackets[0]}
      </Highlight>
      <ObjectContextProvider
        skipHighlight={context.skipHighlight || isDeletion}
      >
        {Object.entries(props.obj).map(([key, value]) => {
          return (
            <Box ml="4" key={key}>
              <ObjectViewer obj={value} objKey={key} maxDepth={maxDepth} />
            </Box>
          )
        })}
      </ObjectContextProvider>
      <Highlight>{brackets[1] + ','}</Highlight>
    </Box>
  )
}

const ObjectViewer = React.memo(ObjectViewerNotMemoized)

const ObjectContext = React.createContext({
  depth: 0,
  skipHighlight: false,
})

const ObjectContextProvider = ({
  children,
  skipHighlight,
}: PropsWithChildren<{
  maxDepth?: number
  skipHighlight?: boolean
}>) => {
  const nearestAncestor = React.useContext(ObjectContext)
  const nextDepth = nearestAncestor.depth + 1
  const mergedSkip = nearestAncestor.skipHighlight || !!skipHighlight
  const nextValue = useMemo(
    () => ({ depth: nextDepth, skipHighlight: mergedSkip }),
    [nextDepth, mergedSkip],
  )
  return (
    <ObjectContext.Provider value={nextValue}>
      {children}
    </ObjectContext.Provider>
  )
}
