import { Box, Flex } from '@chakra-ui/react'
import { ColorType } from '../../types'
import { Hue } from './Hue'
import { Saturation } from './Saturation'
import { Sliders } from './Sliders'
import { MyBox } from '../../MyBox'
import { myMemo } from '../../myMemo'

export const ColorPicker2 = (props: {
  rgb: ColorType
  onChange: (color: ColorType) => void
}) => {
  return (
    <MyBox
      name="ColorPicker"
      highlightColor="magenta"
      highlightSize={4}
      position="relative"
      w="100%"
    >
      <Box h="10px" w="100%" position="relative" marginBottom="2">
        <Hue {...props} />
      </Box>
      <Flex gap="2">
        <Box position="relative" h="100px" w="100px">
          <Saturation {...props} />
        </Box>
        <Sliders {...props} />
      </Flex>
    </MyBox>
  )
}
export const ColorPicker = myMemo(ColorPicker2, true)
