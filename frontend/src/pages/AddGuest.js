import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import sprite from "../icons/wedding-planner-sprite.svg";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const AddGuest = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [guest, setGuest] = useState({
    status: "Ausstehend",
    firstname: "",
    lastname: "",
    street: "",
    zip: "",
    city: "",
    email: "",
    phone: "",
    description: "",
  });

  const api = useAxios();

  const handleChange = (e) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    });
  };

  const addGuest = (e) => {
    setErrors([]);
    e.preventDefault();
    const guestData = {
      status: guest.status,
      firstname: guest.firstname,
      lastname: guest.lastname,
      street: guest.street,
      zip: guest.zip,
      city: guest.city,
      email: guest.email,
      phone: guest.phone,
      description: guest.description,
    };

    api
      .post("/guests", guestData)
      .then((response) => {
        if (response.status === 201) {
          navigate("/guests", {
            state: { performedAction: "add_guest", name: `${guest.firstname} ${guest.lastname}` },
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setErrors(error.response.data);
      });
  };

  return (
    <>
      <SubHeader title="Gast hinzufügen" />
      <Section>
        <form>
          <label>
            Status
            <select className="form-select" name="status" onChange={handleChange}>
              <option>Ausstehend</option>
              <option>Zusage</option>
              <option>Absage</option>
            </select>
          </label>
          <label htmlFor="firstname">
            Vorname (Pflichtfeld)
            <input type="text" name="firstname" value={guest.firstname} onChange={handleChange} />
            {errors["firstname"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label htmlFor="lastname">
            Nachname (Pflichtfeld)
            <input type="text" name="lastname" value={guest.lastname} onChange={handleChange} />
            {errors["lastname"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label htmlFor="lastname">
            Strasse
            <input type="text" name="street" value={guest.street} onChange={handleChange} />
            {errors["street"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label htmlFor="zip">
            PLZ
            <input type="number" name="zip" value={guest.zip} onChange={handleChange} />
            {errors["zip"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label htmlFor="city">
            Ort
            <input type="text" name="city" value={guest.city} onChange={handleChange} />
            {errors["city"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label>
            E-Mail Adresse
            <input type="email" name="email" value={guest.email} onChange={handleChange} />
            {errors["email"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label htmlFor="phone">
            Telefonnummer
            <input type="tel" name="phone" value={guest.phone} onChange={handleChange} />
            {errors["phone"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label>
            Notiz
            <textarea name="description" cols="40" rows="5" value={guest.description} onChange={handleChange} />
            {errors["description"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <div className="form__footer text-right">
            <div className="button-group">
              <Link to="/guests" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={addGuest}>
                Speichern
              </button>
            </div>
          </div>
        </form>
      </Section>
    </>
  );
};

export default AddGuest;
