import { useNavigate } from "react-router-dom";

function Catalog() {
  const navigate = useNavigate();

  return (
    <section id="Catalog">
      <h1 className="heading" id="he-1">Take A Look</h1>

      <div className="catalog-container">
        <div className="catalog-head">
          <h2>
            Choose from a variety of tables, chairs, tents, chandeliers, product cloths and many more
            rental products. Each selection uniquely enhances your function's atmosphere and guests'
            engagement. <br /> Check it out below.
          </h2>
        </div>
        <div className="catalog-button">
          <button onClick={() => navigate("/catalog")}>Catalog</button>
        </div>
        <div className="catalog-photos">
          <img src="/images/chairs.jpg" alt="Chairs" />
          <img src="/images/tables.jpg" alt="Tables" />
          <img src="/images/cocktail.jpg" alt="Cocktail Tables" />
          <img src="/images/roundtables.jpg" alt="Round Tables" />
          <img src="/images/chafer.jpg" alt="Chafing Dishes" />
        </div>
      </div>
    </section>
  );
}

export default Catalog;
