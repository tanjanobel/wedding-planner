import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await loginUser(email, password);
    if (data["detail"]) {
      setErrors({ detail: [data["detail"]] });
    } else {
      setErrors(data);
    }
  };

  return (
    <>
      <SubHeader title="Anmelden" />
      <Section>
        <div className="grid-x grid-margin-x align-top">
          <div className="card cell small-12 tablet-6">
            <div className="card__body">
              <h3 className="card__heading text-center padding-bottom-2">Mit Kundenkonto anmelden</h3>
              <p className="text-center padding-bottom-1">
                Du hast schon ein Kundenkonto?
                <br />
                Bitte gib deine E-Mail Adresse und dein Passwort ein.
              </p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-Mail Adresse</label>
                <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />

                {errors["detail"]?.map((error) => (
                  <div key={error} className="form-error">
                    <svg className="card__status icon small">
                      <use href={sprite + "#exclamation"} />
                    </svg>
                    <span>{error}</span>
                  </div>
                ))}

                {errors["email"]?.map((error) => (
                  <div key={error} className="form-error">
                    <svg className="card__status icon small">
                      <use href={sprite + "#exclamation"} />
                    </svg>
                    <span>{error}</span>
                  </div>
                ))}

                <label htmlFor="password">Passwort</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />

                {errors["password"]?.map((error) => (
                  <div key={error} className="form-error">
                    <svg className="card__status icon small">
                      <use href={sprite + "#exclamation"} />
                    </svg>
                    <span>{error}</span>
                  </div>
                ))}

                <div className="form__footer text-right">
                  <button type="submit" className="button primary expanded">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card cell small-12 tablet-6">
            <div className="card__body">
              <h3 className="card__heading text-center padding-bottom-2">Ich habe noch kein Konto</h3>
              <p className="text-center padding-bottom-1">Lege jetzt in wenigen Schritten ein Kundenkonto an.</p>
              <Link to="/register" className="button hollow expanded">
                Jetzt registrieren
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Login;
