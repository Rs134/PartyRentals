import "../App.css"
function About() {
  return (
    <section id="About">
      <div className="about-container">
        <p className="about-msg">
          With over 10 years of rental experience, we strive to implement the best
          qualitative and quantitative service that satisfies your desires and complements
          your event imagination.
        </p>

        <img id="logo" src="/images/logo.png" alt="Company Logo" />

        <p className="about-msg">
          It’s more than just supplying and catering for your event. It’s about ensuring
          proper coordination, planning, and purpose so that you make the most of your
          function and capture many memories.
        </p>
      </div>

      <div className="slogan">
        <h2 className="fade-slogan">Rent The Magic, Cherish The Moment!</h2>
      </div>
    </section>
  );
}

export default About;
