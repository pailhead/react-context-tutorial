import { Box, Flex } from '@chakra-ui/react'
import { SideBar } from './components/SideBar/SideBar'
import { Footer } from './components/Footer/Footer'
import { Canvas } from './components/Canvas/Canvas'
import { MyBox } from './common/MyBox'
import { useAppState } from './state/useAppState'
import { HighlightContextProvider } from './common/HighlightContextProvider'

export const App = () => {
  const {
    state,
    onEntityColorChange,
    onEntityMove,
    onEntityShapeChange,
    onCreateEntity,
    onDeleteEntity,
    onEntityHover,
    onEntitySelection,
    onHighlightChange,
    onStateVisibleChange,
    onStateMaxDepthChange,
    onShow3DChange,
    onWobbleAllChange,
  } = useAppState()
  return (
    <HighlightContextProvider active={state.debug.highlightActive}>
      <MyBox
        name="App"
        height="100vh"
        width="100%"
        flexDirection="column"
        position="absolute"
        display="flex"
        flexDir="column"
      >
        <Flex flex="1" width="100%" maxHeight="100%" minHeight="0">
          <SideBar
            state={state}
            onEntityColorChange={onEntityColorChange}
            onEntityShapeChange={onEntityShapeChange}
            onCreateEntity={onCreateEntity}
            onDeleteEntity={onDeleteEntity}
            onEntityHover={onEntityHover}
            onEntitySelection={onEntitySelection}
          />
          <Box position="relative" flex="1">
            <Canvas
              state={state}
              onEntityHover={onEntityHover}
              onEntityMove={onEntityMove}
              onEntitySelection={onEntitySelection}
            />
          </Box>
        </Flex>
        <Footer
          state={state}
          onStateMaxDepthChange={onStateMaxDepthChange}
          onHighlightChange={onHighlightChange}
          onStateVisibleChange={onStateVisibleChange}
          onShow3DChange={onShow3DChange}
          onWobbleAllChange={onWobbleAllChange}
        />
      </MyBox>
    </HighlightContextProvider>
  )
}
