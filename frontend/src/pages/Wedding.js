import React, { useEffect, useState } from "react";
import moment from "moment";
import SubHeader from "../components/SubHeader";
import useAxios from "../utils/useAxios";

const Wedding = () => {
  const [weddingData, setWeddingData] = useState([]);

  const api = useAxios();

  useEffect(() => {
    getWeddingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWeddingData = () => {
    api
      .get("/user")
      .then((response) => {
        const data = response.data;
        setWeddingData(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SubHeader title="Meine Hochzeit" />
      <section
        className="section section--image"
        style={{ backgroundImage: weddingData.cover_image ? `url(${weddingData.cover_image})` : "none" }}
      >
        <div className="section__container container small">
          <div className="summary grid-x grid-margin-x">
            <div className="card cell small-12 tablet-6">
              <div className="card__content text-center">
                <h3 className="card__heading">Wann</h3>
                <p className="card__summary">{moment(weddingData.wedding_date).format("DD.MM.YYYY")}</p>
              </div>
            </div>
            <div className="card cell small-12 tablet-6">
              <div className="card__content text-center">
                <h3 className="card__heading">Wo</h3>
                <p className="card__summary">{weddingData.wedding_city}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="section__container container small">
          <div className="summary grid-x grid-margin-x">
            <div className="card cell small-12 tablet-6">
              <div className="card__content text-center">
                <h3 className="card__heading">Braut</h3>
                <p className="card__summary">{weddingData.bride}</p>
              </div>
            </div>
            <div className="card cell small-12 tablet-6">
              <div className="card__content text-center">
                <h3 className="card__heading">Bräutigam</h3>
                <p className="card__summary">{weddingData.groom}</p>
              </div>
            </div>
          </div>
          <div className="summary grid-x grid-margin-x padding-bottom-2">
            <div className="card cell small-12 tablet-6">
              <div className="card__content text-center">
                <h3 className="card__heading">Trauzeugin</h3>
                <p className="card__summary">{weddingData.maid_of_honor}</p>
              </div>
            </div>
            <div className="card cell small-12 tablet-6">
              <div className="card__content text-center">
                <h3 className="card__heading">Trauzeuge</h3>
                <p className="card__summary">{weddingData.best_man}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wedding;
