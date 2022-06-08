import React, { useEffect, useState } from "react";
import moment from "moment";
import SubHeader from "../../components/SubHeader";
import useAxios from "../../api/useAxios";
import { Card } from "../../components/Card";

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
            <Card
              topLabel="Wann"
              data={moment(weddingData.wedding_date).format("DD.MM.YYYY")}
              containerClass="card cell small-12 tablet-6"
            />
            <Card topLabel="Wo" data={weddingData.wedding_city} containerClass="card cell small-12 tablet-6" />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="section__container container small">
          <div className="summary grid-x grid-margin-x">
            <Card topLabel="Braut" data={weddingData.bride} containerClass="card cell small-12 tablet-6" />
            <Card topLabel="Bräutigam" data={weddingData.groom} containerClass="card cell small-12 tablet-6" />
          </div>

          <div className="summary grid-x grid-margin-x padding-bottom-2">
            <Card
              topLabel="Trauzeugin"
              data={weddingData.maid_of_honor}
              containerClass="card cell small-12 tablet-6"
            />
            <Card topLabel="Trauzeuge" data={weddingData.best_man} containerClass="card cell small-12 tablet-6" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Wedding;
