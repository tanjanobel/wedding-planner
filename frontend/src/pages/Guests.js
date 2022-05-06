import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../utils/useAxios";
import sprite from "../icons/wedding-planner-sprite.svg";
import Guest from "../components/guests/Guest";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";
import Flashmessage from "../components/Flashmessage";

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [guestsPending, setGuestsPending] = useState([]);
  const [guestsConfirmed, setGuestsConfirmed] = useState([]);
  const [guestsCancelled, setGuestsCancelled] = useState([]);

  const { state } = useLocation();

  const api = useAxios();

  let performedAction = "";
  let isError = "";
  let name = "GUEST_NAME";

  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
    name = state.name;
  }

  useEffect(() => {
    getGuests();
  }, []);

  useEffect(() => {
    setGuestsPending(guests.filter((guest) => guest.status === "Ausstehend"));
    setGuestsConfirmed(guests.filter((guest) => guest.status === "Zusage"));
    setGuestsCancelled(guests.filter((guest) => guest.status === "Absage"));
  }, [guests]);

  const getGuests = () => {
    api
      .get("/guests")
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
              <p className="card__summary">{guestsPending.length}</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-4">
            <div className="card__body text-center">
              <h3 className="card__heading">Zusagen</h3>
              <p className="card__summary">{guestsConfirmed.length}</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-4">
            <div className="card__body text-center">
              <h3 className="card__heading">Absagen</h3>
              <p className="card__summary">{guestsCancelled.length}</p>
            </div>
          </div>
        </div>
        {performedAction && (
          <Flashmessage
            className="success"
            icon="#done"
            performedAction={performedAction}
            title={name}
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

        {guests.length === 0 && (
          <div className="text-center">
            <svg className="icon xlarge padding-bottom-2">
              <use href={sprite + "#file"} />
            </svg>
            <h3>Keine Einträge vorhanden.</h3>
            <p>Füge jetzt deinen ersten Gast hinzu.</p>
          </div>
        )}

        {/* Guests pending */}
        {guestsPending &&
          guestsPending.map((guest) => (
            <Guest
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

        {/* Guests confirmed */}
        {guestsConfirmed &&
          guestsConfirmed.map((guest) => (
            <Guest
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

        {/* Guests cancelled */}
        {guestsCancelled &&
          guestsCancelled.map((guest) => (
            <Guest
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
