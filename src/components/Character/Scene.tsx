import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();
  const [isCharacterReady, setIsCharacterReady] = useState(false);

  useEffect(() => {
    if (canvasDiv.current) {
      let disposed = false;
      let loadedCharacter: THREE.Object3D | null = null;
      let cleanupHover: (() => void) | undefined;
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 1.75,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.querySelectorAll("canvas").forEach((canvas) => {
        canvas.remove();
      });
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      const onResize = () => {
        if (loadedCharacter) {
          handleResize(renderer, camera, canvasDiv, loadedCharacter);
        }
      };

      loadCharacter().then((gltf) => {
        if (gltf && !disposed) {
          const animations = setAnimations(gltf);
          cleanupHover = hoverDivRef.current
            ? animations.hover(gltf, hoverDivRef.current)
            : undefined;
          mixer = animations.mixer;
          let character = gltf.scene;
          loadedCharacter = character;
          scene.add(character);
          setIsCharacterReady(true);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          if (window.innerWidth <= 1024) {
            animations.startBlink();
          }
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", onResize);
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };
      let lastTouchAt = 0;

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        lastTouchAt = performance.now();
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) => {
            lastTouchAt = performance.now();
            handleTouchMove(e, (x, y) => (mouse = { x, y }));
          });
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let frameId = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (document.hidden) return;
        const elapsed = performance.now() / 1000;
        const shouldUseMobileIdle =
          window.innerWidth <= 1024 && performance.now() - lastTouchAt > 2500;

        if (shouldUseMobileIdle) {
          mouse = {
            x: Math.sin(elapsed * 0.75) * 0.42,
            y: Math.sin(elapsed * 0.45) * 0.08,
          };
          interpolation = { x: 0.055, y: 0.055 };
        }

        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        disposed = true;
        cleanupHover?.();
        progress.stop();
        cancelAnimationFrame(frameId);
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mousemove", onMouseMove);
        if (canvasDiv.current?.contains(renderer.domElement)) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div
            className={`character-still ${
              isCharacterReady ? "character-still-hidden" : ""
            }`}
            aria-hidden="true"
          >
            <img src="/images/character-mobile-still.png" alt="" />
          </div>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
