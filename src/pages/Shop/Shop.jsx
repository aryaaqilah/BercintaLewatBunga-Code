import { div } from "three/tsl";
import CardSet from "../../components/Card/CardSet";
import { useEffect, useState, useRef, useContext } from "react";
import { CardModel } from "../../models/CardModel";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ProductCard from "../../components/ProductCard/ProductCard";

function LandingSection() {}

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

function ProductSection({ productData }) {
  const products = productData.map((product) => {
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
    <section className="ShopProductSection">
      <div className="ShopProductSectionTitle">
        <h2 className="h2">Produk Kami</h2>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard product={product}/>
        ))}
      </div>
    </section>
  );
}

export default function Shop() {
  const [productData, setProductData] = useState([]);
  const API_URL = "http://localhost:5000/api/products/not-customized";
  const handleSubmit = async (e) => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const latestData = data.reverse().slice(0, 3);

      setProductData(latestData);
      console.log(data);
      console.log("Fetch successful");
    } catch (error) {
      console.log("Error:", error);
    } finally {
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <LandingSection />
      <MostPopularSection productData={productData} />
      <ProductSection productData={productData} />
    </div>
  );
}
