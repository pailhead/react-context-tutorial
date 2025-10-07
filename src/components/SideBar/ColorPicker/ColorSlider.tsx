import { Slider } from '@chakra-ui/react'

export const ColorSlider = (props: {
  color: string
  value: number
  onChange: (value: number) => void
}) => (
  <Slider.Root
    min={0}
    max={255}
    onValueChange={({ value }) => props.onChange(value[0])}
    value={[props.value]}
  >
    <Slider.Control>
      <Slider.Track bg="gray.700" cursor="pointer">
        <Slider.Range bg={props.color} />
      </Slider.Track>
      <Slider.Thumbs cursor="grab">
        <Slider.DraggingIndicator />
        <Slider.HiddenInput />
      </Slider.Thumbs>
    </Slider.Control>
  </Slider.Root>
)
