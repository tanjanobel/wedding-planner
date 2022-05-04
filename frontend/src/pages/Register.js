import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

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
          first_name: firstname,
          last_name: lastname,
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
        <div className="card">
          <div className="card__body">
            <h3 className="card__heading text-center padding-bottom-2">
              Neu bei Wedding Planner? Jetzt einfach registrieren.
            </h3>
            <form>
              <label htmlFor="username">E-Mail Adresse (Pflichtfeld)</label>
              <input type="text" id="username" required onChange={(e) => setUsername(e.target.value)} />
              {errors["username"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}

              <label htmlFor="firstname">Vorname (Pflichtfeld)</label>
              <input type="text" id="firstname" required onChange={(e) => setFirstname(e.target.value)} />
              {errors["first_name"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}

              <label htmlFor="lastname">Nachname (Pflichtfeld)</label>
              <input type="text" id="lastname" required onChange={(e) => setLastname(e.target.value)} />
              {errors["last_name"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}

              <label htmlFor="password">Passwort (Pflichtfeld)</label>
              <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
              {errors["password"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}
              <label htmlFor="password">Passwort bestätigen (Pflichtfeld)</label>
              <input type="password" id="confirm-password" required onChange={(e) => setPassword2(e.target.value)} />

              {errors["password2"]?.map((error) => (
                <div key={error} className="form-error">
                  <svg className="card__status icon small">
                    <use href={sprite + "#exclamation"} />
                  </svg>
                  <span>{error}</span>
                </div>
              ))}

              <div className="card__text">
                <ul>
                  <li>Das Passwort darf nicht zu ähnlich zu Ihren anderen persönlichen Informationen sein.</li>
                  <li>Das Passwort muss mindestens 8 Zeichen enthalten.</li>
                  <li>Das Passwort darf nicht allgemein üblich sein.</li>
                  <li>Das Passwort darf nicht komplett aus Ziffern bestehen.</li>
                </ul>
              </div>
              <div className="form__footer text-right">
                <button type="submit" className="button primary filled" onClick={onRegister}>
                  Registrieren
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Register;