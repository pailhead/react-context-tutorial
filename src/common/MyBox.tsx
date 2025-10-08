import { Box, BoxProps } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import React, { forwardRef, PropsWithChildren } from 'react'
import { HighlightContext } from './HiglightContext'

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`
type Props = {
  name: string
  highlightSize?: number
  highlightColor?: string
} & BoxProps

export const MyBox = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (props, ref) => {
    const context = React.useContext(HighlightContext)

    return (
      <Box ref={ref} position="relative" {...props}>
        {props.children}
        {context.active && (
          <Box
            key={Date.now()}
            position="absolute"
            inset={0}
            pointerEvents="none"
            boxShadow={`inset 0 0 0px ${props.highlightSize ?? 2}px ${props.highlightColor ?? 'red'}`}
            animation={`${fadeOut} 1.5s ease-in-out forwards`}
            borderRadius="inherit"
            zIndex={1}
          />
        )}
      </Box>
    )
  },
)
MyBox.displayName = 'MyBox'
