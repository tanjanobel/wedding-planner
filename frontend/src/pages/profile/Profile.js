import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../api/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import Flashmessage from "../../components/Flashmessage";

import { getUser, updateUser } from "../../api/User";

const EditUser = () => {
  const api = useAxios();

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const initialUserState = {
    email: "",
    first_name: "",
    last_name: "",
    cover_image: "",
    wedding_date: "",
    wedding_city: "",
    wedding_budget: 0,
    bride: "",
    groom: "",
    maid_of_honor: "",
    best_man: "",
  };

  const { state } = useLocation();

  let performedAction = "";
  let isError = "";
  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
  }

  const [currentUser, setCurrentUser] = useState(initialUserState);

  const countRef = useRef(0);
  useEffect(() => {
    getUser(api)
      .then((response) => {
        const userData = response.data;
        setCurrentUser({ ...userData });
      })
      .catch((e) => {
        console.error(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRef]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleImageChange = (file) => {
    getBase64(file).then((base64String) => {
      setCurrentUser({ ...currentUser, cover_image: base64String });
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        // Return base64 String
        resolve(baseURL);
      };
    });
  };

  const onUpdateClick = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      ...currentUser,
    };

    updateUser(api, data)
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
          </div>
          <label htmlFor="cover_image">Titelbild</label>
          <input
            type="file"
            name="cover_image"
            id="cover_image"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
          {errors["cover_image"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          {currentUser.cover_image && (
            <img
              className="margin-bottom-1"
              width="150"
              style={{ height: 150, objectFit: "cover" }}
              src={currentUser.cover_image}
              alt="Titelbild"
            ></img>
          )}
          <div className="grid-x grid-margin-x">
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
          </div>
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
          <div className="grid-x grid-margin-x">
            <div className="cell small-12 tablet-6">
              <label htmlFor="bride">Braut</label>
              <input type="text" name="bride" id="bride" value={currentUser.bride} onChange={handleUserChange} />
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
              <input type="text" name="groom" id="groom" value={currentUser.groom} onChange={handleUserChange} />
              {errors["groom"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid-x grid-margin-x">
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
          </div>
          <div className="form__footer">
            <div className="button-group">
              <button type="submit" className="button primary" onClick={onUpdateClick}>
                Speichern
              </button>
            </div>
          </div>
        </form>
      </Section>
    </>
  );
};
export default EditUser;
