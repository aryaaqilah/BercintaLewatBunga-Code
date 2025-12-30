import React from "react";
import HeroPicture from "../../assets/Landing.jpg";
import OurStoryImage from "../../assets/OurStory.jpg";
import CustomizeYourOwnImage from "../../assets/CustomizeYourOwn.jpg";

function HeroSection() {
  return (
    <section className="HeroSection">
      <img src={HeroPicture} alt="Hero Landing" className="HeroPicture" />
      <div className="HeroOverlay">
        <p className="p1 txt-color-white">mengukir kisah melalui bunga</p>
        <h1 className="txt-color-ternary">
          Preserve your <span className="txt-color-primary">love</span> journey
          with <br /> <span className="txt-color-primary">our bouquet</span>, safely
          living in it
        </h1>
        <p className="txt-color-bg-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec<br />
          fringilla odio mauris, sed blandit est viverra quis. Nulla facilisi.<br />
          Vestibulum non ligula massa.<br />
        </p>
      </div>
    </section>
  );
}

function OurStorySection() {
  return (
    <div className="OurStorySectionContainer">
      <section className="OurStorySection">
        <div className="OurStoryImageLeft">
          <img src={OurStoryImage} alt="Bouquet" className="OurStoryPicture" />
        </div>
        <div className="OurStoryContent">
          <h2 className="txt-color-ternary weight-semibold">
            “Cerita Tentang Kita”
          </h2>
          <p className="txt-color-bg-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fringilla odio mauris, sed blandit est viverra quis. Nulla facilisi.
            Vestibulum non ligula massa. Praesent vehicula metus velit, a
            fringilla dui interdum et.
          </p>
          <button className="button-ternary h3">
            <a href="/about" className="h3 txt-color-white txt-decoration-none">
              Tentang Kita
            </a>
          </button>
        </div>
        <div className="OurStoryImageRight">
          <img src={OurStoryImage} alt="Bouquet" className="OurStoryPicture" />
        </div>
      </section>
    </div>
  );
}

function CustomizeYourOwnSection() {
  return (
    <div className="CustomizeYourOwnSectionContainer">
      <section className="CustomizeYourOwnSection">
        <div className="CustomizeImageWrapper">
          <img
            src={CustomizeYourOwnImage}
            alt="Hand holding daisies"
            className="CustomizeImage"
          />
        </div>
        <div className="CustomizeContent">
          <h2 className="txt-color-ternary weight-semibold">
            Sampaikan kasih sayangmu
          </h2>
          <p className="txt-color-bg-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fringilla odio mauris, sed blandit est viverra quis. Nulla facilisi.
            Vestibulum non ligula massa.
          </p>
          <button className="button-primary-fill h3">
            <a href="/about" className="h3 txt-color-white txt-decoration-none">
              Kreasikan Buket
            </a>
          </button>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <div className="HomeContainer">
      <HeroSection />
      <OurStorySection />
      <CustomizeYourOwnSection />
    </div>
  );
}