import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        Florist3D
      </Link>

      {/* Menu */}
      <div className="flex gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/customizer" className="hover:underline">Customize</Link>
        <Link to="/catalog" className="hover:underline">Catalog</Link>
        <Link to="/checkout" className="hover:underline">Checkout</Link>
      </div>
    </nav>
  );
}
