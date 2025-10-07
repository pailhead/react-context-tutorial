import { Box } from '@chakra-ui/react'
import { CanvasItemCorner } from './CanvasItemCorner'

export const SelectedIndicator = ({ round }: { round: boolean }) => (
  <Box position="absolute" inset="0">
    <CanvasItemCorner upDown="up" leftRight="left" round={round} />
    <CanvasItemCorner upDown="up" leftRight="right" round={round} />
    <CanvasItemCorner upDown="down" leftRight="left" round={round} />
    <CanvasItemCorner upDown="down" leftRight="right" round={round} />
  </Box>
)
