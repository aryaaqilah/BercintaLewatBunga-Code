import { div } from "three/tsl";
import CardSet from "../../components/Card/CardSet";
import { useEffect, useState, useRef, useContext } from "react";
import { CardModel } from "../../models/CardModel";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

function LandingSection() {
  
}

function MostPopularSection({productData}) {
  const cards = productData.map(product => {
    return new CardModel(
      product._id,
      product.Name,
      product.Price,
      product.Memo,
      product.Image,
      product.Image,
      false
    );
  });

  console.log('cards:', cards);
  console.log('productData:', productData);

  return (

    <section className="ShopMostPopularSection">
      <div className="ShopMostPopularDescription">
        <h1 className="txt-color-primary">Ukir Kisah Cintamu</h1>
        <h3 className="txt-color-ternary">Yang terbaik untuk yang terkasih</h3>
      </div>
      <CardSet cards={cards} navigate={useNavigate()}/>
    </section>
  );
}

export default function Shop() {
    const [productData, setProductData] = useState([]);
    const API_URL = "http://localhost:5000/api/products"; 
    const handleSubmit = async (e) => {
    try{
      const response = await fetch(API_URL, { 
      method: 'GET' ,
      headers: {
          'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const latestData = data.reverse().slice(0, 3); 
    
    setProductData(latestData);
    console.log(data);
    console.log("Fetch successful");
    }catch (error) { 
      console.log("Error:", error);
    } finally {
    }
  };

const hasFetched = useRef(false);

useEffect(() => {
  if (!hasFetched.current) {
    handleSubmit();
    hasFetched.current = true;
  }
}, []);

  return (
    <div>
      <LandingSection />
      <MostPopularSection productData={productData} />
    </div>
  );
}
