import { Box } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const ToggleButton = (
  props: PropsWithChildren<{ active: boolean; onClick: () => void }>,
) => (
  <Box
    flex="1"
    bg={props.active ? 'gray.700' : 'gray.800'}
    color={props.active ? 'gray.300' : 'gray.600'}
    fontWeight="bold"
    boxShadow={
      props.active ? '0 0 16px rgba(0,0,0,0.75)' : 'inset 0 0 8px rgba(0,0,0,1)'
    }
    p="1"
    textAlign="center"
    onClick={props.onClick}
    cursor="pointer"
  >
    {props.children}
  </Box>
)
ToggleButton.displayName = 'ToggleButton'
