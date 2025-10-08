import {
  ClampToEdgeWrapping,
  Color,
  FloatType,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  LinearFilter,
  Mesh,
  PlaneGeometry,
  Quaternion,
  UnsignedByteType,
  Vector2,
  Vector3,
  WebGLArrayRenderTarget,
} from 'three'
import { EntityProps, Shape } from '../../../types'
import { RenderMaskMaterial } from './RenderMaskMaterial'
import { RenderSDFMaterial } from './RenderSDFMaterial'
import { RenderRayMarchMaterial } from './RenderRayMarchMaterial'
import { Rotation } from './Rotation'

const VOXEL_SIZE = 4
const MAX_ENTITIES = 64
export class SDFEntities extends Mesh {
  private _quadArray: Float32Array = new Float32Array(MAX_ENTITIES * 2)
  private _quadBuffer = new InstancedBufferAttribute(this._quadArray, 2)
  private _shapeArray = initArray(() => false)
  private _colorArray: Color[] = initArray(() => new Color())
  private _positionArray: Vector2[] = initArray(() => new Vector2())
  private _tweenArray: Vector2[] = initArray(() => new Vector2())
  private _rotationArray = initArray(() => new Quaternion())
  private _screenSize = new Vector2()
  private _lightDirection = new Vector3(1, 1, 1).normalize()
  private _wobbleAll = false
  private _target3DDistanceTween = initTarget(true)
  private _target3DColor = initTarget()
  private _maskGeometry: InstancedBufferGeometry
  private _highlightedIndex: string | null = null
  private _entitiesRotations: Map<string, Rotation> = new Map()
  private _entitiesPrev: EntityProps[] = []
  private _entities: EntityProps[] = []
  private _uniforms = {
    uScreenSize: { value: this._screenSize },
    uLightDirection: { value: this._lightDirection },
    uSphereCount: { value: 0 },
    uEntityPositions: { value: this._positionArray },
    uEntityColors: { value: this._colorArray },
    uEntityShapes: { value: this._shapeArray },
    uEntityTweens: { value: this._tweenArray },
    uEntityRotations: { value: this._rotationArray },
    uEntityRadius: { value: 50 },
    uTexture: { value: this._target3DDistanceTween.texture },
    uTextureColor: { value: this._target3DColor.texture },
    uTextureSize: { value: new Vector3() },
    uTime: { value: 0 },
  }
  constructor(private _mouse: Vector2) {
    super(new PlaneGeometry(2, 2, 1, 1))
    this.material = new RenderRayMarchMaterial(this._uniforms)
    const planeGeometry = this.geometry
    const maskGeometry = new InstancedBufferGeometry()
    maskGeometry.setIndex(planeGeometry.index)
    maskGeometry.setAttribute('position', planeGeometry.attributes.position)
    maskGeometry.setAttribute('aPosition', this._quadBuffer)
    this._maskGeometry = maskGeometry

    const mask = new Mesh(maskGeometry, new RenderMaskMaterial(this._uniforms))
    mask.layers.set(2)
    mask.frustumCulled = false
    this.add(mask)

    const renderSdfMaterial = new RenderSDFMaterial(this._uniforms)
    const renderSdf = new Mesh(planeGeometry, renderSdfMaterial)
    renderSdf.layers.set(3)
    renderSdf.frustumCulled = false
    this.add(renderSdf)

    this.frustumCulled = false

    this.onBeforeRender = (renderer, scene, camera) => {
      camera.layers.set(3)
      const countMinusOne = this._target3DDistanceTween.depth - 1
      const s = 1 / countMinusOne
      renderSdfMaterial.setColorMode(false)
      for (let d = 0; d < this._target3DDistanceTween.depth; d++) {
        const normalized = d * s
        renderSdfMaterial.setSlice(normalized)
        renderer.setRenderTarget(this._target3DDistanceTween, d)
        renderer.render(scene, camera)
      }
      renderSdfMaterial.setColorMode(true)
      for (let d = 0; d < this._target3DColor.depth; d++) {
        const normalized = d * s
        renderSdfMaterial.setSlice(normalized)
        renderer.setRenderTarget(this._target3DColor, d)
        renderer.render(scene, camera)
      }
      renderer.setRenderTarget(null)
      camera.layers.set(2)
      renderer.render(scene, camera)
      camera.layers.set(0)
    }
  }

  dispose() {
    this.geometry.dispose()
    this._maskGeometry.dispose()
    this._target3DDistanceTween.dispose()
    this._target3DColor.dispose()
  }
  setHighlighted(index: string | null) {
    this._highlightedIndex = index
  }
  setWobbleAll(v: boolean) {
    this._wobbleAll = v
  }
  setScreenSize(width: number, height: number) {
    this._screenSize.set(width, height)
    const radius = this._uniforms.uEntityRadius.value

    const w3 = Math.floor(width / VOXEL_SIZE)
    const h3 = Math.floor(height / VOXEL_SIZE)
    const d3 = Math.floor((radius * 2) / VOXEL_SIZE)

    this._target3DDistanceTween.setSize(w3, h3, d3)
    this._target3DColor.setSize(w3, h3, d3)
    this._uniforms.uTextureSize.value.set(w3, h3, d3)
  }
  update(delta: number) {
    const lightX = this._mouse.x - this._screenSize.x / 2
    const lightY = -this._mouse.y + this._screenSize.y / 2
    this._lightDirection.set(lightX, lightY, 100)

    this._uniforms.uTime.value += delta

    this._diffEntities()
    this._updateBuffers(this._entities, delta)
  }
  setEntities(entities: EntityProps[]) {
    this._entities = entities
  }

  private _createEntity(entityProps: EntityProps) {
    if (this._entitiesRotations.has(entityProps.id)) return
    this._entitiesRotations.set(
      entityProps.id,
      new Rotation(this._uniforms.uEntityRadius.value),
    )
  }
  private _deleteEntity(id: string) {
    if (!this._entitiesRotations.has(id)) return
    this._entitiesRotations.delete(id)
  }
  private _updateEntity(next: EntityProps, prev: EntityProps) {
    this._entitiesRotations.get(next.id)?.update(next.position, prev.position)
  }
  private _diffEntities() {
    const prevEntities = this._entitiesPrev
    const nextEntities = this._entities
    if (prevEntities === nextEntities) return
    const prevEntitiesMap = prevEntities.reduce(
      (map, entity) => {
        map[entity.id] = entity
        return map
      },
      {} as Record<string, EntityProps>,
    )
    nextEntities.forEach((nextEntity) => {
      const prevEntity = prevEntitiesMap[nextEntity.id]
      if (!prevEntity) {
        this._createEntity(nextEntity)
        return
      }
      if (prevEntity !== nextEntity) {
        this._updateEntity(nextEntity, prevEntity)
      }
      delete prevEntitiesMap[nextEntity.id]
    })
    Object.keys(prevEntitiesMap).forEach((id) => this._deleteEntity(id))

    this._entitiesPrev = nextEntities
  }
  private _updateBuffers(entityProps: EntityProps[], delta: number) {
    entityProps.forEach((props, i) => {
      this._quadArray[i * 2 + 0] = props.position.x
      this._quadArray[i * 2 + 1] = -props.position.y
      this._quadBuffer.needsUpdate = true

      this._positionArray[i].set(props.position.x + 50, -props.position.y - 50)
      this._colorArray[i].set(
        props.color.r / 255,
        props.color.g / 255,
        props.color.b / 255,
      )
      this._shapeArray[i] = props.shape === Shape.Circle ? false : true

      const shouldWobble =
        this._wobbleAll || this._highlightedIndex === props.id
      this._tweenArray[i].x += shouldWobble ? delta * 3 : -delta * 0.5
      this._tweenArray[i].x = Math.min(1, this._tweenArray[i].x)
      this._tweenArray[i].x = Math.max(0, this._tweenArray[i].x)
      this._tweenArray[i].y = this._highlightedIndex === props.id ? 1 : 0

      this._rotationArray[i].copy(
        this._entitiesRotations.get(props.id).quaternion,
      )
    })

    this._uniforms.uSphereCount.value = entityProps.length
    this._maskGeometry.instanceCount = entityProps.length
  }
}

const initArray = <T>(ctor: () => T) =>
  new Array(MAX_ENTITIES).fill(null).map(ctor)

const initTarget = (float?: boolean) =>
  new WebGLArrayRenderTarget(1, 1, 1, {
    type: float ? FloatType : UnsignedByteType,
    magFilter: LinearFilter,
    minFilter: LinearFilter,
    generateMipmaps: false,
    wrapR: ClampToEdgeWrapping,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
  })
