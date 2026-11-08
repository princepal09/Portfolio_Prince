"use client";

import { useEffect, useRef } from "react";

export function HeroOrnament() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const visual = canvas?.closest("[data-hero-visual]");
    if (!canvas || !visual) return;

    // Keep the ornament moving on touch screens too, while respecting the
    // visitor's system motion preference and pausing when it leaves the viewport.
    const animated = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let disposed = false;
    let loading = false;
    let updateAnimation: (() => void) | undefined;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      if (disposed || loading || !animated.matches) return;
      loading = true;

      try {
        const THREE = await import("three");
        if (disposed) return;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(240, 240, false);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 10);
        camera.position.z = 4.8;

        const tilt = new THREE.Group();
        const crystal = new THREE.Group();
        tilt.add(crystal);
        scene.add(tilt);

        const shell = new THREE.IcosahedronGeometry(0.95, 1);
        const shellEdges = new THREE.WireframeGeometry(shell);
        shell.dispose();
        const gold = new THREE.LineBasicMaterial({
          color: 0xffd34d,
          transparent: true,
          opacity: 0.76,
        });
        crystal.add(new THREE.LineSegments(shellEdges, gold));

        const core = new THREE.OctahedronGeometry(0.42);
        const coreMaterial = new THREE.MeshBasicMaterial({
          color: 0xffbb36,
          transparent: true,
          opacity: 0.24,
        });
        crystal.add(new THREE.Mesh(core, coreMaterial));

        const orbitPoints = new THREE.EllipseCurve(0, 0, 1.32, 1.32).getPoints(80);
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints.slice(0, -1));
        const orbitMaterial = new THREE.LineBasicMaterial({
          color: 0xffd77d,
          transparent: true,
          opacity: 0.38,
        });
        const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
        orbit.rotation.set(1.06, -0.26, 0);
        const crossingOrbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
        crossingOrbit.rotation.set(-0.99, 0.4, 0);
        tilt.add(orbit, crossingOrbit);

        crystal.rotation.set(0.28, -0.34, 0.19);
        let visible = false;
        let previousTime: number | undefined;
        let pointerX = 0;
        let pointerY = 0;

        const onPointerMove = (event: Event) => {
          if (!(event instanceof PointerEvent) || event.pointerType === "touch") return;
          const rect = visual.getBoundingClientRect();
          pointerX = (event.clientX - rect.left) / rect.width - 0.5;
          pointerY = (event.clientY - rect.top) / rect.height - 0.5;
        };
        const resetPointer = () => {
          pointerX = 0;
          pointerY = 0;
        };
        visual.addEventListener("pointermove", onPointerMove, { passive: true });
        visual.addEventListener("pointerleave", resetPointer);

        const render = (time: number) => {
          const delta = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05);
          previousTime = time;
          crystal.rotation.y += delta * 0.43;
          crystal.rotation.x += delta * 0.13;
          tilt.rotation.y = THREE.MathUtils.damp(tilt.rotation.y, pointerX * 0.62, 5, delta);
          tilt.rotation.x = THREE.MathUtils.damp(tilt.rotation.x, pointerY * 0.48, 5, delta);
          renderer.render(scene, camera);
        };

        updateAnimation = () => {
          previousTime = undefined;
          const enabled = animated.matches;
          if (enabled) renderer.render(scene, camera);
          canvas.dataset.ready = String(enabled);
          renderer.setAnimationLoop(enabled && visible ? render : null);
        };

        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          updateAnimation?.();
        });
        observer.observe(canvas);
        updateAnimation();

        cleanup = () => {
          observer.disconnect();
          visual.removeEventListener("pointermove", onPointerMove);
          visual.removeEventListener("pointerleave", resetPointer);
          renderer.setAnimationLoop(null);
          shellEdges.dispose();
          gold.dispose();
          core.dispose();
          coreMaterial.dispose();
          orbitGeometry.dispose();
          orbitMaterial.dispose();
          renderer.dispose();
          delete canvas.dataset.ready;
        };
      } catch {
        // Keep the static ornament when WebGL is unavailable.
      }
    };

    const onPreferenceChange = () => {
      if (updateAnimation) updateAnimation();
      else void start();
    };
    animated.addEventListener("change", onPreferenceChange);
    void start();

    return () => {
      disposed = true;
      animated.removeEventListener("change", onPreferenceChange);
      cleanup?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative aspect-square w-full"
    >
      <div className="absolute inset-[12%] rounded-full bg-primary/14 blur-2xl" />
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="peer absolute inset-0 size-full opacity-0 data-[ready=true]:opacity-100"
      />
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full peer-data-[ready=true]:hidden"
        fill="none"
      >
        <g stroke="#ffd77d" opacity=".4">
          <ellipse cx="100" cy="100" rx="82" ry="36" transform="rotate(24 100 100)" />
          <ellipse cx="100" cy="100" rx="82" ry="36" transform="rotate(-32 100 100)" />
        </g>
        <path d="m100 42 47 26 12 52-36 34-51-7-29-42 14-41Z" fill="#191505" fillOpacity=".55" />
        <g stroke="#ffd34d" strokeLinejoin="round" opacity=".82">
          <path d="m100 42 47 26 12 52-36 34-51-7-29-42 14-41Z" />
          <path d="m57 64 27 17 16-39 18 44 29-18-13 46 25 6m-36 34 11-40-35 15-27 18 2-38-31-4 41-24 34 5 16 28m-60-5 10-28 15 48 24 25m-24-25 19-43" />
        </g>
        <path d="m100 72 26 28-26 27-25-27Z" fill="#ffbb36" fillOpacity=".24" />
      </svg>
    </div>
  );
}
