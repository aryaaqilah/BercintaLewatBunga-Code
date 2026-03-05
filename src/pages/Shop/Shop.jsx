import CardSet from "../../components/Card/CardSet";
import { useEffect, useState, useRef } from "react";
import { CardModel } from "../../models/CardModel";
import { StoreCardModel } from "../../models/StoreCardModel";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import StoreCard from "../../components/StoreCard/StoreCard"; // Import New Component

function MostPopularSection({ productData }) {
  const cards = productData.map((product) => {
    return new CardModel(
      product._id,
      product.Name,
      product.Price,
      product.Memo,
      product.Image,
      false
    );
  });

  return (
    <section className="ShopMostPopularSection">
      <div className="ShopMostPopularDescription">
        <h1 className="txt-color-primary">Ukir Kisah Cintamu</h1>
        <h3 className="txt-color-ternary">Yang terbaik untuk yang terkasih</h3>
      </div>
      <CardSet cards={cards} navigate={useNavigate()} />
    </section>
  );
}

// NEW: Store Section Implementation
const dummyStores = [
  new StoreCardModel("1", "HER.ROSES", "https://i.ibb.co/LzY8v1C/Logo-Placeholder.png"),
  new StoreCardModel("2", "FLORA.STUDIO", "https://i.ibb.co/LzY8v1C/Logo-Placeholder.png"),
  new StoreCardModel("3", "PETALS.CO", "https://i.ibb.co/LzY8v1C/Logo-Placeholder.png"),
  new StoreCardModel("4", "BLOOM.GARDEN", "https://i.ibb.co/LzY8v1C/Logo-Placeholder.png"),
];

function StoreSection({ floristData }) {
  const navigate = useNavigate();

  const handleLihatToko = (florist) => {
    navigate(`/store/${florist._id}`);
  };

  return (
    <section className="ShopProductSection">
      <div className="ShopProductSectionTitle">
        <h1 className="txt-color-primary">Toko</h1>
        <h3 className="txt-color-ternary">Menyediakan yang terbaik untuk Anda</h3>
      </div>

      <div className="product-grid">
        {floristData.map((florist) => (
          <StoreCard 
            key={florist._id} 
            store={{
              id: florist._id,
              name: florist.Name,
              logo: florist.Logo // Assuming the model has a Logo field
            }}
            onSelect={handleLihatToko}
          />
        ))}
      </div>
    </section>
  );
}

export default function Shop() {
  const [productData, setProductData] = useState([]);
  const [floristData, setFloristData] = useState([]); // State for Stores

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/not-customized");
      const data = await response.json();
      setProductData(data.reverse().slice(0, 6));
    } catch (error) {
      console.error("Product fetch error:", error);
    }
  };

  const fetchFlorists = async () => {
    try {
      // Assuming this endpoint exists for your Florists/Stores
      const response = await fetch("http://localhost:5000/api/florists");
      const data = await response.json();
      setFloristData(data);
    } catch (error) {
      console.error("Florist fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFlorists();
  }, []);

  return (
    <div>
      <MostPopularSection productData={productData.slice(0, 5)} />
      <StoreSection floristData={dummyStores} />
    </div>
  );
}