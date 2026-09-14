import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { Color, MathUtils } from 'three';
import { useElementVisibility } from '../../hooks/useElementVisibility';

function LiquidCore() {
  const meshRef = useRef(null);
  const groupRef = useRef(null);
  const materialRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const hoverMixRef = useRef(0);

  const rootStyles = getComputedStyle(document.documentElement);
  const metalColor = rootStyles.getPropertyValue('--metal').trim() || '#d7dde8';
  const accentColor = rootStyles.getPropertyValue('--accent').trim() || '#3977ff';
  const baseColorRef = useRef(new Color(metalColor));
  const accentColorRef = useRef(new Color(accentColor));

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return undefined;
    const tween = gsap.fromTo(mesh.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1.8, y: 1.8, z: 1.8, duration: 1.35, ease: 'expo.out' });
    return () => tween.kill();
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // step 用 delta 归一化：不同刷新率下过渡速度一致，鼠标经过是平滑渐变而不是瞬间跳变
    const step = 1 - Math.exp(-5.5 * delta);
    hoverMixRef.current = MathUtils.lerp(hoverMixRef.current, hoveringRef.current ? 1 : 0, step);
    const mix = hoverMixRef.current;

    mesh.rotation.y += delta * 0.12;
    mesh.rotation.x = MathUtils.lerp(mesh.rotation.x, pointerRef.current.y * 0.25, step);
    mesh.rotation.z = MathUtils.lerp(mesh.rotation.z, -pointerRef.current.x * 0.18, step);
    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;

    const material = materialRef.current;
    if (material) {
      // 全部用 mix 插值，所以鼠标进入/离开都是平滑渐变，不会瞬间跳变
      material.color.copy(baseColorRef.current).lerp(accentColorRef.current, mix * 0.62);
      material.roughness = MathUtils.lerp(0.1, 0.03, mix);
      material.distort = MathUtils.lerp(0.48, 0.85, mix);
      if (material.emissive) material.emissiveIntensity = mix * 0.55;
    }
    if (groupRef.current) groupRef.current.scale.setScalar(MathUtils.lerp(1, 1.06, mix));
  });

  return (
    <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.28}>
      {/* 放大放在外层 group，避免和入场动画对 mesh.scale 的 tween 抢同一个属性 */}
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onPointerMove={(event) => { pointerRef.current = event.pointer; }}
          onPointerOver={() => { hoveringRef.current = true; }}
          onPointerOut={() => { hoveringRef.current = false; pointerRef.current = { x: 0, y: 0 }; }}
        >
          <icosahedronGeometry args={[1, 16]} />
          <MeshDistortMaterial ref={materialRef} color={metalColor} emissive={accentColor} emissiveIntensity={0} metalness={0.96} roughness={0.1} distort={0.48} speed={1.45} />
        </mesh>
      </group>
    </Float>
  );
}

function SceneLighting() {
  const styles = getComputedStyle(document.documentElement);
  const metal = styles.getPropertyValue('--metal').trim();
  const text = styles.getPropertyValue('--text').trim();
  const accent = styles.getPropertyValue('--accent').trim();
  const focus = styles.getPropertyValue('--focus').trim();
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 5]} intensity={4.5} color={text} />
      <pointLight position={[-4, 1, 2]} intensity={30} color={accent} distance={8} />
      <pointLight position={[3, -3, 1]} intensity={18} color={focus} distance={7} />
      <pointLight position={[0, 0, 4]} intensity={8} color={metal} distance={7} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={5} color={text} position={[0, 4, -2]} scale={[7, 2, 1]} />
        <Lightformer form="rect" intensity={4} color={accent} position={[-4, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={[5, 2, 1]} />
        <Lightformer form="ring" intensity={3} color={focus} position={[4, -2, 1]} scale={3} />
      </Environment>
    </>
  );
}

export default function LiquidMetalScene() {
  const { elementRef, visible } = useElementVisibility();
  return (
    <div className="liquid-scene" ref={elementRef} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 1.4]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <SceneLighting />
        <LiquidCore />
      </Canvas>
    </div>
  );
}
