import { Collapsible } from '@chakra-ui/react'
import { EntityProps, ColorType, Shape } from '../types'
import { EntityListItemHeader } from './EntitiesListItemHeader'
import { EntitiesListItemMenu } from './EntitiesListItemMenu'
import { MyBox } from '../MyBox'
import { myMemo } from '../myMemo'

const EntitiesListItemInner = (props: {
  entity: EntityProps
  onColorChange: (id: string, color: ColorType) => void
  onShapeChange: (id: string, shape: Shape) => void
  onSetOpen: (id: string | null) => void
  onDeleteEntity: (id: string) => void
  onHoverChanged: (id: string | null) => void
  isHighlighted: boolean
  isSelected: boolean
}) => {
  const onClickHeader = () =>
    props.onSetOpen(props.isSelected ? null : props.entity.id)

  return (
    <MyBox
      name="EntitiesListItem"
      highlightColor="cyan"
      highlightSize={3}
      onMouseDown={(e) => {
        e.stopPropagation()
      }}
    >
      <EntityListItemHeader
        isSelected={props.isSelected}
        isHighlighted={props.isHighlighted}
        label={`Entity ${props.entity.id.substring(0, 2)}`}
        onClick={onClickHeader}
        onClickDelete={() => {
          if (props.isSelected) props.onSetOpen(null)
          props.onDeleteEntity(props.entity.id)
        }}
        onMouseEnter={() => props.onHoverChanged(props.entity.id)}
        onMouseLeave={() => props.onHoverChanged(null)}
      />
      <Collapsible.Root open={props.isSelected}>
        <Collapsible.Content>
          <EntitiesListItemMenu
            entity={props.entity}
            onColorChange={props.onColorChange}
            onShapeChange={props.onShapeChange}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    </MyBox>
  )
}
EntitiesListItemInner.displayName = 'EntitiesListItem'
export const EntitiesListItem = myMemo(EntitiesListItemInner, true)
