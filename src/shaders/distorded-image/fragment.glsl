uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uClickPosition;

varying vec2 vUv;

const float GROW_TIME = 0.8;

void main() {
    vec2 uv = vUv;
    vec4 color = texture2D(uTexture, uv);

    if(uTime < GROW_TIME) {

    // place a circle at the click position and make it grow and fade over time
        vec3 cicrleColor = vec3(0.8, 0.0, 0.0);
        float dist = distance(uv, uClickPosition);
        float radius = 0.1 + 0.1 * sin(uTime * 2.0);
        float alpha = smoothstep(radius, radius + 0.05, dist);

        color.rgb = mix(color.rgb, cicrleColor, 1.0 - alpha);
    }

    gl_FragColor = color;
}