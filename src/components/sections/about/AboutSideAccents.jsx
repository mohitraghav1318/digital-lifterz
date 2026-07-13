import { useEffect, useRef } from "react";
import * as THREE from "three";

// Thin rising-particle columns pinned to the left and right screen edges.
// Purely decorative, stays out of the way of the centered content.
export default function AboutSideAccents() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Skip on small screens — not worth the render cost, barely visible anyway
    if (window.innerWidth < 768) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const EDGE_BAND = 140; // px band width from each edge where particles live

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, height, 0, -10, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const COUNT = 90;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const cyan = new THREE.Color(0x22d3ee);
    const violet = new THREE.Color(0xa855f7);

    for (let i = 0; i < COUNT; i++) {
      const onLeft = i % 2 === 0;
      const x = onLeft
        ? Math.random() * EDGE_BAND
        : width - Math.random() * EDGE_BAND;
      const y = Math.random() * height;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;

      speeds[i] = 8 + Math.random() * 18;

      const c = Math.random() > 0.5 ? cyan : violet;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: false,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const posAttr = geometry.attributes.position;
      for (let i = 0; i < COUNT; i++) {
        let y = posAttr.getY(i);
        y += speeds[i] * delta;
        if (y > height) y = 0;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      // Simplicity: skip resize repositioning of particles, just resize renderer/camera
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.right = w;
      camera.top = h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="about-side-accents" aria-hidden="true" />;
}