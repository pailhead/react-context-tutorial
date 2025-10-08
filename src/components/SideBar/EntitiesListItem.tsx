import { Collapsible } from '@chakra-ui/react'
import { EntityProps, ColorType, Shape } from '../../types'
import { EntityListItemHeader } from './EntitiesListItemHeader'
import { EntitiesListItemMenu } from './EntitiesListItemMenu'
import { MyBox } from '../../common/MyBox'
import { myMemo } from '../../common/myMemo'

const EntitiesListItemInner = (props: {
  entity: EntityProps
  onEntityColorChange: (id: string, color: ColorType) => void
  onEntityShapeChange: (id: string, shape: Shape) => void
  onEntitySelection: (id: string | null) => void
  onDeleteEntity: (id: string) => void
  onEntityHover: (id: string | null) => void
  isHighlighted: boolean
  isSelected: boolean
}) => {
  return (
    <MyBox
      name="EntitiesListItem"
      highlightColor="green"
      highlightSize={8}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <EntityListItemHeader
        isSelected={props.isSelected}
        isHighlighted={props.isHighlighted}
        label={`Entity ${props.entity.id.substring(0, 2)}`}
        onClick={() =>
          props.onEntitySelection(props.isSelected ? null : props.entity.id)
        }
        onClickDelete={() => {
          if (props.isSelected) props.onEntitySelection(null)
          props.onDeleteEntity(props.entity.id)
        }}
        onMouseEnter={() => props.onEntityHover(props.entity.id)}
        onMouseLeave={() => props.onEntityHover(null)}
      />
      <Collapsible.Root open={props.isSelected}>
        <Collapsible.Content>
          <EntitiesListItemMenu
            entity={props.entity}
            onEntityColorChange={props.onEntityColorChange}
            onEntityShapeChange={props.onEntityShapeChange}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    </MyBox>
  )
}
EntitiesListItemInner.displayName = 'EntitiesListItem'
export const EntitiesListItem = myMemo(EntitiesListItemInner, false)
