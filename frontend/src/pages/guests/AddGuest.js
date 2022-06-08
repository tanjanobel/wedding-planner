import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../api/useAxios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import { saveGuest } from "../../api/Guests";

const AddGuest = () => {
  const api = useAxios();

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

  const handleChange = (e) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    });
  };

  const onSaveClick = (e) => {
    setErrors([]);
    e.preventDefault();

    const guestData = { ...guest };

    saveGuest(api, guestData)
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
          <div className="grid-x grid-margin-x">
            <div className="cell small-12">
              <label htmlFor="status">Status</label>
              <select className="form-select" name="status" id="status" value={guest.status} onChange={handleChange}>
                <option value="Ausstehend">Ausstehend</option>
                <option value="Zusage">Zusage</option>
                <option value="Absage">Absage</option>
              </select>
            </div>
            <div className="cell small-12 tablet-6">
              <label htmlFor="firstname">Vorname (Pflichtfeld)</label>
              <input type="text" name="firstname" id="firstname" value={guest.firstname} onChange={handleChange} />
              {errors["firstname"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12 tablet-6">
              <label htmlFor="lastname">Nachname (Pflichtfeld)</label>
              <input type="text" name="lastname" id="lastname" value={guest.lastname} onChange={handleChange} />
              {errors["lastname"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12">
              <label htmlFor="street">Strasse</label>
              <input type="text" name="street" id="street" value={guest.street} onChange={handleChange} />
              {errors["street"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12 tablet-2">
              <label htmlFor="zip">PLZ</label>
              <input type="number" name="zip" id="zip" value={guest.zip} onChange={handleChange} />
              {errors["zip"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12 tablet-10">
              <label htmlFor="city">Ort</label>
              <input type="text" name="city" id="city" value={guest.city} onChange={handleChange} />
              {errors["city"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12">
              <label htmlFor="email">E-Mail Adresse</label>
              <input type="email" name="email" id="email" value={guest.email} onChange={handleChange} />
              {errors["email"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12">
              <label htmlFor="phone">Telefonnummer</label>
              <input type="tel" name="phone" id="phone" value={guest.phone} onChange={handleChange} />
              {errors["phone"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12">
              <label htmlFor="description">Notiz</label>
              <textarea name="description" cols="40" rows="5" value={guest.description} onChange={handleChange} />
              {errors["description"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12">
              <div className="form__footer text-right">
                <div className="button-group">
                  <Link to="/guests" className="button secondary">
                    Abbrechen
                  </Link>
                  <button type="submit" className="button primary" onClick={onSaveClick}>
                    Speichern
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Section>
    </>
  );
};

export default AddGuest;
