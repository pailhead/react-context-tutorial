import { Color, ShaderMaterial, Vector2, Vector3 } from 'three'
import { SIMPLEX_GLSL } from './simplexGLSL'

const sdfGLSL = `
float sdSphere( vec3 p, float s){
  return length(p)-s;
}
float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b + r;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}
void opSmoothUnion(inout float d1, float d2, inout vec3 c1, vec3 c2, inout vec2 t1, vec2 t2, float k) {
  float w = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  d1 = mix(d2, d1, w) - k * w * (1.0 - w);
  c1 = mix(c2, c1, w);
  t1 = mix(t2, t1, w);
}
vec3 qtransform( vec4 q, vec3 v ){ 
	return v + 2.0*cross(cross(v, q.xyz ) + q.w*v, q.xyz);
}   
`

const spheresGLSL = `
${SIMPLEX_GLSL}
vec4 spheres(vec3 p, float r){
  float d = 1e9;
  vec2 hl = vec2(0.);
  vec3 color = vec3(0.);

  float noiseIntensity = 18.;
  float noiseScale = 0.0205;
  float variance = uTime * (1.-uRandom*0.2)*2.;
  float n = (snoise(p*noiseScale + vec3(0.,0.,variance))* 0.5+0.5)*noiseIntensity;

  for(int i = 0 ; i < 64 ; i++){
    if(i >= uSphereCount) break;
    vec2 tween = uEntityTweens[i];
    vec3 spherePos = vec3(uEntityPositions[i].x, uEntityPositions[i].y, 0.0); 
    float sd, sn;
    vec3 pr = qtransform(uEntityRotations[i], p - spherePos -vec3(0.,0.,-30.));

    if(uEntityShapes[i]){
      sd = sdRoundBox(pr, vec3(r), 10.);
      sn = -n * 0.5;
    } else {
      sd = sdSphere(pr, mix(r, r*0.8, tween.x));
      sn = n;
    } 

    sd -= mix(0., sn , tween.x);
    opSmoothUnion(d, sd, color, uEntityColors[i], hl, uEntityTweens[i], 20.);
  }

  return uColorMode ? vec4(color,0.) : vec4(d,hl,0.);
}
`
const vertexShader = `
varying vec2 vUv;
void main(){
  vUv = uv;  
  gl_Position = vec4(position.xy,0.,1.);
}
`
const fragmentShader = `
varying vec2 vUv;
uniform float uSlice;
uniform float uEntityRadius;
uniform int uSphereCount;
uniform vec2 uEntityPositions[64];
uniform vec3 uEntityColors[64];
uniform vec2 uEntityTweens[64];
uniform bool uEntityShapes[64];
uniform vec4 uEntityRotations[64];
uniform vec3 uTextureSize;
uniform vec2 uScreenSize;
uniform float uTime;
uniform float uRandom;
uniform bool uColorMode;
${sdfGLSL}
${spheresGLSL}
void main(){
  vec3 texelSize = 1.0 / uTextureSize;
  vec3 uvw = vec3(vUv, uSlice);
  uvw = uvw * (1.+texelSize * 2.) - texelSize;
  vec3 uvwWorld = (uvw-0.5)* vec3(uScreenSize, uEntityRadius*2.);
  gl_FragColor = spheres(uvwWorld, uEntityRadius);

}
`
export class RenderSDFMaterial extends ShaderMaterial {
  constructor(uniforms: {
    uEntityPositions: { value: Vector2[] }
    uEntityColors: { value: Color[] }
    uSphereCount: { value: number }
    uEntityRadius: { value: number }
    uScreenSize: { value: Vector2 }
    uTextureSize: { value: Vector3 }
    uTime: { value: number }
    uEntityTweens: { value: Vector2[] }
  }) {
    super({
      uniforms: {
        ...uniforms,
        uSlice: { value: 0 },
        uRandom: { value: Math.random() },
        uColorMode: { value: true },
      },
      vertexShader,
      fragmentShader,
      depthWrite: false,
    })
  }
  setSlice(slice: number) {
    this.uniforms.uSlice.value = slice
  }
  setColorMode(colorMode: boolean) {
    this.uniforms.uColorMode.value = colorMode
  }
}
