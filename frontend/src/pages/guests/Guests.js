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
import Filter from "../../components/Filter";
import FilterItem from "../../components/FilterItem";

const Guests = () => {
  const api = useAxios();

  const [guests, setGuests] = useState([]);
  const [guestsPending, setGuestsPending] = useState([]);
  const [guestsConfirmed, setGuestsConfirmed] = useState([]);
  const [guestsCancelled, setGuestsCancelled] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [active, setActive] = useState("all");

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

  const handleFilterClick = (e) => {
    e.preventDefault();
    setStatusFilter(e.target.value);
    setActive(e.target.id);
  };

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

        <div className="action-bar grid-x">
          <Filter>
            <FilterItem
              className={active === "all" ? "active" : undefined}
              id="all"
              value="Alle"
              handleFilterClick={handleFilterClick}
              text="Alle"
            ></FilterItem>
            <FilterItem
              className={active === "pending" ? "active" : undefined}
              id="pending"
              value="Ausstehend"
              handleFilterClick={handleFilterClick}
              text="Ausstehend"
            ></FilterItem>
            <FilterItem
              className={active === "confirmed" ? "active" : undefined}
              id="confirmed"
              value="Zusage"
              handleFilterClick={handleFilterClick}
              text="Zusage"
            ></FilterItem>
            <FilterItem
              className={active === "cancelled" ? "active" : undefined}
              id="cancelled"
              value="Absage"
              handleFilterClick={handleFilterClick}
              text="Absage"
            ></FilterItem>
          </Filter>
          <div className="card__button cell small-12 tablet-shrink text-right">
            <Link to="/guests/add" className="button primary">
              <svg className="icon small">
                <use href={sprite + "#plus"} />
              </svg>
              <span>Gast hinzufügen</span>
            </Link>
          </div>
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
        {["Alle", "Ausstehend"].indexOf(statusFilter) >= 0 &&
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
        {["Alle", "Zusage"].indexOf(statusFilter) >= 0 &&
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
        {["Alle", "Absage"].indexOf(statusFilter) >= 0 &&
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
