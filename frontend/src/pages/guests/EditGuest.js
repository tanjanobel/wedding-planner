import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../utils/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";

const EditGuest = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const initialGuestState = {
    status: "",
    firstname: "",
    lastname: "",
    street: "",
    zip: "",
    city: "",
    email: "",
    phone: "",
    description: "",
  };

  const api = useAxios();

  let { id } = useParams();
  const [currentGuest, setCurrentGuest] = useState(initialGuestState);

  const countRef = useRef(0);
  useEffect(() => {
    retrieveGuest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRef]);

  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    setCurrentGuest({ ...currentGuest, [name]: value });
  };

  const retrieveGuest = () => {
    api
      .get(`/guests/${id}`)
      .then((response) => {
        setCurrentGuest({
          status: response.data.status,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          street: response.data.street,
          zip: response.data.zip,
          city: response.data.city,
          email: response.data.email,
          phone: response.data.phone,
          description: response.data.description,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateGuest = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      ...currentGuest,
    };
    api
      .patch(`/guests/${id}`, data)
      .then((response) => {
        setCurrentGuest({
          status: response.data.status,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          street: response.data.street,
          zip: response.data.zip,
          city: response.data.city,
          email: response.data.email,
          phone: response.data.phone,
          description: response.data.description,
        });
        if (response.status === 200) {
          navigate("/guests", {
            state: { performedAction: "edit_guest", name: `${currentGuest.firstname} ${currentGuest.lastname}` },
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
      <SubHeader title="Gast bearbeiten" />
      <Section>
        <form>
          <div className="grid-x grid-margin-x">
            <div className="cell small-12">
              <label htmlFor="status">Status</label>
              <select
                className="form-select"
                name="status"
                id="status"
                value={currentGuest.status}
                onChange={handleGuestChange}
              >
                <option value="Ausstehend">Ausstehend</option>
                <option value="Zusage">Zusage</option>
                <option value="Absage">Absage</option>
              </select>
            </div>
            <div className="cell small-12 tablet-6">
              <label htmlFor="firstname">Vorname (Pflichtfeld)</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={currentGuest.firstname}
                onChange={handleGuestChange}
              />
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
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={currentGuest.lastname}
                onChange={handleGuestChange}
              />
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
              <input type="text" name="street" id="street" value={currentGuest.street} onChange={handleGuestChange} />
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
              <input type="number" name="zip" id="zip" value={currentGuest.zip} onChange={handleGuestChange} />
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
              <input type="text" name="city" id="city" value={currentGuest.city} onChange={handleGuestChange} />
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
              <input type="email" name="email" id="email" value={currentGuest.email} onChange={handleGuestChange} />
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
              <input type="tel" name="phone" id="phone" value={currentGuest.phone} onChange={handleGuestChange} />
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
              <textarea
                name="description"
                cols="40"
                rows="5"
                value={currentGuest.description}
                onChange={handleGuestChange}
              />
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
              <div className="form__footer">
                <div className="button-group">
                  <Link to="/guests" className="button secondary">
                    Abbrechen
                  </Link>
                  <button type="submit" className="button primary" onClick={updateGuest}>
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
export default EditGuest;
