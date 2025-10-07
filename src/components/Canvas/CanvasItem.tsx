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
  const { onMouseDown, ref } = useMouseDown(
    id,
    position,
    setSelectedEntity,
    onEntityMove,
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
  setSelectedEntity: (id: string) => void,
  onEntityMove: (id: string, position: Vec2) => void,
) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
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
  return { onMouseDown, ref }
}
