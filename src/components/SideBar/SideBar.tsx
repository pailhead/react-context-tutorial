import { EntitiesList } from './EntitiesList'
import { ColorType, Shape, State } from '../../types'
import { EntitiesHeader } from './EntitiesHeader'
import { MyBox } from '../../common/MyBox'
import { myMemo } from '../../common/myMemo'

const SideBarInner = (props: {
  state: State
  onCreateEntity: () => void
  onColorChange: (id: string, color: ColorType) => void
  onShapeChange: (id: string, shape: Shape) => void
  onDeleteEntity: (id: string) => void
  onHoverChanged: (id: string | null) => void
  onEntitySelected: (id: string | null) => void
}) => (
  <MyBox
    name="SideBar"
    highlightColor="yellow"
    highlightSize={2}
    width="250px"
    height="100%"
    userSelect="none"
    flexDir="column"
    display="flex"
  >
    <EntitiesHeader
      onCreateEntity={props.onCreateEntity}
      count={props.state.entities.length}
    />
    <EntitiesList {...props} />
  </MyBox>
)

SideBarInner.displayName = 'SideBar'

export const SideBar = myMemo(SideBarInner, true)
