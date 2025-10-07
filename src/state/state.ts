import { EntityProps, Shape, State } from '../types'

export const DEFAULT_STATE: State = {
  entities: [],
  highlightedEntity: null,
  selectedEntity: null,
  debug: {
    stateVisible: false,
    highlightActive: false,
  },
}

export const createEntityProps = (): EntityProps => ({
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
  shape: Math.random() > 0.5 ? Shape.Circle : Shape.Square,
})
