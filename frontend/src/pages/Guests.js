import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import Task from "../components/guests/Guest";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";
import Flashmessage from "../components/Flashmessage";

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [guestsAusstehend, setGuestsAusstehend] = useState([]);
  const [guestsZusage, setGuestsZusage] = useState([]);
  const [guestsAbsage, setGuestsAbsage] = useState([]);

  const { state } = useLocation();
  let performedAction = "";
  let isError = "";
  let title = "GUEST_FIRSTNAME";
  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
    title = state.title;
  }

  useEffect(() => {
    getGuests();
  }, []);

  useEffect(() => {
    setGuestsAusstehend(guests.filter((guest) => guest.status === "Ausstehend"));
    setGuestsZusage(guests.filter((guest) => guest.status === "Zusage"));
    setGuestsAbsage(guests.filter((guest) => guest.status === "Absage"));
  }, [guests]);

  const getGuests = () => {
    axios
      .get("/api/guests/")
      .then((response) => {
        const data = response.data;
        setGuests(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SubHeader title="Meine Gästeliste" />
      <Section>
        <div className="summary grid-x grid-margin-x padding-bottom-2">
          <div className="card cell small-12 phablet-4">
            <div className="card__body text-center">
              <h3 className="card__heading">Ausstehend</h3>
              <p className="card__summary">{guestsAusstehend.length}</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-4">
            <div className="card__body text-center">
              <h3 className="card__heading">Zusagen</h3>
              <p className="card__summary">{guestsZusage.length}</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-4">
            <div className="card__body text-center">
              <h3 className="card__heading">Absagen</h3>
              <p className="card__summary">{guestsAbsage.length}</p>
            </div>
          </div>
        </div>
        {performedAction && (
          <Flashmessage
            className="success"
            icon="#done"
            performedAction={performedAction}
            title={title}
            isError={isError}
            duration={3000}
          />
        )}
        <div className="card__button text-right padding-bottom-2">
          <Link to="/guests/add" className="button primary">
            <svg className="icon small">
              <use href={sprite + "#plus"} />
            </svg>
            <span>Gast hinzufügen</span>
          </Link>
        </div>

        {guests.length === 0 &&
          <div className="text-center">
            <svg className="icon xlarge padding-bottom-2">
              <use href={sprite + "#file"} />
            </svg>
            <h3>Keine Einträge vorhanden.</h3>
            <p>Füge jetzt deinen ersten Gast hinzu.</p>
          </div>
        }

        {guests &&
          guests.map((guest) => (
            <Task
              key={guest.id}
              id={guest.id}
              firstname={guest.firstname}
              lastname={guest.lastname}
              status={guest.status}
              street={guest.street}
              zip={guest.zip}
              city={guest.city}
              email={guest.email}
              phone={guest.phone}
              description={guest.description}
            />
          ))}
      </Section>
    </>
  );
};

export default Guests;
