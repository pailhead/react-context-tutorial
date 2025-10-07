import { Box } from '@chakra-ui/react'

export const FooterCell = (props: { children: React.ReactNode }) => (
  <Box
    px="4"
    py="2"
    h="100%"
    _notLast={{ borderRight: '1px solid', borderColor: 'gray.900' }}
  >
    {props.children}
  </Box>
)
