// Advanced shader materials with dither effects

export const ditherVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float uTime;
  uniform float uDisplacement;

  // Noise function for displacement
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec3 pos = position;
    float noise = snoise(pos * 0.5 + uTime * 0.3);
    pos += normal * noise * uDisplacement;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const ditherFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uDitherScale;
  uniform float uDitherIntensity;

  // Bayer matrix for ordered dithering
  float bayerMatrix4x4(vec2 coord) {
    float bayerPattern[16];
    bayerPattern[0] = 0.0 / 16.0;
    bayerPattern[1] = 8.0 / 16.0;
    bayerPattern[2] = 2.0 / 16.0;
    bayerPattern[3] = 10.0 / 16.0;
    bayerPattern[4] = 12.0 / 16.0;
    bayerPattern[5] = 4.0 / 16.0;
    bayerPattern[6] = 14.0 / 16.0;
    bayerPattern[7] = 6.0 / 16.0;
    bayerPattern[8] = 3.0 / 16.0;
    bayerPattern[9] = 11.0 / 16.0;
    bayerPattern[10] = 1.0 / 16.0;
    bayerPattern[11] = 9.0 / 16.0;
    bayerPattern[12] = 15.0 / 16.0;
    bayerPattern[13] = 7.0 / 16.0;
    bayerPattern[14] = 13.0 / 16.0;
    bayerPattern[15] = 5.0 / 16.0;

    int x = int(mod(coord.x, 4.0));
    int y = int(mod(coord.y, 4.0));
    return bayerPattern[y * 4 + x];
  }

  void main() {
    // Fresnel effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

    // Gradient based on position and fresnel
    float gradientMix = fresnel * 0.5 + vUv.y * 0.5;
    vec3 color = mix(uColor1, uColor2, gradientMix);

    // Apply dithering
    vec2 ditherCoord = gl_FragCoord.xy * uDitherScale;
    float dither = bayerMatrix4x4(ditherCoord);

    // Add animated noise
    float noise = fract(sin(dot(vUv + uTime * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
    dither = mix(dither, noise, 0.3);

    color += (dither - 0.5) * uDitherIntensity;

    // Add glow effect
    color += fresnel * vec3(0.2, 0.4, 0.8) * 0.5;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const particleVertexShader = `
  attribute float size;
  attribute vec3 customColor;

  varying vec3 vColor;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vColor = customColor;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const particleFragmentShader = `
  varying vec3 vColor;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    vec3 color = vColor * strength;

    gl_FragColor = vec4(color, strength);
  }
`;

export const waveVertexShader = `
  varying vec2 vUv;
  varying float vElevation;

  uniform float uTime;
  uniform float uWaveAmplitude;
  uniform float uWaveFrequency;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Multiple wave layers
    float wave1 = sin(pos.x * uWaveFrequency + uTime) * uWaveAmplitude;
    float wave2 = sin(pos.z * uWaveFrequency * 0.8 + uTime * 1.2) * uWaveAmplitude * 0.5;
    float wave3 = sin((pos.x + pos.z) * uWaveFrequency * 0.5 + uTime * 0.7) * uWaveAmplitude * 0.3;

    pos.y += wave1 + wave2 + wave3;
    vElevation = pos.y;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const waveFragmentShader = `
  varying vec2 vUv;
  varying float vElevation;

  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;

  void main() {
    float mixStrength = (vElevation + 0.5) * 0.5;
    vec3 color = mix(uColor1, uColor2, mixStrength);

    // Add grid lines
    float grid = max(
      smoothstep(0.48, 0.5, fract(vUv.x * 20.0)),
      smoothstep(0.48, 0.5, fract(vUv.y * 20.0))
    );

    color = mix(color, color * 1.3, grid * 0.3);

    gl_FragColor = vec4(color, 0.9);
  }
`;
