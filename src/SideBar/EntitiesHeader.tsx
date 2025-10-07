import { Icon, Text } from '@chakra-ui/react'
import { CiSquarePlus } from 'react-icons/ci'
import { MyBox } from '../MyBox'
import { myMemo } from '../myMemo'

const EntitiesHeaderInner = (props: {
  onCreateEntity: () => void
  count: number
}) => (
  <MyBox
    name="EntitiesHeader"
    highlightColor="cyan"
    highlightSize={3}
    borderBottom="1px solid"
    borderColor="black"
    p="2"
    bg="gray.700"
    color="gray.200"
    fontSize="lg"
    fontWeight="bold"
    justifyContent="space-between"
    display="flex"
    alignItems="center"
  >
    <Text fontSize="lg" fontWeight="bold">
      Entities: {props.count}
    </Text>
    <Icon _hover={{ color: 'cyan.400' }}>
      <CiSquarePlus cursor="pointer" onClick={props.onCreateEntity} />
    </Icon>
  </MyBox>
)

export const EntitiesHeader = myMemo(EntitiesHeaderInner, true)
