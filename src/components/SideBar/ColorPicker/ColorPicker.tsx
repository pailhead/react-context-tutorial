import { Box, Flex } from '@chakra-ui/react'
import { ColorType } from '../../../types'
import { Hue } from './Hue'
import { Saturation } from './Saturation'
import { Sliders } from './Sliders'
import { MyBox } from '../../../common/MyBox'
import { myMemo } from '../../../common/myMemo'

export const ColorPickerInner = (props: {
  rgb: ColorType
  onChange: (color: ColorType) => void
}) => {
  return (
    <MyBox
      name="ColorPicker"
      highlightColor="magenta"
      highlightSize={2}
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
ColorPickerInner.displayName = 'ColorPicker'
export const ColorPicker = myMemo(ColorPickerInner, true)
