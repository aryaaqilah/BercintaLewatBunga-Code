import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import { get as getDb } from "idb-keyval";

function AddressSection({ selectedProduct, modelData }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [addressData, setAddressData] = useState({
    RecipientName: "",
    RecipientEmail: "",
    RecipientNumber: "",
    ProvinceId: "",
    CityId: "",
    PostalCodeId: "",
    Detail: "",
    Note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    const {
      RecipientName,
      RecipientNumber,
      ProvinceId,
      CityId,
      PostalCodeId,
      Detail,
    } = addressData;

    if (
      !RecipientName ||
      !RecipientNumber ||
      !ProvinceId ||
      !CityId ||
      !PostalCodeId ||
      !Detail
    ) {
      showAlert("Mohon lengkapi semua data alamat yang bertanda wajib!");
      return;
    }

    if (user) {
      navigate("/payment", {
        state: { selectedProduct, addressData, modelData },
      });
    } else {
      showAlert("Silakan login terlebih dahulu untuk melakukan pembelian.");
      navigate("/login");
    }
  };

  return (
    <section className="AddressSection">
      <div className="AddressSectionContainer">
        <h1 className="txt-color-primary">Alamat Pengiriman</h1>

        <div className="AddressBox txt-color-ternary">
          <form onSubmit={handleCheckout} className="AddressFormGrid">
            {/* Column 1: Contact Info */}
            <div className="FormColumn">
              <div className="AddressFormGroup">
                <label>Nama Penerima</label>
                <input
                  type="text"
                  name="RecipientName"
                  value={addressData.RecipientName}
                  onChange={handleChange}
                  placeholder="Masukkan nama penerima"
                />
              </div>

              <div className="AddressFormGroup">
                <label>Email Penerima</label>
                <input
                  type="email"
                  name="RecipientEmail"
                  value={addressData.RecipientEmail}
                  onChange={handleChange}
                  placeholder="Masukkan email penerima"
                />
              </div>

              <div className="AddressFormGroup">
                <label>Nomor Telepon Penerima</label>
                <input
                  type="text"
                  name="RecipientNumber"
                  value={addressData.RecipientNumber}
                  onChange={handleChange}
                  placeholder="Masukkan nomor telepon"
                />
              </div>
            </div>

            {/* Column 2: Regional Info */}
            <div className="FormColumn">
              <div className="AddressFormGroup">
                <label>Provinsi</label>
                <input
                  type="text"
                  name="ProvinceId"
                  value={addressData.ProvinceId}
                  onChange={handleChange}
                  placeholder="Masukkan Provinsi"
                />
              </div>

              <div className="AddressFormGroup">
                <label>Kota/Kabupaten</label>
                <select
                  name="CityId"
                  value={addressData.CityId}
                  onChange={handleChange}
                >
                  <option value="">Pilih Kota</option>
                  <option value="city_01">Jakarta</option>
                  <option value="city_02">Bandung</option>
                  <option value="city_03">Surabaya</option>
                </select>
              </div>

              <div className="AddressFormGroup">
                <label>Kode Pos</label>
                <input
                  type="text"
                  name="PostalCodeId"
                  value={addressData.PostalCodeId}
                  onChange={handleChange}
                  placeholder="Masukkan kode pos"
                />
              </div>
            </div>

            {/* Column 3: Detail & Notes */}
            <div className="FormColumn">
              <div className="AddressFormGroup">
                <label>Alamat Lengkap</label>
                <textarea
                  name="Detail"
                  value={addressData.Detail}
                  onChange={handleChange}
                  placeholder="Contoh: Jl. Mawar No. 123, RT 01/02"
                />
              </div>
              <div className="AddressFormGroup">
                <label>Catatan (Opsional)</label>
                <textarea
                  name="Note"
                  value={addressData.Note}
                  onChange={handleChange}
                  placeholder="Contoh: Pagar warna hitam"
                />
              </div>
            </div>

            {/* Center Button */}
            <div className="AddressButtonContainer">
              <button type="submit" className="button-ternary">
                Lanjut ke Pembayaran
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Address() {
  const location = useLocation();
  const productInfo = location.state?.selectedProduct;
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const data = await getDb("pending_order_model");
      if (data) setModelData(data);
    };
    loadModel();
  }, []);

  return <AddressSection selectedProduct={productInfo} modelData={modelData} />;
}
