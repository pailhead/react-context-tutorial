import { Box, Flex } from '@chakra-ui/react'
import { SideBar } from './SideBar/SideBar'
import { Footer } from './Footer'
import { MyBox } from './MyBox'
import { HighlightContext } from './HiglightContext'
import { useSetState } from './useSetState'
import { useMemo } from 'react'
import { Canvas } from './Canvas/Canvas'

export const App = () => {
  const {
    state,
    setEntityColor,
    setEntityPosition,
    setEntityIsMoving,
    setEntityShape,
    createEntity,
    deleteEntity,
    setHover,
    setSelectedEntity,
  } = useSetState()
  const highlightContextValue = useMemo(() => ({ active: false }), [])
  return (
    <HighlightContext.Provider value={highlightContextValue}>
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
              setIsEntityMoving={setEntityIsMoving}
              setSelectedEntity={setSelectedEntity}
            />
          </Box>
        </Flex>
        <Footer highlightedEntity={state.highlightedEntity} />
      </MyBox>
    </HighlightContext.Provider>
  )
}
