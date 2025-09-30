import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Grid } from "@react-three/drei";

function FlowerModel() {
  const { scene } = useGLTF("/models/flower.glb");
  return <primitive object={scene} scale={2} />;
}

export default function Customizer() {
  return (
    <div className="flex flex-col h-screen bg-green-50">
      {/* Header */}
      <header className="p-4 bg-green-700 text-white shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          🌸 Bouquet Customizer
        </h1>
      </header>

      {/* Main Section: Canvas + Panel */}
      <main className="flex flex-1 p-4 gap-6">
        {/* Canvas Section */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
            style={{
              width: "80vh",
              height: "60vh",
            }}
          >
            <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1} />

              {/* Model Bunga */}
              <FlowerModel />

              {/* Grid bantu orientasi */}
              <Grid
                position={[0, -1, 0]}
                args={[10, 10]}
                cellSize={1}
                cellThickness={0.5}
                cellColor={"#c0c0c0"}
                sectionColor={"#6b7280"}
              />

              <Environment preset="sunset" />
              <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>
          </div>
        </div>

        {/* Sidebar Panel */}
        <aside className="w-56 bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Kustomisasi</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
            + Tambah Mawar
          </button>
          <button className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600">
            + Tambah Tulip
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400">
            Reset Kamera
          </button>
        </aside>
      </main>
    </div>
  );
}
