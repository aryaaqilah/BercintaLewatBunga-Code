import AboutImageTop from "../../assets/AboutLandingRight.jpg";
import AboutImageBottom from "../../assets/AboutLandingLeft.jpg";
import PhilosophyImage from "../../assets/AboutPhilosophy.jpg";

function AboutLanding() {
  return (
    <div className="AboutLandingContainer">
      <section className="AboutLandingSection">
        <div>
          <h1 className="txt-color-bg-light AboutLandingContentTitle">
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
              ullam bibendum eget turpis nec rhoncus. Integer in sapien neque.
              Phasellus egestas pellentesque ligula tempor vulputate. Sed in
              bibendum quam. Nullam dignissim dui sed metus tincidunt, id
              consectetur nunc elementum. Vestibulum non vehicula nunc. Proin
              gravida tellus sed ipsum euismod, id sollicitudin neque efficitur.
              Maecenas commodo augue ut enim sollicitudin auctor. Donec felis
              neque, ornare nec pellentesque a, faucibus ac odio. Curabitur
              porttitor ipsum et scelerisque laoreet. Suspendisse sit amet
              egestas turpis, ac ornare sem. Maecenas sed diam imperdiet, porta
              nulla in, dictum.
            </p>
          </div>
        </div>
        <div className="AboutPhilosophyImageBottom">
          <img
            src={PhilosophyImage}
            alt="Hands holding a bouquet of flowers"
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
      <p>
        ullam bibendum eget turpis nec rhoncus. Integer in sapien neque.
        Phasellus egestas pellentesque ligula tempor vulputate. Sed in bibendum
        quam. Nullam dignissim dui sed metus tincidunt, id consectetur nunc
        elementum. Vestibulum non vehicula nunc. Proin gravida tellus sed ipsum
        euismod, id sollicitudin neque efficitur. Maecenas commodo augue ut enim
        sollicitudin auctor. Donec felis neque, ornare nec pellentesque a,
        faucibus ac odio. Curabitur porttitor ipsum et scelerisque laoreet.
        Suspendisse sit amet egestas turpis, ac ornare sem. Maecenas sed diam
        imperdiet, porta nulla in, dictum.
      </p>
      <div className="AboutVideoWrapper">
        <video controls className="AboutOurStoryVideo">
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
