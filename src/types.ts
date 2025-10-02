export type EntityProps = {
  id: string
  color: ColorType
  shape: Shape
  position: Vec2
}
export enum Shape {
  Circle = 'CIRCLE',
  Square = 'SQUARE',
}
export type Vec2 = {
  x: number
  y: number
}
export type ColorType = {
  r: number
  g: number
  b: number
}
export type State = {
  entities: EntityProps[]
  highlightedEntity: string | null
  selectedEntity: string | null
  movingEntity: string | null
}
