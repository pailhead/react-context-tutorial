import { Vector3, Quaternion, Vector2Like, Euler } from 'three'

const DIR = new Vector3()
const POS_A = new Vector3()
const POS_B = new Vector3()
const DELTA = new Vector3()
const QUAT = new Quaternion()
export class Rotation {
  public quaternion = new Quaternion()
  constructor(private _size: number) {}
  update(next: Vector2Like, prev: Vector2Like) {
    const { x: xn, y: yn } = next
    const { x: xp, y: yp } = prev
    POS_A.set(xn, yn, 0)
    POS_B.set(xp, yp, 0)
    DELTA.subVectors(POS_B, POS_A)
    const len = DELTA.length()
    if (len < 0.1) return
    const angle = ((len / this._size) * Math.PI) / 4
    DIR.set(DELTA.y, DELTA.x, 0).normalize()
    QUAT.setFromAxisAngle(DIR, -angle)
    this.quaternion.premultiply(QUAT)
  }
}
