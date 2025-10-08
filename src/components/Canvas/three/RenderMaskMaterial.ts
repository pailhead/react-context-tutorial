import { AlwaysStencilFunc, ReplaceStencilOp, ShaderMaterial } from 'three'

const quadVertexShader = `
  attribute vec2 aPosition;
  uniform float uEntityRadius;
  void main(){
    float paddedSize = uEntityRadius * 2.0;
    vec4 p = vec4(aPosition + vec2(uEntityRadius, -uEntityRadius) + position.xy * paddedSize, 0.0, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * p;
  }
`
export class RenderMaskMaterial extends ShaderMaterial {
  constructor(uniforms: { uEntityRadius: { value: number } }) {
    super({
      uniforms,
      vertexShader: quadVertexShader,
      fragmentShader: `
      void main(){ gl_FragColor = vec4(1.0); }
      `,
      colorWrite: false,
      depthWrite: false,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: AlwaysStencilFunc,
      stencilZPass: ReplaceStencilOp,
    })
  }
}
