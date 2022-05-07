import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import Flashmessage from "../../components/Flashmessage";

const EditUser = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const { user } = useContext(AuthContext);
  const { state } = useLocation();

  const api = useAxios();

  let performedAction = "";
  let isError = "";
  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
  }

  const initialUserState = {
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
  };

  const [currentUser, setCurrentUser] = useState(initialUserState);

  const countRef = useRef(0);
  useEffect(() => {
  }, [countRef]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
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
        setCurrentUser({
          firstname: response.data.first_name,
          lastname: response.data.last_name,
        });
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
          <label htmlFor="first_name">Vorname (Pflichtfeld)</label>
          <input type="text" name="first_name" value={currentUser.first_name} onChange={handleUserChange} />
          {errors["firstname"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="last_name">Nachname (Pflichtfeld)</label>
          <input type="text" name="last_name" value={currentUser.last_name} onChange={handleUserChange} />
          {errors["lastname"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <div className="form__footer">
            <div className="button-group">
              <Link to="/profile" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={updateUser}>
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
