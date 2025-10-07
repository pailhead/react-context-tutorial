import { Flex } from '@chakra-ui/react'

import { SwitchWithLabel } from './SwitchWithLabel'
import { FooterCell } from './FooterCell'

import { myMemo } from '../../common/myMemo'
import { State } from '../../types'
import { InfoLabel } from './InfoLabel'

const FooterInner = (props: {
  state: State
  onHighlightChange: (checked: boolean) => void
  onStateVisibleChange: (checked: boolean) => void
}) => {
  return (
    <Flex bg="gray.700" flexShrink="0" color="gray.400">
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
      <FooterCell>
        <InfoLabel
          label="Highlighted entity"
          value={props.state.highlightedEntity?.substring(0, 4) ?? 'none'}
        />
      </FooterCell>
      <FooterCell>
        <InfoLabel
          label="Selected entity"
          value={props.state.selectedEntity?.substring(0, 4) ?? 'none'}
        />
      </FooterCell>
    </Flex>
  )
}
FooterInner.displayName = 'Footer'
export const Footer = myMemo(FooterInner, true)
