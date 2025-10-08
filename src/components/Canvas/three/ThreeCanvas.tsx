import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { EntityProps } from '../../../types'
import { ThreeViewer } from './ThreeViewer'

export const ThreeCanvas = (props: {
  entities: EntityProps[]
  highlightedEntity: string | null
  wobbleAll: boolean
}) => {
  const { ref } = useViewer(props)
  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}

const useViewer = ({
  entities,
  highlightedEntity,
  wobbleAll,
}: {
  entities: EntityProps[]
  highlightedEntity: string | null
  wobbleAll: boolean
}) => {
  const [viewer, setViewer] = useState<ThreeViewer | null>(null)
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const viewer = new ThreeViewer(ref.current)
    setViewer(viewer)
    return () => {
      viewer.dispose()
    }
  }, [])

  useLayoutEffect(() => {
    viewer?.setEntities(entities)
  }, [entities, viewer])

  useLayoutEffect(() => {
    viewer?.setHighlightedEntity(highlightedEntity)
    viewer?.setWobbleAll(wobbleAll)
  }, [highlightedEntity, wobbleAll, viewer])
  return { ref, viewer }
}
