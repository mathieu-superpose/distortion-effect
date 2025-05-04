uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uClickPosition;

varying vec2 vUv;

const float RING_RADIUS = 0.2;
const float RING_WIDTH = 0.05;
const float RING_MAX_RADIUS = 0.3;

float getOffsetStrength(float time, vec2 dir) {
    float dist = length(dir) - time * RING_MAX_RADIUS;
    float offset = 0.0;

    if(dist < RING_RADIUS) {
        offset = smoothstep(RING_RADIUS - RING_WIDTH, RING_RADIUS, dist);
    }

    return offset * sin(time * 5.0) * 0.05;
}

void main() {
    vec2 uv = vUv;

    vec2 dir = uClickPosition - uv;

    float d = getOffsetStrength(uTime, dir);

    dir = normalize(dir);

    vec4 color = texture2D(uTexture, uv + dir * d);

    gl_FragColor = color;
}