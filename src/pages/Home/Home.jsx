import './Home.css'
import HeroPicture from '../../assets/Landing.jpg'
import OurStoryImage from '../../assets/OurStory.jpg'
import CustomizeYourOwnImage from '../../assets/CustomizeYourOwn.jpg' // Assuming this is the image you want to use for the OurStory section

function HeroSection() {
  return (
    <div>
      <section className='HeroSection'>
        <img src={HeroPicture} alt="" className='HeroPicture' />
        <div className='HeroOverlay'>
          <p className='p1 txt-color-white'>mengukir kisah melalui bunga</p>
          <h1 className='txt-color-ternary weight-semibold'>
            Preserve your <span className='txt-color-primary'>love</span> journey with 
            <br />
            <span className='txt-color-primary'>our bouquet</span>, safely living in it
          </h1>
          <p className='txt-color-bg-dark'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla
            <br />
            odio mauris, sed blandit est viverra quis. Nulla facilisi. Vestibulum non
            <br />
            ligula massa. Praesent vehicula metus velit, a fringilla dui interdum et.
          </p>
        </div>
      </section>
    </div>
  )
}

function OurStorySection() {
  return (
    <div className='OurStorySectionContainer'>
      <section className='OurStorySection'>
        <div className='OurStoryImageLeft'>
          <img src={OurStoryImage} alt="Bouquet of flowers" className='OurStoryPicture' />
        </div>
        <div className='OurStoryContent'>
          <h2 className='txt-color-ternary weight-semibold'>“Cerita Tentang Kita”</h2>
          <p className='txt-color-bg-dark'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla
            odio mauris, sed blandit est viverra quis. Nulla facilisi. Vestibulum non
            ligula massa. Praesent vehicula metus velit, a fringilla dui interdum et. Non
            elementum turpis non auctor mollis. Etiam ac quam augue. Aliquam
            lobortis blandit eros vel feugiat. Maecenas id.
          </p>
          <button className='button-ternary h3'>Tentang Kita</button>
        </div>
        <div className='OurStoryImageRight'>
          <img src={OurStoryImage} alt="Bouquet of flowers" className='OurStoryPicture' />
        </div>
      </section>
    </div>
  )
}

function CustomizeYourOwnSection() {
  return (
    <div className='CustomizeYourOwnSectionContainer'>
      <section className='CustomizeYourOwnSection'>
        <div className='CustomizeImageWrapper'>
          <img 
            src={CustomizeYourOwnImage} 
            alt="Hand holding daisies against blue sky" 
            className='CustomizeImage' 
          />
        </div>
        <div className='CustomizeContent'>
          <h2 className='txt-color-ternary weight-semibold'>Sampaikan kasih sayangmu</h2>
          <p className='txt-color-bg-dark'>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Donec fringilla odio mauris, sed blandit est
            viverra quis. Nulla facilisi. Vestibulum non ligula
            massa. Praesent vehicula metus velit, a fringilla dui
            interdum et. Nam elementum turpis non auctor
            mollis. Etiam ac quam augue. Aliquam lobortis
            blandit eros vel feugiat. Maecenas id.
          </p>
          <button className='button-primary h3'>Kreasikan Buket</button>
        </div>
      </section>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <OurStorySection />
      <CustomizeYourOwnSection />
    </div>
  );
}