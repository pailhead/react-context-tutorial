import { NumberInput, HStack, IconButton } from '@chakra-ui/react'
import { LuMinus, LuPlus } from 'react-icons/lu'

export const Spinner = (props: {
  value: number
  onChange: (v: number) => void
}) => {
  return (
    <NumberInput.Root
      unstyled
      spinOnPress={false}
      value={props.value.toString()}
      onValueChange={(e) => props.onChange(Number(e.value))}
      min={0}
      max={3}
    >
      <HStack gap="2">
        <NumberInput.DecrementTrigger asChild>
          <IconButton variant="solid" size="2xs" bg="gray.800">
            <LuMinus />
          </IconButton>
        </NumberInput.DecrementTrigger>
        <NumberInput.ValueText
          textAlign="center"
          fontSize="m"
          fontWeight="bold"
          minW="3ch"
        />
        <NumberInput.IncrementTrigger asChild>
          <IconButton variant="solid" size="2xs" bg="gray.800">
            <LuPlus />
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInput.Root>
  )
}
