import { useCallback, useState } from 'react'
import { State, ColorType, Vec2, Shape } from './types'

const DEFAULT_STATE: State = {
  entities: [],
  highlightedEntity: null,
  selectedEntity: null,
  movingEntity: null,
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

export const useSetState = () => {
  const [state, setState] = useState<State>(DEFAULT_STATE)

  const setEntityColor = useCallback(
    (id: string, color: ColorType) =>
      setState((prev) => ({
        ...prev,
        entities: prev.entities.map((entity) =>
          entity.id === id ? { ...entity, color } : entity,
        ),
      })),
    [],
  )
  const setEntityPosition = useCallback(
    (id: string, position: Vec2) =>
      setState((prev) => ({
        ...prev,
        entities: prev.entities.map((entity) =>
          entity.id === id ? { ...entity, position } : entity,
        ),
      })),
    [],
  )
  const setEntityIsMoving = useCallback(
    (id: string, isMoving: boolean) =>
      setState((prev) => ({
        ...prev,
        entities: prev.entities.map((entity) =>
          entity.id === id ? { ...entity, isMoving } : entity,
        ),
      })),
    [],
  )
  const setEntityShape = useCallback(
    (id: string, shape: Shape) =>
      setState((prev) => ({
        ...prev,
        entities: prev.entities.map((entity) =>
          entity.id === id ? { ...entity, shape } : entity,
        ),
      })),
    [],
  )
  const createEntity = useCallback(() => {
    setState((prev) => ({
      ...prev,
      entities: [...prev.entities, _createEntity()],
    }))
  }, [])
  const deleteEntity = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      entities: prev.entities.filter((entity) => entity.id !== id),
    }))
  }, [])
  const setHover = useCallback((id: string | null) => {
    setState((prev) => ({
      ...prev,
      highlightedEntity: id,
    }))
  }, [])
  const setSelectedEntity = useCallback((id: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedEntity: id,
    }))
  }, [])

  return {
    state,
    setEntityColor,
    setEntityPosition,
    setEntityIsMoving,
    setEntityShape,
    createEntity,
    deleteEntity,
    setHover: setHover,
    setSelectedEntity: setSelectedEntity,
  }
}
