import { SwitchWithLabel } from './SwitchWithLabel'
import { FooterCell } from './FooterCell'

import { myMemo } from '../../common/myMemo'
import { State } from '../../types'
import { InfoLabel } from './InfoLabel'
import { MyBox } from '../../common/MyBox'
import { Spinner } from './Spinner'

const FooterInner = (props: {
  state: State
  onHighlightChange: (checked: boolean) => void
  onStateVisibleChange: (checked: boolean) => void
  onStateMaxDepthChange: (value: number) => void
  onShow3DChange: (checked: boolean) => void
  onWobbleAllChange: (checked: boolean) => void
}) => {
  return (
    <MyBox
      name="SideBar"
      highlightColor="yellow"
      highlightSize={4}
      bg="gray.700"
      flexShrink="0"
      color="gray.400"
      display="flex"
    >
      <FooterCell>
        <InfoLabel
          label="Highlighted entity"
          value={props.state.highlightedEntity?.substring(0, 4) ?? 'none'}
        />
      </FooterCell>
      <FooterCell>
        <SwitchWithLabel
          value={props.state.debug.show3D}
          label="3D"
          onChange={props.onShow3DChange}
        />
      </FooterCell>
      {props.state.debug.show3D && (
        <FooterCell>
          <SwitchWithLabel
            label="Wobble all"
            value={props.state.debug.wobbleAll}
            onChange={props.onWobbleAllChange}
          />
        </FooterCell>
      )}
      <FooterCell>
        <SwitchWithLabel
          value={props.state.debug.highlightActive}
          label="Show component update"
          onChange={props.onHighlightChange}
        />
      </FooterCell>
      <FooterCell>
        <SwitchWithLabel
          value={props.state.debug.stateVisible}
          label="Show state"
          onChange={props.onStateVisibleChange}
        />
      </FooterCell>
      {props.state.debug.stateVisible && (
        <FooterCell>
          <Spinner
            value={props.state.debug.stateViewMaxDepth}
            onChange={props.onStateMaxDepthChange}
          />
        </FooterCell>
      )}
    </MyBox>
  )
}
FooterInner.displayName = 'Footer'
export const Footer = myMemo(FooterInner, true)
