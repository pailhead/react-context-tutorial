import { EntitiesListItem } from './EntitiesListItem'

import { ColorType, Shape, State } from '../../types'
import { MyBox } from '../../common/MyBox'
import { myMemo } from '../../common/myMemo'

const EntitiesListInner = (props: {
  state: State
  onEntityColorChange: (id: string, color: ColorType) => void
  onEntityShapeChange: (id: string, shape: Shape) => void
  onDeleteEntity: (id: string) => void
  onEntityHover: (id: string | null) => void
  onEntitySelection: (id: string | null) => void
}) => {
  return (
    <MyBox
      name="EntitiesList"
      highlightColor="cyan"
      highlightSize={6}
      overflowY="auto"
      flexGrow="1"
      onMouseDown={() => props.onEntitySelection(null)}
    >
      {props.state.entities.map((entity) => (
        <EntitiesListItem
          key={entity.id}
          entity={entity}
          onEntityColorChange={props.onEntityColorChange}
          onEntityShapeChange={props.onEntityShapeChange}
          onEntitySelection={props.onEntitySelection}
          onEntityHover={props.onEntityHover}
          onDeleteEntity={props.onDeleteEntity}
          isSelected={props.state.selectedEntity === entity.id}
          isHighlighted={entity.id === props.state.highlightedEntity}
        />
      ))}
    </MyBox>
  )
}
EntitiesListInner.displayName = 'EntitiesList'
export const EntitiesList = myMemo(EntitiesListInner, false)
