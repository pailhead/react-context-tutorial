import { useEffect, useMemo, useState } from 'react'
import { State, ColorType, Vec2, Shape } from './types'
import debounce from 'debounce'

const DEFAULT_STATE: State = {
  entities: [],
  highlightedEntity: null,
  selectedEntity: null,
  debug: {
    stateVisible: false,
    highlightActive: false,
  },
}

const _createEntity = () => ({
  id: crypto.randomUUID(),
  position: {
    x: (Math.random() * 2 - 1) * 300,
    y: (Math.random() * 2 - 1) * 300,
  },
  color: {
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255),
  },
  isMoving: false,
  shape: Math.random() > 0.5 ? Shape.Circle : Shape.Square,
})

const localState = JSON.parse(
  localStorage.getItem('context-playground-state') ?? null,
)

const debouncedSaveState = debounce((state: State) => {
  localStorage.setItem('context-playground-state', JSON.stringify(state))
}, 300)

export const useAppState = () => {
  const [state, setState] = useState<State>(localState ?? DEFAULT_STATE)

  useEffect(() => {
    debouncedSaveState(state)
  }, [state])

  const setters = useMemo(() => {
    const setEntityColor = (id: string, color: ColorType) =>
      setState((prev) => ({
        ...prev,
        entities: prev.entities.map((entity) =>
          entity.id === id ? { ...entity, color } : entity,
        ),
      }))

    const setEntityPosition = (id: string, position: Vec2) =>
      setState((prev) => ({
        ...prev,
        entities: prev.entities.map((entity) =>
          entity.id === id ? { ...entity, position } : entity,
        ),
      }))

    const setEntityShape = (id: string, shape: Shape) =>
      setState((prev) => ({
        ...prev,
        entities: prev.entities.map((entity) =>
          entity.id === id ? { ...entity, shape } : entity,
        ),
      }))

    const createEntity = () => {
      setState((prev) => ({
        ...prev,
        entities: [...prev.entities, _createEntity()],
      }))
    }

    const deleteEntity = (id: string) => {
      setState((prev) => ({
        ...prev,
        entities: prev.entities.filter((entity) => entity.id !== id),
      }))
    }

    const setHover = (id: string | null) => {
      setState((prev) => ({
        ...prev,
        highlightedEntity: id,
      }))
    }

    const setSelectedEntity = (id: string | null) => {
      setState((prev) => ({
        ...prev,
        selectedEntity: id,
      }))
    }

    const setDebugHighlightActive = (highlightActive: boolean) => {
      setState((prev) => ({
        ...prev,
        debug: {
          ...prev.debug,
          highlightActive,
        },
      }))
    }
    const setDebugStateVisible = (stateVisible: boolean) => {
      setState((prev) => ({
        ...prev,
        debug: {
          ...prev.debug,
          stateVisible,
        },
      }))
    }

    return {
      setEntityColor,
      setEntityPosition,
      setEntityShape,
      createEntity,
      deleteEntity,
      setHover,
      setSelectedEntity,
      setDebugHighlightActive,
      setDebugStateVisible,
    }
  }, [])

  return {
    state,
    ...setters,
  }
}
