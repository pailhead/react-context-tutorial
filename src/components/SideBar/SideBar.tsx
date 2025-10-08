import { EntitiesList } from './EntitiesList'
import { ColorType, Shape, State } from '../../types'
import { EntitiesHeader } from './EntitiesHeader'
import { MyBox } from '../../common/MyBox'
import { myMemo } from '../../common/myMemo'

const SideBarInner = (props: {
  state: State
  onCreateEntity: () => void
  onEntityColorChange: (id: string, color: ColorType) => void
  onEntityShapeChange: (id: string, shape: Shape) => void
  onDeleteEntity: (id: string) => void
  onEntityHover: (id: string | null) => void
  onEntitySelection: (id: string | null) => void
}) => (
  <MyBox
    name="SideBar"
    highlightColor="yellow"
    highlightSize={4}
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

export const SideBar = myMemo(SideBarInner, false)
