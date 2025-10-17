import { Box } from '@chakra-ui/react'
import { Vec2, State } from '../../types'
import { MyBox } from '../../common/MyBox'
import { StateViewer } from '../../common/StateView'
import { CanvasItem } from './CanvasItem'
import { myMemo } from '../../common/myMemo'
import { ThreeCanvas } from './three/ThreeCanvas'

const CanvasInner = (props: {
  state: State
  onEntityMove: (id: string, position: Vec2) => void
  onEntitySelection: (id: string | null) => void
  onEntityHover: (id: string | null) => void
}) => {
  return (
    <MyBox
      name="Canvas"
      highlightColor="yellow"
      highlightSize={4}
      boxShadow="inset 0 0 10px black"
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      userSelect="none"
      onMouseDown={() => props.onEntitySelection(null)}
    >
      {props.state.debug.show3D && (
        <ThreeCanvas
          entities={props.state.entities}
          highlightedEntity={props.state.highlightedEntity}
          wobbleAll={props.state.debug.wobbleAll}
        />
      )}
      <Box position="absolute" top="50%" left="50%">
        {props.state.entities.map((entity) => (
          <CanvasItem
            key={entity.id}
            {...entity}
            isVisible={!props.state.debug.show3D}
            onEntityMove={props.onEntityMove}
            setSelectedEntity={props.onEntitySelection}
            onHoverChanged={props.onEntityHover}
            isSelected={props.state.selectedEntity === entity.id}
            isHighlighted={entity.id === props.state.highlightedEntity}
          />
        ))}
      </Box>
      {props.state.debug.stateVisible && <StateViewer state={props.state} />}
    </MyBox>
  )
}
CanvasInner.displayName = 'Canvas'

export const Canvas = myMemo(CanvasInner, true)
