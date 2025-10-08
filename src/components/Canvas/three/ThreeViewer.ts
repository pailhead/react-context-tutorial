import { WebGLRenderer, OrthographicCamera, Scene, Vector2, Clock } from 'three'
import { EntityProps } from '../../../types'
import { SDFEntities } from './SDFEntities'

export class ThreeViewer {
  private _renderer: WebGLRenderer
  private _camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 200)
  private _scene = new Scene()
  private _entities: SDFEntities
  private _screenSize = new Vector2()
  private _mouse = new Vector2()
  private _clock = new Clock()
  constructor(private _canvas: HTMLCanvasElement) {
    this._renderer = new WebGLRenderer({
      canvas: _canvas,
      premultipliedAlpha: true,
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true,
    })
    this._renderer.autoClear = false
    this._renderer.setClearColor(0x0, 0)
    this._camera.position.z = 100
    this._renderer.setAnimationLoop(this._animate)
    this._entities = new SDFEntities(this._mouse)
    this._scene.add(this._entities)

    document.addEventListener('mousemove', this._onMouseMove)
  }
  private _animate = () => {
    const delta = this._clock.getDelta()
    this.update(delta)
    const rect = this._canvas.getBoundingClientRect()
    const size = this._renderer.getSize(new Vector2())
    if (rect.width !== size.x || rect.height !== size.y)
      this.setSize(rect.width, rect.height)
    this._renderer.clear()
    this._renderer.render(this._scene, this._camera)
  }
  setHighlightedEntity(id: string | null) {
    this._entities.setHighlighted(id)
  }
  setWobbleAll(v: boolean) {
    this._entities.setWobbleAll(v)
  }
  setSize(width: number, height: number) {
    this._entities.setScreenSize(width, height)
    this._screenSize.set(width, height)
    this._renderer.setSize(width, height, false)
    this._camera.left = -width / 2
    this._camera.right = width / 2
    this._camera.top = height / 2
    this._camera.bottom = -height / 2
    this._camera.updateProjectionMatrix()
  }
  setEntities(entities: EntityProps[]) {
    this._entities.setEntities(entities)
  }
  update(delta: number) {
    this._entities.update(delta)
  }
  dispose() {
    this._renderer.dispose()
    this._entities.dispose()
    document.removeEventListener('mousemove', this._onMouseMove)
  }
  private _onMouseMove = (e: MouseEvent) => {
    const rect = this._renderer.domElement.getBoundingClientRect()
    this._mouse.x = e.clientX - rect.left
    this._mouse.y = e.clientY - rect.top
  }
}
