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
    setEntityColor,
    setEntityPosition,
    setEntityShape,
    createEntity,
    deleteEntity,
    setHover,
    setSelectedEntity,
    setDebugHighlightActive,
    setDebugStateVisible,
    setDebugStateViewMaxDepth,
    setDebugShow3D,
    setDebugWobbleAll,
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
            onColorChange={setEntityColor}
            onShapeChange={setEntityShape}
            onCreateEntity={createEntity}
            onDeleteEntity={deleteEntity}
            onHoverChanged={setHover}
            onEntitySelected={setSelectedEntity}
          />
          <Box position="relative" flex="1">
            <Canvas
              state={state}
              onHoverChanged={setHover}
              setEntityPosition={setEntityPosition}
              setSelectedEntity={setSelectedEntity}
            />
          </Box>
        </Flex>
        <Footer
          state={state}
          onStateMaxDepthChange={setDebugStateViewMaxDepth}
          onHighlightChange={setDebugHighlightActive}
          onStateVisibleChange={setDebugStateVisible}
          onShow3DChange={setDebugShow3D}
          onWobbleAllChange={setDebugWobbleAll}
        />
      </MyBox>
    </HighlightContextProvider>
  )
}
