import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";
import AuthContext from "../context/AuthContext";

const EditUser = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const { user } = useContext(AuthContext);

  const initialUserState = {
    username: user.username,
    firstname: user.first_name,
    lastname: user.last_name,
  };

  const [currentUser, setCurrentUser] = useState(initialUserState);

  const countRef = useRef(0);
  useEffect(() => {
    // retrieveUser();
  }, [countRef]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // const retrieveUser = () => {
  //   axios
  //     .get(`/api/user/${id}/`)
  //     .then((response) => {
  //       setCurrentUser({
  //         firstname: response.data.firstname,
  //         lastname: response.data.lastname,
  //       });
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  const updateUser = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      ...currentUser,
    };
    axios
      .put(`/api/user/`, data)
      .then((response) => {
        setCurrentUser({
          first_name: response.data.firstname,
          lastname: response.data.lastname,
        });
        if (response.status === 200) {
          navigate("/profile", {
            state: { performedAction: "edit_user", name: `${currentUser.firstname} ${currentUser.lastname}` },
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
        <form>
          <label>
            Vorname (Pflichtfeld)
            <input type="text" name="firstname" value={currentUser.firstname} onChange={handleUserChange} />
            {errors["firstname"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label>
            Nachname (Pflichtfeld)
            <input type="text" name="lastname" value={currentUser.lastname} onChange={handleUserChange} />
            {errors["lastname"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
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
