import { Box } from '@chakra-ui/react'

const OFFSET = 5
export const CanvasItemCorner = (props: {
  upDown: 'up' | 'down'
  leftRight: 'left' | 'right'
  round: boolean
}) => (
  <Box
    position="absolute"
    w="50%"
    h="50%"
    left="50%"
    top="50%"
    transform="translate(-50%,-50%)"
  >
    <Box
      position="absolute"
      w="100%"
      h="100%"
      left={props.leftRight === 'left' ? -OFFSET : OFFSET}
      top={props.upDown === 'up' ? -OFFSET : OFFSET}
      borderTop={props.upDown === 'up' ? '4px solid white' : undefined}
      borderBottom={props.upDown === 'down' ? '4px solid white' : undefined}
      borderLeft={props.leftRight === 'left' ? '4px solid white' : undefined}
      borderRight={props.leftRight === 'right' ? '4px solid white' : undefined}
      borderTopLeftRadius={
        props.round && props.upDown === 'up' && props.leftRight === 'left'
          ? '100%'
          : 0
      }
      borderTopRightRadius={
        props.round && props.upDown === 'up' && props.leftRight === 'right'
          ? '100%'
          : 0
      }
      borderBottomLeftRadius={
        props.round && props.upDown === 'down' && props.leftRight === 'left'
          ? '100%'
          : 0
      }
      borderBottomRightRadius={
        props.round && props.upDown === 'down' && props.leftRight === 'right'
          ? '100%'
          : 0
      }
    />
  </Box>
)
