import { useRef } from 'react'
import { MyBox } from '../MyBox'
import { EntityProps, Vec2, Shape } from '../types'
import { myMemo } from '../myMemo'

const CanvasItemInner = (
  props: EntityProps & {
    onEntityMove: (id: string, position: Vec2) => void
    setIsEntityMoving: (id: string, isMoving: boolean) => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onMouseClick?: () => void
    isSelected?: boolean
    isHighlighted?: boolean
  },
) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return
    ref.current.setPointerCapture(1)
    let didMove = false
    const onMouseUp = () => {
      if (!didMove) {
        props.onMouseClick?.()
      }
      props.setIsEntityMoving(props.id, false)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
      ref.current.releasePointerCapture(1)
    }
    let currentPosition: Vec2 = { ...props.position }
    let [prevX, prevY] = [e.clientX, e.clientY]
    const onMouseMove = (moveEvent: MouseEvent) => {
      didMove = true
      // props.setIsEntityMoving(props.id, true)
      const [currentX, currentY] = [moveEvent.clientX, moveEvent.clientY]
      const deltaX = currentX - prevX
      const deltaY = currentY - prevY
      prevX = currentX
      prevY = currentY
      currentPosition = {
        x: currentPosition.x + deltaX,
        y: currentPosition.y + deltaY,
      }
      props.onEntityMove(props.id, currentPosition)
    }
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)
  }
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
      border={props.isSelected ? '2px solid white' : 'none'}
      boxShadow={`0 0 10px ${props.isHighlighted ? 'cyan' : 'black'}`}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      display="flex"
    >
      {props.id.substring(0, 2)}
    </MyBox>
  )
}
CanvasItemInner.displayName = 'CanvasItem'

export const CanvasItem = myMemo(CanvasItemInner, true)
