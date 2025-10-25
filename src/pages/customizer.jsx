"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Text, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Object3DModel({
  id,
  modelPath,
  position,
  mode,
  setDragging,
  type,
  color,
  text,
  isSelected,
  onSelect,
}) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const { camera, gl } = useThree();

  useEffect(() => {
    if (scene) {
      const cloned = scene.clone(true);

      // Skala objek berdasarkan jenis
      if (type === "flower") {
        if (modelPath.includes("tulip")) cloned.scale.set(0.15, 0.15, 0.15);
        else if (modelPath.includes("rose")) cloned.scale.set(1.1, 1.1, 1.1);
        else if (modelPath.includes("lilly")) cloned.scale.set(1.5, 1.5, 1.5);
        else cloned.scale.set(0.5, 0.5, 0.5);
      }

      if (type === "wrapper") cloned.scale.set(2.0, 2.0, 2.0);
      if (type === "card") cloned.scale.set(0.3, 0.3, 0.3);

      // Warna wrapper/card
      if ((type === "wrapper" || type === "card") && color) {
        cloned.traverse((child) => {
          if (child.isMesh) {
            child.material = child.material.clone();
            child.material.color = new THREE.Color(color);
          }
        });
      }

      modelRef.current.add(cloned);
    }
  }, [scene, type, color, modelPath]);

  // Efek highlight saat terpilih
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.emissive = new THREE.Color(isSelected ? 0x00ff00 : 0x000000);
        }
      });
    }
  }, [isSelected]);

  // Klik untuk select
  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(model, true);

      if (intersects.length > 0) onSelect(id);
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [camera, gl, id, onSelect]);

  // Drag & Rotate
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

  return (
    <group ref={modelRef} position={position}>
      {type === "card" && text && (
        <Text
          position={[0, 0, 0]}
          fontSize={0.035}
          color="black"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.45}
          lineHeight={1.1}
          overflowWrap="break-word"
          textAlign="center"
          clipRect={[-0.23, -0.12, 0.23, 0.12]}
        >
          {text}
        </Text>
      )}
    </group>
  );
}

export default function FlowerScene() {
  const [objects, setObjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState("camera");
  const [wrapperColor, setWrapperColor] = useState("#ffc0cb");
  const [cardColor, setCardColor] = useState("#cccccc");
  const [cardText, setCardText] = useState("Happy Day 💐");

  // Tambah bunga sesuai jenis
  const addFlower = (type) => {
    let modelPath = "/models/tulip.glb";
    if (type === "rose") modelPath = "/models/rose.glb";
    else if (type === "lilly") modelPath = "/models/lilly.glb";

    setObjects((prev) => [
      ...prev,
      { id: Date.now(), type: "flower", modelPath, position: [prev.length * 0.5, 0, 0] },
    ]);
  };

  const addWrapper = () => {
    setObjects((prev) => {
      const filtered = prev.filter((obj) => obj.type !== "wrapper");
      return [
        ...filtered,
        { id: Date.now(), type: "wrapper", modelPath: "/models/wrapper.glb", position: [0, 0, 0] },
      ];
    });
  };

  const addCard = () => {
    setObjects((prev) => {
      const filtered = prev.filter((obj) => obj.type !== "card");
      return [
        ...filtered,
        { id: Date.now(), type: "card", modelPath: "/models/card.glb", position: [0, 0.2, 0], text: cardText },
      ];
    });
  };

  // Hapus objek terpilih
  const deleteSelected = () => {
    if (!selectedId) return alert("Tidak ada objek yang dipilih!");
    setObjects((prev) => prev.filter((obj) => obj.id !== selectedId));
    setSelectedId(null);
  };

  // 🔹 Reset semua objek
  const resetAll = () => {
    if (window.confirm("Apakah kamu yakin ingin menghapus semua objek?")) {
      setObjects([]);
      setSelectedId(null);
    }
  };

  return (
    <div className="w-full relative bg-gray-100">
      {/* Toolbar kontrol */}
      <div className="absolute top-6 left-6 flex gap-3 flex-wrap">
        {[
          { name: "Camera", mode: "camera", icon: "🎥", color: "blue" },
          { name: "Drag", mode: "drag", icon: "✋", color: "green" },
          { name: "Rotate X", mode: "rotateX", icon: "🔄X", color: "purple" },
          { name: "Rotate Y", mode: "rotateY", icon: "🔄Y", color: "purple" },
          { name: "Rotate Z", mode: "rotateZ", icon: "🔄Z", color: "purple" },
        ].map((btn) => (
          <button
            key={btn.mode}
            onClick={() => setMode(btn.mode)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === btn.mode ? `bg-${btn.color}-600 text-white shadow-lg scale-105` : "bg-gray-200 text-black"
            }`}
          >
            {btn.icon} {btn.name}
          </button>
        ))}
      </div>

      {/* Tombol aksi kanan atas */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <button onClick={() => addFlower("tulip")} className="px-6 py-3 bg-pink-600 text-white text-lg rounded-xl shadow-lg hover:bg-pink-700 transition">🌷 Tambah Tulip</button>
        <button onClick={() => addFlower("rose")} className="px-6 py-3 bg-red-600 text-white text-lg rounded-xl shadow-lg hover:bg-red-700 transition">🌹 Tambah Rose</button>
        <button onClick={() => addFlower("lilly")} className="px-6 py-3 bg-yellow-600 text-white text-lg rounded-xl shadow-lg hover:bg-yellow-700 transition">🌸 Tambah Lilly</button>
        <button onClick={addWrapper} className="px-6 py-3 bg-yellow-500 text-white text-lg rounded-xl shadow-lg hover:bg-yellow-600 transition">🧺 Tambah Wrapper</button>
        <button onClick={addCard} className="px-6 py-3 bg-gray-600 text-white text-lg rounded-xl shadow-lg hover:bg-gray-700 transition">🪪 Tambah Card</button>
        <button onClick={deleteSelected} className="px-6 py-3 bg-red-500 text-white text-lg rounded-xl shadow-lg hover:bg-red-600 transition">🗑️ Hapus Terpilih</button>
        <button onClick={resetAll} className="px-6 py-3 bg-black text-white text-lg rounded-xl shadow-lg hover:bg-gray-800 transition">♻️ Reset Semua</button>
      </div>

      {/* Panel warna dan teks */}
      <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 w-80">
        <div className="flex items-center gap-4">
          <label className="font-semibold">🎨 Warna Wrapper:</label>
          <input type="color" value={wrapperColor} onChange={(e) => setWrapperColor(e.target.value)} className="w-10 h-10 border-none rounded-full cursor-pointer" />
        </div>

        <div className="flex items-center gap-4">
          <label className="font-semibold">🪶 Warna Card:</label>
          <input type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)} className="w-10 h-10 border-none rounded-full cursor-pointer" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">💌 Teks pada Card:</label>
          <textarea
            value={cardText}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 120) setCardText(value);
            }}
            placeholder="Tulis pesanmu di sini... (max 120 karakter)"
            className="border rounded-lg px-3 py-2 text-sm resize-none h-24"
            maxLength={120}
          />
          <p className="text-xs text-gray-500 text-right">{cardText.length}/120 karakter</p>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full border-4 border-gray-400 rounded-lg overflow-hidden" style={{ height: "900px" }}>
        <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
          <color attach="background" args={["#fdfdfd"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />

          {objects.map((obj) => (
            <Object3DModel
              key={obj.id}
              id={obj.id}
              type={obj.type}
              modelPath={obj.modelPath}
              position={obj.position}
              mode={mode}
              setDragging={setIsDragging}
              color={obj.type === "wrapper" ? wrapperColor : obj.type === "card" ? cardColor : undefined}
              text={obj.type === "card" ? obj.text : undefined}
              isSelected={selectedId === obj.id}
              onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
            />
          ))}

          <axesHelper args={[5]} />
          <gridHelper args={[20, 20, 0x888888, 0x444444]} />
          <OrbitControls enabled={mode === "camera" && !isDragging} />
        </Canvas>
      </div>
    </div>
  );
}
