import './Home.css'
import HeroPicture from '../../assets/Landing.jpg'

function HeroSection() {
  return (
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
  )
}

export default function Home() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
