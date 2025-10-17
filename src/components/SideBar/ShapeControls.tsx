import { Shape } from '../../types'
import { MyBox } from '../../common/MyBox'
import { ToggleButton } from './ToggleButton'
import { myMemo } from '../../common/myMemo'

const ShapeControlsInner = (props: {
  shape: Shape
  onShapeChange: (shape: Shape) => void
}) => (
  <MyBox
    name="ShapeControls"
    highlightColor="magenta"
    highlightSize={2}
    w="100%"
    display="flex"
  >
    <ToggleButton
      active={props.shape === Shape.Circle}
      onClick={() => props.onShapeChange(Shape.Circle)}
    >
      Circle
    </ToggleButton>
    <ToggleButton
      active={props.shape === Shape.Square}
      onClick={() => props.onShapeChange(Shape.Square)}
    >
      Square
    </ToggleButton>
  </MyBox>
)
ShapeControlsInner.displayName = 'ShapeControls'

export const ShapeControls = myMemo(ShapeControlsInner, true)
