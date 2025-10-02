import { VStack } from '@chakra-ui/react'
import { ColorType } from '../../types'
import { ColorSlider } from './ColorSlider'

export const Sliders = (props: {
  rgb: ColorType
  onChange: (rgb: ColorType) => void
}) => (
  <VStack
    flex="1"
    alignItems="stretch"
    justify={'space-between'}
    p="2"
    paddingRight="0"
  >
    <ColorSlider
      value={props.rgb.r}
      color="red"
      onChange={(r) => props.onChange({ ...props.rgb, r })}
    />
    <ColorSlider
      value={props.rgb.g}
      color="green"
      onChange={(g) => props.onChange({ ...props.rgb, g })}
    />
    <ColorSlider
      value={props.rgb.b}
      color="blue"
      onChange={(b) => props.onChange({ ...props.rgb, b })}
    />
  </VStack>
)
