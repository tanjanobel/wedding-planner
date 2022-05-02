import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";
import sprite from "../icons/wedding-planner-sprite.svg";
import React from "react";

const PageNotFound = () => {

  return (
    <>
      <SubHeader title="Diese Seite existiert leider nicht"/>
      <Section>
        <div className="text-center">
          <svg className="icon xlarge padding-bottom-2">
            <use href={sprite + "#search"}/>
          </svg>
          <p>Bitte wähle andere Inhalte über die Hauptnavigation oder wechsle zur Startseite.</p>
          <Link to="/" className="button clear black">
            <svg className="icon medium">
              <use href={sprite + "#right-arrow"}/>
            </svg>
            <span>Zurück zur Startseite</span>
          </Link>
        </div>
      </Section>
    </>
  )
}

export default PageNotFound;
