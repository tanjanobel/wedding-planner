import React, { useState, useContext } from "react";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import "react-router";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const onRegister = async (e) => {
    e.preventDefault();

    axios
      .post(
        "/api/register/",
        {
          username,
          password,
          password2,
        },
        { "Content-Type": "application/json" }
      )
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  return (
    <>
      {/* Flashmessage, bitte einloggen */}
      <SubHeader title="Registrieren" />
      <Section>
        <form>
          <label htmlFor="username">Benutzername</label>

          <input type="text" id="username" required onChange={(e) => setUsername(e.target.value)} />

          {errors["username"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}

          <label htmlFor="password">Passwort</label>
          <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />

          {errors["password"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}

          <label htmlFor="password">Passwort bestätigen</label>
          <input type="password" id="confirm-password" required onChange={(e) => setPassword2(e.target.value)} />

          <div className="form__footer text-right">
            <button type="submit" className="button primary filled" onClick={onRegister}>
              Registrieren
            </button>
          </div>
        </form>
      </Section>
    </>
  );
};

export default Register;
