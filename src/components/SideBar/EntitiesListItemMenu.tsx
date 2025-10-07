import { VStack } from '@chakra-ui/react'
import { EntityProps, ColorType, Shape } from '../../types'
import { ShapeControls } from './ShapeControls'
import { ColorPicker } from './ColorPicker/ColorPicker'
import { useCallback } from 'react'
import { myMemo } from '../../common/myMemo'

export const EntitiesListItemMenuInner = (props: {
  entity: EntityProps
  onColorChange: (id: string, color: ColorType) => void
  onShapeChange: (id: string, shape: Shape) => void
}) => {
  const entityId = props.entity.id
  const { onColorChange } = props
  const _onColorChange = useCallback(
    (color: ColorType) => onColorChange(entityId, color),
    [onColorChange, entityId],
  )
  return (
    <VStack
      align="start"
      gap="4"
      bg="gray.900"
      boxShadow="inset 0 0 10px rgba(0,0,0,0.5)"
      p="4"
    >
      <ColorPicker rgb={props.entity.color} onChange={_onColorChange} />
      <ShapeControls
        shape={props.entity.shape}
        onShapeChange={(shape: Shape) =>
          props.onShapeChange(props.entity.id, shape)
        }
      />
    </VStack>
  )
}
export const EntitiesListItemMenu = myMemo(EntitiesListItemMenuInner, true)
EntitiesListItemMenu.displayName = 'EntitiesListItemMenu'
