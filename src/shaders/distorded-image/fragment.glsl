uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uClickPosition;

varying vec2 vUv;

const float GROW_TIME = 0.8;

void main() {
    vec2 uv = vUv;
    vec4 color = texture2D(uTexture, uv);

    if(uTime < GROW_TIME) {

        float progress = uTime / GROW_TIME;

    // place a circle at the click position and make it grow and fade over time
        float dist = distance(uv, uClickPosition);
        float radius = 0.1 + 0.1 * sin(uTime * 2.0) * 10.0;
        float alpha = smoothstep(radius, radius + 0.05, dist * 0.5);

        float x = sin(uv.y * (20.0 * (1.0 - progress))) * 0.05;
        vec2 offset = vec2(x, 0.0);
        vec3 circleColor = texture2D(uTexture, uv + offset).rgb;

        // color.rgb = mix(color.rgb, circleColor, 1.0 - alpha);

        // invert the colors

        vec3 crazyColors = mix(color.rgb, 1.0 - circleColor, cos(progress * 2.0));

        color.rgb *= progress * progress * progress;

        color.rgb = mix(color.rgb, crazyColors, 1.0 - alpha);

    }

    gl_FragColor = color;
}