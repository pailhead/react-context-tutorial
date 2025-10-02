import { Box } from '@chakra-ui/react'
import { ColorType } from '../../types'
import convert from 'color-convert'
import { useRef } from 'react'

export const Saturation = (props: {
  rgb: ColorType
  onChange: (color: ColorType) => void
}) => {
  const { r, g, b } = props.rgb
  const hsv = convert.rgb.hsv(r, g, b)
  const [h, s, l] = hsv
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <Box
      ref={ref}
      w="100%"
      h="100%"
      border="1px solid"
      borderColor="gray.300"
      position="relative"
      cursor="crosshair"
      onMouseDown={(e) => {
        const startHue = h
        const onMouseMove = (moveEvent: MouseEvent) => {
          if (!ref.current) return
          const rect = ref.current.getBoundingClientRect()
          let x = moveEvent.clientX - rect.left
          let y = moveEvent.clientY - rect.top
          x = Math.max(0, Math.min(rect.width, x))
          y = Math.max(0, Math.min(rect.height, y))
          const newSaturation = x / rect.width
          const newLight = 1 - y / rect.height
          const [r, g, b] = convert.hsv.rgb(
            startHue,
            newSaturation * 100,
            newLight * 100,
          )
          props.onChange({ r, g, b })
        }
        onMouseMove(e as unknown as MouseEvent)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener(
          'mouseup',
          () => document.removeEventListener('mousemove', onMouseMove),
          { once: true },
        )
      }}
    >
      <Box
        position="absolute"
        inset="0"
        bg={`linear-gradient(to right, white, hsl(${h}, 100%, 50%))`}
      />
      <Box
        position="absolute"
        inset="0"
        bg="linear-gradient(to bottom, transparent, black)"
      />
      <Box
        position="absolute"
        left={`${s}%`}
        top={`${100 - l}%`}
        transform="translate(-50%, -50%)"
        w="5px"
        h="5px"
        borderRadius="50%"
        bg={`rgb(${r}, ${g}, ${b})`}
        borderColor="white"
        border="1px solid"
        cursor="pointer"
      />
    </Box>
  )
}
