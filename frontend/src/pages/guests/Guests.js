import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../../api/useAxios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import Guest from "../../components/guests/Guest";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import Flashmessage from "../../components/Flashmessage";
import { getGuests } from "../../api/Guests";
import { Card } from "../../components/Card";

const Guests = () => {
  const api = useAxios();

  const [guests, setGuests] = useState([]);
  const [guestsPending, setGuestsPending] = useState([]);
  const [guestsConfirmed, setGuestsConfirmed] = useState([]);
  const [guestsCancelled, setGuestsCancelled] = useState([]);

  const { state } = useLocation();

  let performedAction = "";
  let isError = "";
  let name = "GUEST_NAME";

  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
    name = state.name;
  }

  useEffect(() => {
    getGuests(api)
      .then((response) => {
        const data = response.data;
        setGuests(data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGuestsPending(guests.filter((guest) => guest.status === "Ausstehend"));
    setGuestsConfirmed(guests.filter((guest) => guest.status === "Zusage"));
    setGuestsCancelled(guests.filter((guest) => guest.status === "Absage"));
  }, [guests]);

  return (
    <>
      <SubHeader title="Meine Gästeliste" />
      <Section>
        <div className="summary grid-x grid-margin-x padding-bottom-2">
          <Card topLabel="Ausstehend" data={guestsPending.length} />
          <Card topLabel="Zusagen" data={guestsConfirmed.length} />
          <Card topLabel="Absagen" data={guestsCancelled.length} />
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
