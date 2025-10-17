import { VStack } from '@chakra-ui/react'
import { EntityProps, ColorType, Shape } from '../../types'
import { ShapeControls } from './ShapeControls'
import { ColorPicker } from './ColorPicker/ColorPicker'
import { myMemo } from '../../common/myMemo'
import { useCallback } from 'react'

export const EntitiesListItemMenuInner = (props: {
  entity: EntityProps
  onEntityColorChange: (id: string, color: ColorType) => void
  onEntityShapeChange: (id: string, shape: Shape) => void
}) => {
  const { onEntityColorChange, onEntityShapeChange, entity } = props
  const { id, shape, color } = entity
  const onEntityColorChangeStable = useCallback(
    (color) => onEntityColorChange(id, color),
    [id, onEntityColorChange],
  )
  const onEntityShapeChangeStable = useCallback(
    (shape) => onEntityShapeChange(id, shape),
    [id, onEntityShapeChange],
  )
  return (
    <VStack
      align="start"
      gap="4"
      bg="gray.900"
      boxShadow="inset 0 0 10px rgba(0,0,0,0.5)"
      p="4"
    >
      <ColorPicker rgb={color} onChange={onEntityColorChangeStable} />
      <ShapeControls shape={shape} onShapeChange={onEntityShapeChangeStable} />
    </VStack>
  )
}

EntitiesListItemMenuInner.displayName = 'EntitiesListItemMenu'

export const EntitiesListItemMenu = myMemo(EntitiesListItemMenuInner, true)
