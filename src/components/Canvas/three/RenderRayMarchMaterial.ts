import {
  EqualStencilFunc,
  ShaderMaterial,
  Texture,
  Vector2,
  Vector3,
} from 'three'

const vertexShader = `
varying vec2 vUv;
uniform vec2 uScreenSize;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy,0.,1.);
}
`

const lightingGLSL = `
vec3 sdfNormal(vec3 p, sampler2DArray tex, vec3 textureSize){
  float e = 1.; 
  vec2 h = vec2(e, 0.0);
  float layers = textureSize.z;
  float dx = sampleVolumeTrilinearZ(tex, p + h.xyy / textureSize, layers).x - sampleVolumeTrilinearZ(tex, p - h.xyy / textureSize, layers).x;
  float dy = sampleVolumeTrilinearZ(tex, p + h.yxy / textureSize, layers).x - sampleVolumeTrilinearZ(tex, p - h.yxy / textureSize, layers).x;
  float dz = sampleVolumeTrilinearZ(tex, p + h.yyx / textureSize, layers).x - sampleVolumeTrilinearZ(tex, p - h.yyx / textureSize, layers).x;
  return normalize(vec3(dx, dy, dz) );
}
vec3 lighting(vec3 p, vec3 lightPos, vec3 color, vec2 hl){
  vec3 normal = sdfNormal(p, uTexture, uTextureSize);
  p = p-0.5;
  p *= vec3(uScreenSize, uEntityRadius*2.);
  vec3 lightDir = normalize( lightPos - p );

  float ndl = clamp(dot((normal), lightDir), 0.0, 1.0);
  ndl = 0.27 + 0.69 * ndl;
  
  vec3 res = color * ndl;
  
  float fresnel = dot(normal, vec3(0.,0.,1.));
  float f = 1.-fresnel;
  fresnel = clamp(pow(f, 3.), 0.0, 1.0) * 0.25;
  
  res = mix(res,vec3(1.),vec3(fresnel));

  vec3 r = reflect(lightDir, normal);
  r.z = -r.z;
  float specular = dot(r, vec3(0.,0.,1.));
  specular = pow(clamp(specular, 0.0, 1.0), 5.0)*0.25;

  vec3 glow = (color+0.5);
  res = mix( res, vec3(1.), vec3(specular));
  return mix(res,glow,hl.y*f);
}
`
const sampleVolumeTrilinearZ = `
vec4 sampleVolumeTrilinearZ(sampler2DArray vol, vec3 uvw, float layers) {
  float z = clamp(uvw.z * (layers - 1.0), 0.0, layers - 1.0);
  float z0 = floor(z);
  float z1 = min(z0 + 1.0, layers - 1.0);
  float a  = z - z0;
  vec4 v0 = texture(vol, vec3(uvw.xy, z0));
  vec4 v1 = texture(vol, vec3(uvw.xy, z1));
  return mix(v0, v1, a);
}
`
const fragmentShader = `
varying vec2 vUv;
uniform sampler2DArray uTexture;
uniform sampler2DArray uTextureColor;
uniform vec3 uTextureSize;
uniform float uEntityRadius;
uniform vec3 uLightDirection;
uniform vec2 uScreenSize;
${sampleVolumeTrilinearZ}
${lightingGLSL}

void main(){
  vec3 texelSize = 1.0 / uTextureSize;
  vec3 p = vec3(vUv, 1.0);
  p = p * (1. - texelSize * 2.) + texelSize;
  float minStep = 0.5 / uEntityRadius; 
  for ( int i = 0; i < 40; i ++ ){
    vec4 dhl = sampleVolumeTrilinearZ(uTexture, p, uTextureSize.z);
    float d = dhl.x;
    vec2 hl = dhl.yz;
    vec3 c = sampleVolumeTrilinearZ(uTextureColor, p, uTextureSize.z).rgb;
    if (d < 0.1) {
      gl_FragColor = vec4(lighting(p, uLightDirection, c, hl) , 1.0);
      return;
    }
    p.z -= max(d,0.5)/((uEntityRadius*2.) * (1.+2. * texelSize.z));
  }
  discard;
}
`

export class RenderRayMarchMaterial extends ShaderMaterial {
  constructor(uniforms: {
    uTexture: { value: Texture }
    uTextureColor: { value: Texture }
    uTextureSize: { value: Vector3 }
    uLightDirection: { value: Vector3 }
    uEntityRadius: { value: number }
    uScreenSize: { value: Vector2 }
  }) {
    super({
      uniforms,
      vertexShader,
      fragmentShader,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: EqualStencilFunc,
      transparent: true,
      depthWrite: false,
    })
  }
}
