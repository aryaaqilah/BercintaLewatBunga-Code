import './Address.css'

function MainSection() {
  return (
    <div>
      <section className='MainSection'>
        <div className='box'></div>
        <div className='SectionContainer' style={{ justifyContent : "flex-start" }}> 
          <div style={{alignSelf: 'flex-start', color : '#A95C4C'}}>
            <h1>Alamat Pengiriman</h1>
          </div>
          <div className='AddressBox' style={{ height : "80%" }}>
              <div className="FormContainer">
                <div className="LeftContainer insideContainer">
                  <form>
                    <label>Nama Penerima</label><br />
                    <input type="text" name="name" placeholder="Masukkan nama penerima" style={{  borderRadius: "10px", height: "40%" }} /><br />
                  </form>
                   <form>
                    <label>Email Penerima</label><br />
                    <input type="text" name="email" placeholder="Masukkan email penerima" style={{ borderRadius: "10px", height: "40%" }} /><br />
                  </form>
                  <form>
                    <label>Nomor Telepon Penerima</label><br />
                    <input type="text" name="phone" placeholder="Masukkan nomor telepon" style={{ borderRadius: "10px", height: "40%" }}  /><br />
                  </form>
                </div>
                <div className="MidContainer insideContainer">
                  <form>
                    <label>Provinsi</label><br />
                    <input type="text" name="province" placeholder="Masukkan provinsi" style={{ borderRadius: "10px", height: "40%" }} /><br />
                  </form>
                  <form>
                    <label>Kota/Kabupaten</label>
                    <select id="country" name="country">
                      <option value="au">Australia</option>
                      <option value="ca">Canada</option>
                      <option value="usa">USA</option>
                    </select>
                  </form>
                  <form>
                    <label>Kode Pos</label><br />
                    <input type="text" name="postalcode" placeholder="Masukkan kode pos" style={{ borderRadius: "10px", height: "40%" }} /><br />
                  </form>
                </div>
                <div className="RightContainer">
                  <form className='RightForm'>
                    <label>Alamat Lengkap</label><br />
                    <textarea name="address" placeholder="Masukkan alamat lengkap" /><br />
                  </form>
                  <form className='RightForm'>
                    <label>Catatan</label><br />
                    <textarea name="note" placeholder="Masukkan catatan" /><br />
                  </form>
                </div>
              </div>
              <div className="btnContainer" style={{display: 'flex', justifyContent: 'center'}}>
                <button className="btnAddress" >Lanjut ke Pembayaran</button>
              </div>
          </div>
        </div>
        <div className='box'></div>
      </section>
    </div>
  )
}

export default function Address() {
  return (
    <div>
      <MainSection />
    </div>
  );
}