import { useCallback, useRef } from 'react'
import { SelectedIndicator } from './CanvasItemSelectedIndicator'
import { MyBox } from '../../common/MyBox'
import { myMemo } from '../../common/myMemo'
import { EntityProps, Vec2, Shape } from '../../types'

const CanvasItemInner = (
  props: EntityProps & {
    onEntityMove: (id: string, position: Vec2) => void
    setSelectedEntity: (id: string | null) => void
    onHoverChanged: (id: string | null) => void
    isSelected?: boolean
    isHighlighted?: boolean
  },
) => {
  const { setSelectedEntity, onHoverChanged, onEntityMove, id, position } =
    props
  const onClick = useCallback(() => {
    setSelectedEntity(id)
  }, [id, setSelectedEntity])
  const onDrag = useCallback(
    (newPosition: Vec2) => {
      onEntityMove(id, newPosition)
    },
    [id, onEntityMove],
  )
  const { onMouseDown, ref } = useMouseDown(id, position, onClick, onDrag)
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
        <SelectedIndicator round={props.shape === Shape.Circle} />
      )}
    </MyBox>
  )
}
CanvasItemInner.displayName = 'CanvasItem'

export const CanvasItem = myMemo(CanvasItemInner, true)

const useMouseDown = (
  id: string,
  position: Vec2,
  onClick: () => void,
  onDrag: (position: Vec2) => void,
) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!ref.current) return
      //capture pointer and set didMove flag
      ref.current.setPointerCapture(1)
      let didMove = false

      //if didnt move fire the click event
      //cleanup the listeners
      const onMouseUp = () => {
        if (!didMove) {
          onClick()
        }
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('mousemove', onMouseMove)
        ref.current.releasePointerCapture(1)
      }
      //start tracking the mouse move
      let currentPosition: Vec2 = { ...position }
      let [prevX, prevY] = [e.clientX, e.clientY]

      //update position
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
        // onEntityMove(id, currentPosition)
        onDrag(currentPosition)
      }
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('mousemove', onMouseMove)
    },
    [position, onClick, onDrag],
  )
  return { onMouseDown, ref }
}
