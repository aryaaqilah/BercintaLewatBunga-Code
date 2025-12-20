import './Payment.css'
import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from 'react-router-dom'; 

function MainSection({selectedProduct, addressData, adminFee, discountData}) {
  // 1. Fungsi Helper untuk Format Titik (Rp. 10.000)
  const formatRupiah = (number) => {
    if (number === undefined || number === null || isNaN(number)) return "Rp. 0";
    return "Rp. " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  console.log("selectedProduct Data:", selectedProduct);
  console.log("addressData Data:", addressData);
  console.log("adminFee Data:", adminFee);
  console.log("discountData Data:", discountData);

  // Konstanta harga tetap
  const shippingFee = 10000;

  // Data Admin Fee
  const adminFeeAmount = adminFee[0]?.Fee || 0;

  // 2. Perhitungan variabel harga (sebelum total)
  const productPrice = selectedProduct?.price || 0;
  
  // Hitung Diskon
  const discountPercentage = discountData[0]?.Percentage || 0;
  const discountMax = discountData[0]?.Maximum || 0;
  const calculatedDiscount = Math.min(Math.floor(discountPercentage * productPrice), discountMax);

  // 3. Total Harga (Hanya menjumlahkan variabel yang sudah ada)
  const totalOrder = productPrice + shippingFee + adminFeeAmount - calculatedDiscount;

  const { user } = useContext(AuthContext);
    const navigate = useNavigate(); // Inisialisasi fungsi navigasi
    const handleCardSelect = async () => {
    if (!user) {
        alert("Silakan login terlebih dahulu untuk melakukan pembelian.");
        navigate('/login');
        return;
    }

    try {
        // --- LANGKAH 1: POST Alamat Terlebih Dahulu ---
        // Sesuaikan dengan skema mongoose Address Anda: 
        // RecipientNumber, RecipientName, ProvinceId, CityId, DistrictId, PostalCodeId, Detail
        const addressPayload = {
            RecipientName: addressData.RecipientName,
            RecipientNumber: 89522222333, // Contoh nomor tetap
            ProvinceId: '6942b33b502f86ae7fc21ac6',
            CityId: '6942b33b502f86ae7fc21ac8',
            DistrictId: '6942b33b502f86ae7fc21aca', // Sementara disamakan jika input District tidak ada
            PostalCodeId: '6942b33b502f86ae7fc21acc',
            Detail: addressData.Detail
        };
        console.log("Address Payload:", addressPayload);
        const addressRes = await fetch("http://localhost:5000/api/addresses", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addressPayload),
        });

        const savedAddress = await addressRes.json();

        if (!addressRes.ok) {
            throw new Error(savedAddress.message || "Gagal menyimpan alamat");
        }

        // --- LANGKAH 2: POST Order Menggunakan ID Alamat yang Baru Disimpan ---
        const orderPayload = {
            Status: 1, 
            AddressId: savedAddress._id, // Mengambil ID dari hasil POST pertama
            DeliveryId: '6942b33b502f86ae7fc21abe', 
            ProductId: '69440c04d3e7dc46622edd26',
            ProductPrice: productPrice,
            AdministrationFee: adminFee[0]._id,
            DiscountId: discountData[0]._id || null,
            Total: totalOrder
        };
        console.log("Order Payload:", orderPayload);
        const orderRes = await fetch("http://localhost:5000/api/orders", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload),
        });

        const savedOrder = await orderRes.json();
        if (!orderRes.ok) throw new Error("Gagal memproses pesanan");

        const userUpdatePayload = {
            OrderId: savedOrder._id // Kirim ID order baru untuk di-push ke array Orders di backend
        };

        console.log("User Update Payload:", userUpdatePayload);
        console.log("User Info:", user);

        const userRes = await fetch(`http://localhost:5000/api/users/${user._id}/add-order`, {
            method: 'PUT', // Menggunakan PUT/PATCH untuk update data
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userUpdatePayload),
        });

        if (userRes.ok) {
            alert("Transaksi Berhasil! Pesanan telah dicatat di akun Anda.");
            navigate('/orders', { 
                state: { 
                    selectedProduct: selectedProduct,
                    orderId: savedOrder._id 
                } 
            });
        } else {
            console.error("Gagal sinkronisasi ke tabel User");
            // Tetap pindah halaman karena Order utama sudah sukses
            navigate('/orders');
        }

        if (userRes.ok) {
            alert("Pembayaran Berhasil Diproses!");
            navigate('/orders', { 
                state: { 
                    selectedProduct: selectedProduct,
                    orderId: savedOrder._id 
                } 
            });
        } else {
            alert("Gagal memproses order: " + savedOrder.message);
        }

    } catch (error) {
        console.error("Error Transaction:", error);
        alert("Terjadi kesalahan: " + error.message);
    }
};
  return (
    <div>
      <section className='PaymentSection'>
        <div className="box"></div>
        <div className="PaymentContainer">
          <div style={{ alignSelf: "flex-start", color : "#A95C4C" }}>
            <h1>Pembayaran</h1> 
          </div>
          <div className="MainBoxPayment" style={{ color : "#404C4C" }}>
            <div className="LeftMainBox">
              <p style={{ paddingLeft: "2rem", alignSelf: "flex-start" , fontSize : "20px" }}>Order Summary</p>
              <div className="PaymentProduct">
                <div className="PaymentProductPicture" style={{ display : "flex", justifyContent : "center", alignItems : "flex-start" }}>
                  <img src={`http://localhost:5000${selectedProduct?.image}`} alt="Product" style={{ width : "70%" , height : "70%" }} />  
                </div>
                <div className="PaymentProductInfo" >
                  <div className="PaymentProductName" style={{ fontSize : "20px" , height : "20%"}}>
                    {selectedProduct?.title || "FAILED TO LOAD"}
                  </div>
                  <div className="PaymentProductDetails" style={{ fontSize : "12px" , height : "30%"}}>
                    {selectedProduct?.description || "No description available"}
                  </div>
                  <div className="PaymentPriceBox" style={{ fontSize : "16px" , height : "20%"}}>
                    <div className="PaymentQuantity">x 1</div>
                    <div className="PaymentPrice" style={{ color : "#A95C4C" }}>
                      {formatRupiah(productPrice)}
                    </div>
                  </div>
                  <div className="PaymentNotes" style={{ fontSize : "12px" , height : "30%"}}>
                    Notes : <br />
                    {addressData?.Note || "No notes available"}
                  </div>
                </div>
              </div>
              
              <div className="PaymentSummary" style={{ fontSize : "16px" }}>
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">Subtotal Produk</div>
                    <div className="PaymentSummaryRight">{formatRupiah(productPrice)}</div>
                  </div>
                  
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">Subtotal Pengiriman</div>
                    <div className="PaymentSummaryRight">{formatRupiah(shippingFee)}</div>
                  </div>
                  
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">Biaya Layanan</div>
                    <div className="PaymentSummaryRight">{formatRupiah(adminFeeAmount)}</div>
                  </div>
                  
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">Total Diskon</div>
                    <div className="PaymentSummaryRight" style={{ color: "red" }}>
                      - {formatRupiah(calculatedDiscount)}
                    </div>
                  </div>
                  
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">Total Pesanan</div>
                    <div className="PaymentSummaryRight" style={{ color : "#A95C4C", fontWeight: "bold" }}>
                      {formatRupiah(totalOrder)}
                    </div>
                  </div>
                  
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">Metode Pembayaran</div>
                    <div className="PaymentSummaryRight">QRIS</div>
                  </div>
              </div>
            </div>
            
            <div className="RightMainBox" style={{ display : "flex", alignItems : "center", justifyContent : "center" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" style={{ width : "70%" , height : "70%" }} />  
            </div>
          </div>
          <div className="btnContainer" style={{display: 'flex', alignSelf : 'flex-end'}}>
              <button className="btnConfirm" onClick={handleCardSelect}>Detail Order</button>
          </div>
        </div>
        <div className="box"></div>
      </section>
    </div>
  )
}

export default function Payment() {
  const selectedProduct = window.history.state?.usr?.selectedProduct;
  const addressData = window.history.state?.usr?.addressData;

  const [adminFee, setAdminFee] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const hasFetched = useRef(false);

  const fetchData = async () => {
    try {
      // Fetch Admin Fee
      const resFee = await fetch("http://localhost:5000/api/adminfees/");
      const dataFee = await resFee.json();
      setAdminFee(dataFee.reverse().slice(0, 1));

      // Fetch Discount
      const resDisc = await fetch("http://localhost:5000/api/discounts/");
      const dataDisc = await resDisc.json();
      setDiscountData(dataDisc.reverse().slice(0, 1));
    } catch (error) { 
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchData();
      hasFetched.current = true;
    }
  }, []);

  return (
    <div>
      <MainSection 
        selectedProduct={selectedProduct} 
        addressData={addressData} 
        adminFee={adminFee} 
        discountData={discountData} 
      />
    </div>
  );
}