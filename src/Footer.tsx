import { Box } from '@chakra-ui/react'
import { myMemo } from './myMemo'

const FooterInner = (props: { highlightedEntity: string | null }) => {
  return (
    <Box bg="gray.700" p="2">
      Highlighted entity: {props.highlightedEntity ?? 'none'}
    </Box>
  )
}
FooterInner.displayName = 'Footer'
export const Footer = myMemo(FooterInner, true)
