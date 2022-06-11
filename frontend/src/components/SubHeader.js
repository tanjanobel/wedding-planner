const SubHeader = ({ title, className }) => {
  return (
    <>
      <header className={`subheader ${className ? className : ""}`}>
        <div className="container">
          <h1>{title}</h1>
        </div>
      </header>
    </>
  );
};

export default SubHeader;
