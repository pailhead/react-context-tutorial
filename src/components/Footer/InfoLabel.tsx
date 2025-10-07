import { Box, Text } from '@chakra-ui/react'

export const InfoLabel = (props: { label: string; value: string }) => (
  <Box>
    <Text as="span">{props.label}:</Text>
    <Text
      as="span"
      ml="1"
      fontWeight="bold"
      fontFamily="monospace"
      fontSize="16px"
    >
      {props.value}
    </Text>
  </Box>
)
