import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroConstellation() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.25, 12);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const wireSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(3.6, 2),
      new THREE.MeshBasicMaterial({
        color: 0x6effd3,
        wireframe: true,
        transparent: true,
        opacity: 0.08
      })
    );
    wireSphere.rotation.set(0.4, 0.5, 0.1);
    group.add(wireSphere);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.14
    });

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.03, 16, 160), ringMaterial);
    ringA.rotation.set(1.15, 0.3, -0.25);
    group.add(ringA);

    const ringB = new THREE.Mesh(new THREE.TorusGeometry(4.45, 0.025, 16, 160), ringMaterial);
    ringB.rotation.set(0.7, -0.4, 0.5);
    group.add(ringB);

    const starCount = 280;
    const starPositions = new Float32Array(starCount * 3);

    for (let index = 0; index < starCount; index += 1) {
      starPositions[index * 3] = (Math.random() - 0.5) * 18;
      starPositions[index * 3 + 1] = (Math.random() - 0.5) * 11;
      starPositions[index * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({
        size: 0.045,
        color: 0xf7fff9,
        transparent: true,
        opacity: 0.75
      })
    );
    scene.add(stars);

    const nodeCount = 24;
    const nodePositions = [];

    for (let index = 0; index < nodeCount; index += 1) {
      const phi = Math.acos(1 - (2 * (index + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);
      const radius = 3.45 + (Math.random() - 0.5) * 0.32;
      const vector = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodePositions.push(vector);
    }

    const nodesGeometry = new THREE.BufferGeometry();
    const flatNodes = new Float32Array(nodeCount * 3);

    nodePositions.forEach((vector, index) => {
      flatNodes[index * 3] = vector.x;
      flatNodes[index * 3 + 1] = vector.y;
      flatNodes[index * 3 + 2] = vector.z;
    });

    nodesGeometry.setAttribute("position", new THREE.BufferAttribute(flatNodes, 3));

    const nodes = new THREE.Points(
      nodesGeometry,
      new THREE.PointsMaterial({
        size: 0.095,
        color: 0xffffff,
        transparent: true,
        opacity: 0.95
      })
    );
    group.add(nodes);

    const connections = [];

    nodePositions.forEach((current, currentIndex) => {
      nodePositions.forEach((target, targetIndex) => {
        if (targetIndex <= currentIndex) {
          return;
        }

        if (current.distanceTo(target) < 2.95) {
          connections.push(
            current.x,
            current.y,
            current.z,
            target.x,
            target.y,
            target.z
          );
        }
      });
    });

    const lines = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({
        color: 0x8bf0d1,
        transparent: true,
        opacity: 0.18
      })
    );
    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(connections, 3)
    );
    group.add(lines);

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        color: 0x49f2b8,
        transparent: true,
        opacity: 0.36
      })
    );
    glow.scale.set(8.5, 8.5, 1);
    scene.add(glow);

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const pointer = {
      x: 0,
      y: 0
    };

    const handlePointerMove = (event) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.65;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.55;
    };

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.09 + pointer.x;
      group.rotation.x = Math.sin(elapsed * 0.32) * 0.06 + pointer.y;
      ringA.rotation.z += 0.0012;
      ringB.rotation.x -= 0.0011;
      stars.rotation.y = elapsed * 0.008;
      glow.material.opacity = 0.28 + Math.sin(elapsed * 1.35) * 0.08;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(render);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);

      group.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }

        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });

      starsGeometry.dispose();
      stars.material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-constellation" ref={mountRef} aria-hidden="true" />;
}
