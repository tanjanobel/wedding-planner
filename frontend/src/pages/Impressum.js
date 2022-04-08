import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const Impressum = () => {

  return (
    <>
      <SubHeader title="Impressum"/>
      <Section>
        <p className="font-bold">Kontakt</p>
        <p>
          Tanja Nobel<br/>
          Landenbergweg 23<br/>
          8488 Turbenthal<br/>
          <a href="mailto:tanja@nobel.swiss">tanja@nobel.swiss</a>
        </p>
        <p className="font-bold padding-top-1">Haftungsausschluss</p>
        <p>
          Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität,
          Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden
          materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der
          veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden
          sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor,
          Teile
          der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder
          die
          Veröffentlichung zeitweise oder endgültig einzustellen.
        </p>
        <p className="font-bold padding-top-1">Haftung für Links</p>
        <p>
          Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs Es wird jegliche
          Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf
          eigene
          Gefahr des Nutzers oder der Nutzerin.
        </p>
        <p className="font-bold padding-top-1">Urheberrechte</p>
        <p>
          Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören
          ausschliesslich dem Autor oder den speziell genannten Rechtsinhabern. Für die
          Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
        </p>
      </Section>
    </>
  )
}

export default Impressum;
