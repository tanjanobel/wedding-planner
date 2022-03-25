import sprite from "../icons/wedding-planner-sprite.svg";

const Flashmessage = (props) => {
  return (
    <div className={`flashmessage flashmessage--${props.className}`}>
      <svg className="flashmessage__icon icon">
        <use href={`${sprite}${props.icon}`}/>
      </svg>
      <span className="flashmessage__text">{props.text}</span>
    </div>
  )
};

export default Flashmessage;
