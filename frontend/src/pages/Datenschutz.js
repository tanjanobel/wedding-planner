import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const Datenschutz = () => {

  return (
    <>
      <SubHeader title="Datenschutz"/>
      <Section>
        <p>
          Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des
          Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor
          Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen ein. Persönliche Daten werden streng
          vertraulich behandelt und weder an Dritte verkauft noch weiter gegeben.
          In enger Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut wie möglich vor
          fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung zu schützen.
          Beim Zugriff auf unsere Webseiten werden folgende Daten in Logfiles gespeichert: IP-Adresse, Datum, Uhrzeit,
          Browser-Anfrage und allg. übertragene Informationen zum Betriebssystem resp. Browser. Diese Nutzungsdaten
          bilden die Basis für statistische, anonyme Auswertungen, so dass Trends erkennbar sind, anhand derer wir
          unsere
          Angebote entsprechend verbessern können.
        </p>
      </Section>
    </>
  )
}

export default Datenschutz;
