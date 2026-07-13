import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import "./Hero.css";

function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Brand gradient stops, matching the logo (magenta -> violet -> cyan)
    const colorA = new THREE.Color(0xff3d81);
    const colorB = new THREE.Color(0xa855f7);
    const colorC = new THREE.Color(0x22d3ee);

    const PARTICLE_COUNT = 340;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 8 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.6;

      const t = Math.random();
      const mixed =
        t < 0.5
          ? colorA.clone().lerp(colorB, t * 2)
          : colorB.clone().lerp(colorC, (t - 0.5) * 2);

      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Central wireframe icosahedron, softly glowing violet
    const icoGeometry = new THREE.IcosahedronGeometry(6, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icosahedron);

    // Second, smaller counter-rotating shell in cyan for depth
    const shellGeometry = new THREE.IcosahedronGeometry(9, 0);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    scene.add(shell);

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      icosahedron.rotation.x = elapsed * 0.08;
      icosahedron.rotation.y = elapsed * 0.12;

      shell.rotation.x = -elapsed * 0.05;
      shell.rotation.y = -elapsed * 0.07;

      points.rotation.y = elapsed * 0.03;

      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas-mount" aria-hidden="true" />;
}

export default function Hero() {
  const revealGroup = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const revealItem = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const valueProps = [
    { value: "50+", label: "Campaign launches supported" },
    { value: "4.8/5", label: "Average client satisfaction" },
    { value: "3x", label: "Typical reach uplift in 90 days" },
  ];

  return (
    <section className="hero-section pt-32 pb-20 sm:pt-36 sm:pb-24">
      <HeroCanvas />

      <div className="hero-content">
        <motion.div
          variants={revealGroup}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.img variants={revealItem} src={logo} alt="Digital Lifterz" className="hero-logo" />

          <motion.p variants={revealItem} className="hero-badge">
            TURNING REACH TO REVENUE
          </motion.p>

          <motion.h1 variants={revealItem} className="hero-heading">
            Build a digital brand that looks premium and performs.
            <span className="hero-heading-accent">
              Clear strategy. Better design. Measurable growth.
            </span>
          </motion.h1>

          <motion.p variants={revealItem} className="hero-subtext">
            We design and execute growth systems for ambitious businesses: content,
            positioning, and performance-focused campaigns that convert attention into
            qualified leads.
          </motion.p>

          <motion.div variants={revealItem} className="hero-actions">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href="#services"
              className="hero-btn-primary"
            >
              Explore Services
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="hero-btn-ghost"
            >
              Start a Conversation
            </motion.a>
          </motion.div>

          <motion.div variants={revealItem} className="hero-stats">
            {valueProps.map((item) => (
              <div key={item.label} className="hero-stat-card">
                <p className="hero-stat-value">{item.value}</p>
                <p className="hero-stat-label">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}