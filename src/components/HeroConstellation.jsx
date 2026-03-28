import { useEffect, useRef } from "react";

export function HeroConstellation() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const constrainedViewport = window.matchMedia("(max-width: 1024px)").matches;

    if (reduceMotion || constrainedViewport) {
      return undefined;
    }

    let cancelled = false;
    let teardown = () => {};

    import("three").then((THREE) => {
      if (cancelled) {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.25, 12);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
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

      const ringA = new THREE.Mesh(
        new THREE.TorusGeometry(3.8, 0.03, 16, 128),
        ringMaterial
      );
      ringA.rotation.set(1.15, 0.3, -0.25);
      group.add(ringA);

      const ringB = new THREE.Mesh(
        new THREE.TorusGeometry(4.45, 0.025, 16, 128),
        ringMaterial
      );
      ringB.rotation.set(0.7, -0.4, 0.5);
      group.add(ringB);

      const starCount = 180;
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
          size: 0.04,
          color: 0xf7fff9,
          transparent: true,
          opacity: 0.72
        })
      );
      scene.add(stars);

      const nodeCount = 18;
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
          size: 0.09,
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

          if (current.distanceTo(target) < 3.05) {
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
          opacity: 0.34
        })
      );
      glow.scale.set(8.2, 8.2, 1);
      scene.add(glow);

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const pointer = {
        x: 0,
        y: 0
      };

      const handlePointerMove = (event) => {
        const bounds = container.getBoundingClientRect();
        pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.45;
        pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.36;
      };

      const handlePointerLeave = () => {
        pointer.x = 0;
        pointer.y = 0;
      };

      const resize = () => {
        const { clientWidth, clientHeight } = container;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      };

      resize();
      window.addEventListener("resize", resize);
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      const clock = new THREE.Clock();

      const render = () => {
        const elapsed = clock.getElapsedTime();

        group.rotation.y = elapsed * 0.08 + pointer.x;
        group.rotation.x = Math.sin(elapsed * 0.28) * 0.04 + pointer.y;
        ringA.rotation.z += 0.001;
        ringB.rotation.x -= 0.0009;
        stars.rotation.y = elapsed * 0.006;
        glow.material.opacity = 0.26 + Math.sin(elapsed * 1.25) * 0.07;

        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(render);

      teardown = () => {
        renderer.setAnimationLoop(null);
        window.removeEventListener("resize", resize);
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);

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

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return <div className="hero-constellation" ref={mountRef} aria-hidden="true" />;
}
