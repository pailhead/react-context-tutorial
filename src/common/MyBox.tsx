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
    const { active } = React.useContext(HighlightContext)

    if (!active) {
      return (
        <Box ref={ref} {...props}>
          {props.children}
        </Box>
      )
    }

    return (
      <Box ref={ref} {...props} position="relative">
        {props.children}
        <Box
          key={Date.now()}
          position="absolute"
          inset={0}
          pointerEvents="none"
          boxShadow={`inset 0 0 0px ${props.highlightSize ?? 2}px ${props.highlightColor ?? 'red'}`}
          animation={`${fadeOut} 1s ease-out forwards`}
          borderRadius="inherit"
          zIndex={1}
        />
      </Box>
    )
  },
)
