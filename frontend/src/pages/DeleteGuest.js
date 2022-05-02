import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import useAxios from "../utils/useAxios";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const DeleteGuest = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const location = useLocation();
  const { firstname, lastname } = location.state;

  const api = useAxios();

  const deleteGuest = () => {
    api
      .delete("/guests", {
        data: {
          id: id
        }
      })
      .then((response) => {
        if (response.status.toString().startsWith("4")) {
          console.error(response.data);
          navigate("/guests", {
            state: { performedAction: "err_delete_guest", name: `${firstname} ${lastname}`, isError: true },
          });
        }
        if (response.status === 200) {
          navigate("/guests", { state: { performedAction: "delete_guest", name: `${firstname} ${lastname}` } });
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/guests", {
          state: { performedAction: "err_delete_guest", name: `${firstname} ${lastname}`, isError: true },
        });
      });
  };

  return (
    <>
      <SubHeader title="Gast löschen" />
      <Section>
        <p className="text-center">
          Möchtest du den Gast{" "}
          <b>
            {firstname} {lastname}
          </b>{" "}
          wirklich löschen?
        </p>
        <div className="grid-x align-right">
          <div className="button-group">
            <Link to="/guests" className="button secondary">
              Abbrechen
            </Link>

            <button onClick={() => deleteGuest(id)} className="button primary">
              Löschen
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DeleteGuest;
