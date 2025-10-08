import { useCallback } from 'react'

import { EntitiesListItem } from './EntitiesListItem'

import { ColorType, Shape, State } from '../../types'
import { MyBox } from '../../common/MyBox'
import { myMemo } from '../../common/myMemo'

const EntitiesListInner = (props: {
  state: State
  onColorChange: (id: string, color: ColorType) => void
  onShapeChange: (id: string, shape: Shape) => void
  onDeleteEntity: (id: string) => void
  onHoverChanged: (id: string | null) => void
  onEntitySelected: (id: string | null) => void
}) => {
  const { onEntitySelected } = props
  const onSetOpen = useCallback(
    (id: string | null) => onEntitySelected(id),
    [onEntitySelected],
  )
  return (
    <MyBox
      name="EntitiesList"
      highlightColor="cyan"
      highlightSize={3}
      overflowY="auto"
      flexGrow="1"
      onMouseDown={() => {
        props.onEntitySelected(null)
      }}
    >
      {props.state.entities.map((entity) => (
        <EntitiesListItem
          key={entity.id}
          entity={entity}
          onColorChange={props.onColorChange}
          onShapeChange={props.onShapeChange}
          onSetOpen={onSetOpen}
          onHoverChanged={props.onHoverChanged}
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
