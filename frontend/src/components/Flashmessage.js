import { useEffect, useState } from "react";
import sprite from "../icons/wedding-planner-sprite.svg";

const Flashmessage = (props) => {
  const [show, setShow] = useState(true);
  const messages = {
    add_task: `Aufgabe ${props.title} erfolgreich hinzugefügt.`,
    delete_task: `Aufgabe ${props.title} erfolgreich gelöscht.`,
    edit_task: `Aufgabe ${props.title} erfolgreich gespeichert.`,
    err_add_task: `Aufgabe ${props.title} konnte nicht hinzugefügt werden.`,
    err_delete_task: `Aufgabe ${props.title} konnte nicht gelöscht werden.`,
    err_edit_task: `Aufgabe ${props.title} konnte nicht gespeichert werden.`,

    add_guest: `Gast ${props.title} erfolgreich hinzugefügt.`,
    delete_guest: `Gast ${props.title} erfolgreich gelöscht.`,
    edit_guest: `Gast ${props.title} erfolgreich gespeichert.`,
    err_add_guest: `Gast ${props.title} konnte nicht hinzugefügt werden.`,
    err_delete_guest: `Gast ${props.title} konnte nicht gelöscht werden.`,
    err_edit_guest: `Gast ${props.title} konnte nicht gespeichert werden.`,

    add_expense: `Ausgabe ${props.title} erfolgreich hinzugefügt.`,
    delete_expense: `Ausgabe ${props.title} erfolgreich gelöscht.`,
    edit_expense: `Ausgabe ${props.title} erfolgreich gespeichert.`,
    err_add_expense: `Ausgabe ${props.title} konnte nicht hinzugefügt werden.`,
    err_delete_expense: `Ausgabe ${props.title} konnte nicht gelöscht werden.`,
    err_edit_expense: `Ausgabe ${props.title} konnte nicht gespeichert werden.`,

    edit_user: `Das Profil wurde erfolgreich gespeichert. Die Änderungen werden nach dem nächsten Login sichtbar.`,
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
  });

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
      );
    }
  }
};

export default Flashmessage;
