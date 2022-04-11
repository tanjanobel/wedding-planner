import { useEffect, useState } from "react";
import sprite from "../icons/wedding-planner-sprite.svg";

const Flashmessage = (props) => {
  const [show, setShow] = useState(true);
  const messages = {
    add: `Aufgabe ${props.title} erfolgreich hinzugefügt.`,
    delete: `Aufgabe ${props.title} erfolgreich gelöscht.`,
    edit: `Aufgabe ${props.title} erfolgreich gespeichert.`,
    err_add: `Aufgabe ${props.title} konnte nicht hinzugefügt werden.`,
    err_delete: `Aufgabe ${props.title} konnte nicht gelöscht werden.`,
    err_edit: `Aufgabe ${props.title} konnte nicht gespeichert werden.`,
  };

  let text = messages[props.performedAction];
  let isError = props.isError;

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, props.duration);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (show) {
    if (!isError) {
      return (
        <div className="flashmessage flashmessage--success">
          <svg className="flashmessage__icon icon">
            <use href={sprite + "#done"} />
          </svg>
          <span className="flashmessage__text">{text}</span>
        </div>
      );
    } else {
      return (
        <div className="flashmessage flashmessage--error">
          <svg className="flashmessage__icon icon">
            <use href={sprite + "#refuse"} />
          </svg>
          <span className="flashmessage__text">{text}</span>
        </div>
      )
    }
  }
};

export default Flashmessage;
