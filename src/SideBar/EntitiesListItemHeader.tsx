import { Flex, Icon, Text } from '@chakra-ui/react'
import { CiTrash } from 'react-icons/ci'

export const EntityListItemHeader = (props: {
  label: string
  onClick: () => void
  onClickDelete: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  isHighlighted: boolean
  isSelected: boolean
}) => (
  <Flex
    p="2"
    cursor="pointer"
    onClick={(e) => {
      e.stopPropagation()
      props.onClick()
    }}
    borderBottom="1px solid"
    borderColor="gray.900"
    color={props.isHighlighted ? 'gray.300' : 'gray.400'}
    bg={props.isSelected ? 'gray.700' : 'gray.800'}
    alignItems="center"
    justifyContent="space-between"
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    <Text ml="2"> {props.label}</Text>
    <Icon _hover={{ color: 'cyan.400' }}>
      <CiTrash
        onClick={(e) => {
          e.stopPropagation()
          props.onClickDelete()
        }}
      />
    </Icon>
  </Flex>
)
EntityListItemHeader.displayName = 'EntityListItemHeader'
