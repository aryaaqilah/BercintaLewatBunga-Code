import { div } from "three/tsl";
import CardSet from "../../components/Card/CardSet";
import "./Shop.css";

function LandingSection() {
  return (
    <section className="ShopLandingSection">
      <div className="ShopLandingDescription">
        <h1 className="txt-color-primary">Ukir Kisah Cintamu</h1>
        <h3 className="txt-color-ternary">Yang terbaik untuk yang terkasih</h3>
      </div>
      <CardSet />
    </section>
  );
}

function MostPopularSection() {
  return <section></section>;
}

export default function Home() {
  return (
    <div>
      <LandingSection />
      <MostPopularSection />
    </div>
  );
}
