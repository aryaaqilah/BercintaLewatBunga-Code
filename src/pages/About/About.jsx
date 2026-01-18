import React from "react";
import AboutImageTop from "../../assets/AboutLandingRight.jpg";
import AboutImageBottom from "../../assets/AboutLandingLeft.jpg";
import PhilosophyImage from "../../assets/AboutPhilosophy.jpg";

function AboutLanding() {
  return (
    <div className="AboutLandingContainer">
      <section className="AboutLandingSection">
        <div className="AboutLandingTitleWrapper">
          <h1 className="txt-color-bg-dark AboutLandingContentTitle">
            TENTANG <br />
            <span className="txt-color-primary">KITA.</span>
          </h1>
          <hr className="AboutLandingDivider" />
        </div>

        <div className="AboutLandingContentTop">
          <img
            src={AboutImageTop}
            alt="Bouquets of flowers"
            className="AboutLandingImageTop"
          />
        </div>

        <div className="AboutLandingContentBottom">
          <img
            src={AboutImageBottom}
            alt="White roses on a book"
            className="AboutLandingImageBottom"
          />
          <p className="p1 txt-color-bg-dark AboutLandingDescription">
            Kami percaya bahwa setiap perasaan yang tulus berhak menemukan bentuk indahnya melalui kelopak bunga yang kami kurasi dengan sepenuh hati. 
            Di sini, kami tidak hanya merangkai bunga, melainkan merajut kembali kepingan memori agar tetap abadi dan mekar dalam dekapan waktu. 
            Setiap tangkai yang kami pilih adalah sebuah narasi tentang janji, tawa, dan kasih sayang yang Anda bagikan bersama mereka yang paling berharga. 
            Mari abadikan setiap babak perjalanan Anda dalam sebuah karya seni yang tidak hanya memanjakan mata, namun juga menyentuh jiwa dengan keharuman yang takkan pernah layu dari ingatan.
          </p>
        </div>
      </section>
    </div>
  );
}

function AboutPhilosophy() {
  return (
    <div className="AboutPhilosophyContainer">
      <section className="AboutPhilosophySection">
        <div className="AboutPhilosophyTopContent">
          <div className="AboutPhilosophyHeaderText">
            <h1 className="txt-color-bg-dark">
              FILOSOFI <br />
              <span className="txt-color-primary">KITA.</span>
            </h1>
          </div>
          <div className="AboutPhilosophyDescriptionWrapper">
            <p className="AboutPhilosophyDescription">
              Keindahan bagi kami adalah perayaan atas waktu yang berhenti dalam tiap kelopak yang mekar sempurna. 
              Kami percaya bahwa bunga adalah bahasa jiwa, sebuah jembatan sunyi yang menghubungkan ketulusan hati dengan kenangan yang takkan pernah layu. 
              Di setiap tangkainya, kami merangkai napas alam dan doa-doa baik agar setiap kisah yang Anda titipkan menjadi abadi dalam keharuman yang paling murni.
            </p>
          </div>
        </div>
        <div className="AboutPhilosophyImageBottom">
          <img
            src={PhilosophyImage}
            alt="Hands holding flowers"
            className="AboutPhilosophyImage"
          />
        </div>
      </section>
    </div>
  );
}

const AboutOurStory = () => {
  return (
    <div className="AboutOurStoryContainer">
      <h1 className="txt-color-primary">CERITA KITA.</h1>
      <p className="txt-color-bg-dark">
        Menenun setiap detik berharga menjadi rangkaian bunga yang membisikkan janji, 
        merawat memori agar selamanya mekar dalam keabadian.
      </p>
      <div className="AboutVideoWrapper">
        <video 
          controls 
          playsInline 
          muted 
          preload="metadata" 
          className="AboutOurStoryVideo"
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <div className="AboutPageWrapper">
      <AboutLanding />
      <AboutPhilosophy />
      <AboutOurStory />
    </div>
  );
}