import { useEffect, useRef, useState } from 'react'
import { ColorType, Shape, State, Vec2 } from './types'
import EventEmitter from 'eventemitter3'

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

const SYMBOL = Symbol('store2')
export const useSelector = <T>(
  selector: (state: State) => T,
  eqFn?: (a: T, b: T) => boolean,
): T => {
  const [value, setValue] = useState(selector(store.getState()))
  const stableRef = useRef({ selector, eqFn })
  const prevValueRef = useRef(SYMBOL as T)

  useEffect(() => {
    const onStateChanged = (state: State) => {
      const prevValue = prevValueRef.current
      const { selector, eqFn } = stableRef.current
      const newValue = selector(state)
      if (eqFn?.(prevValue, newValue) ?? prevValue === newValue) return
      prevValueRef.current = newValue
      setValue(newValue)
    }
    store.on('stateChanged', onStateChanged)
    return () => {
      store.off('stateChanged', onStateChanged)
    }
  }, [])
  return value
}
