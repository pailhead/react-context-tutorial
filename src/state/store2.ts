import EventEmitter from 'eventemitter3'
import { DEFAULT_STATE } from './state'
import { Shape, State, ColorType, Vec2 } from '../types'

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

class Store2 extends EventEmitter {
  private _state: State = DEFAULT_STATE

  getState() {
    return this._state
  }

  private _setState = (setter: (prev: State) => State) => {
    const previousState = this._state
    this._state = setter(this._state)
    this.emit('stateChanged', this._state, previousState)
  }

  setEntityColor = (id: string, color: ColorType) =>
    this._setState((prev) => ({
      ...prev,
      entities: prev.entities.map((entity) =>
        entity.id === id ? { ...entity, color } : entity,
      ),
    }))

  setEntityPosition = (id: string, position: Vec2) =>
    this._setState((prev) => ({
      ...prev,
      entities: prev.entities.map((entity) =>
        entity.id === id ? { ...entity, position } : entity,
      ),
    }))

  setEntityShape = (id: string, shape: Shape) =>
    this._setState((prev) => ({
      ...prev,
      entities: prev.entities.map((entity) =>
        entity.id === id ? { ...entity, shape } : entity,
      ),
    }))

  createEntity = () => {
    this._setState((prev) => ({
      ...prev,
      entities: [...prev.entities, _createEntity()],
    }))
  }

  deleteEntity = (id: string) => {
    this._setState((prev) => ({
      ...prev,
      entities: prev.entities.filter((entity) => entity.id !== id),
    }))
  }

  setHover = (id: string | null) => {
    this._setState((prev) => ({
      ...prev,
      highlightedEntity: id,
    }))
  }

  setSelectedEntity = (id: string | null) => {
    this._setState((prev) => ({
      ...prev,
      selectedEntity: id,
    }))
  }

  setDebugHighlightActive = (highlightActive: boolean) => {
    this._setState((prev) => ({
      ...prev,
      debug: {
        ...prev.debug,
        highlightActive,
      },
    }))
  }
  setDebugStateVisible = (stateVisible: boolean) => {
    this._setState((prev) => ({
      ...prev,
      debug: {
        ...prev.debug,
        stateVisible,
      },
    }))
  }
}

export const store = new Store2()
