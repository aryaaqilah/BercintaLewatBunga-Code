"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ---------- Komponen Object3D (bisa Flower atau Wrapper) ---------- */
function Object3DModel({ modelPath, position, mode, setDragging }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const { camera, gl } = useThree();

  useEffect(() => {
    if (scene) {
      const cloned = scene.clone(true);
      modelRef.current.add(cloned);
    }
  }, [scene]);

  // Interaksi drag dan rotate
  useEffect(() => {
    if (mode === "camera") return;
    const model = modelRef.current;
    if (!model) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const offset = new THREE.Vector3();
    const intersection = new THREE.Vector3();

    let isActive = false;

    const handleMouseDown = (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(model, true);

      if (intersects.length > 0) {
        isActive = true;
        setDragging(true);

        if (mode === "drag") {
          plane.setFromNormalAndCoplanarPoint(
            camera.getWorldDirection(new THREE.Vector3()),
            model.position
          );
          raycaster.ray.intersectPlane(plane, intersection);
          offset.copy(intersection).sub(model.position);
        }
      }
    };

    const handleMouseMove = (event) => {
      if (!isActive) return;

      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (mode === "drag") {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, intersection);
        model.position.copy(intersection.sub(offset));
      }

      if (mode === "rotateX") model.rotation.x += event.movementY * 0.01;
      if (mode === "rotateY") model.rotation.y += event.movementX * 0.01;
      if (mode === "rotateZ") model.rotation.z += event.movementX * 0.01;
    };

    const handleMouseUp = () => {
      if (isActive) {
        isActive = false;
        setDragging(false);
      }
    };

    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mouseup", handleMouseUp);

    return () => {
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mode, camera, gl, setDragging]);

  return <group ref={modelRef} position={position} />;
}

/* ---------- Scene utama ---------- */
export default function FlowerScene() {
  const [objects, setObjects] = useState([]); // menyimpan semua object (flower & wrapper)
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState("camera");

  // Tambah bunga
  const addFlower = () => {
    setObjects((prev) => [
      ...prev,
      {
        id: prev.length,
        type: "flower",
        modelPath: "/models/flower.glb",
        position: [prev.length * 1.5, 0, 0],
      },
    ]);
  };

  // Tambah wrapper
  const addWrapper = () => {
    setObjects((prev) => [
      ...prev,
      {
        id: prev.length,
        type: "wrapper",
        modelPath: "/models/wrapper.glb",
        position: [prev.length * 1.5, 0, 0],
      },
    ]);
  };

  return (
    <div className="w-full relative bg-gray-100">
      {/* Toolbar kontrol */}
      <div className="absolute top-6 left-6 flex gap-3 flex-wrap">
        {[
          { name: "Camera", mode: "camera", icon: "🎥", color: "blue" },
          { name: "Drag", mode: "drag", icon: "✋", color: "green" },
          { name: "Rotate X", mode: "rotateX", icon: "🔄", color: "purple" },
          { name: "Rotate Y", mode: "rotateY", icon: "🔄", color: "purple" },
          { name: "Rotate Z", mode: "rotateZ", icon: "🔄", color: "purple" },
        ].map((btn) => (
          <button
            key={btn.mode}
            onClick={() => setMode(btn.mode)}
            className={`px-4 py-2 rounded-lg ${
              mode === btn.mode
                ? `bg-${btn.color}-600 text-white`
                : "bg-gray-200 text-black"
            }`}
          >
            {btn.icon} {btn.name}
          </button>
        ))}
      </div>

      {/* Tombol tambah objek */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <button
          onClick={addFlower}
          className="px-6 py-3 bg-pink-600 text-white text-lg rounded-xl shadow-lg hover:bg-pink-700 transition"
        >
          🌷 Tambah Tulip
        </button>
        <button
          onClick={addWrapper}
          className="px-6 py-3 bg-yellow-500 text-white text-lg rounded-xl shadow-lg hover:bg-yellow-600 transition"
        >
          🧺 Tambah Wrapper
        </button>
      </div>

      {/* Canvas */}
      <div
        className="w-full border-4 border-gray-400 rounded-lg overflow-hidden"
        style={{ height: "900px" }}
      >
        <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
          <color attach="background" args={["#fdfdfd"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />

          {/* Render semua objek (bunga & wrapper) */}
          {objects.map((obj) => (
            <Object3DModel
              key={obj.id}
              modelPath={obj.modelPath}
              position={obj.position}
              mode={mode}
              setDragging={setIsDragging}
            />
          ))}

          {/* Axis & Grid */}
          <axesHelper args={[5]} />
          <gridHelper
            args={[20, 20, 0x888888, 0x444444]}
            ref={(helper) => {
              if (helper) {
                helper.material.depthWrite = false;
                helper.material.transparent = true;
                helper.material.opacity = 0.4;
                helper.raycast = () => {};
              }
            }}
          />

          {/* OrbitControls aktif hanya saat kamera mode */}
          <OrbitControls enabled={mode === "camera" && !isDragging} />
        </Canvas>
      </div>
    </div>
  );
}
