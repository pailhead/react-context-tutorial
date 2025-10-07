import { Box, Flex, Switch } from '@chakra-ui/react'
import { myMemo } from './myMemo'
import { State } from './types'

const FooterInner = (props: {
  state: State
  onHighlightChange: (checked: boolean) => void
  onStateVisibleChange: (checked: boolean) => void
}) => {
  return (
    <Flex bg="gray.700" p="2" divideX="1">
      <Box>
        <Switch.Root
          checked={props.state.debug.highlightActive}
          onCheckedChange={(e) => props.onHighlightChange(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Show component update</Switch.Label>
        </Switch.Root>
        <Switch.Root
          checked={props.state.debug.stateVisible}
          onCheckedChange={(e) => props.onStateVisibleChange(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Show state</Switch.Label>
        </Switch.Root>
      </Box>
      <Box>Highlighted entity: {props.state.highlightedEntity ?? 'none'}</Box>
    </Flex>
  )
}

FooterInner.displayName = 'Footer'
export const Footer = myMemo(FooterInner, true)
