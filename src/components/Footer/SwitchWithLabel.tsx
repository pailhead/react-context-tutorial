import { Switch } from '@chakra-ui/react'

export const SwitchWithLabel = (props: {
  value: boolean
  label: string
  onChange: (value: boolean) => void
}) => (
  <Switch.Root
    checked={props.value}
    onCheckedChange={(e) => props.onChange(e.checked)}
  >
    <Switch.HiddenInput />
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>{props.label}</Switch.Label>
  </Switch.Root>
)
