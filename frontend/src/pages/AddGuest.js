import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
    description: ""
  });

  const handleChange = (e) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
      description: guest.description
    };

    axios
      .post("/api/guests/", guestData)
      .then((response) => {
        if (response.status.toString().startsWith("4")) {
          console.error(response.data);
          navigate("/guests", { state: { performedAction: "err_add_guest", title: guest.title, isError: true } });
        }
        if (response.status === 201) {
          navigate("/guests", { state: { performedAction: "add_guest", title: guest.title } });
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/guests", { state: { performedAction: "err_add_guest", title: guest.title, isError: true } });
      });
  };

  return (
    <>
      <SubHeader title="Gast hinzufügen" />
      <Section>
        <form onSubmit={handleSubmit}>
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
          <label htmlFor="email">
            E-Mail Adresse
            <input type="email" name="email" value={guest.email} onChange={handleChange} />
            {errors["lastname"]?.map((error) => (
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
              <button type="submit" className="button primary">
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
