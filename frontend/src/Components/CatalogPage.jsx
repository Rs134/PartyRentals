import styles from "../catalogpage.module.css";
import CatalogGrid from "./CatalogGrid";
import QuoteForm from "./QuoteForm";

function CatalogPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.catalogContainer}>
        <div className={styles.catalogOpening}>
          <h2>
            At Reaz Party Rentals, we understand that every event is unique.
            Browse through our curated collection where each piece is chosen with
            the utmost care to ensure comfort, style, and quality. Let us help
            bring your vision to life.
          </h2>
          <br />
          <h3 className={styles.essential}>
            Important: Our tents vary with different widths and lengths. We have 6ft,
            7ft, 8ft, 10ft, 12ft, 15ft, 18ft and 20ft wide tents that can each maximize
            up to a certain length to fit various driveways and backyards. Below are some 
            tent setups that have been conducted in the past. 
          </h3>
          <a href="#catalogGrid">
            <button className={styles.continueToggle}>Rental Items</button>
          </a>
          <br />
          <a href="#requestquote">
            <button className={styles.continueToggle}>Request A Quote</button>
          </a>
        </div>

        <CatalogGrid />
        <QuoteForm />
      </div>

    </div>
    
  );
}

export default CatalogPage;
