import { VStack } from '@chakra-ui/react'
import { EntityProps, ColorType, Shape } from '../../types'
import { ShapeControls } from './ShapeControls'
import { ColorPicker } from './ColorPicker/ColorPicker'
import { myMemo } from '../../common/myMemo'

export const EntitiesListItemMenuInner = (props: {
  entity: EntityProps
  onColorChange: (id: string, color: ColorType) => void
  onShapeChange: (id: string, shape: Shape) => void
}) => {
  return (
    <VStack
      align="start"
      gap="4"
      bg="gray.900"
      boxShadow="inset 0 0 10px rgba(0,0,0,0.5)"
      p="4"
    >
      <ColorPicker
        rgb={props.entity.color}
        onChange={(color) => props.onColorChange(props.entity.id, color)}
      />
      <ShapeControls
        shape={props.entity.shape}
        onShapeChange={(shape: Shape) =>
          props.onShapeChange(props.entity.id, shape)
        }
      />
    </VStack>
  )
}

EntitiesListItemMenuInner.displayName = 'EntitiesListItemMenu'

export const EntitiesListItemMenu = myMemo(EntitiesListItemMenuInner, false)
