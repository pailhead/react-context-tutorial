import { ColorType, Shape, State, Vec2 } from './types'
import EventEmitter from 'eventemitter3'

export const setEntityColor = (id: string, color: ColorType) => ({
  type: 'setEntityColor' as const,
  payload: { id, color },
})
export const setEntityPosition = (id: string, position: Vec2) => ({
  type: 'setEntityPosition' as const,
  payload: { id, position },
})
export const setEntityIsMoving = (id: string, isMoving: boolean) => ({
  type: 'setEntityIsMoving' as const,
  payload: { id, isMoving },
})
export const setEntityShape = (id: string, shape: Shape) => ({
  type: 'setEntityShape' as const,
  payload: { id, shape },
})
export const createEntity = () => ({
  type: 'createEntity' as const,
})
export const deleteEntity = (id: string) => ({
  type: 'deleteEntity' as const,
  payload: { id },
})
export const setHover = (id: string | null) => ({
  type: 'setHover' as const,
  payload: { id },
})
export const setSelectedEntity = (id: string | null) => ({
  type: 'setSelectedEntity' as const,
  payload: { id },
})
export const setDebugHighlightActive = (highlightActive: boolean) => ({
  type: 'setDebugHighlightActive' as const,
  payload: { highlightActive },
})
export const setDebugStateVisible = (stateVisible: boolean) => ({
  type: 'setDebugStateVisible' as const,
  payload: { stateVisible },
})

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

const DEFAULT_STATE: State = {
  entities: [],
  highlightedEntity: null,
  selectedEntity: null,
  debug: {
    stateVisible: false,
    highlightActive: false,
  },
}

class Store extends EventEmitter<{
  stateChanged: State
}> {
  private _state: State = DEFAULT_STATE
  dispatch(
    action: ReturnType<
      | typeof setEntityColor
      | typeof setEntityPosition
      | typeof setEntityIsMoving
      | typeof setEntityShape
      | typeof createEntity
      | typeof deleteEntity
      | typeof setHover
      | typeof setSelectedEntity
      | typeof setDebugHighlightActive
      | typeof setDebugStateVisible
    >,
  ) {
    const previousState = this._state
    switch (action.type) {
      case 'setEntityColor':
        this._state = {
          ...this._state,
          entities: this._state.entities.map((entity) =>
            entity.id === action.payload.id
              ? { ...entity, color: action.payload.color }
              : entity,
          ),
        }
        break
      case 'setEntityPosition':
        this._state = {
          ...this._state,
          entities: this._state.entities.map((entity) =>
            entity.id === action.payload.id
              ? { ...entity, position: action.payload.position }
              : entity,
          ),
        }
        break
      case 'setEntityShape':
        this._state = {
          ...this._state,
          entities: this._state.entities.map((entity) =>
            entity.id === action.payload.id
              ? { ...entity, shape: action.payload.shape }
              : entity,
          ),
        }
        break
      case 'createEntity':
        this._state = {
          ...this._state,
          entities: [...this._state.entities, _createEntity()],
        }
        break
      case 'deleteEntity':
        this._state = {
          ...this._state,
          entities: this._state.entities.filter(
            (entity) => entity.id !== action.payload.id,
          ),
        }
        break
      case 'setHover':
        this._state = {
          ...this._state,
          highlightedEntity: action.payload.id,
        }
        break
      case 'setSelectedEntity':
        this._state = {
          ...this._state,
          selectedEntity: action.payload.id,
        }
        break
      case 'setDebugHighlightActive':
        this._state = {
          ...this._state,
          debug: {
            ...this._state.debug,
            highlightActive: action.payload.highlightActive,
          },
        }
        break
      case 'setDebugStateVisible':
        this._state = {
          ...this._state,
          debug: {
            ...this._state.debug,
            stateVisible: action.payload.stateVisible,
          },
        }
        break
    }
    this.emit('stateChanged', this._state, previousState)
  }

  getState() {
    return this._state
  }
}

export const store = new Store()
