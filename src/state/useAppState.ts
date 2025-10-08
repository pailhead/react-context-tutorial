import { useEffect, useState } from 'react'
import { State, ColorType, Vec2, Shape } from '../types'
import debounce from 'debounce'
import { createEntityProps, DEFAULT_STATE } from './state'

const debouncedSaveState = debounce((state: State) => {
  localStorage.setItem('context-playground-state', JSON.stringify(state))
}, 300)

export const useAppState = () => {
  const [state, setState] = useState<State>(DEFAULT_STATE)

  useEffect(() => {
    debouncedSaveState(state)
  }, [state])

  const onEntityColorChange = (id: string, color: ColorType) =>
    setState((prev) => ({
      ...prev,
      entities: prev.entities.map((entity) =>
        entity.id === id ? { ...entity, color } : entity,
      ),
    }))

  const onEntityMove = (id: string, position: Vec2) =>
    setState((prev) => ({
      ...prev,
      entities: prev.entities.map((entity) =>
        entity.id === id ? { ...entity, position } : entity,
      ),
    }))

  const onEntityShapeChange = (id: string, shape: Shape) =>
    setState((prev) => ({
      ...prev,
      entities: prev.entities.map((entity) =>
        entity.id === id ? { ...entity, shape } : entity,
      ),
    }))

  const onCreateEntity = () => {
    setState((prev) => ({
      ...prev,
      entities: [...prev.entities, createEntityProps()],
    }))
  }

  const onDeleteEntity = (id: string) => {
    setState((prev) => ({
      ...prev,
      entities: prev.entities.filter((entity) => entity.id !== id),
    }))
  }

  const onEntityHover = (id: string | null) => {
    setState((prev) => ({
      ...prev,
      highlightedEntity: id,
    }))
  }

  const onEntitySelection = (id: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedEntity: id,
    }))
  }

  const onHighlightChange = (highlightActive: boolean) => {
    setState((prev) => ({
      ...prev,
      debug: { ...prev.debug, highlightActive },
    }))
  }
  const onStateVisibleChange = (stateVisible: boolean) => {
    setState((prev) => ({
      ...prev,
      debug: { ...prev.debug, stateVisible },
    }))
  }
  const onStateMaxDepthChange = (stateViewMaxDepth: number) => {
    setState((prev) => ({
      ...prev,
      debug: { ...prev.debug, stateViewMaxDepth },
    }))
  }
  const onShow3DChange = (show3D: boolean) => {
    setState((prev) => ({
      ...prev,
      debug: { ...prev.debug, show3D },
    }))
  }
  const onWobbleAllChange = (wobbleAll: boolean) => {
    setState((prev) => ({
      ...prev,
      debug: { ...prev.debug, wobbleAll },
    }))
  }

  return {
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
  }
}
