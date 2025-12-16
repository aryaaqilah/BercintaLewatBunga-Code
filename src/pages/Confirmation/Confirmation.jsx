import './Confirmation.css'

function MainSection() {
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
                  <h1>TES BUKET</h1>
                </div>
                <div className="DetailBox">
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, temporibus! <br />
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, ut. <br />
                  Lorem ipsum dolor sit amet. <br />
                  Lorem, ipsum dolor.</p>
                </div>
                <div className="SummaryBox">
                  <div className="QuantityBox">
                    <h2>x 1</h2>
                  </div>
                  <div className="PriceBox">
                    <h2>Rp 250.000</h2>
                  </div>
                </div>
                <div className="NotesBox">
                  Notes :
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, magni?</p>
                </div>
                <div className="btnContainer" style={{display: 'flex', justifyContent: 'center'}}>
                  <button className="btnConfirm" >Konfirmasi</button>
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
  return (
    <div>
      <MainSection />
    </div>
  );
}