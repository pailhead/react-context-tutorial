import { Box } from '@chakra-ui/react'
import { ColorType } from '../../../types'
import convert from 'color-convert'
import { useRef } from 'react'

export const Hue = (props: {
  rgb: ColorType
  onChange: (rgb: ColorType) => void
}) => {
  const { r, g, b } = props.rgb
  const [h, s, v] = convert.rgb.hsv(r, g, b)
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <Box
      ref={ref}
      w="100%"
      h="100%"
      position="relative"
      bg="linear-gradient(to right,
        hsl(0, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(360, 100%, 50%)
      )"
      border="1px solid gray"
      cursor="pointer"
      onMouseDown={(e) => {
        const onMouseMove = (moveEvent: MouseEvent) => {
          if (!ref.current) return
          const rect = ref.current.getBoundingClientRect()
          const x = moveEvent.clientX - rect.left
          const percentage = Math.max(0, Math.min(1, x / rect.width))
          const newHue = Math.round(percentage * 360)
          const [r, g, b] = convert.hsv.rgb(newHue, s, v)
          props.onChange({ r, g, b })
        }
        document.addEventListener('mousemove', onMouseMove)
        onMouseMove(e as unknown as MouseEvent)
        document.addEventListener(
          'mouseup',
          () => document.removeEventListener('mousemove', onMouseMove),
          { once: true },
        )
      }}
    >
      <Box
        position="absolute"
        w="5px"
        h="100%"
        bg="white" //
        transform="translate(-50%)"
        left={`${(h / 360) * 100}%`}
      />
    </Box>
  )
}
