import "./About.css";
import AboutImageTop from "../../assets/AboutLandingRight.jpg";
import AboutImageBottom from "../../assets/AboutLandingLeft.jpg";
import PhilosophyImage from '../../assets/AboutPhilosophy.jpg';

function AboutLanding() {
  return (
    <div className="landing-container">
      <section className="landing-section">
        <div>
          <h1 className="txt-color-bg-light landing-content-title">
            TENTANG <br />
            <span className="txt-color-primary">KITA.</span>
          </h1>
          <hr className="landing-divider" />
        </div>

        <div className="landing-content-top">
          <img
            src={AboutImageTop}
            alt="Bouquets of flowers"
            className="landing-image-top"
          />
        </div>

        <div className="landing-content-bottom">
          <img
            src={AboutImageBottom}
            alt="White roses on a book"
            className="landing-image-bottom"
          />
          <p className="p1 txt-color-bg-dark">
            ullam bibendum eget turpis nec rhoncus. Integer in sapien neque.
            Phasellus egestas pellentesque ligula tempor vulputate. Sed in
            bibendum quam. Nullam dignissim dui sed metus tincidunt, id
            consectetur nunc elementum. Vestibulum non vehicula nunc. Proin
            gravida tellus sed ipsum euismod, id sollicitudin neque efficitur.
            Maecenas commodo augue ut enim sollicitudin auctor. Donec felis
            neque, ornare nec pellentesque a, faucibus ac odio. Curabitur
            porttitor ipsum et scelerisque laoreet. Suspendisse sit amet egestas
            turpis, ac ornare sem. Maecenas sed diam imperdiet, porta nulla in,
            dictum.
          </p>
        </div>
      </section>
    </div>
  );
}

function AboutPhilosophy() {
  return (
    <div className="philosophy-container">
      <section className="philosophy-section">
        <div className="philosophy-top-content">
          <div className="philosophy-header-text">
            <h1 className="txt-color-bg-dark">
              FILOSOFI <br />
              <span className="txt-color-primary">KITA.</span>
            </h1>
          </div>
          <div className="philosophy-description-wrapper">
            <p className="philosophy-description">
              ullam bibendum eget turpis nec rhoncus. Integer in sapien neque. Phasellus egestas pellentesque
              ligula tempor vulputate. Sed in bibendum quam. Nullam dignissim dui sed metus tincidunt, id
              consectetur nunc elementum. Vestibulum non vehicula nunc. Proin gravida tellus sed ipsum euismod,
              id sollicitudin neque efficitur. Maecenas commodo augue ut enim sollicitudin auctor. Donec felis
              neque, ornare nec pellentesque a, faucibus ac odio. Curabitur porttitor ipsum et scelerisque laoreet.
              Suspendisse sit amet egestas turpis, ac ornare sem. Maecenas sed diam imperdiet, porta nulla in,
              dictum.
            </p>
          </div>
        </div>
        <div className="philosophy-image-bottom">
          <img src={PhilosophyImage} alt="Hands holding a bouquet of flowers" className="philosophy-image" />
        </div>
      </section>
    </div>
  );
}

const AboutOurStory = () => {
  return (
    <div className="about-our-story-container">
      <h1 className="txt-color-primary">CERITA KITA.</h1>
      <p>
        ullam bibendum eget turpis nec rhoncus. Integer in sapien neque. Phasellus egestas pellentesque
        ligula tempor vulputate. Sed in bibendum quam. Nullam dignissim dui sed metus tincidunt, id
        consectetur nunc elementum. Vestibulum non vehicula nunc. Proin gravida tellus sed ipsum euismod,
        id sollicitudin neque efficitur. Maecenas commodo augue ut enim sollicitudin auctor. Donec felis
        neque, ornare nec pellentesque a, faucibus ac odio. Curabitur porttitor ipsum et scelerisque laoreet.
        Suspendisse sit amet egestas turpis, ac ornare sem. Maecenas sed diam imperdiet, porta nulla in,
        dictum.
      </p>
      <div className="video-wrapper">
        <video controls className="story-video">
          <source src="your-video-source.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <div>
      <AboutLanding />
      <AboutPhilosophy />
      <AboutOurStory />
    </div>
  );
}
