import React, { useState } from "react";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";
import axios from "axios";
import { useNavigate } from "react-router";
import sprite from "../icons/wedding-planner-sprite.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/token/",
        {
          username,
          password,
        },
        { "Content-Type": "application/json" }
      )
      .then((response) => {
        localStorage.setItem("wedding-planner-access-token", response.data["access"]);
        localStorage.setItem("wedding-planner-refresh-token", response.data["refresh"]);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data["detail"]) {
          console.log("detail error");
          console.log(err.response.data["detail"]);
          setErrors({ detail: [err.response.data["detail"]] });
        } else {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <>
      <SubHeader title="Anmelden" />
      <Section>
        <form>
          <label htmlFor="username">Benutzername</label>
          <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />

          {errors["detail"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}

          {errors["username"]?.map((error) => (
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
            <button onClick={onLogin} type="submit" className="button primary filled">
              Login
            </button>
          </div>
        </form>
      </Section>
    </>
  );
};

export default Login;
