import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./Address.css";

function MainSection({ selectedProduct }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Inisialisasi fungsi navigasi
  // State untuk menyimpan data alamat sesuai model
  const [addressData, setAddressData] = useState({
    RecipientName: "",
    RecipientEmail: "", // Tambahan dari form Anda
    RecipientNumber: "",
    Province: "", // Diasumsikan ID dari dropdown/input
    City: "",
    PostalCode: "",
    Detail: "",
    Note: "",
  });

  // Handler untuk mendeteksi perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  // Fungsi Validasi dan Submit
  const handleCheckout = (e) => {
    e.preventDefault();

    // Validasi sederhana (Cek apakah field wajib sudah diisi)
    const {
      RecipientName,
      RecipientNumber,
      Province,
      City,
      PostalCode,
      Detail,
    } = addressData;

    if (
      !RecipientName ||
      !RecipientNumber ||
      !Province ||
      !City ||
      !PostalCode ||
      !Detail
    ) {
      alert("Mohon lengkapi semua data alamat yang bertanda wajib!");
      return;
    }

    console.log("Data Alamat Siap Disimpan:", addressData);
    console.log("Produk yang dibeli:", selectedProduct);

    // Di sini Anda bisa memanggil API untuk menyimpan ke database
    alert("Validasi Berhasil! Melanjutkan ke Pembayaran...");
    if (user) {
      console.log("Selected card:", selectedProduct);
      navigate("/payment", {
        state: { selectedProduct: selectedProduct, addressData: addressData },
      });
    } else {
      alert("Silakan login terlebih dahulu untuk melakukan pembelian.");
      navigate("/login");
    }
  };

  return (
    <div>
      <section className="MainSection">
        <div className="box"></div>
        <div
          className="SectionContainer"
          style={{ justifyContent: "flex-start" }}
        >
          <div style={{ alignSelf: "flex-start", color: "#A95C4C" }}>
            <h1>Alamat Pengiriman</h1>
          </div>
          <div
            className="AddressBox"
            style={{ height: "80%", display: "flex", justifyContent: "center" }}
          >
            {/* Bungkus semua input dalam satu form utama */}
            <form
              onSubmit={handleCheckout}
              className="FormContainer"
              style={{}}
            >
              <div style={{ display: "flex", width: "100%", height: "80%" }}>
                <div className="LeftContainer insideContainer">
                  <label>Nama Penerima</label>
                  <input
                    type="text"
                    name="RecipientName"
                    value={addressData.RecipientName}
                    onChange={handleChange}
                    placeholder="Masukkan nama penerima"
                    style={{
                      borderRadius: "10px",
                      height: "40px",
                      marginBottom: "15px",
                    }}
                  />

                  <label>Email Penerima</label>
                  <input
                    type="text"
                    name="RecipientEmail"
                    value={addressData.RecipientEmail}
                    onChange={handleChange}
                    placeholder="Masukkan email penerima"
                    style={{
                      borderRadius: "10px",
                      height: "40px",
                      marginBottom: "15px",
                    }}
                  />

                  <label>Nomor Telepon Penerima</label>
                  <input
                    type="text"
                    name="RecipientNumber"
                    value={addressData.RecipientNumber}
                    onChange={handleChange}
                    placeholder="Masukkan nomor telepon"
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </div>

                <div className="MidContainer insideContainer">
                  <label>Provinsi</label>
                  <input
                    type="text"
                    name="Province"
                    value={addressData.Province}
                    onChange={handleChange}
                    placeholder="Masukkan ID Provinsi"
                    style={{
                      borderRadius: "10px",
                      height: "40px",
                      marginBottom: "15px",
                    }}
                  />

                  <label>Kota/Kabupaten</label>
                  <select
                    name="City"
                    value={addressData.City}
                    onChange={handleChange}
                    style={{
                      borderRadius: "10px",
                      height: "40px",
                      marginBottom: "15px",
                    }}
                  >
                    <option value="">Pilih Kota</option>
                    <option value="city_01">Jakarta</option>
                    <option value="city_02">Bandung</option>
                    <option value="city_03">Surabaya</option>
                  </select>

                  <label>Kode Pos</label>
                  <input
                    type="text"
                    name="PostalCode"
                    value={addressData.PostalCode}
                    onChange={handleChange}
                    placeholder="Masukkan kode pos"
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </div>

                <div className="RightContainer">
                  <div className="RightForm">
                    <label>Alamat Lengkap</label>
                    <textarea
                      name="Detail"
                      value={addressData.Detail}
                      onChange={handleChange}
                      placeholder="Masukkan alamat lengkap"
                    />
                  </div>
                  <div className="RightForm">
                    <label>Catatan</label>
                    <textarea
                      name="Note"
                      value={addressData.Note}
                      onChange={handleChange}
                      placeholder="Masukkan catatan"
                    />
                  </div>
                </div>
              </div>
              <div
                className="btnContainer"
                style={{
                  gridColumn: "span 3",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <button type="submit" className="btnAddress">
                  Lanjut ke Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="box"></div>
      </section>
    </div>
  );
}

export default function Address() {
  const selectedProduct = window.history.state?.usr?.selectedProduct;
  return (
    <div>
      <MainSection selectedProduct={selectedProduct} />
    </div>
  );
}
