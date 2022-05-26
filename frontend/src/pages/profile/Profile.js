import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../utils/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import Flashmessage from "../../components/Flashmessage";

const EditUser = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const initialUserState = {
    email: "",
    first_name: "",
    last_name: "",
    wedding_date: "",
    wedding_city: "",
    wedding_budget: 0,
    bride: "",
    groom: "",
    maid_of_honor: "",
    best_man: "",
  };

  const { state } = useLocation();

  const api = useAxios();

  let performedAction = "";
  let isError = "";
  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
  }

  const [currentUser, setCurrentUser] = useState(initialUserState);

  const countRef = useRef(0);
  useEffect(() => {
    retrieveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRef]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const retrieveUser = () => {
    api
      .get(`/user`)
      .then((response) => {
        setCurrentUser({
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          wedding_date: response.data.wedding_date,
          wedding_city: response.data.wedding_city,
          wedding_budget: response.data.wedding_budget,
          bride: response.data.bride,
          groom: response.data.groom,
          maid_of_honor: response.data.maid_of_honor,
          best_man: response.data.best_man,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateUser = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      ...currentUser,
    };
    api
      .patch(`/user`, data)
      .then((response) => {
        if (response.status === 200) {
          navigate("/profile", {
            state: {
              performedAction: "edit_user",
              name: `${currentUser.firstname} ${currentUser.lastname}`,
              isError: false,
            },
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
      <SubHeader title="Benutzerprofil bearbeiten" />
      <Section>
        <h3 className="padding-bottom-2">Persönliche Daten</h3>

        {performedAction && (
          <Flashmessage
            className="success"
            icon="#done"
            performedAction={performedAction}
            isError={isError}
            duration={5000}
          />
        )}

        <form>
          <div className="grid-x grid-margin-x">
            <div className="cell small-12 tablet-6">
              <label htmlFor="first_name">Vorname (Pflichtfeld)</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={currentUser.first_name}
                onChange={handleUserChange}
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
              <label htmlFor="last_name">Nachname (Pflichtfeld)</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={currentUser.last_name}
                onChange={handleUserChange}
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
            <div className="cell small-12 tablet-6">
              <label htmlFor="wedding_date">Hochzeitsdatum</label>
              <input
                type="date"
                name="wedding_date"
                id="wedding_date"
                value={currentUser.wedding_date}
                onChange={handleUserChange}
              />
              {errors["wedding_date"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12 tablet-6">
              <label htmlFor="wedding_city">Hochzeitsort</label>
              <input
                type="text"
                name="wedding_city"
                id="wedding_city"
                value={currentUser.wedding_city}
                onChange={handleUserChange}
              />
              {errors["wedding_city"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12">
              <label htmlFor="wedding_budget">Hochzeitsbudget</label>
              <div className="input-group">
                <input
                  className="input-group-field"
                  type="number"
                  name="wedding_budget"
                  id="wedding_budget"
                  value={currentUser.wedding_budget}
                  onChange={handleUserChange}
                />
                <div className="input-group-icon">
                  <span>CHF</span>
                </div>
              </div>
              {errors["wedding_budget"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12 tablet-6">
              <label htmlFor="bride">Braut</label>
              <input
                type="text"
                name="bride"
                id="bride"
                value={currentUser.bride}
                onChange={handleUserChange}
              />
              {errors["bride"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12 tablet-6">
              <label htmlFor="groom">Bräutigam</label>
              <input
                type="text"
                name="groom"
                id="groom"
                value={currentUser.groom}
                onChange={handleUserChange}
              />
              {errors["groom"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12 tablet-6">
              <label htmlFor="maid_of_honor">Trauzeugin</label>
              <input
                type="text"
                name="maid_of_honor"
                id="maid_of_honor"
                value={currentUser.maid_of_honor}
                onChange={handleUserChange}
              />
              {errors["maid_of_honor"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
            <div className="cell small-12 tablet-6">
              <label htmlFor="best_man">Trauzeuge</label>
              <input
                type="text"
                name="best_man"
                id="best_man"
                value={currentUser.best_man}
                onChange={handleUserChange}
              />
              {errors["best_man"]?.map((error) => (
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
                  <button type="submit" className="button primary" onClick={updateUser}>
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
export default EditUser;
