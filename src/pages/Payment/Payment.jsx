import './Payment.css'

function MainSection() {
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
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYdl9D7GqCwpEjac1YhmFDrZkH9afKgMDLdQ&s" alt="Product" style={{ width : "70%" , height : "70%" }} />  
                </div>
                <div className="PaymentProductInfo" >
                  <div className="PaymentProductName" style={{ fontSize : "20px" , height : "20%"}}>
                    Tes Buket
                  </div>
                  <div className="PaymentProductDetails" style={{ fontSize : "12px" , height : "30%"}}>
                    Lorem ipsum dolor sit amet. <br />
                    Lorem ipsum dolor sit amet. <br />
                    Lorem ipsum dolor sit amet. <br />
                  </div>
                  <div className="PaymentPriceBox" style={{ fontSize : "16px" , height : "20%"}}>
                    <div className="PaymentQuantity">
                      x 1
                    </div>
                    <div className="PaymentPrice" style={{ color : "#A95C4C" }}>
                      Rp 250.000
                    </div>
                  </div>
                  <div className="PaymentNotes" style={{ fontSize : "12px" , height : "30%"}}>
                    Notes : <br />
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, magni?
                  </div>
                </div>
              </div>
              <div className="PaymentSummary" style={{ fontSize : "16px" }}>
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">
                      Subtotal Produk 
                    </div>
                    <div className="PaymentSummaryRight">
                      Rp. 250.000
                    </div>
                  </div>
                  <div className=" PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">
                      Subtotal Pengiriman 
                    </div>
                    <div className="PaymentSummaryRight">
                      Rp. 10.000
                    </div>
                  </div>
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">
                      Biaya Layanan
                    </div>
                    <div className="PaymentSummaryRight">
                      Rp. 5.000 
                    </div>
                  </div>
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">
                      Total Diskon
                    </div>
                    <div className="PaymentSummaryRight">
                      Rp. 3.000                      
                    </div>
                  </div>
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">
                      Total Pesanan
                    </div>
                    <div className="PaymentSummaryRight" style={{ color : "#A95C4C" }}>
                      Rp. 262.000
                    </div>
                  </div>
                  <div className="PaymentSummaryItem">
                    <div className="PaymentSummaryLeft">
                      Metode Pembayaran
                    </div>
                    <div className="PaymentSummaryRight">
                      Transfer Bank
                    </div>
                  </div>
              </div>
            </div>
            <div className="RightMainBox" style={{ display : "flex", alignItems : "center", justifyContent : "center" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="Product" style={{ width : "70%" , height : "70%" }} />  
            </div>
          </div>
            <div className="btnContainer" style={{display: 'flex', alignSelf : 'flex-end'}}>
                  <button className="btnConfirm" >Detail Order</button>
            </div>
        </div>
        <div className="box"></div>
      </section>
    </div>
  )
}

export default function Payment() {
  return (
    <div>
      <MainSection />
    </div>
  );
}