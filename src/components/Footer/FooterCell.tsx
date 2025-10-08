import { MyBox } from '../../common/MyBox'

export const FooterCell = (props: { children: React.ReactNode }) => (
  <MyBox
    name="FooterCell"
    highlightColor="cyan"
    highlightSize={6}
    px="4"
    py="2"
    h="100%"
    borderRight="1px solid"
    borderColor="gray.900"
  >
    {props.children}
  </MyBox>
)
