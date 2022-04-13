import heroImage from "../images/hero.jpg";
import Section from "../components/Section";

const Dashboard = () => {
  return (
    <>
      <section className="section bg-white">
        <div className="hero">
          <div className="hero__content">
            <h2>Plane <span>deine Hochzeit</span> online</h2>
            <p>
              Mit unserem digitalen Hochzeitsplaner planst du deinen grossen Tag ganz einfach und ohne grossen Aufwand.<br/>
              Erstelle eine Liste mit den zu erledigenden Aufgaben, erfasse alle Gäste und habe dein Budget stets in
              Auge.
            </p>
            <div className="hero__footer">
              <button className="button primary large">
                Jetzt loslegen
              </button>
            </div>
          </div>
          <div className="hero__image" style={{backgroundImage: `url(${heroImage})`}}>
            <img src={heroImage} alt={heroImage.title}/>
          </div>
        </div>
      </section>
      <Section>
      </Section>
    </>
  )
}

export default Dashboard;
