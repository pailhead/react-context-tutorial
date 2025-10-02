import { Text } from '@chakra-ui/react'
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
  >
    <Text fontSize="lg" fontWeight="bold">
      Entities: {props.count}
    </Text>
    <CiSquarePlus cursor="pointer" onClick={props.onCreateEntity} />
  </MyBox>
)

export const EntitiesHeader = myMemo(EntitiesHeaderInner, true)
