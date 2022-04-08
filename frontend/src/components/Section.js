const Section = (props) => {

  return (
    <>
      <section className={`section ${props.className}`}>
        <div className="section__container container medium">
          {props.children}
        </div>
      </section>
    </>
  )
}

export default Section;
