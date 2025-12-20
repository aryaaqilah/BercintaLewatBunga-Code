import './Confirmation.css'
import React, { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from "../../AuthContext";

function MainSection({selectedProduct}) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); // Inisialisasi fungsi navigasi
    const handleCardSelect = (selectedProduct) => {
     // Berpindah ke halaman /order
    // Opsi: Kirim data produk yang dipilih melalui state agar bisa dibaca di halaman Order
    if (user) {
      console.log("Selected card:", selectedProduct);
      navigate('/address', { 
      state: { selectedProduct: selectedProduct } 
    });
    }
    else{
      alert("Silakan login terlebih dahulu untuk melakukan pembelian.");
      navigate('/login');
    }
  }
  console.log("Selected Product:", selectedProduct);
  return (
    <div>
      <section className='MainSection'>
        <div className="box"></div>
        <div className="SectionContainer">
          <div className="MainBox">
            <div className="ModelBox"></div>
            <div className="InfoBox">
              <div className="FillerBox"></div>
              <div className="InsideBox">
                <div className="NameBox">
                  <h1>{selectedProduct?.title || "FAILED TO LOAD"}</h1>
                </div>
                <div className="DetailBox">
                  <p>{selectedProduct?.description || "No description available"}<br /></p>
                </div>
                <div className="SummaryBox">
                  <div className="QuantityBox">
                    <h2>x 1</h2>
                  </div>
                  <div className="PriceBox">
                    <h2>{selectedProduct?.price || "Price not available"}</h2>
                  </div>
                </div>
                <div className="NotesBox">
                  Notes :
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, magni?</p>
                </div>
                <div className="btnContainer" style={{display: 'flex', justifyContent: 'center'}}>
                  <button className="btnConfirm" onClick={() => handleCardSelect(selectedProduct)}>Konfirmasi</button>
                </div>
              </div>
              <div className="FillerBox"></div>
            </div>
          </div>
        </div>
        <div className="box"></div>
      </section>
    </div>
  )
}

export default function Confirmation() {
  const selectedProduct = window.history.state && window.history.state.usr && window.history.state.usr.selectedProduct;
  console.log("Selected Product in Confirmation Page:", selectedProduct);
  return (
    <div>
      <MainSection selectedProduct={selectedProduct} />
    </div>
  );
}