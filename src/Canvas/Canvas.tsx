import { Box } from '@chakra-ui/react'
import { Vec2, State } from '../types'
import { MyBox } from '../MyBox'
import { StateViewer } from '../StateView'
import { CanvasItem } from './CanvasItem'
import { myMemo } from '../myMemo'

const CanvasInner = (props: {
  state: State
  setEntityPosition: (id: string, position: Vec2) => void
  setIsEntityMoving: (id: string, isMoving: boolean) => void
  setSelectedEntity: (id: string | null) => void
  onHoverChanged: (id: string | null) => void
}) => (
  <MyBox
    name="Canvas"
    highlightColor="yellow"
    highlightSize={2}
    boxShadow="inset 0 0 10px black"
    position="relative"
    width="100%"
    height="100%"
    overflow="hidden"
    userSelect="none"
  >
    <Box position="absolute" top="50%" left="50%">
      {props.state.entities.map((entity) => (
        <CanvasItem
          key={entity.id}
          {...entity}
          onEntityMove={props.setEntityPosition}
          setIsEntityMoving={props.setIsEntityMoving}
          onMouseEnter={() => props.onHoverChanged(entity.id)}
          onMouseLeave={() => props.onHoverChanged(null)}
          onMouseClick={() => props.setSelectedEntity(entity.id)}
          isSelected={props.state.selectedEntity === entity.id}
          isHighlighted={entity.id === props.state.highlightedEntity}
        />
      ))}
    </Box>
    {/* <StateViewer state={props.state} /> */}
  </MyBox>
)
CanvasInner.displayName = 'Canvas'

export const Canvas = myMemo(CanvasInner, true)
