// Advanced Newspaper & Academic Dither Shaders
// Monochrome aesthetic with halftone effects

export const newspaperVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  uniform float uTime;
  uniform float uWaveAmplitude;

  // Paper warp effect
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

    // Gentle paper wave (like newspaper in wind)
    float wave1 = snoise(vec3(pos.x * 0.5, pos.y * 0.3, uTime * 0.2)) * uWaveAmplitude;
    float wave2 = snoise(vec3(pos.y * 0.4, pos.x * 0.6, uTime * 0.15)) * uWaveAmplitude * 0.5;

    pos.z += wave1 + wave2;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const newspaperFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  uniform float uTime;
  uniform float uDitherScale;
  uniform float uHalftoneScale;
  uniform float uInkDensity;
  uniform sampler2D uTexture;
  uniform bool uUseTexture;

  // Bayer matrix 8×8 for ordered dithering (newspaper halftone)
  float bayer8x8(vec2 coord) {
    float bayerPattern[64];
    bayerPattern[0] = 0.0/64.0; bayerPattern[1] = 32.0/64.0; bayerPattern[2] = 8.0/64.0; bayerPattern[3] = 40.0/64.0;
    bayerPattern[4] = 2.0/64.0; bayerPattern[5] = 34.0/64.0; bayerPattern[6] = 10.0/64.0; bayerPattern[7] = 42.0/64.0;
    bayerPattern[8] = 48.0/64.0; bayerPattern[9] = 16.0/64.0; bayerPattern[10] = 56.0/64.0; bayerPattern[11] = 24.0/64.0;
    bayerPattern[12] = 50.0/64.0; bayerPattern[13] = 18.0/64.0; bayerPattern[14] = 58.0/64.0; bayerPattern[15] = 26.0/64.0;
    bayerPattern[16] = 12.0/64.0; bayerPattern[17] = 44.0/64.0; bayerPattern[18] = 4.0/64.0; bayerPattern[19] = 36.0/64.0;
    bayerPattern[20] = 14.0/64.0; bayerPattern[21] = 46.0/64.0; bayerPattern[22] = 6.0/64.0; bayerPattern[23] = 38.0/64.0;
    bayerPattern[24] = 60.0/64.0; bayerPattern[25] = 28.0/64.0; bayerPattern[26] = 52.0/64.0; bayerPattern[27] = 20.0/64.0;
    bayerPattern[28] = 62.0/64.0; bayerPattern[29] = 30.0/64.0; bayerPattern[30] = 54.0/64.0; bayerPattern[31] = 22.0/64.0;
    bayerPattern[32] = 3.0/64.0; bayerPattern[33] = 35.0/64.0; bayerPattern[34] = 11.0/64.0; bayerPattern[35] = 43.0/64.0;
    bayerPattern[36] = 1.0/64.0; bayerPattern[37] = 33.0/64.0; bayerPattern[38] = 9.0/64.0; bayerPattern[39] = 41.0/64.0;
    bayerPattern[40] = 51.0/64.0; bayerPattern[41] = 19.0/64.0; bayerPattern[42] = 59.0/64.0; bayerPattern[43] = 27.0/64.0;
    bayerPattern[44] = 49.0/64.0; bayerPattern[45] = 17.0/64.0; bayerPattern[46] = 57.0/64.0; bayerPattern[47] = 25.0/64.0;
    bayerPattern[48] = 15.0/64.0; bayerPattern[49] = 47.0/64.0; bayerPattern[50] = 7.0/64.0; bayerPattern[51] = 39.0/64.0;
    bayerPattern[52] = 13.0/64.0; bayerPattern[53] = 45.0/64.0; bayerPattern[54] = 5.0/64.0; bayerPattern[55] = 37.0/64.0;
    bayerPattern[56] = 63.0/64.0; bayerPattern[57] = 31.0/64.0; bayerPattern[58] = 55.0/64.0; bayerPattern[59] = 23.0/64.0;
    bayerPattern[60] = 61.0/64.0; bayerPattern[61] = 29.0/64.0; bayerPattern[62] = 53.0/64.0; bayerPattern[63] = 21.0/64.0;

    int x = int(mod(coord.x, 8.0));
    int y = int(mod(coord.y, 8.0));
    return bayerPattern[y * 8 + x];
  }

  // Halftone dot pattern
  float halftone(vec2 coord, float size) {
    vec2 center = floor(coord / size) * size + size * 0.5;
    float dist = length(coord - center);
    return smoothstep(size * 0.5, size * 0.3, dist);
  }

  // Paper texture noise
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    // Base color (paper with slight texture)
    vec3 paperColor = vec3(0.98, 0.97, 0.95);
    vec3 inkColor = vec3(0.05, 0.05, 0.05);

    // Get base intensity
    float intensity;
    if (uUseTexture) {
      vec4 texColor = texture2D(uTexture, vUv);
      intensity = (texColor.r + texColor.g + texColor.b) / 3.0;
    } else {
      // Default gradient based on UV
      intensity = vUv.y * 0.5 + 0.5;
    }

    // Apply Bayer dithering
    vec2 ditherCoord = gl_FragCoord.xy * uDitherScale;
    float threshold = bayer8x8(ditherCoord);

    // Halftone effect
    vec2 halftoneCoord = gl_FragCoord.xy;
    float halftonePattern = halftone(halftoneCoord, uHalftoneScale);

    // Combine dithering with halftone
    float ditheredIntensity = step(threshold, intensity * uInkDensity);
    float finalPattern = mix(ditheredIntensity, halftonePattern * intensity, 0.3);

    // Paper grain
    float paperGrain = random(vUv * 1000.0 + uTime * 0.01) * 0.03;

    // Final color mixing
    vec3 finalColor = mix(paperColor, inkColor, finalPattern);
    finalColor += paperGrain;

    // Edge darkening (ink bleed effect)
    float edgeDarken = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x) *
                       smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    finalColor *= 0.95 + edgeDarken * 0.05;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Particle system for floating text/citations
export const citationParticleVertexShader = `
  attribute float size;
  attribute float alpha;
  attribute float rotation;

  varying float vAlpha;
  varying float vRotation;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vAlpha = alpha;
    vRotation = rotation + uTime * 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Size based on distance with slight pulsing
    float pulse = 1.0 + sin(uTime * 2.0 + position.x * 10.0) * 0.1;
    gl_PointSize = size * uPixelRatio * pulse * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const citationParticleFragmentShader = `
  varying float vAlpha;
  varying float vRotation;

  uniform sampler2D uTexture;

  void main() {
    // Rotate the point sprite
    vec2 rotatedUV = gl_PointCoord - 0.5;
    float c = cos(vRotation);
    float s = sin(vRotation);
    rotatedUV = vec2(
      rotatedUV.x * c - rotatedUV.y * s,
      rotatedUV.x * s + rotatedUV.y * c
    ) + 0.5;

    // Square shape for text-like particles
    float square = step(0.1, rotatedUV.x) * step(rotatedUV.x, 0.9) *
                   step(0.1, rotatedUV.y) * step(rotatedUV.y, 0.9);

    // Dithered edges
    float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    float edge = smoothstep(0.4, 0.6, length(rotatedUV - 0.5));
    float dithered = step(noise, 1.0 - edge);

    vec3 color = vec3(0.1, 0.1, 0.1); // Dark ink color
    float alpha = square * dithered * vAlpha;

    gl_FragColor = vec4(color, alpha);
  }
`;

// Google Dork query visualization shader
export const dorkQueryVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;

    // Slight wave effect for the query text plane
    vec3 pos = position;
    pos.z += sin(pos.x * 2.0 + uTime) * 0.02;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const dorkQueryFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;
  uniform float uRevealProgress;

  // Matrix-style character rain effect (typewriter aesthetic)
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec3 bgColor = vec3(0.95, 0.95, 0.92); // Paper
    vec3 textColor = vec3(0.15, 0.15, 0.15); // Ink

    // Typewriter reveal effect
    float revealX = smoothstep(uRevealProgress - 0.1, uRevealProgress, vUv.x);

    // Character grid
    vec2 gridUV = fract(vUv * vec2(40.0, 10.0));
    float grid = step(0.9, gridUV.x) + step(0.9, gridUV.y);

    // Random character appearance
    float char = step(0.7, random(floor(vUv * vec2(40.0, 10.0))));

    // Combine effects
    float textMask = char * revealX * (1.0 - grid * 0.3);

    vec3 finalColor = mix(bgColor, textColor, textMask);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Data visualization shader (for charts/graphs)
export const dataVizVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const dataVizFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;
  uniform float uDataValue; // 0.0 to 1.0

  // Grid lines for graph paper
  float grid(vec2 uv, float scale) {
    vec2 grid = fract(uv * scale);
    float lineWidth = 0.05;
    return step(1.0 - lineWidth, grid.x) + step(1.0 - lineWidth, grid.y);
  }

  void main() {
    vec3 paperColor = vec3(0.96, 0.96, 0.93);
    vec3 gridColor = vec3(0.7, 0.7, 0.7);
    vec3 dataColor = vec3(0.1, 0.1, 0.1);

    // Background grid
    float gridPattern = grid(vUv, 20.0) * 0.3 + grid(vUv, 4.0);
    vec3 color = mix(paperColor, gridColor, gridPattern * 0.15);

    // Animated bar chart visualization
    float barHeight = smoothstep(0.0, uDataValue, vUv.y);
    float barMask = step(0.2, vUv.x) * step(vUv.x, 0.8) * step(vUv.y, uDataValue);

    // Dithered data visualization
    float ditherNoise = fract(sin(dot(vUv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
    float ditheredBar = step(ditherNoise * 0.3, barHeight) * barMask;

    color = mix(color, dataColor, ditheredBar * 0.7);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Walrus blockchain network shader
export const walrusNetworkVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const walrusNetworkFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;
  uniform float uNodeCount;

  // Voronoi pattern for network nodes
  vec2 random2(vec2 st) {
    st = vec2(dot(st,vec2(127.1,311.7)), dot(st,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
  }

  float voronoi(vec2 st, float scale) {
    vec2 i_st = floor(st * scale);
    vec2 f_st = fract(st * scale);

    float minDist = 1.0;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = random2(i_st + neighbor);
        point = 0.5 + 0.5 * sin(uTime * 0.5 + 6.2831 * point);

        vec2 diff = neighbor + point - f_st;
        float dist = length(diff);
        minDist = min(minDist, dist);
      }
    }

    return minDist;
  }

  void main() {
    vec3 paperColor = vec3(0.97, 0.97, 0.94);
    vec3 nodeColor = vec3(0.2, 0.2, 0.2);
    vec3 connectionColor = vec3(0.5, 0.5, 0.5);

    // Voronoi cells representing blockchain nodes
    float voronoiPattern = voronoi(vUv, 10.0);

    // Network connections (lines between cells)
    float connections = smoothstep(0.02, 0.0, voronoiPattern);

    // Nodes (centers of cells)
    float nodes = smoothstep(0.05, 0.02, voronoiPattern);

    // Dithering
    float dither = fract(sin(dot(vUv * 200.0, vec2(12.9898, 78.233))) * 43758.5453);
    float ditheredConnections = step(dither * 0.5, connections);

    vec3 color = paperColor;
    color = mix(color, connectionColor, ditheredConnections * 0.4);
    color = mix(color, nodeColor, nodes * 0.8);

    gl_FragColor = vec4(color, 1.0);
  }
`;
