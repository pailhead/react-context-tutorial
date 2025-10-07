import { useCallback, useRef } from 'react'
import { MyBox } from '../MyBox'
import { EntityProps, Vec2, Shape } from '../types'
import { myMemo } from '../myMemo'
import { Box } from '@chakra-ui/react'

const CanvasItemInner = (
  props: EntityProps & {
    onEntityMove: (id: string, position: Vec2) => void
    setSelectedEntity: (id: string | null) => void
    onHoverChanged: (id: string | null) => void
    isSelected?: boolean
    isHighlighted?: boolean
  },
) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { setSelectedEntity, onHoverChanged, onEntityMove, id, position } =
    props
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      ref.current.setPointerCapture(1)
      let didMove = false
      const onMouseUp = () => {
        if (!didMove) {
          setSelectedEntity(id)
        }
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('mousemove', onMouseMove)
        ref.current.releasePointerCapture(1)
      }
      let currentPosition: Vec2 = { ...position }
      let [prevX, prevY] = [e.clientX, e.clientY]
      const onMouseMove = (moveEvent: MouseEvent) => {
        didMove = true
        const [currentX, currentY] = [moveEvent.clientX, moveEvent.clientY]
        const deltaX = currentX - prevX
        const deltaY = currentY - prevY
        prevX = currentX
        prevY = currentY
        currentPosition = {
          x: currentPosition.x + deltaX,
          y: currentPosition.y + deltaY,
        }
        onEntityMove(id, currentPosition)
      }
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('mousemove', onMouseMove)
    },
    [position, setSelectedEntity, id, onEntityMove],
  )
  const { r, g, b } = props.color
  const bg = `rgb(${r}, ${g}, ${b})`
  return (
    <MyBox
      ref={ref}
      name="CanvasItem"
      highlightColor="cyan"
      highlightSize={3}
      alignItems="center"
      justifyContent="center"
      width="50px"
      fontWeight="bold"
      height="50px"
      bg={bg}
      position="absolute"
      borderRadius={props.shape === Shape.Circle ? '50%' : '0'}
      left={`${props.position.x}px`}
      top={`${props.position.y}px`}
      onMouseDown={onMouseDown}
      boxShadow={`0 0 10px ${props.isHighlighted ? 'cyan' : 'black'}`}
      onMouseEnter={() => onHoverChanged(props.id)}
      onMouseLeave={() => onHoverChanged(null)}
      display="flex"
      cursor="pointer"
    >
      {props.id.substring(0, 2)}
      {props.isSelected && (
        <Box position="absolute" inset="0">
          <Foo
            upDown="up"
            leftRight="left"
            round={props.shape === Shape.Circle}
          />
          <Foo
            upDown="up"
            leftRight="right"
            round={props.shape === Shape.Circle}
          />
          <Foo
            upDown="down"
            leftRight="left"
            round={props.shape === Shape.Circle}
          />
          <Foo
            upDown="down"
            leftRight="right"
            round={props.shape === Shape.Circle}
          />
        </Box>
      )}
    </MyBox>
  )
}
CanvasItemInner.displayName = 'CanvasItem'

const OFFSET = 5
const Foo = (props: {
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
export const CanvasItem = myMemo(CanvasItemInner, true)
